<template>
  <navbar navbar-menu-classes="navbar-right">
    <template slot="navbar-menu">
      <router-link to="/login" class="nav-item" tag="li">
        <a class="nav-link">
          <i class="nc-icon nc-layout-11"></i> Catálogo
        </a>
      </router-link>
      <router-link to="/login" class="nav-item" tag="li">
        <a class="nav-link">
          <i class="nc-icon nc-book-bookmark"></i> Cadastro de filmes
        </a>
      </router-link>
      <router-link to="/login" class="nav-item" tag="li">
        <a class="nav-link">
          <i class="nc-icon nc-tap-01"></i> Login
        </a>
      </router-link>
    </template>
  </navbar>
</template>

<script>
  import {Navbar} from 'src/components/UIComponents'
  export default {
    name: 'main-navbar',
    components: {
      Navbar
    }
  }
</script>

<style scoped>

</style>
