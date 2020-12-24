<template>
  <div class="app-wrapper">
    <div class="details-container">
      <router-view :key="key" />
    </div>
  </div>
</template>

<script>
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'DetailsLayout',
  components: {},
  computed: {
    key () {
      return this.$route.path
    }
  },
  mixins: [ResizeMixin],
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.details-container {
  // padding-top: $headerHeight;
  min-height: 100vh;
  position: relative;
}
</style>
