import Vue from 'vue'
import moment from 'moment'

// 2020-09-03T01:31:07.000+0000
Vue.filter('timeFormat', val => {
  return moment(val).format('YYYY-MM-DD')
})

// 时间戳转化
Vue.filter('timestamp', val => {
  return moment(parseInt(val)).format('YYYY/MM/DD')
  // return moment(parseInt(val)).format('YYYY/MM/DD hh:mm:ss')
})

// 2020-09-02T07:12:41.000Z
Vue.filter('timesTZ', val => {
  const addDateZero = (num) => {
    return (num < 10 ? '0' + num : num)
  }
  const d = new Date(val)
  // 返回年月日
  const formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate())
  // 返回年月日 时分秒
  // const formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds())
  return formatdatetime
})

Vue.filter('timesTZO', val => {
  const addDateZero = (num) => {
    return (num < 10 ? '0' + num : num)
  }
  const d = new Date(val)
  // 返回年月日
  // const formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate())
  // 返回年月日 时分秒
  const formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds())
  return formatdatetime
})
