<template>
  <div class="steper-line-section">
    <button class="btn btn--primary">
      <div class="btn-icon left">--</div>
      Anterior
    </button>
    <div class="line-section">
      <div class="image-section"></div>
      <div class="line-box">
        <div
          v-for="(q, index) in qntSteps"
          :key="q"
          class="line-step"
          :class="{ completed: initialCompleted > index }"
          :style="{
            backgroundColor: initialCompleted > index ? color : colorHint
          }"
        ></div>
      </div>
    </div>
    <button class="btn btn--primary">
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
      default: () => []
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
    initialCompleted: {
      type: Number,
      default: 1
    }
  },
  computed() {}
}
</script>

<style lang="scss" scoped>
.steper-line-section {
  display: flex;
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
}
</style>
