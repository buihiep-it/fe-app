import ConfirmedDialogTemplate from '@/components/dialogs/ConfirmedDialogTemplate.vue'
import DialogTemplate from '@/components/dialogs/DialogTemplate.vue'
import store from '@/store'
import { Vue } from 'vue-property-decorator'
export default class DialogService {
  defaultOptions = {
    clickToClose: false,
    minHeight: 345,
    width: 800,
    adaptive: true,
    height: 'auto'
  }

  defaultDatas = {
    title: '',
    text: '',
    btnCloseOutside: true,
    isConfirmedDialogClose: false
  }

  defaultDatasComfirm = {
    title: '',
    content: '',
    cancel: true,
    ok: true,
    close: false,
    textCancel: 'キャンセル',
    textOK: 'O K',
    loading: false
  }

  show (nameComponent, data = {}, config = {}, event = null) {
    const arrDialog = store.getters['dialog/nameDialogs'] || []
    const index = arrDialog.findIndex(item => item === nameComponent.name)
    if (index > -1) {
      return null
    }
    arrDialog.push(nameComponent.name)
    store.dispatch('dialog/changeNameDialog', arrDialog)

    data.namecomponent = nameComponent
    data.eventReturnData = event
    const options = { ...this.defaultOptions, ...config, name: nameComponent.name, beforeClose: () => this.close(nameComponent.name) }
    const dataModals = { ...this.defaultDatas, ...data }
    if (dataModals.full) {
      document.getElementsByTagName('html')[0].classList.add('hasModal')
    }
    Vue.prototype.$modal.show(DialogTemplate,
      {
        dataDialog: dataModals
      },
      options
    )
  }

  showComfirmDialog (data = {}, config = {}, event = null) {
    const arrDialog = store.getters['dialog/nameDialogs'] || []
    const index = arrDialog.findIndex(item => item === 'ConfirmedDialogTemplate')
    if (index > -1) {
      return null
    }
    arrDialog.push('ConfirmedDialogTemplate')
    store.dispatch('dialog/changeNameDialog', arrDialog)

    data.eventReturnData = event
    config.width = 600
    const options = { ...this.defaultOptions, ...config, beforeClose: () => this.close('ConfirmedDialogTemplate') }
    const dataModals = { ...this.defaultDatasComfirm, ...data }
    options.name = 'ConfirmedDialogTemplate'
    Vue.prototype.$modal.show(ConfirmedDialogTemplate,
      {
        dataDialog: dataModals
      },
      options
    )
  }

  close (nameComponent) {
    const arrDialog = store.getters['dialog/nameDialogs'] || []
    const index = arrDialog.findIndex((item) => item === nameComponent)
    document.getElementsByTagName('html')[0].classList.remove('hasModal')
    if (index > -1) {
      Vue.prototype.$modal.hide(nameComponent)
      arrDialog.splice(index, 1)
      setTimeout(() => {
        store.dispatch('dialog/changeNameDialog', arrDialog)
      }, 200)
    }
  }

  addSnack (snack) {
    store.dispatch('dialog/addSnack', snack)
  }

  closeAll () {
    setTimeout(() => {
      const arrDialog = store.getters['dialog/nameDialogs'] || []
      console.log(arrDialog)
      for (const component of arrDialog) {
        Vue.prototype.$modal.hide(component)
        store.dispatch('dialog/changeNameDialog', [])
      }
    }, 300)
  }
}
