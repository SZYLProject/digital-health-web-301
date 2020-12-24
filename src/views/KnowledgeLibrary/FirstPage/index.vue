<!-- 首页 -->
<template>
  <div class="first-page">
    首页
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'FirstPage',
  components: {},
  computed: {
    ...mapGetters(['title'])
  },
  data () {
    return {

    }
  },
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    ...mapMutations([''])
  }
}
</script>

<style lang="scss" scoped>
.first-page {

}
</style>
<style lang="scss">
</style>
