<template>
  <div>
    <template v-if="!item.children || item.children.length===0">
      <app-link :to="item.menuUrl">
        <el-menu-item :index="resolvePath(item.menuUrl)">
          <item :icon="toIcon(item.menuUrl)"
                :hiddenIcon="noIcon"
                :title="item.menuName" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else
                ref="subMenu"
                :index="resolvePath(item.menuUrl)"
                popper-append-to-body>
      <template slot="title">
        <item :icon="toIcon(item.menuUrl)"
              :title="item.menuName" />
      </template>
      <sidebar-item v-for="child in item.children"
                    :key="child.pkId"
                    :no-icon="true"
                    :item="child"
                    :base-path="resolvePath(child.menuUrl)"
                    class="nest-menu" />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
    toIcon (routePath) { // knowledgeLibrary
      const two = routePath.indexOf('/', routePath.indexOf('/') + 1)
      const twoStr = two !== -1 ? two : routePath.length
      const str = routePath.substring(routePath.indexOf('/') + 1, twoStr)
      // console.log(str)
      // if (str === 'specialDisease' || str === 'PM') {
      //   str = 'home'
      // }
      return str
    }
  }
}
</script>
