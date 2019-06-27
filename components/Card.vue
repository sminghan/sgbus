<template>
  <section class="section">
    <div class="container">
      <div class="box content">
        <header class="level">
          <div class="level-item has-text-centered">
            <h1 class="title">
              {{ busStopCode }}
            </h1>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="subtitle is-5">
                {{ busStopName }}
              </p>
              <p class="subtitle is-5">
                {{ timeDiffHuman(lastUpdated) }}
                <a class="button is-rounded is-right float is-small" :class="{'is-loading':isLoading}" @click="onReloadClicked">{{ isLoading ? 'x' : 'R' }}</a>
              </p>
            </div>
          </div>
        </header>
        <div v-if="serviceNos && serviceNos.length" class="">
          <div v-for="(obj, servNo) in services" :key="servNo" class="card">
            <div class="card-content">
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
              <div v-if="errors && errors.length" class="card-footer">
                <p v-for="e in errors" :key="e">
                  {{ e }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
    'busStopName': {
      type: String,
      default: 'stop name goes here'
    },
    'busStopCode': {
      type: [String, Number],
      default: 14141
    },
    'serviceNos': {
      type: Array,
      default: function () {
        return ['145']
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
    this.reloadData()
    // this.isLoading = true
    // axios.get(`https://wt-5a6110d2d10be45a74f37503ca30869c-0.sandbox.auth0-extend.com/get-bus-timings?BusStopCode=${this.busStopCode}`)
    //   .then((response) => {
    //     this.serviceNos.forEach((serviceNo) => {
    //       this.services[serviceNo] = this.extractBusService(response.data.data, serviceNo)
    //       // eslint-disable-next-line no-console
    //       // console.log(this.services[serviceNo])
    //     })
    //     this.lastUpdated = response.timestamp
    //     this.isLoading = false
    //   })
    //   .catch((e) => {
    //     this.errors.push(e)
    //   })
  },
  mounted() {
    this.updateTime()
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
      setTimeout(self.updateTime, 6000)
    },
    onReloadClicked: function () {
      if (!this.isLoading) {
        this.reloadData()
      }
    },
    reloadData: function () {
      const self = this
      self.isLoading = true
      axios.get(`https://wt-5a6110d2d10be45a74f37503ca30869c-0.sandbox.auth0-extend.com/get-bus-timings?BusStopCode=${this.busStopCode}`)
        .then((response) => {
          self.serviceNos.forEach((serviceNo) => {
            self.services[serviceNo] = self.extractBusService(response.data.data, serviceNo)
          })
          self.lastUpdated = response.data.timestamp
          self.isLoading = false
        })
        .catch((e) => {
          self.errors.push(e)
          self.isLoading = false
        })
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
      // eslint-disable-next-line
      console.log('x', x.format(), 't', t.format(), 'wtf', time)
      return moment.duration(t.diff(x)).humanize(true)
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
