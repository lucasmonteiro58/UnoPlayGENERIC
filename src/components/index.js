import LoadingScreen from '@/components/LoadingScreen.vue'
import StepController from '@/components/layout/StepController.vue'
import InitialPage from '@/components/InitialPage.vue'
import PopUpCreditos from '@/components/layout/PopUpCreditos.vue'
import SteperLine from '@/components/SteperLine.vue'
import Card from '@/components/layout/Card.vue'
import CardAnimation from '@/components/layout/CardAnimation.vue'
import ImageFull from '@/components/layout/ImageFull.vue'
import ZoomImage from '@/components/ZoomImage.vue'

import PopUpOrientation from '@/components/PopUpOrientation.vue'

const Components = {
  install: (Vue) => {
    Vue.component('LoadingScreen', LoadingScreen)
    Vue.component('StepController', StepController)
    Vue.component('InitialPage', InitialPage)
    Vue.component('PopUpCreditos', PopUpCreditos)
    Vue.component('SteperLine', SteperLine)
    Vue.component('Card', Card)
    Vue.component('CardAnimation', CardAnimation)
    Vue.component('ZoomImage', ZoomImage)
    Vue.component('ImageFull', ImageFull)
    Vue.component('PopUpOrientation', PopUpOrientation)
  }
}

export default Components
