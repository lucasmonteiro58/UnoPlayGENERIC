<template>
  <div v-show="showed" class="pop-up">
    <div class="backdrop" @click="close"></div>
    <div class="content">
      <button class="btn btn--icon" @click="close">
        <BootstrapIcon icon="x-lg" size="2x" class="trans9" />
      </button>
      <div class="icon-rotation-pp"></div>
      <div class="content-text">
        Ative a “rotação automática” e posicione seu celular na horizontal para
        visualizar melhor o conteúdo.
      </div>
      <button class="btn btn--primary size-b" @click="close">
        Entendi
      </button>
    </div>
  </div>
</template>

<script>
import { fadeOut, scaleIn } from '../assets/animate'
export default {
  name: 'PopUpOrientation',
  props: {
    isShowed: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      showed: false
    }
  },
  watch: {
    isShowed(val, old) {
      if (!old && val) {
        this.showed = true
        this.showAnimation()
      } else if (old && !val) {
        this.showed = false
      }
    }
  },
  mounted() {
    if (this.isShowed) this.showed = true
    this.showAnimation()
  },
  beforeDestroy() {
    fadeOut(this.$el)
  },
  methods: {
    showAnimation() {
      scaleIn(this.$el.lastChild)
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.pop-up {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;

  .backdrop {
    position: absolute;
    background-color: #00000070;
    width: 100%;
    height: 100%;
  }

  .content {
    max-width: 800px;
    min-height: 600px;
    background-color: white;
    border-radius: $b-radius;
    padding: $gap * 3;
    padding-top: $gap * 6;
    position: relative;
    @include flex-center;
    flex-direction: column;
    .btn--icon {
      position: absolute;
      top: 42px;
      right: 42px;
    }

    .content-text {
      font-size: 1.5rem;
      max-width: 350px;
      text-align: center;
      margin: $gap * 2 0;
    }

    .size-b {
      margin-top: 10px;
      width: 300px;
    }
  }
}
</style>
