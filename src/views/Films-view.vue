<template>
  <div>
    <select-card></select-card>
    <film-header class="stickyHeader"></film-header>
    <router-view :cityid="cityid"></router-view>
  </div>
</template>

<script>
import filmHeader from '@/components/FilmHeader.vue'
import selectCard from '@/components/SelectCard.vue'
export default {
  props: {
    cityid: {
      type: Number,
      default: 110100
    }
  },
  components: {
    filmHeader,
    selectCard
  }
}

</script>

<style lang="scss" scoped>
  $active-color:#FF5F16;
  .activeCard{
    color: #FF5F16;
  }
  div>h3{
    cursor: pointer;
  }
  .stickyHeader{
    background-color: white;
    position: fixed;
    width: 100%;
  }
</style>
