<template>
  <div class="skinSettings">
    <div class="skin-con">
      <img :style="{'border-color':theme}"
           :src="getImg(theme)"
           width="180"
           alt="">
      <p>
        <!-- :src='"@/assets/skin/"+theme+".jpg"' -->
        <el-radio v-model="radio"
                  label="1">{{changeName(skinList,theme)}}</el-radio>
      </p>

    </div>
    <el-divider></el-divider>
    <div class="skin-con inlineBlock pointer"
         v-for="(item,index) in skinList"
         :key="index"
         @click="themeChange('#'+item.code)">
      <img :src="getImg(item.code)"
           width="180"
           alt="">
      <p>{{item.name}}</p>
    </div>
  </div>
</template>
<script>
import { updateSkin } from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  name: 'SkinSettings',
  computed: {
    ...mapGetters(['userInfo', 'theme'])
  },
  data () {
    return {
      radio: '1',
      skinList: [
        {
          name: '默认皮肤',
          code: '0070f4'
        },
        {
          name: '碧波万顷',
          code: '22D7BB'
        },
        {
          name: '紫气东来',
          code: '7076FA'
        },
        {
          name: '千岩竞秀',
          code: '484848'
        },
        {
          name: '郁郁葱葱',
          code: '66C060'
        },
        {
          name: '午后暖阳',
          code: 'FFBC21'
        },
        {
          name: '湖光山色',
          code: '2DBCFF'
        },
        {
          name: '青出于蓝',
          code: '4E8AF9'
        }
      ]
    }
  },
  methods: {
    getImg (theme) {
      console.log('theme:', theme)
      if (theme) {
        if (theme.indexOf('#') > -1) {
          theme = theme.replace('#', '')
        }
        return require('@/assets/skin/' + theme + '.jpg')
      } else {
        return require('@/assets/skin/0070f4.jpg')
      }
    },
    changeName (list, val) {
      console.log('val:', val)
      if (val) {
        if (val.indexOf('#') > -1) {
          val = val.replace('#', '')
        }
        const obj = list.filter((item) => item.code === val)[0]
        return obj.name
      } else {
        return '默认皮肤'
      }
    },
    themeChange (val) {
      this.loading = true
      const data = {
        userId: this.userInfo.pkId,
        skin: val
      }
      updateSkin(data)
        .then(res => {
          this.$store.dispatch('app/changeSetting', {
            key: 'theme',
            value: val
          })
        })
        .catch(() => {

        })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.skinSettings {
  padding-top: 20px;
  .skin-con {
    width: 200px;
    margin: 10px;
    text-align: center;
    img {
      border: 1px solid #fff;
    }
    p {
      margin-top: 10px;
      color: #2b2b2b;
    }
  }
}
</style>
