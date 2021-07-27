<template>
  <div ref="" class="stage-wrap">
    <loading-screen id="loading-screen" />
    <div :class="background" class="background-image"></div>
    <div ref="dropdownMenu" class="menu-section">
      <button class="btn btn--borded rounded" @click.prevent="toogleMenu">
        <div
          class="hamburger hamburger--squeeze"
          :class="{ 'is-active': isVisibleMenu }"
        >
          <div class="hamburger-box">
            <div class="hamburger-inner"></div>
          </div>
        </div>
      </button>
      <transition
        enter-active-class="transition-in-b-r"
        leave-active-class="transition-out-t-l"
      >
        <div v-if="isVisibleMenu" class="menu-expand">
          <div class="menu-title">Menu</div>
          <div class="menu-item" @click="openInitialPage">
            <div class="icon">@</div>
            <div class="label">Início</div>
          </div>
          <div class="menu-item" @click="toogleFullScreen">
            <div class="icon">@</div>
            <div class="label">Tela cheia</div>
          </div>
          <div class="menu-item" @click="openCreditos">
            <div class="icon">@</div>
            <div class="label">Créditos</div>
          </div>
          <div class="menu-item">
            <div class="icon">@</div>
            <div class="label">Compartilhar</div>
          </div>
          <span class="link-share"></span>
        </div>
      </transition>
    </div>
    <nuxt id="stage-container" class="stage-container" />
    <transition
      enter-active-class="initial-enter"
      leave-active-class="initial-leave"
    >
      <InitialPage
        v-if="showInitialPage"
        @close="closeInitialPage"
      ></InitialPage>
    </transition>
    <PopUpCreditos
      v-if="isVisibleCreditos"
      :is-showed="isVisibleCreditos"
      @close="closeCreditos"
    ></PopUpCreditos>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisibleMenu: false,
      isFullScreen: false,
      isVisibleCreditos: false
    }
  },
  computed: {
    background() {
      return this.$store.state.currentBackground || 'bg-menu'
    },
    showInitialPage() {
      return this.$store.state.initialPageState
    },
    linkShare() {
      return window.location.href
    }
  },
  mounted() {
    document.addEventListener('click', this.documentClick)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.documentClick())
  },
  methods: {
    closeMenu() {
      this.isVisibleMenu = false
    },
    toogleMenu() {
      this.isVisibleMenu = !this.isVisibleMenu
    },
    documentClick(e) {
      const el = this.$refs.dropdownMenu
      const target = e.target
      if (el !== target && !el.contains(target)) {
        this.closeMenu()
      }
    },
    toogleFullScreen() {
      if (this.isFullScreen) this.closeFullscreen()
      else this.openFullscreen()
    },
    openCreditos() {
      this.isVisibleMenu = false
      this.isVisibleCreditos = true
    },
    closeCreditos() {
      this.isVisibleCreditos = false
    },
    openFullscreen() {
      const elem = document.documentElement
      this.isFullScreen = true
      this.isVisibleMenu = false
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen()
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen()
      }
    },
    closeFullscreen() {
      if (document.exitFullscreen) {
        this.isFullScreen = false
        this.isVisibleMenu = false
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    },
    closeInitialPage() {
      this.$store.commit('changeInitialPageState', false)
    },
    openInitialPage() {
      this.isVisibleMenu = false
      this.$store.commit('changeInitialPageState', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.stage-wrap {
  @include flex-center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
#loading-screen {
  position: absolute;
  width: $canvas-width;
  height: $canvas-height;
  @include flex-center;
}
.stage-container {
  @include flex-center;
  position: relative;
  width: $canvas-width;
  height: $canvas-height;
}
.background-image {
  width: $canvas-width;
  height: $canvas-height;
  position: absolute;
}
.not-ready {
  display: none !important;
}
.menu-section {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  font-weight: bold;

  .menu-expand {
    position: absolute;
    top: 0px;
    left: 60px;
    min-width: 250px;
    min-height: 340px;
    background-color: white;
    border: 3px solid $btn-border;
    border-radius: 0 $b-radius $b-radius $b-radius;
    padding: $gap * 2;

    .menu-title {
      height: 45px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding: 0 $gap;
    }

    .menu-item {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 $gap;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      cursor: pointer;
      .icon {
        margin-right: $gap * 2;
      }
    }
  }
}
</style>
