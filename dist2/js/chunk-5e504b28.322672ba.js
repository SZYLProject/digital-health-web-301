(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5e504b28"],{"03ba":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dynamic-table"},[a("div",{staticClass:"table-setting"},[a("el-dropdown",{ref:"tableDrop",attrs:{trigger:"click"}},[a("span",{staticClass:"el-dropdown-link"},[a("i",{staticClass:"el-icon-s-tools"})]),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("div",{staticClass:"dropdown-checkbox",staticStyle:{width:"480px"}},[a("p",{staticClass:"title"},[t._v("设置表格显示列")]),a("el-scrollbar",{ref:"scroll",staticStyle:{height:"100%","padding-bottom":"20px"}},[a("div",{staticStyle:{height:"300px"}},[a("el-checkbox-group",{model:{value:t.checkList,callback:function(e){t.checkList=e},expression:"checkList"}},t._l(t.headerData,(function(e,i){return a("el-checkbox",{key:i,attrs:{label:e.key}},[t._v(t._s(e.val))])})),1)],1)]),a("div",{staticClass:"dropdown-button"},[a("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){return t.okHandle(e)}}},[t._v("确认")]),a("el-button",{attrs:{type:"primary",plain:"",size:"small"},nativeOn:{click:function(e){return t.cancel(e)}}},[t._v("取消")])],1)],1)])],1)],1),a("el-table",{ref:"multipleTable",attrs:{data:t.tableData,stripe:"","header-cell-class-name":"tableTH"},on:{"selection-change":t.handleSelectionChange}},[t._l(t.defaultHeader,(function(e){return a("el-table-column",{key:e.key,attrs:{prop:e.key,label:e.val,sortable:"",align:"center","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(a){return[t._v(t._s(a.row[e.key]))]}}],null,!0)})})),t.operate?a("el-table-column",{attrs:{label:"操作",align:"left"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{attrs:{to:{path:"/view360/"+e.row["person_id"]+"/0/?parentName=患者概览"},target:"_blank"}},[a("el-button",{attrs:{type:"text"}},[t._v("详情")])],1)]}}],null,!1,1249194199)}):t._e()],2)],1)},n=[],s=(a("4de4"),a("c975"),a("d81d"),a("fb6a"),{props:{operate:{type:Boolean,default:!1},tableData:{type:Array,default:null},headerData:{type:Array,default:null}},watch:{headerData:function(t){var e=this;this.defaultHeader=t.slice(0,8),this.defaultHeader.map((function(t){e.checkList.push(t.key)}))}},data:function(){return{checkList:[],defaultHeader:[]}},methods:{handleSelectionChange:function(t){this.multipleSelection=t},okHandle:function(){var t=this;this.defaultHeader=this.headerData.filter((function(e){return t.checkList.indexOf(e.key)>-1})),this.$refs.tableDrop.hide()},cancel:function(){this.$refs.tableDrop.hide()}}}),o=s,c=(a("e435"),a("c3c5"),a("2877")),l=Object(c["a"])(o,i,n,!1,null,"31173b64",null);e["a"]=l.exports},"07ac":function(t,e,a){var i=a("23e7"),n=a("6f53").values;i({target:"Object",stat:!0},{values:function(t){return n(t)}})},"1a37":function(t,e,a){},"2b1d":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-popover",{ref:"messageDrop",attrs:{placement:"bottom",trigger:"click"}},[a("el-button",{attrs:{slot:"reference",disabled:t.disabled,size:"medium"},slot:"reference"},[t._v(t._s(t.title)),a("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),a("div",{staticClass:"popover-checkbox"},[a("el-input",{attrs:{size:"small",placeholder:"请输入内容","prefix-icon":"el-icon-search"},on:{input:t.conditionFilter},model:{value:t.input2,callback:function(e){t.input2=e},expression:"input2"}}),a("el-checkbox-group",{staticClass:"block",staticStyle:{height:"150px"},model:{value:t.checkList,callback:function(e){t.checkList=e},expression:"checkList"}},[a("el-scrollbar",{ref:"scroll",staticStyle:{height:"100%"}},t._l(t.checkChild,(function(e,i){return a("el-checkbox",{key:i,attrs:{label:e.id}},[t._v(" "+t._s(e.categoryName)+" ")])})),1)],1),a("div",{staticClass:"popover-button"},[a("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){return t.confirmBtn(e)}}},[t._v("确认")]),a("el-button",{attrs:{size:"small",type:"primary",plain:""},nativeOn:{click:function(e){return t.cancel(e)}}},[t._v("取消")])],1)],1)],1)},n=[],s=(a("4de4"),a("d81d"),a("d3b7"),a("ac1f"),a("25f0"),a("466d"),a("841c"),a("ddb0"),a("5530")),o=a("2f62"),c=a("b775");function l(){return Object(c["a"])({url:"/crp-collection/collectionCategory/v1/listAll",method:"GET",params:{categoryName:"",categoryType:1}})}function r(t){return Object(c["a"])({url:"/crp-collection/personCollection/v1/add",method:"POST",data:t})}var d=a("a318"),u={props:{title:{type:String,default:""},disabled:{type:Boolean,default:!1},keys:{type:String,default:""}},data:function(){return{input2:"",checkList:[],checkListDatas:[],checkChild:[]}},computed:Object(s["a"])({},Object(o["d"])(["userInfo","keyWordListsId"])),watch:{},created:function(){},mounted:function(){switch(this.keys){case"collection":this.getListAll();break;case"":break}},methods:Object(s["a"])(Object(s["a"])({},Object(o["e"])(["caseSearch/keywordlists"])),{},{cancel:function(){this.$refs.messageDrop.doClose(),this.checkList=[]},confirmBtn:function(){if(this.checkList.length>0)switch(this.keys){case"collection":this.postCollectCommit();break;case"":break}else this.$message({message:"请先勾选收藏分类~",type:"warning"})},getListAll:function(){var t=this;l().then((function(e){(null===e||void 0===e?void 0:e.obj)&&(t.checkListDatas=e.obj,t.checkChild=e.obj)})).catch((function(t){}))},postCollectCommit:function(){var t,e,a=this,i={personIds:this.keyWordListsId.toString()||"",categoryIds:this.checkList.toString()||"",userId:null!==(t=null===(e=this.userInfo)||void 0===e?void 0:e.pkId)&&void 0!==t?t:null};r(i).then((function(t){a.$refs.messageDrop.doClose(),a.checkList=[],a.$message({message:"收藏成功！",type:"success"})})).catch((function(t){}))},conditionFilter:function(){var t=this,e=this.checkListDatas,a=e.map((function(e){var a=-1!==e.categoryName.search(t.input2)||d.default.match(e.categoryName,t.input2);if(a)return e})).filter((function(t){return t}));this.checkChild=a}}),destroyed:function(){this["caseSearch/keywordlists"]([])}},h=u,p=a("2877"),f=Object(p["a"])(h,i,n,!1,null,"0c2551a8",null);e["a"]=f.exports},"3c49":function(t,e,a){"use strict";var i=a("1a37"),n=a.n(i);n.a},"47e6":function(t,e,a){"use strict";var i=a("7112"),n=a.n(i);n.a},"4d16":function(t,e,a){"use strict";var i=a("6b4e"),n=a.n(i);n.a},"6b4e":function(t,e,a){},"6ce35":function(t,e,a){},"6f53":function(t,e,a){var i=a("83ab"),n=a("df75"),s=a("fc6a"),o=a("d1e7").f,c=function(t){return function(e){var a,c=s(e),l=n(c),r=l.length,d=0,u=[];while(r>d)a=l[d++],i&&!o.call(c,a)||u.push(t?[a,c[a]]:c[a]);return u}};t.exports={entries:c(!0),values:c(!1)}},7112:function(t,e,a){},a459:function(t,e,a){"use strict";var i=a("aa94"),n=a.n(i);n.a},a791:function(t,e,a){"use strict";var i=a("db39"),n=a.n(i);n.a},aa94:function(t,e,a){},acc5:function(t,e,a){"use strict";var i=a("da42"),n=a.n(i);n.a},b394:function(t,e,a){"use strict";var i=a("c2b8"),n=a.n(i);n.a},b562:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"demographic-info"},[a("DetailsSidebar",{staticClass:"sidebar-360-container",on:{title:t.titleVal}}),a("div",{staticClass:"details-main"},[a("div",{staticClass:"details-header"},[a("div",{staticClass:"details-top"},[a("span",[t._v("患者360视图 / ")]),a("span",{staticClass:"title",style:{color:t.theme}},[t._v(t._s(t.nowTitle))]),a("div",{staticClass:"right"},[a("div",{staticClass:"inlineBlock"},[a("el-button",{attrs:{type:"text",disabled:""}},[t._v("查看患者原始病历(0份)")])],1),a("div",{staticClass:"space inlineBlock"},[a("el-button",{attrs:{type:"primary",size:"medium",icon:"el-icon-edit",disabled:""}},[t._v("补录")])],1),a("div",{staticClass:"space inlineBlock"},[a("AddCollectObject",{attrs:{title:"收藏",disabled:""}})],1),a("div",{staticClass:"space inlineBlock"},[a("AddCollectObject",{attrs:{title:"添加至项目",disabled:""}})],1)])]),a("div",{staticClass:"patient-info"},[a("span",[t._v("患者信息")]),a("span",{style:{color:t.theme}},[t._v(t._s(t.personInfo.name))]),a("span",[t._v(t._s(t.personInfo.sex)+" ")]),a("span",[t._v("出生日期："+t._s(t.personInfo.date_of_birth))]),a("span",[t._v("住院号："+t._s(t.personInfo.visit_id))])])]),a("Overview",{attrs:{show:t.whichCom}}),a(t.whichCom,{tag:"component",attrs:{baseData:t.baseData,menu:t.menu}}),"OtherInfoTwo"===t.whichCom?a("OtherInfoTwo"):t._e()],1)],1)},n=[],s=a("5530"),o=(a("e32b"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"details-sidebar",staticStyle:{width:"200px!important"}},[a("p",{staticClass:"title"},[a("img",{staticClass:"logo",attrs:{src:t.logo,alt:""}}),a("span",{staticClass:"title-item"},[t._v(t._s(t.title))])]),a("el-scrollbar",{staticStyle:{height:"92%"}},[a("div",{staticClass:"details-list"},[a("el-menu",{attrs:{"default-active":t.hoverIndex}},[a("el-menu-item",{attrs:{index:"0"}},[a("div",{on:{click:function(e){return t.clickLists(0,"患者概览")}}},[a("i",{staticClass:"iconfont icon-xiangmu"}),a("span",[t._v("患者概览")])])]),t._l(t.list,(function(e,i){return a("el-submenu",{key:i,attrs:{index:String(e.id),"popper-append-to-body":""}},[a("template",{slot:"title"},[a("i",{staticClass:"iconfont icon-xiangmu"}),t._v(t._s(e.dataName)+" ")]),e.dataConfigurationEntityList.length>0?t._l(e.dataConfigurationEntityList,(function(e,i){return a("el-menu-item",{key:i,attrs:{index:String(e.id)}},[a("div",{on:{click:function(a){return t.clickLists(e.id,e.dataName)}}},[a("span",[t._v(t._s(e.dataName))])])])})):t._e()],2)}))],2)],1)])],1)}),c=[],l=(a("99af"),a("a9e3"),a("cf05")),r=a.n(l),d=a("2f62"),u=a("b775");function h(t){var e=t.id;return Object(u["a"])({url:"/crp-collection/panoramicView/v1/getMenu/".concat(e),method:"GET"})}function p(t){return Object(u["a"])({url:"/crp-collection/panoramicView/v1/getPanoramicViewInfo",method:"GET",params:t})}function f(t){return Object(u["a"])({url:"/crp-collection/panoramicView/v1/getPersonBaseInfo/".concat(t),method:"GET"})}function m(t){var e=t.id,a=t.personId;return Object(u["a"])({url:"/crp-collection/panoramicView/v1/getPersonOverViewInfo/".concat(a,"/").concat(e),method:"GET"})}function v(t){return Object(u["a"])({url:"/crp-collection/panoramicView/v1/getTimeAxisPartOneInfo/".concat(t),method:"GET"})}function b(t){var e=t.id,a=t.personId;return Object(u["a"])({url:"/crp-collection/panoramicView/v1/getTimeAxisPartTwoInfo/".concat(a,"/").concat(e),method:"GET"})}var y={name:"DetailsSidebar",computed:Object(s["a"])({},Object(d["d"])(["title","dataSourceValue"])),data:function(){return{logo:r.a,hoverIndex:"0",list:[]}},created:function(){this.getDictionariesFirst(),this.clickLists(Number(this.$route.params.parentId),this.$route.query.parentName)},methods:{clickLists:function(t,e){this.hoverIndex=String(t),this.$store.commit("view360/SAVE_VIEWID",t),this.$emit("title",e),window.history.replaceState({},"","#/view360/".concat(this.$route.params.personId,"/").concat(t,"?parentName=").concat(e))},getDictionariesFirst:function(){var t,e,a=this,i={id:null!==(t=null===(e=this.dataSourceValue)||void 0===e?void 0:e.id)&&void 0!==t?t:0};h(i).then((function(t){a.list=t.obj})).catch((function(t){}))},handleSelect:function(t,e){}}},g=y,w=(a("4d16"),a("2877")),x=Object(w["a"])(g,o,c,!1,null,"0f53727e",null),k=x.exports,C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"other-info-two"},[a("el-row",{attrs:{gutter:16}},[a("el-col",{attrs:{span:4}},[a("div",{staticClass:"left-container"},[a("div",{staticClass:"left-header"},[a("span",[a("svg-icon",{attrs:{"icon-class":"CasesOfSearch"}})],1),a("h4",[t._v("全部就诊记录")])]),a("ul",{staticClass:"left-lists"},t._l(t.leftLists,(function(e,i){return a("li",{key:i,staticClass:"pointer",on:{click:function(a){return t.clickLists(e,i)}}},[a("span",{class:{blue:"住院"===e.type,green:"门诊"===e.type,purple:"急诊"===e.type}},[t._v(t._s(e.type))]),a("span",{style:{color:i==t.hoverIndex?t.theme:""}},[t._v(t._s(e.time))])])})),0)])]),a("el-col",{attrs:{span:20}},[a("div",{staticClass:"right-container"},[a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"针吸活检",name:"first"}}),a("el-tab-pane",{attrs:{label:"穿刺活检",name:"second"}}),a("el-tab-pane",{attrs:{label:"淋巴结活检",name:"third"}})],1)],1)])],1)],1)},_=[],I={name:"OtherInfoTwo",data:function(){return{hoverIndex:-1,activeName:"first",whichOne:"One",leftLists:[{id:0,type:"住院",time:"2017年10月21日"},{id:1,type:"住院",time:"2018年10月21日"},{id:2,type:"门诊",time:"2019年10月21日"},{id:3,type:"急诊",time:"2018年9月1日"},{id:4,type:"住院",time:"2019年8月22日"},{id:5,type:"门诊",time:"2020年10月1日"},{id:6,type:"急诊",time:"2020年3月21日"},{id:7,type:"急诊",time:"2020年10月21日"}]}},props:{},computed:Object(s["a"])({},Object(d["d"])(["theme"])),watch:{},created:function(){},methods:{clickLists:function(t,e){console.log(t),this.hoverIndex=e},handleClick:function(t,e){switch(console.log(t.index),Number(t.index)){case 0:this.whichOne="One";break;case 1:this.whichOne="Two";break;case 2:this.whichOne="Three";break}}}},S=I,O=(a("f5f1"),a("3c49"),Object(w["a"])(S,C,_,!1,null,"14507071",null)),j=O.exports,V=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"base-info module-container"},[t._m(0),a("div",{staticClass:"con"},t._l(t.baseData,(function(e,i){return a("div",{key:i,staticClass:"baseBlock inlineBlock"},[a("p",[a("b",[t._v(t._s(e.name))])]),a("span",[t._v(t._s(e.value))])])})),0)])},D=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"title"},[a("h2",[t._v("患者人口学信息")])])}],A={name:"BaseInfo",props:["baseData"],data:function(){return{activeName:"first",tableData:[],total:0,pageNo:1,pageSize:10}},mounted:function(){console.log(this.baseData)},methods:{}},T=A,N=(a("a459"),Object(w["a"])(T,V,D,!1,null,"10e42dee",null)),L=N.exports,z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table-info"},[a("el-tabs",{staticClass:"tab",on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},t._l(t.menu,(function(e,i){return a("el-tab-pane",{key:i,attrs:{label:e.dataName,name:String(e.id)}},[a("div",{staticClass:"table"},[a("DynamicTable",{attrs:{tableData:t.tableData,headerData:t.headerData}}),a("el-pagination",{attrs:{"current-page":t.pageNo,"page-sizes":[10,20,30,40,50],"page-size":t.pageSize,"pager-count":5,layout:"total, sizes, prev, pager, next, jumper",total:t.total,background:""},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])})),1)],1)},E=[],$=(a("4de4"),a("d81d"),a("b0c0"),a("03ba")),B={name:"TableInfo",components:{DynamicTable:$["a"]},props:["menu"],data:function(){return{activeName:"",tableData:[],headerData:[],total:0,pageNo:1,pageSize:10}},computed:{},watch:{menu:{immediate:!0,handler:function(t,e){t&&t.length>0&&(this.activeName=String(this.menu[0].id),this.getViewData(this.activeName))}}},created:function(){},mounted:function(){},methods:{getViewData:function(t){var e=this,a=this.menu.filter((function(e){return e.id===Number(t)})),i={personId:this.$route.params.personId,parentId:t,pageNo:this.pageNo,pageSize:this.pageSize,dataItemCode:a[0].dataItemCode};p(i).then((function(t){var a=t.obj,i=a.data,n=a.total,s=a.fields,o=[];i.map((function(t){o.push(JSON.parse(t))})),e.tableData=o||[];var c=[];for(var l in s)c.push({key:l,val:s[l]});e.headerData=c||[],e.total=n})).catch((function(){}))},handleClick:function(t,e){this.getViewData(t.name),this.activeName=t.name},handleSizeChange:function(t){this.pageSize=t,this.getViewData(this.activeName)},handleCurrentChange:function(t){this.pageNo=t,this.getViewData(this.activeName)}}},H=B,P=(a("a791"),a("47e6"),Object(w["a"])(H,z,E,!1,null,"e2e7a04e",null)),Y=P.exports,M=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"patient-overview"},[this.show?t._e():a("div",{staticClass:"overview"},[a("div",{staticClass:"title"},[a("h2",[a("i",{staticClass:"iconfont icon-huanzhexinxi",style:{color:t.theme}}),t._v("患者概览")]),a("span",{staticClass:"right pointer",on:{click:function(e){t.show3=!t.show3}}},[a("i",{staticClass:"el-icon-arrow-up",class:{arrowTransform:!t.show3,arrowTransformReturn:t.show3},staticStyle:{"margin-top":"8px"}})])]),a("el-collapse-transition",[a("div",{directives:[{name:"show",rawName:"v-show",value:t.show3,expression:"show3"}],staticClass:"overview-con con"},[a("div",{class:{dynamicWidth:t.more}},t._l(t.overViewData,(function(e,i){return a("div",{key:i,staticClass:"con-block  inlineBlock"},[a("p",[a("b",[t._v(t._s(e.name))])]),a("span",[t._v(t._s(e.value))])])})),0),a("el-button",{staticClass:"more",attrs:{type:"text"},on:{click:function(e){t.more=!t.more}}},[t._v("查看更多")])],1)])],1),a("div",{staticClass:"timeLine"},[a("div",{staticClass:"title"},[a("h2",[a("i",{staticClass:"iconfont icon-shijian1",style:{color:t.theme}}),t._v("患者时间轴")]),a("div",{staticClass:"right"},[t._l(t.types,(function(e,i){return a("span",{key:i},[a("i",{staticClass:"iconfont icon-yuandianxiao",style:{color:e.color}}),t._v(t._s(e.name))])})),a("el-date-picker",{staticStyle:{width:"250px","margin-left":"15px"},attrs:{size:"small",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.timeValue,callback:function(e){t.timeValue=e},expression:"timeValue"}})],2)]),a("div",{staticClass:"con"},[a("div",{staticStyle:{width:"100%"}},[this.show?a("TimeAxis",{attrs:{height:"100px",width:"100%",data:t.timeAxisOne,timeValue:t.timeValue}}):a("Linkage",{attrs:{height:"500px",width:"100%",dataOne:t.timeAxisOne,dataTwoY:t.timeAxisTwo.yAxis,dataTwoX:t.timeAxisTwo.xAxis,timeValue:t.timeValue}})],1)])])])},G=[],W=(a("4160"),a("07ac"),a("159b"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:t.className,style:{height:t.height,width:t.width},attrs:{id:t.id}})}),J=[],R=a("313e"),F=a.n(R),X=a("f42c"),Z={mixins:[X["a"]],props:{dataTwoX:{type:Array,default:null},dataTwoY:{type:Array,default:null},dataOne:{type:Array,default:null},timeValue:{type:Array,default:null},className:{type:String,default:"chart"},id:{type:String,default:"linkageChart"},width:{type:String,default:"200px"},height:{type:String,default:"200px"}},watch:{dataOne:function(t){this.initChart()},timeValue:function(t){this.initChart()},dataTwoY:function(t){this.initChart()}},data:function(){return{chart:null}},mounted:function(){this.initChart()},beforeDestroy:function(){this.chart&&(this.chart.dispose(),this.chart=null)},methods:{initChart:function(){function t(t,e){var a=e.coord([e.value(1),0]),i=e.coord([e.value(2),0]),n=1.2*e.size([0,1])[1],s=F.a.graphic.clipRectByRect({x:a[0],y:a[1]-n/2,width:i[0]-a[0],height:n},{x:t.coordSys.x,y:t.coordSys.y,width:t.coordSys.width,height:t.coordSys.height});return s&&{type:"rect",shape:s,style:e.style()}}this.chart=F.a.init(document.getElementById(this.id)),this.chart.setOption({tooltip:{formatter:function(t){var e=t.value[3]?t.value[3]:t.value[2];return t.marker+t.name+"<br />"+e},backgroundColor:"#fff",borderColor:"#ddd",borderWidth:1,textStyle:{color:"#333333"},padding:10},dataZoom:[{type:"slider",xAxisIndex:[0,1],top:70,height:5,fillerColor:"rgba(230,230,230,0.5)",borderColor:"rgba(230,230,230,0.5)",handleIcon:"M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",handleSize:"250%"},{xAxisIndex:[0,1],type:"inside"}],grid:[{show:!0,backgroundColor:"rgba(0,112,244,0.05)",borderWidth:0,left:60,right:40,top:10,height:50},{left:60,right:40,top:150}],xAxis:[{gridIndex:0,scale:!0,boundaryGap:!1,type:"time",splitNumber:10,minInterval:1,minorTick:{show:!0,splitNumber:10,lineStyle:{}},axisTick:{show:!0,inside:!0},splitLine:{show:!0},min:this.timeValue.length>0?this.timeValue[0]:null,max:this.timeValue.length>0?this.timeValue[1]:null},{show:!1,type:"time",gridIndex:1,scale:!0,boundaryGap:!1,min:this.timeValue.length>0?this.timeValue[0]:null,max:this.timeValue.length>0?this.timeValue[1]:null}],yAxis:[{show:!1,gridIndex:0},{name:"检验检查",nameTextStyle:{padding:[3,4,5,-56],fontSize:14,fontWeight:"bold"},gridIndex:1,type:"category",data:this.dataTwoY,axisTick:{alignWithLabel:!0},splitLine:{show:!0}}],series:[{xAxisIndex:0,yAxisIndex:0,type:"custom",renderItem:t,itemStyle:{opacity:.8},encode:{x:[1,2],y:0},data:this.dataOne},{xAxisIndex:1,yAxisIndex:1,type:"scatter",itemStyle:{color:"#0070f4"},data:this.dataTwoX}]})}}},q=Z,U=Object(w["a"])(q,W,J,!1,null,null,null),K=U.exports,Q=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:t.className,style:{height:t.height,width:t.width},attrs:{id:t.id}})},tt=[],et={mixins:[X["a"]],props:{data:{type:Array,default:null},timeValue:{type:Array,default:null},className:{type:String,default:"chart"},id:{type:String,default:"timeAxisChart"},width:{type:String,default:"200px"},height:{type:String,default:"200px"}},watch:{data:function(t){this.initChart()},timeValue:function(t){this.initChart()}},data:function(){return{chart:null}},mounted:function(){this.initChart()},beforeDestroy:function(){this.chart&&(this.chart.dispose(),this.chart=null)},methods:{initChart:function(){function t(t,e){var a=e.coord([e.value(1),0]),i=e.coord([e.value(2),0]),n=1.2*e.size([0,1])[1],s=F.a.graphic.clipRectByRect({x:a[0],y:a[1]-n/2,width:i[0]-a[0],height:n},{x:t.coordSys.x,y:t.coordSys.y,width:t.coordSys.width,height:t.coordSys.height});return s&&{type:"rect",shape:s,style:e.style()}}this.chart=F.a.init(document.getElementById(this.id)),this.chart.setOption({tooltip:{formatter:function(t){var e=t.value[3]?t.value[3]:t.value[2];return t.marker+t.name+"<br />"+e},backgroundColor:"#fff",borderColor:"#ddd",borderWidth:1,textStyle:{color:"#333333"},padding:10},dataZoom:{type:"slider",top:70,height:5,fillerColor:"rgba(230,230,230,0.5)",borderColor:"rgba(230,230,230,0.5)",handleIcon:"M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",handleSize:"250%"},grid:{show:!0,backgroundColor:"rgba(0,112,244,0.05)",borderWidth:0,left:60,right:40,top:10,height:50},xAxis:{scale:!0,boundaryGap:!1,type:"time",splitNumber:10,minInterval:1,minorTick:{show:!0,splitNumber:10,lineStyle:{}},axisTick:{show:!0,inside:!0},splitLine:{show:!0},min:this.timeValue.length>0?this.timeValue[0]:null,max:this.timeValue.length>0?this.timeValue[1]:null},yAxis:{show:!1,gridIndex:0},series:{type:"custom",renderItem:t,itemStyle:{opacity:.8},encode:{x:[1,2],y:0},data:this.data}})}}},at=et,it=Object(w["a"])(at,Q,tt,!1,null,null,null),nt=it.exports,st=a("c1df"),ot=a.n(st),ct={name:"Overview",computed:Object(s["a"])({},Object(d["d"])(["theme","dataSourceValue"])),props:["show"],components:{TimeAxis:nt,Linkage:K},data:function(){return{types:[{name:"门诊",color:"#25a289"},{name:"住院",color:"#0070f4"},{name:"急诊",color:"#5507d7"}],personId:this.$route.params.personId,overViewData:null,timeAxisOne:null,timeAxisTwo:{xAxis:null,yAxis:null},more:!0,show3:!0,timeValue:[]}},created:function(){this.getOverViewInfo(),this.timeAxisPartOne(),this.timeAxisPartTwo()},methods:{timeAxisPartOne:function(){var t=this;v(this.personId).then((function(e){var a=[];e.obj.forEach((function(e){var i=t.types.filter((function(t){return e.type===t.name}));e.start===e.end&&(e.end=parseInt(e.end)+86400-1),"null"===e.end&&(e.end=parseInt(e.start)+86400-1),a.push({name:e.type,value:[0,new Date(1e3*parseInt(e.start)),new Date(1e3*parseInt(e.end)),ot()(1e3*parseInt(e.start)).format("YYYY/MM/DD")+"至"+ot()(1e3*parseInt(e.end)).format("YYYY/MM/DD")],itemStyle:{normal:{color:i[0].color}}})})),t.timeAxisOne=a})).catch((function(){}))},timeAxisPartTwo:function(){var t,e,a=this,i={id:null!==(t=null===(e=this.dataSourceValue)||void 0===e?void 0:e.id)&&void 0!==t?t:0,personId:this.personId};b(i).then((function(t){a.timeAxisTwo.yAxis=Object.values(t.obj.yAxis),t.obj.xAxis.map((function(e){e[1]=t.obj.yAxis[e[1]]})),a.timeAxisTwo.xAxis=t.obj.xAxis})).catch((function(){}))},getOverViewInfo:function(){var t,e,a=this,i={id:null!==(t=null===(e=this.dataSourceValue)||void 0===e?void 0:e.id)&&void 0!==t?t:0,personId:this.personId};m(i).then((function(t){var e=[];if(t.obj.data&&"{}"!==JSON.stringify(t.obj.fields)){var i=t.obj.data,n=t.obj.fields;for(var s in n)n[s]&&e.push({name:n[s],value:i[s]||"无"})}a.overViewData=e})).catch((function(){}))}}},lt=ct,rt=(a("acc5"),Object(w["a"])(lt,M,G,!1,null,"773ea274",null)),dt=rt.exports,ut=a("2b1d"),ht={name:"View360",computed:Object(s["a"])({},Object(d["d"])(["theme","viewId"])),components:{AddCollectObject:ut["a"],DetailsSidebar:k,BaseInfo:L,OtherInfoTwo:j,TableInfo:Y,Overview:dt},data:function(){return{nowTitle:"",personId:this.$route.params.personId,whichCom:"",personInfo:"",menu:[],baseData:null}},watch:{viewId:{immediate:!0,handler:function(t,e){0!==t?this.getViewData(t):(this.whichCom="",this.menu=[],this.viewData=null)}}},destroyed:function(){window.history.replaceState(null,null,document.URL)},created:function(){this.getPersonInfo()},methods:{titleVal:function(t){t&&(this.nowTitle=t)},getViewData:function(t){var e=this,a={personId:this.personId,parentId:t,pageNo:1,pageSize:10,dataItemCode:""};p(a).then((function(t){if(t.obj.menu&&t.obj.menu.length>0)e.baseData=null,e.menu=t.obj.menu,e.whichCom="TableInfo";else{e.menu=[];var a=[];if(t.obj.data&&t.obj.data.length>0){var i=JSON.parse(JSON.parse(t.obj.data[0])),n=t.obj.fields;for(var s in i)n[s]&&a.push({name:n[s],value:i[s]||"无"})}e.baseData=a,e.whichCom="BaseInfo"}})).catch((function(){}))},getPersonInfo:function(){var t=this;f(this.personId).then((function(e){t.personInfo=JSON.parse(JSON.parse(e.obj[0]))})).catch((function(){}))}}},pt=ht,ft=(a("b394"),Object(w["a"])(pt,i,n,!1,null,"8e625b8a",null));e["default"]=ft.exports},c2b8:function(t,e,a){},c3c5:function(t,e,a){"use strict";var i=a("d1de"),n=a.n(i);n.a},d1de:function(t,e,a){},da42:function(t,e,a){},db39:function(t,e,a){},e32b:function(t,e,a){},e435:function(t,e,a){"use strict";var i=a("6ce35"),n=a.n(i);n.a},f4ca:function(t,e,a){},f5f1:function(t,e,a){"use strict";var i=a("f4ca"),n=a.n(i);n.a}}]);