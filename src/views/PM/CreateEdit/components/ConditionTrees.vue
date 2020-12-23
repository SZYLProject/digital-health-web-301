<!-- 条件树 -->
<template>
  <div class="condition-trees">
    此地引入条件树
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { } from '@/api/projectsMangement'
export default {
  name: 'ConditionTrees',
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
.condition-trees{}
</style>
<style lang="scss">
.condition-trees{}
</style>
