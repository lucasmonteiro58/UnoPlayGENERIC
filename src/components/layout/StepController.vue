<template>
  <div class="steps-section">
    <button
      class="btn btn--borded circle"
      :disabled="index === 0"
      @click="clickPrev"
    >
      <BootstrapIcon icon="arrow-left" size="2x" class="trans3" />
    </button>
    <div class="display" :style="displayStyle">
      {{ index + 1 }} / {{ contentLength }}
    </div>
    <button
      v-if="showConfirm"
      class="btn btn--borded circle green border-white"
      @click="clickNext"
    >
      <BootstrapIcon icon="check" size="2x" class="trans6 color-white" />
    </button>
    <button
      v-else
      class="btn btn--borded circle"
      :disabled="disableNext"
      @click="clickNext"
    >
      <BootstrapIcon icon="arrow-right" size="2x" class="trans3" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    contentLength: {
      type: Number,
      default: 3
    },
    textColor: {
      type: String,
      default: '#000'
    },
    disabledClose: {
      type: Boolean,
      default: true
    },
    enableClose: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      index: 0
    }
  },
  computed: {
    displayStyle() {
      return {
        color: this.textColor
      }
    },
    disableNext() {
      return this.disabledClose && this.index + 1 === this.contentLength
    },
    showConfirm() {
      return this.enableClose && this.index + 1 === this.contentLength
    }
  },
  methods: {
    clickPrev() {
      this.index--
      this.$emit('back', this.index)
    },
    clickNext() {
      if (this.index + 1 < this.contentLength) {
        this.index++
        this.$emit('next', this.index)
      } else {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.steps-section {
  display: flex;
  align-items: center;
  padding: $gap * 2;
  .display {
    min-width: 90px;
    text-align: center;
    letter-spacing: 0.1rem;
    font-size: 1.5rem;
  }
}
</style>
