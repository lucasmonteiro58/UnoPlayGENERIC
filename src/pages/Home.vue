<template>
  <section class="container">
    <!-- <InitialPage :is-showed="true"></InitialPage> -->
    <!-- <button class="btn btn--primary">
      Conferir Resposta
    </button> -->
    <!-- <StepController></StepController> -->
    <!-- <PopUpObjetivos :is-showed="true"></PopUpObjetivos> -->
    <CardAnimation
      :card-content="cards"
      :card-index="cardIndex"
    ></CardAnimation>
    <SteperLine class="steper" @next="nextClick" @back="backClick"></SteperLine>
  </section>
</template>
<script>
export default {
  data() {
    return {
      cards: [
        { title: 'Teste', text: 'aaaaaaaaaa', isVisible: true },
        { title: 'Teste', text: 'bbbbbbbbbbb', isVisible: false },
        { title: 'Teste', text: 'ccccccccccc', isVisible: false },
        { title: 'Teste', text: 'dddddddddd', isVisible: false },
        { title: 'Teste', text: 'eeeeeeeee', isVisible: false },
        { title: 'Teste', text: 'fffffffff', isVisible: false },
        { title: 'Teste', text: 'gggggggggg', isVisible: false },
        { title: 'Teste', text: 'hhhhhhhhhhh', isVisible: false }
      ],
      cardIndex: 0
    }
  },
  methods: {
    nextClick(i) {
      this.cardIndex = i
    },
    backClick(i) {
      this.cardIndex = i
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  @include flex-center;
  flex-direction: column;

  .steper {
    position: absolute;
    bottom: 40px;
  }
}
</style>
