<template>
  <div :class="classObj"
       class="app-wrapper">

    <div v-if="device === 'mobile' && sidebar.opened"
         class="drawer-bg"
         @click="handleClickOutside" />

    <sidebar class="sidebar-container" />

    <div class="main-container">
      <!-- header -->
      <!-- <div class="app-header"
         :style="{left: sidebar.opened ? '210px' : '65px',width: sidebar.opened ? 'calc(100% - 210px)' : 'calc(100% - 65px)'}">
        <app-header>header</app-header>
      </div> -->

      <app-main />

      <right-panel v-show="showSettings">
        <settings />
      </right-panel>

    </div>

  </div>
</template>

<script>

import RightPanel from '@/components/RightPanel'
import { Settings, AppMain, Sidebar } from './components' // AppHeader
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'BasicLayout',
  components: {
    Sidebar,
    AppMain,
    // AppHeader,
    RightPanel,
    Settings
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.app.showSettings
    }),
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted () {

  },
  methods: {

    handleClickOutside () {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
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
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
