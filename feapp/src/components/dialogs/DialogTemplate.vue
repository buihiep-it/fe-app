<template>
  <FocusLock
    :disabled="noFocusLock"
    class="focusLock v-application v-application--is-ltr theme--light"
    :class="{'focusLock-full' : dataDialog.full}"
  >
    <!-- {{dataDialog.props}} -->
    <v-card v-if="!dataDialog.full">
      <v-card-title v-if="dataDialog.title">
        <span class="dialog_title">{{dataDialog.title}}</span>
      </v-card-title>
      <v-card-text>
        <component
          v-bind:is="!dataDialog.text && dataDialog.namecomponent"
          v-bind:props="dataDialog.props"
          v-on:close="close"
        ></component>
      </v-card-text>
    </v-card>
    <component
      v-if="!dataDialog.text && dataDialog.full"
      v-bind:is="dataDialog.namecomponent"
      v-bind:props="dataDialog.props"
      v-on:close="close"
    ></component>
    <v-btn icon class="dialog_closeIcon" @click="closeDialog">
      <span class="icon icon-close" v-if="dataDialog.btnCloseOutside"></span>
    </v-btn>
  </FocusLock>
</template>
<script>
import DialogService from '@/services/dialog.service'
import { mapGetters } from 'vuex'
const Lock = require('vue-focus-lock').default

export default {
  name: 'DialogTemplate',
  components: {
    FocusLock: Lock
  },
  props: ['dataDialog', 'full'],
  data: () => ({
    dialogService: new DialogService(),
    noFocusLock: false,
    dialogNames: undefined
  }),
  computed: {
    ...mapGetters('dialog', {
      dialog: 'nameDialogs'
    })
  },
  mounted () {},
  watch: {
    dialog: [
      {
        handler: 'isNameDialogsChange',
        immediate: true,
        deep: true
      }
    ]
  },
  methods: {
    isNameDialogsChange (newValue) {
      if (
        this.dataDialog.namecomponent.name !== newValue[newValue.length - 1]
      ) {
        this.noFocusLock = true
      } else {
        this.noFocusLock = false
      }
    },
    close (data) {
      this.dialogService.close(this.dataDialog.namecomponent.name)
      if (typeof this.dataDialog.eventReturnData === 'function') {
        this.dataDialog.eventReturnData(data)
      }
      this.$emit('close')
    },
    closeDialog () {
      if (this.dataDialog.isConfirmedDialogClose) {
        this.noFocusLock = true
        this.dialogService.showComfirmDialog(
          {
            title: 'Confirmation',
            content:
              'Is it okay if I click the OK button and the entered content is discarded?',
            cancel: true,
            ok: true
          },
          {
            classes: ['v--modal', 'ComfirmDialog']
          },
          payload => {
            if (payload) {
              this.dialogService.close(this.dataDialog.namecomponent.name)
              if (typeof this.dataDialog.eventReturnData === 'function') {
                this.dataDialog.eventReturnData(null)
              }
              this.$emit('close')
            }
            setTimeout(() => {
              this.noFocusLock = false
            })
          }
        )
      } else {
        this.dialogService.close(this.dataDialog.namecomponent.name)
        if (typeof this.dataDialog.eventReturnData === 'function') {
          this.dataDialog.eventReturnData(null)
        }
        this.$emit('close')
      }
    }
  }
}
</script>
