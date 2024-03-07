<template>
  <div class="box content tile is-child is-12">
    <p class="title is-3">
      <button :class="{'is-info':stopIsSelected}" class="button is-rounded" @click="onStopClicked(busStopCode)">&#x2605;</button>
      {{ busStopCode }}
    </p>
    <p class="subtitle is-4">
      {{ busStopName }}
    </p>
    <div class="">
      {{ timeDiffHuman(lastUpdated) }}
      <button :class="{'is-loading':isLoading}" class="button is-rounded is-right float is-small" @click="onReloadClicked">{{ isLoading ? 'x' : 'R' }}</button>
    </div>
    <div class="box content">
      <div v-for="(obj, servNo) in services" :key="servNo" class="">
        <div v-if="!!obj" class="level is-mobile">
          <div class="level-item subtitle has-text-centered">
            <button :class="{'is-info':obj.isSelected}" class="button is-rounded" @click="onServiceClicked(busStopCode, servNo)">{{ obj.ServiceNo }}</button>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <span v-if="obj.NextBus && obj.NextBus.VisitNumber==='2'" class="tag is-rounded is-small is-info is-light">2nd</span>
              <p class="subtitle is-4">
                {{ obj.NextBus ? timeDiffMinute(obj.NextBus.EstimatedArrival) : '-' }}
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <span v-if="obj.NextBus2 && obj.NextBus2.VisitNumber==='2'" class="tag is-rounded is-small is-info is-light">2nd</span>
              <p class="subtitle is-4">
                {{ obj.NextBus2 ? timeDiffMinute(obj.NextBus2.EstimatedArrival) : '-' }}
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <span v-if="obj.NextBus3 && obj.NextBus3.VisitNumber==='2'" class="tag is-rounded is-small is-info is-light">2nd</span>
              <p class="subtitle is-4">
                {{ obj.NextBus3 ? timeDiffMinute(obj.NextBus3.EstimatedArrival) : '-' }}
              </p>
            </div>
          </div>
        </div>
        <div v-else>
          {{ `${servNo} No Bus Timings` }}
        </div>
        <div v-if="errors && errors.length" class="">
          <p v-for="e in errors" :key="e">
            {{ e }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(duration).extend(relativeTime)

// const getAllBusService = (data) => {
//   const { Services: [] } = data;
//   return Services;
// }

export default {
  name: 'Card',
  props: {
    busStopName: {
      type: String,
      default: 'stop name goes here'
    },
    busStopCode: {
      type: [String, Number],
      default: 14141
    },
    serviceNos: {
      type: Array,
      default: function () {
        return []
      }
    },
    getStopState: {
      type: Function,
      default: function () {
        return null
      }
    }
  },
  data: () => ({
    lastUpdated: 0,
    timeNow: dayjs(),
    timer: 0,
    isLoading: false,
    stopIsSelected: false,
    services: {},
    errors: []
  }),
  created() {
    // this.reloadData()
  },
  mounted() {
    const self = this
    this.timer = setTimeout(self.updateTime, 6000)
  },
  beforeUpdate() {
    const self = this
    const stopState = self.getStopState(self.busStopCode)
    self.stopIsSelected = stopState != null
    self.services = {}
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  methods: {
    updateTime() {
      const self = this
      this.timeNow = dayjs()
      this.timer = setTimeout(self.updateTime, 6000)
    },
    onReloadClicked: function () {
      if (!this.isLoading) {
        this.reloadData()
      }
    },
    onStopClicked: function (stopCode) {
      const self = this
      self.stopIsSelected = !self.stopIsSelected
      self.$emit('stop-clicked', stopCode)
    },
    onServiceClicked: function (stopCode, serviceNo) {
      const self = this
      if (!self.stopIsSelected) {
        self.stopIsSelected = !self.stopIsSelected
        self.$emit('stop-clicked', stopCode)
      }
      self.services[serviceNo].isSelected = !self.services[serviceNo].isSelected
      self.$emit('service-clicked', stopCode, serviceNo)
    },
    reloadData: function () {
      const self = this
      self.isLoading = true
      //console.log('reloadData', this.busStopCode)
      // Vue.set(this.items,this.count.toString(),this.count);
      fetch(`/get-bus-timings?BusStopCode=${this.busStopCode}`)
        .then((response) => {
          response.json().then((pv) => {
            self.updateData(pv)
          });
        })
        .catch((e) => {
          self.errors.push(e)
          self.isLoading = false
        })
    },
    updateData: function (data) {
      const self = this
      const stopState = self.getStopState(self.busStopCode)
      self.stopIsSelected = stopState != null
      const selectedServiceNos = stopState ? stopState.ServiceNos : []
      //console.log('updateData', this.busStopCode)
      if (self.serviceNos.length === 0) {
        self.services = self.extractAllBusService(data)
        for (const serviceNo of selectedServiceNos) {
          self.services[serviceNo].isSelected = true
        }
      } else {
        self.services = {}
        self.serviceNos.forEach((serviceNo) => {
          self.services[serviceNo] = self.extractBusService(data, serviceNo)
        })
      }
      self.lastUpdated = Date.now()
      self.isLoading = false
    },
    timeDiffMinute: function (time) {
      const x = this.timeNow
      const t = dayjs(time)
      const r = Math.round(dayjs.duration(t.diff(x)).asMinutes() * 10) / 10
      return (r > 0) ? r : 'Arr'
    },
    timeDiffHuman: function (time) {
      if (time === 0) return 'never'
      const x = this.timeNow
      const t = dayjs(time)
      return dayjs.duration(t.diff(x)).humanize(true)
    },
    extractAllBusService: (data) => {
      const services = {}
      for (const service of data.Services) {
        services[service.ServiceNo] = service
      }
      return services
    },
    extractBusService: (data, serviceNo) => {
      const services = data.Services || []
      for (const service of services) {
        if (service.ServiceNo === serviceNo) {
          return service
        }
      }
      return null
    }
  }
}
</script>
