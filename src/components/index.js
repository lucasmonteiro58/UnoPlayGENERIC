import LoadingScreen from '@/components/LoadingScreen.vue'
import StepController from '@/components/layout/StepController.vue'
import InitialPage from '@/components/InitialPage.vue'
import PopUpCreditos from '@/components/layout/PopUpCreditos.vue'
import SteperLine from '@/components/SteperLine.vue'

const Components = {
  install: (Vue) => {
    Vue.component('LoadingScreen', LoadingScreen)
    Vue.component('StepController', StepController)
    Vue.component('InitialPage', InitialPage)
    Vue.component('PopUpCreditos', PopUpCreditos)
    Vue.component('SteperLine', SteperLine)
  }
}

export default Components
