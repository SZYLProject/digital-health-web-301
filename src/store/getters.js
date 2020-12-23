const getters = {
  title: state => state.app.title,
  copyright: state => state.app.copyright,
  theme: state => state.app.theme,
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  // 用户信息
  authList: state => state.user.authList,
  userInfo: state => state.user.userInfo,
  dataSourceValue: state => state.user.dataSourceValue, // 病种 id
  show: state => state.user.show,

  // 关键词搜索
  pageNo: state => state.caseSearch.keyWordSearchCon.pageNo, // 单个分页
  pageSize: state => state.caseSearch.keyWordSearchCon.pageSize, // 总条数
  keyWordsSearch: state => state.caseSearch.keyWordsSearch, // 获取手动输入搜索关键词
  keyWordConDatas: state => state.caseSearch.keyWordConDatas, // 获取搜索条件数据
  keyWordSearchCon: state => state.caseSearch.keyWordSearchCon, // 关键字搜索条件数据对象
  keyWordListsDatas: state => state.caseSearch.keyWordListsDatas, // 后台返回的关键字搜索结果
  keyWordListsId: state => state.caseSearch.keyWordListsId, // 关键词搜索病例列表id 模块收藏功能用

  // 高级搜索
  advanceSearchDatas: state => state.advancedSearch.advanceSearchDatas, // 高级搜索搜索条件
  advanceSearchListDatas: state => state.advancedSearch.advanceSearchListDatas, // 高级搜索后台返回的数据

  // 数据字典模块
  treeData: state => state.dataDicIndex.dictionaryDatas, // 数据字典字典数据

  // 360
  viewId: state => state.view360.viewId, // 视图id名字等信息

  // 条件树
  flattenData: state => state.conditionTree.flattenData, // 扁平数据

  // 项目管理数据
  dragData: state => state.projectsMangement.dragData, // 拖拽对象数据
  projectType: state => state.projectsMangement.projectType // 拖拽对象数据

}
export default getters
