const relationList = [{
  id: 1,
  name: '数字',
  option: ['>', '<', '>=', '<=', '等于', '区间内', '区间外'],
  value: 'input'
},
{
  id: 2,
  name: '字符串',
  option: ['等于', '包含'],
  value: 'input'
},
{
  id: 3,
  name: '时间',
  option: ['>', '<', '>=', '<=', '等于', '区间内', '区间外'],
  value: 'date'
},
{
  id: 4,
  name: '选项',
  option: ['等于'],
  value: 'select'
},
{
  id: 5,
  name: '文本',
  option: ['包含'],
  value: 'input'
},
{
  id: 6,
  name: '布尔',
  option: ['等于'],
  value: 'radio'
}
]
export function getOption (id) {
  let option = []
  relationList.map(item => {
    if (id === item.id) { option = item.option }
  })
  return option || []
}
export function getFormType (id) {
  let type
  relationList.map(item => {
    if (id === item.id) { type = item.value }
  })
  return type
}
