<template>
  <div v-show="showed" class="pop-up">
    <div class="backdrop" @click="close"></div>
    <div class="content">
      <button class="btn btn--icon" @click="close">x</button>
      <div class="title-popup">Créditos</div>
      <div class="infos">
        <span v-for="(c, i) in aplicationCredits" :key="i" v-html="c"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { aplicationCredits } from '../../consts/credits'
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
      aplicationCredits
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
    min-width: 500px;
    min-height: 400px;
    background-color: white;
    border-radius: $b-radius;
    padding: $gap * 3;
    padding-top: $gap * 6;
    position: relative;
    .title-popup {
      font-size: 1.4rem;
      font-weight: bold;
      margin-bottom: $gap * 2;
    }
    .btn--icon {
      position: absolute;
      top: 25px;
      right: 25px;
    }
    .infos {
      width: 100%;
      height: 300px;
      overflow-y: auto;
      /deep/ p {
        padding: $gap 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        i {
          width: 200px;
        }
      }
    }
  }
}
</style>
