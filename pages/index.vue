<template>
  <section class="main">
    <Navbar />
    <div class="container">
      <div class="tile is-ancestor" style="margin-top:50px">
        <div class="tile is-parent is-12">
          <div class="box content tile is-child is-4">
            <label for="manual">Bus Stop Code</label>
            <input id="manual" v-model.number="manualBusStopCode" placeholder="Enter Bus Stop Code" type="number">
          </div>
          <Card
            v-if="manualBusStopCode > 9999 && manualBusStopCode < 100000"
            :bus-stop-name="getStopName(manualBusStopCode)"
            :bus-stop-code="manualBusStopCode"
          />
          <Card
            v-for="item in items"
            :key="item.BusStopCode"
            :bus-stop-name="getStopName(item.BusStopCode)"
            :bus-stop-code="item.BusStopCode"
            :service-nos="item.ServiceNos"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Card from '~/components/Card.vue'
import StopInfo from '~/assets/stopInfo'

export default {
  components: {
    Navbar,
    Card
  },
  data: () => ({
    manualBusStopCode: null,
    items: [
      {
        BusStopCode: '14141',
        ServiceNos: ['145', '131']
      },
      {
        BusStopCode: '14249',
        ServiceNos: ['145', '176']
      },
      {
        BusStopCode: '43719',
        ServiceNos: ['177']
      },
      {
        BusStopCode: '66359',
        ServiceNos: ['53', '53M']
      }
    ]
  }),
  methods: {
    getStopName: (stopCode) => {
      return StopInfo[stopCode] || 'stop name goes here'
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
