<template>
  <div class="header-wrapper">
    <div class="logo-container" >
      <img :src="logo"
           class="logo"
           alt />
      <span class="title">{{title}}</span>
    </div>
  </div>
</template>
<script>
import logo from '@/assets/logo.png'
import { mapGetters } from 'vuex'

export default {
  name: 'LoginHeader',
  computed: {
    ...mapGetters(['title'])
  },
  watch: {
    notifyStatus () {
      if (this.notifyStatus) {
        this.unread()
      }
    }
  },
  data () {
    return {
      logo,
      isDot: false,
      number: ''
      // dialogUpdateForm: false
    }
  },
  mounted () {
    // this.unread()
  },
  methods: {
    // unread () {
    //   unreadMsg().then(response => {
    //     if (response.data > 0) {
    //       this.number = response.data
    //     } else {
    //       this.number = ''
    //     }
    //   })
    // },
    toMessage () {
      this.$router.push({ name: 'getMessage' })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped lang="scss">
.header-wrapper {
  padding: 0 10px;
  color: #ffffff;
  background: #247BCC;
  box-shadow: 0px 2px 3px 0px rgba(4,37,53,0.4);
}
.logo-container {
  padding: 13px 0;
  min-width: 400px;
  .logo {
    width: 30px;
    margin: 0 5px;
    vertical-align: middle;
    display: inline-block;
  }
  .title {
    vertical-align: middle;
    font-size: 18px;
    letter-spacing: 3px;
  }
}
</style>
