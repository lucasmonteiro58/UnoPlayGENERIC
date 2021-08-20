<template>
  <div v-show="showed" class="pop-up">
    <div class="backdrop" @click="hide"></div>
    <div class="content">
      <button class="btn btn--icon" @click="hide">
        <BootstrapIcon icon="x-lg" size="2x" class="trans9" />
      </button>
      <div class="box-objetivos">
        <div class="title-objetivos">{{ currentTitle }}</div>
        <div class="content-objetivos" v-html="currentContent"></div>
      </div>
      <StepController
        class="steps"
        :content-length="objetivos.length"
        enable-close
        @back="back"
        @next="next"
        @close="close"
      ></StepController>
    </div>
  </div>
</template>

<script>
import { objetivos } from '../../consts/objetivos'
import { fadeOut, fromTop } from '../../assets/animate'
export default {
  name: 'PopUpOpcoes',
  props: {
    isShowed: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      showed: false,
      objetivos,
      index: 0
    }
  },
  computed: {
    currentTitle() {
      return this.objetivos[this.index].title
    },
    currentContent() {
      return this.objetivos[this.index].content
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
      fromTop(this.$el.lastChild)
    },
    hide() {
      this.$emit('hide')
    },
    close() {
      this.$emit('close')
    },
    back() {
      this.index--
    },
    next() {
      this.index++
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
    width: 800px;
    min-height: 600px;
    background-color: white;
    border-radius: $b-radius;
    padding: $gap * 3;
    padding-top: $gap * 6;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    .btn--icon {
      position: absolute;
      top: 35px;
      right: 44px;
    }
    .box-objetivos {
      @include flex-center;
      flex-direction: column;
      width: 600px;
      height: 220px;
      padding-top: $gap * 2;
      text-align: center;

      .title-objetivos {
        @include font-neosans-black;
        text-align: center;
        margin-bottom: $gap;
        font-size: 2.25rem;
        font-weight: bold;
      }
      .content-objetivos {
        /deep/ p {
          font-size: 1.5rem;
          padding-bottom: $gap;
        }
      }
    }
    .steps {
      justify-content: center;
      position: absolute;
      bottom: 30px;
    }
  }
}
</style>
