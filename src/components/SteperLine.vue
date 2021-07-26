<template>
  <div class="steper-line-section">
    <button
      class="btn btn--primary fixed-width w170"
      :disabled="disabledPrev"
      @click="clickPrev"
    >
      <div class="btn-icon left">--</div>
      Anterior
    </button>
    <div class="line-section">
      <div class="image-section">
        <div
          v-for="(img, index) in images"
          :key="index"
          class="images-box"
          :class="{ actual: index + 1 === indexSteps }"
        >
          <div class="img"></div>
        </div>
      </div>
      <div class="line-box">
        <div
          v-for="(q, index) in qntSteps"
          :key="q"
          class="line-step"
          :class="{ completed: indexSteps > index }"
          :style="{
            backgroundColor: indexSteps > index ? color : colorHint
          }"
        ></div>
      </div>
    </div>
    <button
      v-if="isFinish"
      class="btn btn--primary fixed-width w170"
      @click="clickNext"
    >
      {{ finishMsg }}
    </button>
    <button v-else class="btn btn--primary fixed-width w170" @click="clickNext">
      Próximo
      <div class="btn-icon right">--</div>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => ['', '', '', '', '', '', '', '']
    },
    qntSteps: {
      type: Number,
      default: 8
    },
    color: {
      type: String,
      default: '#734200'
    },
    colorHint: {
      type: String,
      default: '#d5c6b1'
    },
    /** numero de steps do inicio */
    initialCompleted: {
      type: Number,
      default: 1
    },
    isLoop: {
      /** caso permita
       * voltar pro inicio */
      type: Boolean,
      default: false
    },
    canBack: {
      type: Boolean,
      default: true
    },
    finishMsg: {
      type: String,
      default: 'voltar ao início'
    }
  },
  data() {
    return {
      indexSteps: 0
    }
  },
  computed: {
    disabledPrev() {
      return this.indexSteps === this.initialCompleted && !this.canBack
    },
    isFinish() {
      return !this.isLoop && this.indexSteps === this.qntSteps
    }
  },
  mounted() {
    this.indexSteps = this.initialCompleted
  },
  methods: {
    clickNext() {
      if (this.indexSteps < this.qntSteps) {
        this.indexSteps++
        this.$emit('next', this.indexSteps)
      } else if (this.isLoop) {
        this.indexSteps = this.initialCompleted
        this.$emit('next', this.indexSteps)
      } else this.$emit('finish')
    },
    clickPrev() {
      if (this.indexSteps > this.initialCompleted) {
        this.indexSteps--
        this.$emit('back', this.indexSteps)
      } else this.$emit('start')
    }
  }
}
</script>

<style lang="scss" scoped>
.steper-line-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 $padding-canvas;
  width: 100%;

  .btn--primary {
    height: 54px;
  }
}
.line-section {
  @include flex-center;
  flex-direction: column;
  .line-box {
    @include flex-center;
    .line-step {
      width: 80px;
      height: 40px;
      // background-color: #ffd527;
      border: 6px solid white;
      border-right: none;
    }
    :last-child {
      border-radius: 0 50% 50% 0;
      border-right: 6px solid white;
      width: 50px;
    }
    :first-child {
      border-radius: 50% 0 0 50%;
      width: 50px;
    }
  }

  .image-section {
    display: flex;
    width: 580px;
    justify-content: space-between;
    margin-bottom: $gap * 2;
    .images-box {
      width: 50px;
      height: 50px;
      background-color: red;
      opacity: 0.5;
      @include flex-center;
      &.actual {
        opacity: 1;
      }
    }
  }
}
</style>
