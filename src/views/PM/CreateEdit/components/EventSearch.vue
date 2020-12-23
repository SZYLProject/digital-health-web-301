<!-- 事件搜索 -->
<template>
  <div class="event-search">
    此地引入事件搜索组件
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { } from '@/api/projectsMangement'
export default {
  name: 'EventSearch',
  data () {
    return {}
  },
  props: {},
  computed: {
    ...mapGetters(['theme', 'userInfo'])
  },
  watch: {

  },
  components: { },
  created () { },
  mounted () {},
  destroyed () {},
  methods: {
    ...mapMutations([''])
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.event-search{}
</style>
<style lang="scss">
.event-search{}
</style>
