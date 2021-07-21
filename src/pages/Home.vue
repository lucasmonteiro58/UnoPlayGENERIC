<template>
  <section class="container">
    <!-- <InitialPage :is-showed="true"></InitialPage> -->
    <button class="btn btn--primary">
      Conferir Resposta
    </button>
    <StepController></StepController>
  </section>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.container {
  @include flex-center;
  flex-direction: column;
}
</style>
