(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-022ed0c6"],{"31fb":function(t,e,s){"use strict";var o=s("5189"),n=s.n(o);n.a},5189:function(t,e,s){},"80fb":function(t,e,s){t.exports=s.p+"img/pic.8ec3569b.png"},a2d3:function(t,e,s){},af30:function(t,e,s){"use strict";var o=s("c1f4"),n=s.n(o);n.a},c1f4:function(t,e,s){},d9c9:function(t,e,s){"use strict";s.r(e);var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login-container"},[s("div",{staticClass:"login-main"},[s("div",{staticClass:"login-wraps"},[s("div",{staticClass:"title-container"},[s("h1",{staticClass:"title"},[t._v(t._s(t.title))])]),s("div",{staticClass:"message-container"},[t._m(0),s("div",{staticClass:"login"},[s("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:t.loginForm,rules:t.loginRules,autocomplete:"on","label-position":"left"}},[s("h2",{staticClass:"info"},[t._v("欢迎您，请登录！")]),s("el-form-item",{attrs:{label:"用户名",prop:"username"}},[s("el-input",{ref:"username",attrs:{placeholder:"请输入用户名",name:"username",type:"text",tabindex:"1",autocomplete:"on"},model:{value:t.loginForm.username,callback:function(e){t.$set(t.loginForm,"username",e)},expression:"loginForm.username"}}),s("span",{staticClass:"svg-container"},[s("svg-icon",{attrs:{"icon-class":"yonghuming"}})],1)],1),s("el-form-item",{staticStyle:{"margin-top":"10px"},attrs:{label:"密码",prop:"password"}},[s("el-input",{ref:"password",attrs:{type:t.passwordType,placeholder:"请输入密码",name:"password",tabindex:"2",autocomplete:"on"},on:{blur:function(e){t.capsTooltip=!1}},nativeOn:{keyup:function(e){return t.checkCapslock(e)}},model:{value:t.loginForm.password,callback:function(e){t.$set(t.loginForm,"password",e)},expression:"loginForm.password"}}),s("span",{staticClass:"svg-container"},[s("svg-icon",{attrs:{"icon-class":"mima"}})],1),s("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[s("svg-icon",{attrs:{"icon-class":"password"===t.passwordType?"yincang":"xianshi1"}})],1)],1),s("el-form-item",{staticStyle:{"margin-top":"5px"}},[s("div",{staticClass:"tip"},[s("el-checkbox",{model:{value:t.rememberPassword,callback:function(e){t.rememberPassword=e},expression:"rememberPassword"}},[t._v("记住密码")]),s("router-link",{attrs:{to:""}},[t._v("忘记密码？")])],1)]),s("el-button",{staticStyle:{width:"100%",height:"45px",border:"none","margin-top":"30px"},attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(e){return e.preventDefault(),t.handleLogin(e)}}},[t._v("登 录")])],1)],1)])])]),s("div",{staticClass:"footer"},[s("Footer")],1)])},n=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"pic"},[o("img",{attrs:{src:s("80fb"),alt:""}})])}],r=(s("13d5"),s("b64b"),s("5530")),a=s("da0c"),i=s("2f62"),c={name:"Login",components:{Footer:a["a"]},computed:Object(r["a"])({},Object(i["d"])(["title"])),data:function(){var t=function(t,e,s){e?s():s(new Error("请输入用户名"))},e=function(t,e,s){e.length<6?s(new Error("请输入正确密码")):s()};return{passwordType:"password",loginForm:{username:"test2",password:"1q2w3e4r"},loginRules:{username:[{required:!1,trigger:"blur",validator:t}],password:[{required:!1,trigger:"blur",validator:e}]},rememberPassword:!1,loading:!1,redirect:void 0,otherQuery:{}}},watch:{$route:{handler:function(t){var e=t.query;e&&(this.redirect=e.redirect,this.otherQuery=this.getOtherQuery(e))},immediate:!0}},created:function(){},mounted:function(){""===this.loginForm.username?this.$refs.username.focus():""===this.loginForm.password&&this.$refs.password.focus()},destroyed:function(){},methods:Object(r["a"])(Object(r["a"])({},Object(i["e"])(["app/CHANGE_SHOWSEETING"])),{},{handleLogin:function(){var t=this;this.$refs.loginForm.validate((function(e){if(!e)return console.log("error submit!!"),!1;t.loading=!0,t.$store.dispatch("user/login",t.loginForm).then((function(){t["app/CHANGE_SHOWSEETING"](!0),t.$router.push({path:t.redirect||"/",query:t.otherQuery})})).catch((function(){t.loading=!1}))}))},getOtherQuery:function(t){return Object.keys(t).reduce((function(e,s){return"redirect"!==s&&(e[s]=t[s]),e}),{})},checkCapslock:function(t){var e=t.key;this.capsTooltip=e&&1===e.length&&e>="A"&&e<="Z"},showPwd:function(){var t=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){t.$refs.password.focus()}))}})},l=c,u=(s("dd25"),s("af30"),s("2877")),d=Object(u["a"])(l,o,n,!1,null,"d102a276",null);e["default"]=d.exports},da0c:function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"copyright"},[t._v("Copyright 2020-2022 www.dchealth.com All Rights Reserved. 版权所有： "+t._s(t.copyright))])])},n=[],r=s("5530"),a=s("cf05"),i=s.n(a),c=s("2f62"),l={name:"LoginHeader",computed:Object(r["a"])({},Object(c["d"])(["copyright"])),watch:{notifyStatus:function(){this.notifyStatus&&this.unread()}},data:function(){return{logo:i.a,isDot:!1,number:""}},mounted:function(){},methods:{toMessage:function(){this.$router.push({name:"getMessage"})}}},u=l,d=(s("31fb"),s("2877")),p=Object(d["a"])(u,o,n,!1,null,"39bcfe6b",null);e["a"]=p.exports},dd25:function(t,e,s){"use strict";var o=s("a2d3"),n=s.n(o);n.a}}]);