(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e9491672"],{"1d783":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"advanced-search-main"},[s("div",{staticClass:"module-container"},[s("div",{staticClass:"title"},[s("h2",[s("span",{staticClass:"pointer",style:{color:0!==t.colorStatus?t.theme:"#787878"},on:{click:t.goBack,mouseover:t.mouseOver,mouseleave:t.mouseLeave}},[t._v(" 病历搜索 > ")]),s("span",{style:{color:t.theme}},[t._v("高级搜索")])]),s("span",{staticClass:"right full-screen-icon pointer",on:{click:t.goBack}},[s("svg-icon",{attrs:{"icon-class":"suoxiao"}})],1)]),s("div",{staticClass:"con-1"},[s("advanced-search-com",{attrs:{childMianPage:"true",PN:t.pageNo,PS:t.pageSize}})],1)]),t.isShowMoule?s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.advancedLoading,expression:"advancedLoading"}],staticClass:"advanced-search-result",attrs:{"element-loading-text":"数据加载中...","element-loading-spinner":"el-icon-loading"}},[s("div",{staticClass:"module-container"},[s("div",{staticClass:"title"},[s("h2",[t._v("搜索结果")]),s("div",{staticClass:"right"},[s("div",{staticClass:"inlineBlock"},[s("analyze-result")],1),s("div",{staticClass:"space inlineBlock"},[s("AddCollectObject",{attrs:{title:"收藏",keys:"collection",disabled:t.disOrNo}})],1),s("div",{staticClass:"inlineBlock"},[s("AddCollectObject",{attrs:{title:"添加至项目",disabled:""}})],1)])]),s("div",{staticClass:"con-2",staticStyle:{"margin-bottom":"20px"}},[s("p",{staticClass:"search-msg"},[t._v(" 您的权限下，相关病人 "),s("span",[t._v(t._s(t.patients))]),t._v(" 个，病历 "),s("span",[t._v(t._s(t.caseHistory))]),t._v(" 份 ")]),s("div",{staticClass:"patients-model-com"},[s("ul",{staticClass:"case-lists"},t._l(t.listsVisit,(function(e,i){return s("li",{key:i,staticClass:"pointer",staticStyle:{"padding-right":"90px"},style:{"background-color":e.check?"rgba(43,134,178,0.2)":"#ffffff"},on:{click:function(s){return t.correctBg(e,i)}}},[s("h4",[t._v(" "+t._s(e.name)+" ; 性别: "+t._s(e.sex?e.sex:"无")+" ; 出生年月: "+t._s(e.date_of_birth?e.date_of_birth.slice(0,10):"无")+" ")]),s("p",{staticClass:"p-b"},[s("el-button",{attrs:{type:"text"},nativeOn:{click:function(s){return s.stopPropagation(),t.jumpView(e)}}},[t._v(" 患者全景 > ")])],1),s("p",{staticStyle:{margin:"10px 0px"}},t._l(e.visit_record,(function(e,i){return s("span",{key:"itm"+i,staticClass:"p-k"},[t._v(" "+t._s(e.visit_source_value)+" ")])})),0),s("p",[t._v(" 就诊日期: "),t._l(e.visit_record,(function(e,i){return s("span",{key:"itm0"+i},[t._v(" "+t._s(t._f("timestamp")(e.visit_start_date))+" "+t._s(i!==e.length?",":"")+" ")])})),t._v("; 就诊科室: "),t._l(e.visit_record,(function(e,i){return s("span",{key:"itm1"+i},[t._v(" "+t._s(e.dept_admission_to?e.dept_admission_to:"无")+" "+t._s(i!==e.length?",":"")+" ")])})),t._v("; 现病史: "),t._l(e.visit_record,(function(e,i){return s("span",{key:"itm2"+i},[t._v(" "+t._s(e.hy_present?e.hy_present:"")+" "+t._s(i!==e.length?",":"")+" ")])})),t._v("; 就诊年龄: "),t._l(e.visit_record,(function(e,i){return s("span",{key:"itm3"+i},[t._v(" "+t._s(e.visit_age?e.visit_age:"无")+" "+t._s(i!==e.length?",":"")+" ")])}))],2)])})),0)])]),s("el-pagination",{attrs:{"current-page":t.pageNo,"page-sizes":[10,20,30,40,50],"page-size":t.pageSize,"pager-count":5,layout:"total, sizes, prev, pager, next, jumper",total:t.total,background:""},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)]):t._e()])},a=[],c=(s("4de4"),s("d81d"),s("4ec9"),s("b64b"),s("d3b7"),s("3ca3"),s("ddb0"),s("5530")),n=s("2f62"),o=(s("b3d4"),s("2b1d")),r=s("bd32"),l={name:"AdvancedSearch",data:function(){return{pageNo:1,pageSize:10,total:0,colorStatus:0,advancedLoading:!1,isShowMoule:!0,listsVisit:[],patients:0,caseHistory:0,listsIdObj:{},listsId:[]}},props:{},computed:Object(c["a"])(Object(c["a"])({},Object(n["d"])(["theme","userInfo","advanceSearchListDatas","keyWordListsId"])),{},{disOrNo:function(){var t;return!((null===(t=this.keyWordListsId)||void 0===t?void 0:t.length)>0)}}),watch:{advanceSearchListDatas:function(t){var e=this;this.patients=t.personNumber?t.personNumber:0,this.caseHistory=t.visitNumber?t.visitNumber:0,this.total=t.total,this.listsVisit=t.personList.map((function(t){e.$set(t,"check",!1);var s=new Map;return t.visit_record=t.visit_record.filter((function(t){return!s.has(t.visit_source_value)&&s.set(t.visit_source_value,1)})),t})),this.advancedLoading=!1}},components:{AddCollectObject:o["a"],AnalyzeResult:r["b"],AdvancedSearchCom:r["a"]},created:function(){},mounted:function(){var t=this;if(this.advanceSearchListDatas){var e=this.advanceSearchListDatas;this.patients=e.personNumber?e.personNumber:0,this.caseHistory=e.visitNumber?e.visitNumber:0,this.total=e.total,this.listsVisit=e.visit.map((function(e){return t.$set(e,"check",!1),e})),this.advancedLoading=!1}},destroyed:function(){var t=[{advanceSearchVariableDTOList:[],indexName:"",opt:"OR",parentVariable:{id:"",name:"",key:"",type:"",value:"",date1:"",date2:"",dataOptionType:0,dataItemCode:"",dataOption:[]},serialNumber:0}];this["advancedSearch/advancesearchmuta"](t),this["advancedSearch/advancesearchlistmup"](null),this.$Storage.localRemove("searchJson"),this.pageNo=1,this.pageSize=10,this["caseSearch/keywordlists"]([])},methods:Object(c["a"])(Object(c["a"])({},Object(n["e"])(["advancedSearch/advancesearchmuta","advancedSearch/advancesearchlistmup","caseSearch/keywordlists"])),{},{mouseOver:function(){this.colorStatus=1},mouseLeave:function(){this.colorStatus=0},goBack:function(){this.$router.push("CaseSearchHome")},jumpAdvanced:function(){this.$router.push("AdvancedSearch")},jumpView:function(t){var e=this.$router.resolve({path:"/view360/".concat(t.person_id,"/0/?parentName=患者概览")});window.open(e.href,"_blank")},correctBg:function(t,e){var s=Object.keys(this.listsIdObj).length;for(var i in this.listsId=[],this.listsVisit[e].check=!t.check,0!==s&&this.listsIdObj[e]?delete this.listsIdObj[e]:this.listsIdObj[e]=t.personId,this.listsIdObj)this.listsId.push(this.listsIdObj[i]);this["caseSearch/keywordlists"](this.listsId)},handleSizeChange:function(t){this.pageSize=t,this.advancedLoading=!0},handleCurrentChange:function(t){this.pageNo=t,this.advancedLoading=!0}})},d=l,u=(s("c480"),s("2877")),h=Object(u["a"])(d,i,a,!1,null,"56f8e632",null);e["default"]=h.exports},"2b1d":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-popover",{ref:"messageDrop",attrs:{placement:"bottom",trigger:"click"}},[s("el-button",{attrs:{slot:"reference",disabled:t.disabled,size:"medium"},slot:"reference"},[t._v(t._s(t.title)),s("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),s("div",{staticClass:"popover-checkbox"},[s("el-input",{attrs:{size:"small",placeholder:"请输入内容","prefix-icon":"el-icon-search"},on:{input:t.conditionFilter},model:{value:t.input2,callback:function(e){t.input2=e},expression:"input2"}}),s("el-checkbox-group",{staticClass:"block",staticStyle:{height:"150px"},model:{value:t.checkList,callback:function(e){t.checkList=e},expression:"checkList"}},[s("el-scrollbar",{ref:"scroll",staticStyle:{height:"100%"}},t._l(t.checkChild,(function(e,i){return s("el-checkbox",{key:i,attrs:{label:e.id}},[t._v(" "+t._s(e.categoryName)+" ")])})),1)],1),s("div",{staticClass:"popover-button"},[s("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){return t.confirmBtn(e)}}},[t._v("确认")]),s("el-button",{attrs:{size:"small",type:"primary",plain:""},nativeOn:{click:function(e){return t.cancel(e)}}},[t._v("取消")])],1)],1)],1)},a=[],c=(s("4de4"),s("d81d"),s("d3b7"),s("ac1f"),s("25f0"),s("466d"),s("841c"),s("ddb0"),s("5530")),n=s("2f62"),o=s("b775");function r(){return Object(o["a"])({url:"/crp-collection/collectionCategory/v1/listAll",method:"GET",params:{categoryName:"",categoryType:1}})}function l(t){return Object(o["a"])({url:"/crp-collection/personCollection/v1/add",method:"POST",data:t})}var d=s("a318"),u={props:{title:{type:String,default:""},disabled:{type:Boolean,default:!1},keys:{type:String,default:""}},data:function(){return{input2:"",checkList:[],checkListDatas:[],checkChild:[]}},computed:Object(c["a"])({},Object(n["d"])(["userInfo","keyWordListsId"])),watch:{},created:function(){},mounted:function(){switch(this.keys){case"collection":this.getListAll();break;case"":break}},methods:Object(c["a"])(Object(c["a"])({},Object(n["e"])(["caseSearch/keywordlists"])),{},{cancel:function(){this.$refs.messageDrop.doClose(),this.checkList=[]},confirmBtn:function(){if(this.checkList.length>0)switch(this.keys){case"collection":this.postCollectCommit();break;case"":break}else this.$message({message:"请先勾选收藏分类~",type:"warning"})},getListAll:function(){var t=this;r().then((function(e){(null===e||void 0===e?void 0:e.obj)&&(t.checkListDatas=e.obj,t.checkChild=e.obj)})).catch((function(t){}))},postCollectCommit:function(){var t,e,s=this,i={personIds:this.keyWordListsId.toString()||"",categoryIds:this.checkList.toString()||"",userId:null!==(t=null===(e=this.userInfo)||void 0===e?void 0:e.pkId)&&void 0!==t?t:null};l(i).then((function(t){s.$refs.messageDrop.doClose(),s.checkList=[],s.$message({message:"收藏成功！",type:"success"})})).catch((function(t){}))},conditionFilter:function(){var t=this,e=this.checkListDatas,s=e.map((function(e){var s=-1!==e.categoryName.search(t.input2)||d.default.match(e.categoryName,t.input2);if(s)return e})).filter((function(t){return t}));this.checkChild=s}}),destroyed:function(){this["caseSearch/keywordlists"]([])}},h=u,p=s("2877"),v=Object(p["a"])(h,i,a,!1,null,"0c2551a8",null);e["a"]=v.exports},c480:function(t,e,s){"use strict";var i=s("e780"),a=s.n(i);a.a},e780:function(t,e,s){}}]);
//# sourceMappingURL=chunk-e9491672.b37f1f26.js.map