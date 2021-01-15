
/**
   * fieldName 子集的字段名
   */
export function listConvertTree (list, fieldName) { // 生成树结构
  console.log(list)
  let result = null
  if (list && list.length) {
    result = {
      id: list[0].id,
      name: list[0].name,
      opt: list[0].opt,
      value: [],
      parentId: '',
      [fieldName]: []
    }
    const group = {}
    for (let index = 0; index < list.length; index += 1) {
      if (list[index].parentId !== null && list[index].parentId !== undefined) {
        if (!group[list[index].parentId]) {
          group[list[index].parentId] = []
        }
        group[list[index].parentId].push(list[index])
      }
    }
    const queue = []
    queue.push(result)
    while (queue.length) {
      const node = queue.shift()
      node[fieldName] = group[node.id] && group[node.id].length ? group[node.id] : null
      if (node[fieldName]) {
        queue.push(...node[fieldName])
      }
    }
  }
  return result
}
