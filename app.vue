<template>
  <NuxtPwaManifest />
  <section class="main">
    <div class="container">
      <div class="tile is-ancestor" style="margin-top:50px">
        <div class="tile is-parent is-vertical is-12">
          <div class="box content tile is-child is-12">
            <label for="manual">Bus Stop Code:</label>
            <input id="manual" v-model="manualBusStopCode" placeholder="Enter Bus Stop Code" type="tel" pattern="[0-9]*">
          </div>
          <CardEdit
            v-if="manualBusStopCode.length > 4 && manualBusStopCode.length < 6"
            :bus-stop-name="getStopName(manualBusStopCode)"
            :bus-stop-code="manualBusStopCode"
            :get-stop-state="getStopState"
            @stop-clicked="toggleStop"
            @service-clicked="toggleService"
          />
          <Card
            v-for="item in items"
            :key="item.BusStopCode"
            :bus-stop-name="getStopName(item.BusStopCode)"
            :bus-stop-code="item.BusStopCode"
            :service-nos="item.ServiceNos"
            @stop-clicked="(n) => manualBusStopCode = n"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card.vue'
import StopInfo from '~/assets/stopInfo'

export default {
  components: {
    Card
  },
  data: () => ({
    manualBusStopCode: '',
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
  mounted(){
    this.loadState()
  },
  methods: {
    getStopName: (stopCode) => {
      return StopInfo[stopCode] || 'stop name goes here'
    },
    loadState: function() {
      const self = this
      if (process.client){
        const itemsString = localStorage.getItem('state')
        if (itemsString !== null) {
          self.items = JSON.parse(itemsString)
        }
      }
    },
    saveState: function() {
      const self = this
      if (process.client){
        const itemsString = JSON.stringify(self.items)
        localStorage.setItem('state', itemsString)
      }
    },
    getStopState: function(stopCode) {
      const self = this
      for (let i = 0; i < self.items.length; i++){
        if (self.items[i].BusStopCode == stopCode) {
          return self.items[i]
        }
      }
      return null
    },
    toggleStop: function(stopCode) {
      const self = this
      for (let i = 0; i < self.items.length; i++){
        if (self.items[i].BusStopCode == stopCode) {
          self.items[i] = self.items[self.items.length-1]
          self.items.pop()    
          self.saveState()
          return;
        }
      }
      self.items.push({
        BusStopCode: stopCode,
        ServiceNos: []
      })
      self.saveState()
    },
    toggleService: function(stopCode, serviceNo) {
      const self = this
      for (let i = 0; i < self.items.length; i++){
        if (self.items[i].BusStopCode == stopCode) {
          let check = self.items[i].ServiceNos.indexOf(serviceNo)
          if (check > -1) {
            self.items[i].ServiceNos[check] = self.items[i].ServiceNos[self.items[i].ServiceNos.length-1]
            self.items[i].ServiceNos.pop()
          } else {
            self.items[i].ServiceNos.push(serviceNo)
          }
          self.saveState()
          return;
        }
      }
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
