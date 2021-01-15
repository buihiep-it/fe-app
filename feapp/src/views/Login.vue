<template>
  <div class="login-page">
    <h1 class="headding">Login</h1>
    <ValidationObserver ref="observer" v-slot="{ invalid }" slim>
      <form>
        <table class="table">
          <tbody>
            <tr>
              <th>Username</th>
              <td>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Username"
                  rules="required|email"
                  slim
                >
                  <v-text-field
                    v-model="email"
                    placeholder="sample@lyfe.jp"
                    :error-messages="errors"
                    maxlength="64"
                  ></v-text-field>
                </ValidationProvider>
              </td>
            </tr>
            <tr>
              <th>Password</th>
              <td>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="password"
                  rules="required"
                  slim
                >
                  <v-text-field
                    v-model="password"
                    placeholder="Abcd123!"
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'icon icon-eye-closed' : 'icon icon-eye'"
                    class="passwordInput"
                    @click:append="show = !show"
                    :error-messages="errors"
                    maxlength="100"
                  ></v-text-field>
                </ValidationProvider>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="wrapper-btn">
          <v-btn
            depressed
            rounded
            large
            color="primary"
            :disabled="invalid"
            :loading="loading"
            @click="login"
          >Login</v-btn>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import AuthService from "@/services/auth.service"
import WebStorageService from "@/services/web-storage.service"
import { WebStorageKey } from '@/globals/enums'

export default {
  name: "Login",

  data: () => {
    return {
      authService: new AuthService(),
      webStorageService: new WebStorageService(),
      email: null,
      password: null,
      show: false,
      loading: false
    }
  },

  methods: {
    async login () {
      this.loading = true
      const self = this
      const params = {
        loginId: this.email,
        password: this.password
      }
      this.authService.login(params).then(
        (res) => {
          self.webStorageService.setSessionStorage(WebStorageKey.Token, res)
          setTimeout(() => {
            const nextAfterLogin = self.webStorageService.getLocalStorage(WebStorageKey.NextAfterLogin)
            if (nextAfterLogin) {
              self.$router.push(nextAfterLogin)
              self.webStorageService.removeLocalStorage(WebStorageKey.NextAfterLogin)
            } else {
              self.$router.push({ name: 'index' })
            }
          }, 50)
        }
      ).finally(function () {
        self.loading = false
      })
    }
  }
}
</script>

<style lang="scss">
.login-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  table {
    max-width: 500px;
    margin: 0px auto 50px;
  }
  th {
    width: 100px;
    line-height: 66px;
  }
  td {
    width: 300px;
    line-height: 66px;
  }
  .wrapper-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>