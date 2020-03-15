<template>
  <div class="box content tile is-child is-4">
    <p class="title is-3">
      {{ busStopCode }}
    </p>
    <p class="subtitle is-4">
      {{ busStopName }}
    </p>
    <div class="">
      {{ timeDiffHuman(lastUpdated) }}
      <a :class="{'is-loading':isLoading}" @click="onReloadClicked" class="button is-rounded is-right float is-small">{{ isLoading ? 'x' : 'R' }}</a>
    </div>
    <div class="box content">
      <div v-for="(obj, servNo) in services" :key="servNo" class="">
        <div v-if="!!obj" class="level is-mobile">
          <div class="level-item subtitle has-text-centered">
            {{ obj.ServiceNo }}
          </div>
          <div class="level-item has-text-centered">
            {{ obj.NextBus ? timeDiffMinute(obj.NextBus.EstimatedArrival) : '-' }}
          </div>
          <div class="level-item has-text-centered">
            {{ obj.NextBus2 ? timeDiffMinute(obj.NextBus2.EstimatedArrival) : '-' }}
          </div>
          <div class="level-item has-text-centered">
            {{ obj.NextBus3 ? timeDiffMinute(obj.NextBus3.EstimatedArrival) : '-' }}
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
import axios from 'axios'
import moment from 'moment'

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
    }
  },
  data: () => ({
    lastUpdated: 0,
    timeNow: moment(),
    timer: 0,
    isLoading: false,
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
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  methods: {
    updateTime() {
      const self = this
      this.timeNow = moment()
      this.timer = setTimeout(self.updateTime, 6000)
    },
    onReloadClicked: function () {
      if (!this.isLoading) {
        this.reloadData()
      }
    },
    reloadData: function () {
      const self = this
      self.isLoading = true
      // Vue.set(this.items,this.count.toString(),this.count);
      axios.get(`https://wt-5a6110d2d10be45a74f37503ca30869c-0.sandbox.auth0-extend.com/get-bus-timings?BusStopCode=${this.busStopCode}`)
        .then((response) => {
          self.updateData(response.data)
        })
        .catch((e) => {
          self.errors.push(e)
          self.isLoading = false
        })
    },
    updateData: function (data) {
      const self = this
      if (self.serviceNos.length === 0) {
        // self.services = self.extractAllBusService(response.data.data)
        self.$set(self, 'services', self.extractAllBusService(data.data))
      } else {
        self.services = {}
        self.serviceNos.forEach((serviceNo) => {
          self.$set(self.services, serviceNo.toString(), self.extractBusService(data.data, serviceNo))
        })
      }
      self.lastUpdated = data.timestamp
      self.isLoading = false
    },
    timeDiffMinute: function (time) {
      const x = this.timeNow
      const t = moment(time)
      const r = Math.round(moment.duration(t.diff(x)).asMinutes() * 10) / 10
      return (r > 0) ? r : 'Arr'
    },
    timeDiffHuman: function (time) {
      if (time === 0) return 'never'
      const x = this.timeNow
      const t = moment(time)
      return moment.duration(t.diff(x)).humanize(true)
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
