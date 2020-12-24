
<!-- 文献 -->
<template>
  <div class="literature">
    文献
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Literature',
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
.literature{

}
</style>
<style lang="scss">
</style>
