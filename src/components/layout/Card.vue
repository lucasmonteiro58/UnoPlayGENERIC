<template>
  <div class="card card--rounded">
    <div class="card-image">
      <div class="image"></div>
    </div>
    <div class="card-content">
      <div class="title">{{ title }}</div>
      <div class="text" v-html="text"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Usinas Hidréletricas'
    },
    text: {
      type: String,
      default:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam possimus, maxime architecto quam ipsum magnam distinctio non ipsam sunt eos. Eaque debitis, ut vitae dolores eius fugiat soluta dolorum officia.'
    }
  }
}
</script>

<style lang="scss">
.card--rounded {
  display: flex;
  justify-content: space-between;
  padding: $gap * 2;

  .card-image {
    @include flex-center;
    width: 350px;

    .image {
      width: 300px;
      height: 200px;
      background-color: red;
    }
  }

  .card-content {
    width: 380px;
    margin-top: 60px;
    .title {
      font-size: 1.4rem;
      font-weight: 900;
      margin-bottom: $gap;
    }
  }
}
</style>
