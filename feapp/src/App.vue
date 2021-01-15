<template>
  <v-app>
    <!-- Header -->
    <v-app-bar app color="primary" dark>
      <div class="block">
          <router-link class="d-flex align-center" :to="{name: 'covid'}">
            <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
              transition="scale-transition"
              width="40"
            />

            <v-img
              alt="Vuetify Name"
              class="shrink mt-1 hidden-sm-and-down"
              contain
              min-width="100"
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
              width="100"
            />
          </router-link>

        <div>Header</div>

        <v-menu
          bottom
          offset-y
          nudge-left="20"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="btnAvatar"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <span class="icon icon-user-circle"></span>
            </v-btn>
          </template>

          <v-list>
            <v-list-item link :to="{name: 'profile'}">
              <v-list-item-title>Change profile</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <!-- Content  -->
    <v-main>
      <div class="block">
        <transition name="fade">
          <router-view />
        </transition>
      </div>
    </v-main>

    <!-- Footer -->
    <v-footer>
      <div class="footer">
        <div class="block">Copyright ©2020 Hiep.Bui</div>
      </div>
    </v-footer>

    <modals-container />
  </v-app>
</template>

<script>
import AuthService from '@/services/auth.service'
import WebStorageService from '@/services/web-storage.service'
import { WebStorageKey } from '@/globals/enums'
import { mapGetters }  from 'vuex'

const webStorageService = new WebStorageService()

export default {
  name: "App",

  data: () => ({
    authService: new AuthService()
  }),

  computed: {
    ...mapGetters({
      profilesData: 'profiles/getData'
    })
  },

  methods: {
    checkLogin () {
      const token = webStorageService.getSessionStorage(WebStorageKey.Token)
      if(token) {
        return true
      }
      else {
        return false
      }
    },

    logout () {
      this.authService.logout()
    }
  }
}
</script>

<style lang="scss">
  .v-btn:not(.v-btn--round).v-size--default {
    &.btnAvatar {
      border-radius: 50%;
      width: 50px;
      height: 50px;
      min-width: 0;
      font-size: 40px;
      padding: 0;
      background: none;
      box-shadow: none;
      img {
        height: 40px;
      }
    }
  }
</style>

