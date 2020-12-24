<!-- 临床路径 -->
<template>
  <div class="clinical-pathway">
    临床路径
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ClinicalPathway',
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
.clinical-pathway {

}
</style>
<style lang="scss">
</style>
