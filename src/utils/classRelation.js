const v1 = [{
  id: 2,
  name: '首次'
}, {
  id: 3,
  name: '末次'
}, {
  id: 4,
  name: '所有次'
}, {
  id: 5,
  name: '计数'
}, {
  id: 6,
  name: '最大值'
}, {
  id: 7,
  name: '最小值'
}, {
  id: 8,
  name: '求和'
}, {
  id: 9,
  name: '平均值'
}]
const v2 = [{
  id: 2,
  name: '首次'
}, {
  id: 3,
  name: '末次'
}, {
  id: 4,
  name: '所有次'
}, {
  id: 5,
  name: '计数'
}]
export function getOption (id) {
  if (id === 1) { // 数字类型
    return v1
  } else { // 其它类型
    return v2
  }
}
export function getFormType (id) {

}
