<template>
  <div class="image-zoom-container" @click="openImageFull">
    <BootstrapIcon icon="arrows-fullscreen" size="2x" class="trans1" />
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: ''
    }
  },
  methods: {
    openImageFull() {
      this.$store.commit('openImageFull', this.image)
    }
  }
}
</script>

<style lang="scss" scoped>
.trans1 {
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(1.2);
  }
}
</style>
