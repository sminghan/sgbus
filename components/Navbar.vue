<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <!-- <a class="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </a>-->
      <a class="navbar-item" href="https://sgbus.netlify.com">
        <!--        <Logo />-->
        <span class="has-text-weight-bold">sgbus</span>
      </a>

      <a
        :class="{'is-active': isOpen}"
        @click="isOpen = !isOpen"
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div
      id="navbarBasicExample"
      :class="{'is-active': isOpen}"
      class="navbar-menu"
    >
      <div class="navbar-start">
        <!--  <a class="navbar-item">Home</a>-->
        <!--  <a class="navbar-item">Settings</a>-->
      </div>
    </div>
  </nav>
</template>

<script>
// import Logo from '~/components/Logo.vue'

export default {
  components: {
    // Logo
  },
  data: function () {
    return {
      isOpen: false
    }
  }
}
</script>
