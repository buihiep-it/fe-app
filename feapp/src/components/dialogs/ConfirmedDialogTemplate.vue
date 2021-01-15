<template>
      <FocusLock class="confirmedDialog focusLock v-application v-application--is-ltr theme--light">
        <v-card class="confirmedDialog_card">
          <v-card-title v-if="dataDialog.title" class="confirmedDialog_title">
            <span>{{dataDialog.title}}</span>
          </v-card-title>
          <v-card-text class="confirmedDialog_text">
            <div v-html="dataDialog.content"></div>
          </v-card-text>
          <v-card-actions v-if="dataDialog.cancel || dataDialog.ok || dataDialog.close" class="confirmedDialog_actions">
            <v-btn
              v-if="dataDialog.cancel"
              outlined
              rounded
              large
              color="info"
              @click="clickBtnCancel"
            >{{dataDialog.textCancel}}</v-btn>
            <v-btn
              color="secondary"
              v-if="dataDialog.ok"
              depressed
              rounded
              large
              :loading="loading"
              @click="clickBtnOK"
            >{{dataDialog.textOK}}</v-btn>
            <v-btn
              v-if="dataDialog.close"
              outlined
              rounded
              large
              color="info"
              @click="clickBtnCancel"
            >閉じる</v-btn>
          </v-card-actions>
        </v-card>
        <v-btn icon class="dialog_closeIcon" @click="clickBtnCancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </FocusLock>
</template>

<script>
import DialogService from '@/services/dialog.service'
import Lock from 'vue-focus-lock/src/Lock.vue'

export default {
  name: 'ConfirmedDialogTemplate',

  components: {
    FocusLock: Lock
  },

  props: ['dataDialog'],

  data: () => ({
    dialogService: new DialogService(),
    loading: false
  }),

  mounted () {},

  methods: {
    clickBtnCancel () {
      this.dialogService.close('ConfirmedDialogTemplate')
      if (typeof this.dataDialog.eventReturnData === 'function') {
        this.dataDialog.eventReturnData(false)
      }
      this.$emit('close')
    },

    clickBtnOK () {
      if (typeof this.dataDialog.eventReturnData === 'function') {
        this.dataDialog.eventReturnData(true)
      }
      if (this.dataDialog.loading) {
        this.loading = true
      } else {
        this.dialogService.close('ConfirmedDialogTemplate')
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss">
.confirmedDialog {
  min-height: 345px;
  &_card{
    padding: 30px;
    min-height: 100%;
  }
  &_title.v-card__title {
    height: 64px;
    justify-content: center;
    padding: 0;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    border-bottom: none;
  }
  &_text.v-card__text {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 0;
  }
  &_actions.v-card__actions {
    padding: 20px 0;
    justify-content: center;
  }
}
</style>
