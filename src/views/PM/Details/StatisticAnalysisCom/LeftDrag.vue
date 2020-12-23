<template>
  <div class="left-drag">
    <div class="search">
      <el-input size="small"
                v-model="input"
                placeholder="搜索变量">
        <i class="el-input__icon el-icon-search"
           slot="suffix">
          <!-- @click="handleIconClick(index)" -->
        </i>
      </el-input>
    </div>
    <div class="variable-lists">
      <p>共<span class="totle">200</span>个样本</p>
      <div class="list-title"><span>变量列表</span><span>填充率(%)</span></div>
      <el-scrollbar style="height: 100%"
                    ref="scroll">
        <div class="lists">
          <draggable :group="{ name: 'variable', pull: 'clone', put: false}"
                     v-model="list"
                     :clone="cloneElement">
            <transition-group type="transition">
              <div class="item"
                   v-for="(item,index) in list"
                   :key="index">
                <div class="button pointer"><i class="iconfont icon-tuodong"></i><span>{{item.name}}</span></div>
                <span>{{item.value}}</span>
              </div>
            </transition-group>
          </draggable>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
// 导入draggable组件
import draggable from 'vuedraggable'
export default {
  name: 'LeftDrag',
  components: { draggable },
  data () {
    return {
      input: '',
      list: [
        {
          name: 'Gendersds',
          value: '100.0'
        },
        {
          name: 'Gendersds',
          value: '100.0'
        }, {
          name: 'Gendersds',
          value: '100.0'
        }, {
          name: 'Gendersds',
          value: '100.0'
        }, {
          name: 'Gendersds',
          value: '100.0'
        }, {
          name: 'Gendersds',
          value: '100.0'
        }, {
          name: 'Gendersds',
          value: '100.0'
        }, {
          name: 'Gendersds',
          value: '100.0'
        }, {
          name: 'Gendersds',
          value: '100.0'
        }, {
          name: 'Gendersds',
          value: '100.0'
        }, {
          name: 'Gendersds',
          value: '100.0'
        }, {
          name: 'Gendersds',
          value: '100.0'
        }, {
          name: 'Gendersds',
          value: '100.0'
        }, {
          name: 'Gendersds',
          value: '100.0'
        }
      ]
    }
  },
  methods: {
    cloneElement (clone) {
      console.log(clone)
      return {
        name: clone.name,
        itemName: clone.value
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.left-drag {
  background: #ffffff;
  .search {
    padding: 8px 20px;
    border-bottom: 1px solid #e6e6e6;
  }
  .variable-lists {
    padding: 10px 20px;
    .totle {
      margin: 0 5px;
      color: #0070f4;
    }
    .list-title {
      display: flex;
      justify-content: space-between;
      color: #999999;
      margin: 10px 0 0;
    }
    .lists {
      .item {
        display: flex;
        justify-content: space-between;
        line-height: 35px;
        margin: 10px 0;
        .button {
          border: 1px dashed #e6e6e6;
          width: 155px;
          overflow: hidden;
          padding: 0 5px;
          margin-right: 10px;
          .iconfont {
            color: #0070f4;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
.ghost {
  opacity:0;
  height:0;
  }
// }
</style>
