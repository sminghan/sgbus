<template>
  <section class="home">
    <Navbar />
    <div class="hero">
      <section class="container">
        <!-- <div> -->
        <!-- <h1 class="title">
          sgbus
        </h1>
        <h2 class="subtitle">
          My first-rate Nuxt.js project
        </h2> -->
        <div class="columns is-desktop">
          <div class="column">
            <Card :bus-stop-code="14141" :service-nos="['145','131']" />
          </div>
          <div class="column">
            <Card :bus-stop-code="14249" :service-nos="['145','145A','176']" />
          </div>
          <div class="column">
            <Card :bus-stop-code="66359" :service-nos="['53', '53M']" />
          </div>
        </div>
        <!-- </div> -->
      </section>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <a href="https://bulma.io">
            <img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="128" height="24">
          </a>
        </p>
      </div>
    </footer>
  </section>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Card from '~/components/Card.vue'

export default {
  components: {
    Navbar,
    Card
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
