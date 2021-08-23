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
            <div class="icon">
              <BootstrapIcon icon="house" size="2x" class="trans4" />
            </div>
            <div class="label">Início</div>
          </div>
          <div class="menu-item" @click="toogleFullScreen">
            <div class="icon">
              <BootstrapIcon
                icon="arrows-fullscreen"
                size="2x"
                class="trans1"
              />
            </div>
            <div class="label">Tela cheia</div>
          </div>
          <div class="menu-item" @click="openCreditos">
            <div class="icon">
              <BootstrapIcon icon="people" size="2x" class="trans4" />
            </div>
            <div class="label">Créditos</div>
          </div>
          <div class="menu-item" @click="openShare">
            <div class="icon">
              <BootstrapIcon
                icon="box-arrow-up-right"
                size="2x"
                class="trans2"
              />
            </div>
            <div class="label">Compartilhar</div>
            <span
              v-if="isVisibleLinkShare"
              v-clipboard:copy="linkShare"
              class="link-share"
            >
              <BootstrapIcon icon="link-45deg" size="md" />
              <div class="link">{{ linkShare }}</div>
              <BootstrapIcon icon="files" size="md" class="trans2 align-self" />
            </span>
          </div>
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
    <ImageFull v-if="isVisibleImageFull"></ImageFull>
    <PopUpOrientation
      v-if="isPortrait && !showInitialPage"
      :is-showed="isPortrait && !showInitialPage"
      @close="closeOrientation"
    ></PopUpOrientation>
  </div>
</template>

<script>
import { MobileOrientation } from 'mobile-orientation'
export default {
  data() {
    return {
      isVisibleMenu: false,
      isFullScreen: false,
      isVisibleCreditos: false,
      isVisibleLinkShare: false,
      isPortrait: false,
      orientation: new MobileOrientation()
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
    },
    isVisibleImageFull() {
      return this.$store.state.imageFullOpen
    }
  },
  mounted() {
    this.orientation.on('resize', () => {
      this.changeOrientation()
    })
    document.addEventListener('click', this.documentClick)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.documentClick())
  },
  methods: {
    changeOrientation() {
      this.isPortrait = window.matchMedia('(orientation: portrait)').matches
    },
    closeOrientation() {
      this.isPortrait = false
      setTimeout(() => {
        this.isPortrait = window.matchMedia('(orientation: portrait)').matches
      }, 1500)
    },
    closeMenu() {
      this.isVisibleMenu = false
      this.isVisibleLinkShare = false
    },
    toogleMenu() {
      this.isVisibleMenu = !this.isVisibleMenu
    },
    openShare() {
      this.isVisibleLinkShare = !this.isVisibleLinkShare
    },
    copyLinkShare() {},
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
    left: 90px;
    min-width: 509px;
    min-height: 625px;
    background-color: white;
    border: 5px solid $btn-border;
    border-radius: 0 $b-radius $b-radius $b-radius;
    padding: $gap * 1.4;
    color: $text-color;
    font-size: 1.875rem;

    .menu-title {
      height: 90px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding: 0 $gap;
    }

    .menu-item {
      display: flex;
      align-items: center;
      height: 75px;
      padding: 0 $gap;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      cursor: pointer;

      position: relative;
      .icon {
        margin-right: $gap * 2;
      }

      .link-share {
        display: flex;
        align-items: center;
        font-size: 1.3rem;
        background-color: $grey-lite;
        padding: $gap $gap * 1.7;
        border-radius: $gap * 1.5;
        margin-top: 20px;
        position: absolute;
        top: 70px;
        width: 100%;
        margin-left: -$gap;

        .link {
          margin-left: 8px;
          color: #696969;
        }

        .align-self {
          margin-left: auto;
        }
      }
    }
  }
}
</style>
