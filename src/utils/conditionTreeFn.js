
/**
   * fieldName 子集的字段名
   * pid 父ID
   * result {Array}
   */
export function listConvertTree (list, pid, fieldName) { // 生成树结构
  const result = []
  let temp = []
  for (let i = 0; i < list.length; i++) {
    if (list[i].parentId === pid) {
      const obj = { ...list[i] }
      temp = listConvertTree(list, list[i].id, fieldName)
      if (temp.length > 0) {
        obj[fieldName] = temp
      }
      result.push(obj)
    }
  }
  return result
}
export function TreeConvertList (tree, pId, fieldName) { // 生成扁平数组
  const temp = [] // 设置临时数组，用来存放队列
  const result = [] // 设置输出数组，用来存放要输出的一维数组
  temp.push(tree)
  // 首先把根元素存放入out中
  let pid = pId
  const obj = deepCopy(tree)
  obj.parentId = pid
  delete obj[fieldName]
  result.push(obj)
  // 对树对象进行广度优先的遍历
  while (temp.length > 0) {
    const first = temp.shift()
    const children = first[fieldName]
    if (children && children.length > 0) {
      pid = first.id
      const len = first[fieldName].length
      for (let i = 0; i < len; i++) {
        temp.push(children[i])
        const obj = deepCopy(children[i])
        obj.parentId = pid
        delete obj[fieldName]
        result.push(obj)
      }
    }
  }
  return result
}
// 深拷贝
function deepCopy (obj) {
  // 深度复制数组
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    const object = []
    for (let i = 0; i < obj.length; i++) {
      object.push(deepCopy(obj[i]))
    }
    return object
  }
  // 深度复制对象
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    const object = {}
    for (const p in obj) {
      object[p] = obj[p]
    }
    return object
  }
}
