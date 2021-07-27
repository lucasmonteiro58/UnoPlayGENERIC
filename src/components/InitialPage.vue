<template>
  <div v-show="showed" class="initial-page">
    <div class="background-image" :class="background"></div>
    <slot></slot>
    <button
      class="btn btn--primary btn-comecar"
      :style="positionButton"
      @click="clickButton"
    >
      {{ textButton }}

      <div class="btn-icon right">-></div>
    </button>
  </div>
</template>

<script>
import { fadeOut } from '../assets/animate'
export default {
  props: {
    textButton: {
      type: String,
      default: 'Comece Agora'
    },
    background: {
      type: String,
      default: 'default-background'
    },
    isShowed: {
      type: Boolean,
      default: true
    },
    bottomButton: {
      type: Number,
      default: 50
    },
    leftButton: {
      type: Number,
      default: 547
    }
  },
  data() {
    return {
      showed: false
    }
  },
  computed: {
    positionButton() {
      return {
        bottom: this.bottomButton + 'px',
        left: this.leftButton + 'px'
      }
    }
  },
  watch: {
    isShowed(val, old) {
      if (!old && val) {
        this.showed = true
        // this.showAnimation()
      } else if (old && !val) {
        this.showed = false
      }
    }
  },
  mounted() {
    if (this.isShowed) this.showed = true
    // this.showAnimation()
  },
  beforeDestroy() {
    fadeOut(this.$el)
  },
  methods: {
    showAnimation() {
      fadeOut(this.$el)
    },
    clickButton() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.initial-page {
  @include fill-canvas;
  z-index: 1;

  // .slot {
  //   @include fill-canvas;
  // }

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
  }

  .default-background {
    width: $canvas-width;
    height: $canvas-height;
    background-color: blueviolet;
  }

  .btn-comecar {
    position: absolute;
  }
}
</style>
