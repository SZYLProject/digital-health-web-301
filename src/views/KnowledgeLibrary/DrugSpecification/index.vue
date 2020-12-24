<!-- 药品说明书  -->
<template>
  <div class="drug-specification">
    药品说明书
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'DrugSpecification',
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
.drug-specification {

}
</style>
<style lang="scss">
</style>
