<template>
  <div class="card-animation-section">
    <div v-for="(card, index) in cardContent" :key="index" class="c-cards">
      <transition :name="transition" mode="out-in">
        <Card
          v-if="index === cardIndex"
          :title="card.title"
          :text="card.text"
          class="card-position"
        ></Card>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardContent: {
      type: Array,
      default: () => []
    },
    cardIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      transition: 'fade-right'
    }
  },
  watch: {
    cardIndex(newValue, oldValue) {
      if (newValue > oldValue) this.transition = 'fade-right'
      else this.transition = 'fade-left'
    }
  }
}
</script>

<style lang="scss" scoped>
.c-cards {
  @include flex-center;
  position: relative;
  width: 800px;
  z-index: 1;
}

.card-position {
  position: absolute;
  // bottom: 10px;
}
</style>
