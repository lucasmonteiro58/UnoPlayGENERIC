<template>
  <div class="steper-line-section">
    <button
      class="btn btn--primary fixed-width w375"
      :disabled="disabledPrev"
      @click="clickPrev"
    >
      <div class="btn-icon left">
        <BootstrapIcon icon="arrow-left" size="2x" class="trans4" />
      </div>
      Anterior
    </button>
    <div class="line-section">
      <div class="image-section">
        <div
          v-for="(img, index) in images"
          :key="index"
          class="images-box"
          :class="{ actual: index + 1 === indexSteps }"
          @click="clickImage(index)"
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
      class="btn btn--primary fixed-width w375"
      @click="clickNext"
    >
      {{ finishMsg }}
    </button>
    <button v-else class="btn btn--primary fixed-width w375" @click="clickNext">
      Próximo
      <div class="btn-icon right">
        <BootstrapIcon icon="arrow-right" size="2x" class="trans4" />
      </div>
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
        this.$emit('next', this.indexSteps - 1)
      } else if (this.isLoop) {
        this.indexSteps = this.initialCompleted
        this.$emit('next', this.indexSteps - 1)
      } else this.$emit('finish')
    },
    clickPrev() {
      if (this.indexSteps > this.initialCompleted) {
        this.indexSteps--
        this.$emit('back', this.indexSteps - 1)
      } else this.$emit('start')
    },
    clickImage(i) {
      this.indexSteps = i + 1
      this.$emit('changed', i)
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
    height: 100px;
  }
}
.line-section {
  @include flex-center;
  flex-direction: column;
  .line-box {
    @include flex-center;
    .line-step {
      width: 120px;
      height: 60px;
      // background-color: #ffd527;
      border: 6px solid white;
      border-right: none;
      transition: 0.3s;
    }
    :last-child {
      border-radius: 0 30px 30px 0;
      border-right: 6px solid white;
      width: 100px;
    }
    :first-child {
      border-radius: 30px 0 0 30px;
      width: 100px;
    }
  }

  .image-section {
    display: flex;
    width: 865px; //alterar
    justify-content: space-between;
    margin-bottom: $gap * 2;
    .images-box {
      width: 50px;
      height: 50px;
      background-color: red;
      transition: 0.3s;
      opacity: 0.5;
      @include flex-center;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
      &.actual {
        opacity: 1;
      }
    }
  }
}
</style>
