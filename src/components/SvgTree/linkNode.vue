<template>
  <div class="block"
       :style="{left:node.x+'px',top:node.y+'px'}">
    <div class="root"
         v-if="node.id==='root'">
      <el-button type="primary"
                 icon="el-icon-plus"
                 :disabled="disable"
                 @click="addTree(node.id)"
                 size="medium"
                 plain></el-button>
      <el-button v-if="node.children&&node.children.length>1&&condition==='and'"
                 type="primary"
                 @click="change('or')"
                 size="small">并</el-button>
      <el-button type="success"
                 @click="change('and')"
                 v-if="node.children&&node.children.length>1&&condition==='or'"
                 size="small">或</el-button>
    </div>

    <div v-else-if="!node.data.edit"
         class="con-text">
      <el-popover placement="top"
                  trigger="hover"
                  style="min-width:100px!important">
        <!-- 删除 -->
        <div>
          <el-button type="warning"
                     icon="el-icon-edit"
                     size="mini"
                     circle></el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     circle
                     size="mini"></el-button>
        </div>
        <!-- 标签信息 -->
        <span slot="reference"
              style="max-width:100px"
              class="ellipsis pointer">{{node.data.name}}</span>
      </el-popover>
      <div class="andOr"
           v-if="node.children&&node.children.length>1">
        <el-button type="primary"
                   @click="change('or')"
                   v-if="condition==='and'"
                   size="small">并</el-button>
        <el-button type="success"
                   @click="change('and')"
                   v-if="condition==='or'"
                   size="small">或</el-button>
      </div>
      <div class="addIcon">

        <i class="el-icon-circle-plus pointer"
           :style="{pointerEvents:disable?'none':'auto'}"
           :disabled="disable"
           @click="addTree(node.id)"></i>
      </div>

    </div>
    <div v-else
         class="tree-form-block">
      <el-select placeholder="请选择模块"
                 size="small"
                 v-model="select"
                 style="width:150px">
        <el-option label="姓名"
                   :value="'姓名'"></el-option>
        <el-option label="性别"
                   :value="'性别'"></el-option>
        <el-option label="年龄"
                   :value="'年龄'"></el-option>
      </el-select>
      <el-select placeholder="请选择数据项"
                 size="small"
                 v-model="select"
                 style="width:60px;margin:0 10px">
        <el-option label="并且"
                   :value="'数据'"></el-option>
        <el-option label="或者"
                   :value="'数据'"></el-option>
        <el-option label="排除"
                   :value="'数据'"></el-option>
      </el-select>
      <el-input v-model="select"
                size="small"
                style="width:180px;margin-right:20px"
                placeholder="请输入内容"></el-input>
      <el-button type="primary"
                 size="small"
                 @click="confirm(node.data)">确认</el-button>
      <el-button size="small"
                 @click="cancel(node.id)">取消</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'linkNode',
  props: {
    node: {
      type: Object
    },
    nodeWidth: {
      type: Number
    },
    nodeHeight: {
      type: Number
    }
  },
  computed: {
    ...mapGetters(['flattenData']),
    disable () {
      return this.flattenData.some(item => (item.edit === true))
    }
    // rootTransform () {
    //   return `transform:translate(${this.node.x}, ${this.node.y})`
    // }
  },
  data () {
    return {
      condition: 'and',
      select: '',
      show: false

    }
  },
  methods: {
    ...mapMutations(['conditionTree/FLATTEN_DATA']),
    addTree (pid) {
      var timestamp = new Date().getTime()
      const obj = {
        id: timestamp,
        name: '检查',
        parent: pid,
        edit: true,
        num: 0
      }
      this.flattenData.push(obj)
      this['conditionTree/FLATTEN_DATA'](this.flattenData)
    },
    confirm (data) {
      if (this.select) {
        data.name = this.select
      }

      data.edit = false
      this['conditionTree/FLATTEN_DATA'](this.flattenData)
      this.select = ''
    },
    cancel (id) {
      this.flattenData.splice(this.flattenData.findIndex(item => item.id === id), 1)
      this['conditionTree/FLATTEN_DATA'](this.flattenData)
    },
    change (val) {
      this.condition = val
    }

  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.block {
  position: absolute;
}
.root {
  &:before {
    content: "";
    position: absolute;
    top: 14px;
    left: -20px;
    width:20px;
    height: 100%;
    border-style: solid none none none;
    border-width: 2px;
    border-color: #e9f2fa;
  }
}
.tree-form-block {
  // position: absolute;
  text-align: left;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 8px 12px;
  width: 600px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 999;
}
.num {
  position: absolute;
  left: -50px;
  top: 0;
}
.con-text {
  border: 1px solid #ddd;
  background: #ffffff;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 8px 5px;
  color: #333333;

  .andOr {
    position: absolute;
    top: 5px;
    right: -55px;
    font-size: 18px;
    margin-left: 75px;
    color: #409eff;
    // &:before {
    //   content: "";
    //   position: absolute;
    //   top: 14px;
    //   right: 44px;
    //   width: 36px;
    //   height: 100%;
    //   border-style: solid none none none;
    //   border-width: 2px;
    //   border-color: #e9f2fa;
    // }
  }
  .addIcon {
    position: absolute;
    top: 33px;
    right: 0;
    font-size: 18px;
    // margin-left: 35px;
    color: #409eff;
    // &:before {
    //   content: "";
    //   position: absolute;
    //   top: -19px;
    //   right: -10px;
    //   width:20px;
    //   height: 100%;
    //   border-style: none none none solid;
    //   border-width: 2px;
    //   border-color: #e9f2fa;
    // }
  }
}
</style>
<style lang="scss">
.el-popover {
  min-width: auto;
}
</style>
