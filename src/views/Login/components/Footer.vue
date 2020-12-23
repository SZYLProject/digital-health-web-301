<template>
  <div>
    <!-- <span class="links">
      <a>
        帮助
      </a>
      <a>
        隐私
      </a>
      <a>
        条款
      </a>
    </span> -->
    <div class="copyright">Copyright 2020-2022 www.dchealth.com All Rights Reserved. 版权所有： {{copyright}}</div>
  </div>
</template>
<script>
import logo from '@/assets/logo.png'
import { mapGetters } from 'vuex'

export default {
  name: 'LoginHeader',
  computed: {
    ...mapGetters(['copyright'])
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
.links {
  margin-right: 20px;
  a {
    transition: all 0.3s;

    &:not(:last-child) {
      margin-right: 20px;
    }

    &:hover {
      // color: @text-color;
    }
  }
}
.copyright {
  margin-top: 10px;
}
</style>
