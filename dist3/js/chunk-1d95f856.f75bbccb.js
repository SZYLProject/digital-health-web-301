(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d95f856"],{"02ee1":function(t,e,s){"use strict";var a=s("0d44"),i=s.n(a);i.a},"0d44":function(t,e,s){},e70b:function(t,e,s){"use strict";var a=s("f232"),i=s.n(a);i.a},ed3e:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"project-lists",attrs:{"element-loading-text":"数据加载中","element-loading-spinner":"el-icon-loading"}},[s("div",{staticClass:"breadcrumb-bar"},[s("el-breadcrumb",{attrs:{separator:"/"}},[s("el-breadcrumb-item",[t._v("项目管理")]),s("el-breadcrumb-item",{staticClass:"active-breadcrumb"},[t._v("项目列表")])],1),s("p",{staticClass:"right rg-bar"},[s("span",{staticClass:"check-radio"},[s("el-radio-group",{attrs:{size:"small"},on:{change:t.checkRadios},model:{value:t.checkRadio,callback:function(e){t.checkRadio=e},expression:"checkRadio"}},[s("el-radio",{attrs:{label:0}},[t._v("全部状态")]),s("el-radio",{attrs:{label:1}},[t._v("进行中")]),s("el-radio",{attrs:{label:2}},[t._v("已结束")])],1)],1),s("span",{staticClass:"sn-input"},[s("el-input",{attrs:{placeholder:"请输入项目名称进行搜索",size:"small",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleIconClick(e)}},model:{value:t.projectName,callback:function(e){t.projectName=e},expression:"projectName"}},[s("i",{staticClass:"el-icon-search el-input__icon pointer",attrs:{slot:"suffix"},on:{click:t.handleIconClick},slot:"suffix"})])],1),s("el-button",{staticClass:"el-icon-plus",attrs:{type:"primary",size:"mini"},nativeOn:{click:function(e){return t.createButton(e)}}},[t._v(" 新建")])],1)],1),s("div",{staticClass:"container-wraps"},[t.listObj.length<=0?s("div",{staticClass:"no-data-module",staticStyle:{height:"500px"}},[s("p",{staticClass:"iconfont icon-no_datas p1"}),s("p",{staticClass:"p2"},[t._v("暂时没有项目，请新建...")])]):s("el-row",{attrs:{gutter:15}},[t._l(t.listObj,(function(e,a){return s("el-col",{key:a,attrs:{span:12}},[s("div",{staticClass:"grid-content module-container-two"},[s("div",{staticClass:"title",staticStyle:{height:"48px"}},[s("h1",[s("el-button",{staticStyle:{"font-size":"16px",padding:"2px 0px"},attrs:{type:"text",size:"mini",disabled:0!==Number(e.inputCount)},on:{click:function(s){return t.goItemLists(e)}}},[t._v(" "+t._s(e.projectName||"无")+" ")])],1),s("span",{staticClass:"right pointer"},[s("el-tooltip",{attrs:{effect:"light",placement:"top-start"}},[s("div",{attrs:{slot:"content"},slot:"content"},[s("el-button",{staticStyle:{padding:"0"},attrs:{type:"text",size:"mini"},nativeOn:{click:function(s){return t.finishedAlreadys(e)}}},[t._v("完成")]),s("el-button",{staticStyle:{padding:"0"},attrs:{type:"text",size:"mini"},nativeOn:{click:function(s){return t.goSearchObj(e)}}},[t._v("修改")]),s("el-button",{staticStyle:{padding:"0"},attrs:{type:"text",size:"mini"},nativeOn:{click:function(s){return t.deleteList(e)}}},[t._v("删除")])],1),s("i",{staticClass:"el-icon-more"})])],1)]),s("div",{staticClass:"item-lists con"},[s("div",{staticClass:"item-top"},[s("p",{staticClass:"left-t"},[s("span",[t._v("项目牵头人：")]),s("span",{staticClass:"mo"},[t._v(t._s(e.leader||"无"))]),s("span",[t._v("研究目的/方案：")]),s("span",{staticClass:"mo aim"},[s("el-tooltip",{attrs:{effect:"dark",placement:"top"}},[s("div",{staticStyle:{"max-width":"100px"},attrs:{slot:"content"},slot:"content"},[t._v(" "+t._s(e.purpose||"无")+" ")]),s("i",[t._v(t._s(e.purpose||"无"))])])],1),s("span",[t._v("拟收集患者数：")]),s("span",{staticClass:"mo"},[t._v(t._s(e.planNum||"0"))])]),s("p",{staticClass:"right-t"},[s("span",[t._v("单中心")]),s("span",[t._v(" "+t._s(1===e.projectType?"回顾性研究":2===e.projectType?"前瞻性研究":"未知")+" ")]),s("span",[t._v(" "+t._s(1===e.pStatus?"进行中":2===e.pStatus?"已结束":"未知")+" ")])])]),s("div",{staticClass:"item-middle"},[s("el-row",[s("el-col",{attrs:{span:12}},[s("div",{},[s("p",{staticClass:"title-item"},[t._v("项目进度")]),s("div",{staticClass:"circle"},[s("el-progress",{attrs:{type:"circle","stroke-linecap":"butt",percentage:25,"stroke-width":20,width:110,color:"rgba(255,149,64,.5)"}})],1)])]),s("el-col",{attrs:{span:12}},[s("div",{staticClass:"middle-right"},[s("p",{staticClass:"title-item"},[t._v("研究对象总数")]),s("div",{staticClass:"circle"},[s("el-progress",{attrs:{type:"circle","stroke-linecap":"butt",percentage:25,"stroke-width":20,width:110,color:"rgba(0,112,244,.5)"}})],1),s("div",{staticClass:"middle-right-p"},[s("p",{staticClass:"p1"},[s("span",[t._v("录入中")])]),s("p",{staticClass:"p2"},[s("span",[t._v("已完成")])])])])])],1)],1),s("div",{staticClass:"item-bottom"},[s("el-steps",{attrs:{active:e.step-1}},t._l(2===e.projectType?t.stepArr1:t.stepArr2,(function(e,a){return s("el-step",{key:a},[s("div",{staticClass:"title-obj",attrs:{slot:"title"},slot:"title"},[t._v(t._s(e))])])})),1)],1)])])])})),t.listObj.length%2===1?s("el-col",{attrs:{span:12}},[s("div",{staticClass:"grid-content grid-content-last no-data-module"},[s("p",{staticClass:"iconfont icon-no_datas p1"}),s("p",{staticClass:"p2"},[t._v("暂时没有项目，请新建...")])])]):t._e()],2)],1),s("el-pagination",{attrs:{"current-page":t.pageNo,"page-sizes":[10,20,30,40,50],"page-size":t.pageSize,"pager-count":5,layout:"total, sizes, prev, pager, next, jumper",total:t.total,background:""},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)},i=[],n=s("5530"),c=s("2f62"),o=s("2903"),r={name:"ProjectLists",data:function(){return{loading:!1,checkRadio:0,projectName:"",listObj:[],stepArr1:["研究对象","项目进度","随访列表","审批管理","统计分析"],stepArr2:["研究对象","项目进度","审批管理","统计分析"],pageNo:1,pageSize:10,total:0}},props:{},computed:Object(n["a"])({},Object(c["d"])(["userInfo","dataSourceValue"])),watch:{},components:{},created:function(){},mounted:function(){this.getProjectLists()},destroyed:function(){},methods:Object(n["a"])(Object(n["a"])({},Object(c["e"])(["projectsMangement/projecttype"])),{},{getProjectLists:function(){var t,e,s=this;this.loading=!0,this.listObj=[];var a={userId:null===(t=this.userInfo)||void 0===t?void 0:t.pkId,dataSourceId:null===(e=this.dataSourceValue)||void 0===e?void 0:e.id,type:"",status:"",pStatus:0!==this.checkRadio?this.checkRadio:"",projectName:this.projectName,pageNo:this.pageNo,pageSize:this.pageSize};Object(o["E"])(a).then((function(t){var e,a;(null===t||void 0===t?void 0:t.obj)&&(s.listObj=null!==(e=null===(a=t.obj)||void 0===a?void 0:a.data)&&void 0!==e?e:[],s.total=t.obj.total);s.loading=!1})).catch((function(){s.loading=!1}))},handleSizeChange:function(t){this.pageSize=t,this.getProjectLists()},handleCurrentChange:function(t){this.pageNo=t,this.getProjectLists()},goItemLists:function(t){this.$Storage.sessionSet("projectId",t.id),this.$router.push({name:"ProjectListsDetails",params:{comName:"SearchObjectCom",projectType:t.projectType,id:t}})},goSearchObj:function(t){this.resetSetItem("projectType",t.projectType),this.$router.push({name:"ResearchObject",params:{stepName:"ProjectCreate",obj:t}})},finishedAlreadys:function(t){var e=this;this.$confirm("项目结束操作不可逆,请谨慎使用, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var s={id:t.id};Object(o["s"])(s).then((function(t){t&&(e.$message({message:"该项目已完成",type:"success"}),e.getProjectLists())})).catch((function(){}))})).catch((function(){e.$message({type:"info",message:"已取消"})}))},deleteList:function(t){var e=this;this.$confirm("此操作将永久删除该项目, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.deleteFn(t)})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},deleteFn:function(t){var e=this,s={id:t.id};Object(o["j"])(s).then((function(t){t&&(e.$message({message:"删除成功",type:"success"}),e.getProjectLists())})).catch((function(){}))},createButton:function(){this.$Storage.sessionSet("projectType",2),this.dataSourceValue.id?this.$router.push("/ResearchObject/ProjectCreate"):this.$message({message:"请先选择病种再创建项目~",type:"warning"})},checkRadios:function(t){this.projectName="",this.getProjectLists()},handleIconClick:function(){this.checkRadio=0,this.getProjectLists()}})},l=r,p=(s("02ee1"),s("e70b"),s("2877")),d=Object(p["a"])(l,a,i,!1,null,"ba14bdd0",null);e["default"]=d.exports},f232:function(t,e,s){}}]);