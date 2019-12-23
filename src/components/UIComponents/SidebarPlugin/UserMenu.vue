
<template>
  <div class="user">
    <div class="photo">
      <img src="/static/img/avatar.jpg"/>
    </div>
    <div class="info">
      <a data-toggle="collapse" :aria-expanded="!isClosed" @click="toggleMenu" href="#">
         <span>
           {{this.user.full_name}}
        </span>
      </a>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<script>
  import { CollapseTransition } from 'vue2-transitions'

  export default {
    components: {
      CollapseTransition
    },
    data() {
      return {
        user: {},
        isClosed: true
      }
    },
    methods: {
      toggleMenu() {
        this.isClosed = !this.isClosed
      },
      getUserData() {
        let userId = localStorage.getItem('user_id')
        window.axios.get("/user/" + userId).then(res => {
            this.user = res.data;
        });
      }
    },
    mounted() {
      this.getUserData();
    }
  }
</script>
<style scoped>
  .nav.nav-menu {
    margin-top: 0;
  }
</style>
