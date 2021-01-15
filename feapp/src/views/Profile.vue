<template>
  <div class="accountChange">
    <h1 class="headding">Profile</h1>
    <ValidationObserver ref="observer" v-slot="{ invalid }" slim>
      <pre>
      <!-- {{profile}} -->
      </pre>
      <form>
        <table class="accountChange_table">
          <tbody>
            <tr>
              <th>Name</th>
              <td class="accountChange_td">
                <div class="accountChange_name">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  name="firstName"
                  slim
                >
                  <v-text-field
                    v-model="profile.firstName"
                    placeholder="Input your first Name"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="lastName"
                  rules="required"
                  slim
                >
                  <v-text-field
                    v-model="profile.lastName"
                    placeholder="Input your last Name"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
                </div>
              </td>
            </tr>
            <tr>
              <th>Day Of Birth</th>
              <td class="accountChange_td">
                  <div class="dayOfBirth">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="profile.dayOfBirth"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                      rule
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="profile.dayOfBirth"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="profile.dayOfBirth"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="menu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(profile.dayOfBirth)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </div>
              </td>
            </tr>
            <tr>
              <th>Age</th>
              <td class="accountChange_td">
                <div>
                  <span class="accountChange_Age">{{profile.age}}</span>
                  </div>
              </td>
            </tr>
            <tr>
              <th>Sex</th>
              <td class="accountChange_td">
                <div>
                  <v-select
                    class="sexes"
                    :items="sexes"
                    v-model="profile.sex"
                    item-text="name"
                    item-value="value">
                  </v-select>
                </div>
              </td>
            </tr>
            <tr>
              <th>Job</th>
              <td class="accountChange_td">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="job"
                  rules="required"
                  slim
                >
                  <v-text-field
                    v-model="profile.job"
                    placeholder="Job name"
                    :error-messages="errors"
                    maxlength="64"
                  ></v-text-field>
                </ValidationProvider>
              </td>
            </tr>
            <tr>
              <th>Avatar</th>
              <td class="accountChange_td">
                <div>
                  <input type="file" accept="image/*" @change="onChange" />
                  <img :src="profile.avatar" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="accountChange_btn_container">
          <v-btn
            depressed
            rounded
            width="100"
            color="secondary"
            class="accountChange_btn"
            :disabled="invalid"
            @click="editProfile"
          >変 更</v-btn>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
  import moment from 'moment'
  import { mapActions, mapGetters }  from 'vuex'
  import authService from '@/services/auth.service'
  import { errorMessage } from '@/globals/errorMessage'

  export default {
    name: 'Profile',

    computed: {
      ...mapGetters({
        profilesData: 'profiles/getData'
      })
    },

    data: () => {
      return {
        authService: new authService(),
        sexes: [
          { name: 'male', value: 1 },
          { name: 'female', value: 0}
        ],
        profile: {},
        menu: false
      }
    },

    methods: {
      formatDate (val, formatInput = 'YYYYMMDD', formatOutput = 'YYYY-MM-DD') {
        return moment(val, formatInput).format(formatOutput)
      },
      calAge () {
        let newAge = (new Date().getFullYear()) - (new Date(this.profile.dayOfBirth).getFullYear())
        if(newAge < 1) {
          alert(errorMessage.ERROR_BIRTHDAY)
        } else {
          return this.profile.age = newAge
        }
      },
      convertFileToBase64 (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = (error) => reject(error)
        })
      },
      onChange(e) {
        const file = e.target.files[0]
        this.image = file
        this.convertFileToBase64(file).then(
          (response) => {
            this.profile.avatar = response
          }
        )
      },
      editProfile () {
        const params = {
          lastName: this.profile.lastName,
          firstName: this.profile.firstName,
          dayOfBirth: this.formatDate(this.profile.dayOfBirth, 'YYYY-MM-DD', 'YYYYMMDD'),
          age: this.profile.age,
          sex: this.profile.sex,
          job: this.profile.job,
          avatar: this.profile.avatar
        }
        this.authService.putEditProfile(params).then(
          (res) => {
            this.authService.getProfile()
            return res
          }
        )
      },
      ...mapActions('profiles', ['changeProfileData'])
    },

    mounted () {
      this.authService.getProfile()
    },

    watch: {
      'profile.dayOfBirth': {
        immediate: true,
        handler: function () {
          this.calAge ()
        }
      },
      profilesData: {
        immediate: true,
        handler: function (newValue) {
          this.profile = JSON.parse(JSON.stringify(newValue))
       }
      }
    }
  }
</script>

<style lang="scss">
  .accountChange {
    &_btn_container,
    &_table {
      max-width: 680px;
      padding: 30px;
      margin: 40px auto 60px;
      box-shadow: 0 0 1px #000000;
    }
    &_btn_container {
      box-shadow: none;
      text-align: center;
    }
    th {
      min-width: 150px;
      width: 150px;
    }
    &_td {
      max-width: 464px;
    }
  }
</style>