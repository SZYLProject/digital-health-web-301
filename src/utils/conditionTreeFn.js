
/**
   * fieldName 子集的字段名
   * pid 父ID
   */
export function listConvertTree (list, pid, fieldName) { // 生成树结构
  const result = []
  let temp = []
  for (let i = 0; i < list.length; i++) {
    if (list[i].parentId === pid) {
      const obj = { ...list[i] }
      temp = this.convertToTreeData(list, list[i].id, fieldName)
      if (temp.length > 0) {
        obj[fieldName] = temp
      }
      result.push(obj)
    }
  }
  return result
}
