<template>
  <el-popover placement="bottom"
              trigger="click"
              ref="messageDrop">
    <el-button :disabled="disabled"
               size="medium"
               slot="reference">{{title}}<i class="el-icon-caret-bottom el-icon--right"></i></el-button>

      <div class="popover-checkbox" >
        <el-input size="small"
                  placeholder="请输入内容"
                  prefix-icon="el-icon-search"
                  @input="conditionFilter"
                  v-model="input2">
        </el-input>
        <el-checkbox-group v-model="checkList"
          style="height:150px;"
          class="block">
          <el-scrollbar style="height:100%;" ref="scroll">
            <el-checkbox
              v-for="(item, index) in checkChild"
              :key="index"
              :label="item.id"
              >
              {{item.categoryName}}
            </el-checkbox>
          </el-scrollbar>
        </el-checkbox-group>
        <div class="popover-button">
          <el-button type="primary"
                    @click.native="confirmBtn"
                    size="small">确认</el-button>
          <el-button size="small"
                    type="primary"
                    plain
                    @click.native="cancel">取消</el-button>
        </div>
      </div>
  </el-popover>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { getListsAll, collectCommit } from '@/api/publicCom'
const PinyinMatch = require('pinyin-match') //
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    keys: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      input2: '',
      checkList: [],
      checkListDatas: [],
      checkChild: []
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'keyWordListsId'])
  },
  watch: {},
  created () {},
  mounted () {
    switch (this.keys) {
      case 'collection': // 获取收藏列表数据
        this.getListAll()
        break
      case '':
        break
    }
  },
  methods: {
    ...mapMutations(['caseSearch/keywordlists']),
    cancel () {
      this.$refs.messageDrop.doClose()
      this.checkList = []
    },
    // 确认提交
    confirmBtn () {
      if (this.checkList.length > 0) {
        switch (this.keys) {
          case 'collection': // 收藏确认提交接口
            this.postCollectCommit()
            break
          case '':
            break
        }
      } else {
        this.$message({
          message: '请先勾选收藏分类~',
          type: 'warning'
        })
      }
    },

    // 收藏列表接口
    getListAll () {
      getListsAll().then(res => {
        // console.log(res)
        if (res?.obj) {
          this.checkListDatas = res.obj
          this.checkChild = res.obj
        }
      }).catch(re => {})
    },

    // 收藏确认接口
    postCollectCommit () {
      const data = {
        personIds: this.keyWordListsId.toString() || '',
        categoryIds: this.checkList.toString() || '',
        userId: this.userInfo?.pkId ?? null
      }
      collectCommit(data).then(res => {
        this.$refs.messageDrop.doClose()
        this.checkList = []
        this.$message({
          message: '收藏成功！',
          type: 'success'
        })
      }).catch(er => {})
    },

    // 根据输入值过滤分类列表
    conditionFilter () {
      const newV = this.checkListDatas
      const newVal = newV.map(item => {
        const newItem = item.categoryName.search(this.input2) !== -1 ||
                        PinyinMatch.default.match(item.categoryName, this.input2)
        if (newItem) return item
      }).filter(item => item)
      this.checkChild = newVal
    }
  },
  destroyed () {
    this['caseSearch/keywordlists']([])
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
