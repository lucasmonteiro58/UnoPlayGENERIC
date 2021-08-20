export const state = () => ({
  currentBackground: null,
  initialPageState: true,
  soundState: true,
  imageFull: '',
  imageFullOpen: false
})

export const mutations = {
  changeBackground(state, newBackground) {
    state.currentBackground = newBackground
  },
  changeSoundState(state, newSound) {
    state.soundState = newSound
  },
  changeInitialPageState(state, newState) {
    state.initialPageState = newState
  },
  openImageFull(state, newState) {
    state.imageFull = newState
    state.imageFullOpen = true
  },
  closeImageFull(state, newState) {
    state.imageFullOpen = false
  }
}
