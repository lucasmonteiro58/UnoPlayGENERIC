<template>
  <div class="image-full-container" @click="close">
    <div ref="imageIn" class="image" :class="imageFullSrc"></div>
  </div>
</template>

<script>
import { scaleIn } from '../../assets/animate'
export default {
  computed: {
    imageFullSrc() {
      return this.$store.state.imageFull
    },
    isVisibleImageFull() {
      return this.$store.state.imageFullOpen
    }
  },
  mounted() {
    this.showAnimation()
  },
  methods: {
    close() {
      this.$store.commit('closeImageFull')
    },
    showAnimation() {
      scaleIn(this.$refs.imageIn)
    }
  }
}
</script>

<style lang="scss" scoped>
.image-full-container {
  z-index: 100;
  @include fill-canvas;
  @include flex-center;
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
