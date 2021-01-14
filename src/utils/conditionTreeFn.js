
/**
   * root 根结点名称
   * fieldName 子集的字段名
   */
export function generateOptions (params, fieldName, root) { // 生成Cascader级联数据
  var result = []
  for (const param of params.filter(e => e.id !== root)) {
    if (param.parentId === root) { // 判断是否为顶层节点
      var parent = { // 转换成el-Cascader可以识别的数据结构
        ...param
      }
      parent[fieldName] = getchilds(param.id, params)// 获取子节点
      result.push(parent)
    }
  }
  return result
}

function getchilds (id, array) {
  const childs = []
  for (const arr of array) { // 循环获取子节点
    if (arr.parentId === id) {
      childs.push({
        ...arr
      })
    }
  }
  for (const child of childs) { // 获取子节点的子节点
    const childscopy = this.getchilds(child.value, array)// 递归获取子节点
    console.log(childscopy)
    if (childscopy.length > 0) {
      child.children = childscopy
    }
  }
  return childs
}
