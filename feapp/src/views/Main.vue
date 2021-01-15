<template>
      <transition name="fade">
        <router-view />
      </transition>
</template>

<script>
  import authService from '@/services/auth.service'

  export default {
    name: 'Main',

    data: () => {
      return {
        authService: new authService()
      }
    },

    mounted () {
      this.authService.getProfile()
    }
  }
</script>