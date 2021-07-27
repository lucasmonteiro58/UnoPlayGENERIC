export const state = () => ({
  currentBackground: null,
  initialPageState: true,
  soundState: true
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
  }
}
