(function(t){function e(e){for(var n,r,l=e[0],i=e[1],c=e[2],d=0,p=[];d<l.length;d++)r=l[d],o[r]&&p.push(o[r][0]),o[r]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);u&&u(e);while(p.length)p.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],n=!0,l=1;l<a.length;l++){var i=a[l];0!==o[i]&&(n=!1)}n&&(s.splice(e--,1),t=r(r.s=a[0]))}return t}var n={},o={app:0},s=[];function r(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=n,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(a,n,function(e){return t[e]}.bind(null,n));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],i=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var u=i;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var n=a("64a9"),o=a.n(n);o.a},"14ba":function(t,e,a){},"245a":function(t,e,a){"use strict";a.r(e);var n=a("f499"),o=a.n(n),s=(a("ac6a"),a("e814")),r=a.n(s),l={getData:function(t){if(window.localStorage[t]){var e=JSON.parse(window.localStorage[t]);return e}var a=[];return a},today:function(){var t=new Date;return t.toLocaleDateString()},remainDays:function(t){var e=Date.parse(t),a=Date.parse(new Date),n=Math.abs(r()((a-e)/1e3/3600/24))+1;return n||0},plansSort:function(t){for(var e=[1,2,3,4],a=[],n=function(n){a=a.concat(t.filter(function(t){return t.level==e[n]}))},o=0;o<e.length;o++)n(o);return a}},i=l,c=a("96eb");c.mock("/api/getplans",function(t,e){var a=i.getData("plans");if(console.log(a),JSON.parse(t.body).plan_id)return a.filter(function(e){return e.id==JSON.parse(t.body).plan_id});if(JSON.parse(t.body).pid)return i.plansSort(a.filter(function(e){return e.pid==JSON.parse(t.body).pid}));var n={};return a.forEach(function(t){t.total==t.done||t.total<t.done?t.status=10:Date.parse(t.end_at)<Date.parse(i.today())&&(t.status=9),t.update_time!=i.today()&&(t.update_time=i.today(),t.today_done=0),t.per_now=((t.total-0-t.done)/i.remainDays(t.end_at)).toFixed(2)}),localStorage.plans=o()(a),n.alive=a.filter(function(t){return 0==t.status}),n.completed=a.filter(function(t){return 10==t.status}),n.dead=a.filter(function(t){return 9==t.status}),n.show=i.plansSort(n.alive.filter(function(t){var e=new Date,a=e.getDay();return(t.total-t.done)/i.remainDays(t.end_at)>t.per?(t.per_now=(t.total-t.done)/i.remainDays(t.end_at),t.delay=1,t):1==t.type&&0==a?t:5==t.type&&6!=a&&0!=a?t:6==t.type&&0!=a?t:7==t.type?t:t.end_at==i.today()?t:void 0})),n});a("cadf"),a("551c"),a("f751"),a("097d");var u=a("96eb");u.mock("/api/getprojects",function(t,e){var a=i.getData("projects"),n=JSON.parse(t.body);if(n)for(var o={},s=a.length,r=0;r<s;r++){var l=r;if(a[l].id==n.id)return o=a[l],o}var c={dead:[],alive:[]};return a.filter(function(t){Date.parse(new Date)>Date.parse(t.end_at)?c.dead.push(t):c.alive.push(t)}),c});a("7514");var d=a("96eb");d.mock("/api/update_plan",function(t,e){var a=JSON.parse(t.body),n=i.getData("plans"),s=n.find(function(t){return t.id==a.plan.id});return n.forEach(function(t){if(t.id==a.plan.id){var e=JSON.parse(a.update_value)-0;t.done+=e,t.today_done+=e}}),s||(a.plan.today_done=0,a.plan.update_time=i.today(),n.push(a.plan)),localStorage.plans=o()(n),n});var p=a("96eb");p.mock("/api/update_project",function(t,e){var a=JSON.parse(t.body),n=i.getData("projects");console.log(n),console.log("data.length"+n.length);for(var s=0,r=0;r<n.length;r++)console.log(n[r].id);return console.log(s),0==s&&(n.push(a),console.log(n),localStorage.projects=o()(n)),n});var m=a("96eb");m.mock("/api/close_plan",function(t,e){var a=i.getData("plans");return a.forEach(function(e){e.id==t.body&&(e.status=9)}),localStorage.plans=o()(a),{flag:"success"}});a("96eb")},"26ed":function(t,e,a){"use strict";var n=a("35c7"),o=a.n(n);o.a},"2c0b":function(t,e,a){t.exports=a.p+"img/wancheng.9423b153.png"},"30e8":function(t,e,a){},"35c7":function(t,e,a){},"363f":function(t,e,a){},4678:function(t,e,a){var n={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-SG":"cdab","./en-SG.js":"cdab","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function o(t){var e=s(t);return a(e)}function s(t){var e=n[t];if(!(e+1)){var a=new Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}return e}o.keys=function(){return Object.keys(n)},o.resolve=s,t.exports=o,o.id="4678"},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var n=a("2b0e"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("img",{staticClass:"bg",attrs:{src:this.$store.state.global.theme.bgi,alt:""}}),a("header-vue",{staticClass:"header",attrs:{title:t.title}}),a("router-view",{staticClass:"main",on:{getMessage:t.showMsg}}),a("footer-vue",{staticClass:"footer",staticStyle:{width:"100%"},attrs:{show:t.show}})],1)},s=[],r={grey:a("9f3d"),pink:a("62ff"),blue:a("cd89")},l=r,i=(a("c511"),{created:function(){console.log(this.$store.state.global.theme),this.width=window.screen.width,this.height=window.screen.height},data:function(){return{show:"",title:"角虫养成计划",bgi:"@/assets/img/bgm/bg.png",width:"",height:""}},methods:{showMsg:function(t){this.show=t}}}),c=i,u=(a("034f"),a("2877")),d=Object(u["a"])(c,o,s,!1,null,null,null),p=d.exports,m=a("30f4"),f=a("dd88"),h=a("4d7d"),v=(a("aa12"),a("d6f6"),a("2f62")),b={state:{plans:[],projects:[],test:"23333333333"},mutations:{GET_PLANS:function(t,e){t.plans=e}},actions:{}},j=b,g={state:{plans:[],projects:[]},mutations:{GET_PLANS:function(t,e){t.plans=e}},actions:{}},_=g,y={test:function(t){return t.projects.test}},w=y,k={state:{theme_all:[{color:"grey900",bgi:l.grey},{color:"pink200",bgi:l.pink},{color:"blue200",bgi:l.blue}],theme:{color:"grey900",bgi:l.grey}},mutations:{CHANGE_THEME:function(t,e){t.theme=e}},actions:{changeTheme:function(t){t.commit("CHANGE_THEME",t)}}},x=k;n["a"].use(v["a"]);var S=new v["a"].Store({modules:{users:_,projects:j,global:x},getters:w}),D=S,F=a("bc3a"),O=a.n(F),C=(a("30e8"),a("c1df"),a("8c4f")),A=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("mu-appbar",{staticClass:"header-bar",attrs:{color:this.$store.state.global.theme.color}},[t._v("\n    "+t._s(t.title)+"\n    ")])],1)},P=[],z={props:["title"],data:function(){return{}},methods:{}},E=z,M=Object(u["a"])(E,A,P,!1,null,"7d5bedac",null),N=M.exports,T=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("mu-container",[a("mu-bottom-nav",{attrs:{value:t.show,color:this.$store.state.global.theme.color,shift:""},on:{"update:value":function(e){t.show=e}}},[a("mu-bottom-nav-item",{attrs:{value:"project",title:"项目进度",icon:":iconfont icon-fenlei1",to:{name:"project"}}}),a("mu-bottom-nav-item",{attrs:{value:"todo",title:"今日计划",icon:":iconfont\n         icon-yanchurili",to:{name:"home"}}}),a("mu-bottom-nav-item",{attrs:{value:"mine",title:"我的",icon:":iconfont icon-wodedamaijihuo",to:{name:"mine"}}})],1)],1)],1)},J=[],L={props:["show"],created:function(){},data:function(){return{shift:"todo",theme:""}},methods:{}},R=L,I=(a("f267"),Object(u["a"])(R,T,J,!1,null,null,null)),H=I.exports,q=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"plan_list_box"},[this.todo_list.length?t._e():a("mu-button",{staticClass:"create_tips",attrs:{color:this.$store.state.global.theme.color,to:{name:"project"}}},[t._v("没有进行中的计划，戳我去添加~")]),this.todo_list.length?a("mu-list",{attrs:{textline:"two-line"}},[a("mu-sub-header",[t._v("今天也要元气满满加油鸭O(∩_∩)O~~")]),t._l(t.todo_list,function(e){return a("plan-item",{key:e.id,attrs:{plan:e},on:{"checked-plan":t.checkedPlan},nativeOn:{click:function(e){return t.test(e)}}})})],2):t._e(),t.done_list.length?a("mu-list",{staticClass:"add_margin",attrs:{textline:"two-line"}},[a("mu-sub-header",[t._v("以下为今日份已完成的任务菌们")]),t._l(t.done_list,function(e){return a("plan-item",{key:e.id,attrs:{plan:e,done:1},on:{"checked-plan":t.checkedPlan}})})],2):t._e()],1)},G=[],U=a("f499"),B=a.n(U),V=(a("c5f6"),a("e814")),K=a.n(V),Q=a("21a6");function W(){var t=new Date;return t.toLocaleDateString()}function X(t){if(!t)return t="[]",[];if(JSON.parse(t).length>0){var e=JSON.parse(t);return e}}function Y(){var t=new Date;return t.getTime()}function Z(t){var e=t-0;return K()(e)==e?e:K()(100*e)<=100*e?Math.round(100*e)/100:K()(10*e)==10*e?K()(10*e)/10:void 0}function tt(t){var e=Date.parse(t),a=Date.parse(new Date),n=Math.abs(K()((a-e)/1e3/3600/24))+1;return n||0}function et(t,e){var a=B()(t),n=new Blob([a],{type:"text/plain;charset=utf-8"});Object(Q["saveAs"])(n,e+".json")}a("7f7f");var at=a("795b"),nt=a.n(at),ot=O.a.create({baseURL:"/",timeout:5e3});ot.interceptors.request.use(function(t){return t},function(t){return nt.a.reject(t)}),ot.interceptors.response.use(function(t){return t},function(t){return nt.a.reject(t)});var st=ot,rt={getList:function(t,e){var a=st({method:"get",url:"/api/getplans",data:{pid:t,plan_id:e}});return a},updatePlan:function(t,e){var a=st({method:"post",url:"/api/update_plan",data:{plan:{id:t.id,ver:t.ver,name:t.name,created_at:t.created_at,end_at:t.end_at,total:t.total,per:t.per,unit:t.planunit,level:t.planlevel,type:t.plantype,pid:t.pid,status:t.status,done:t.done,today_done:""|t.today_done,per_now:t.per_now|t.per},update_value:B()(e)}});return a},closePlan:function(t){var e=st({method:"post",url:"/api/close_plan",data:t});return e}},lt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("mu-list-item",{attrs:{avatar:"",ripple:!1,button:""}},[a("mu-list-item-content",[a("mu-list-item-title",[a("mu-icon",{attrs:{size:"20",value:":iconfont icon-weiguanzhu",color:t.iconColor(t.plan.level)}}),a("span",{class:{done:t.done}},[t._v(t._s(t.plan.name))])],1),t.done?a("mu-list-item-sub-title",[t._v("今日已完成"+t._s(t.dataHelper(t.plan.today_done)+t.plan.unit)+"~加个鸡腿~")]):a("mu-list-item-sub-title",{class:{delay:t.plan.delay}},[t._v(t._s("今日已完成:"+t.dataHelper(t.plan.today_done)+t.plan.unit+",待完成:"+t.dataHelper((t.plan.delay?t.plan.per_now:t.plan.per)-t.plan.today_done)+t.plan.unit))])],1),a("mu-list-item-action",[a("mu-checkbox",{attrs:{color:"yellow700",value:t.plan.id,"uncheck-icon":":iconfont icon-xuanzhong"},on:{click:t.checked}})],1)],1)],1)},it=[],ct={props:["plan","done"],created:function(){},data:function(){return{}},methods:{dataHelper:function(t){return Z(t)},checked:function(){this.$emit("checked-plan",this.plan)},iconColor:function(t){switch(t){case 1:return"red400";case 2:return"yellow800";case 3:return"blue300";case 4:return"green200"}}}},ut=ct,dt=(a("b6ed"),Object(u["a"])(ut,lt,it,!1,null,"4fde7790",null)),pt=dt.exports,mt=(a("aede"),{components:{planItem:pt},created:function(){this.getPlans(),console.log(this.todo_list.length),this.$emit("getMessage",this.show),$("body,html").animate({scrollTop:0},100)},computed:{},data:function(){return{show:"todo",selects:[],todo_list:[],done_list:[],vers:[{name:"普通计划（当天完成定量）",value:0},{name:"角虫养成计划（当天可多次完成）",value:1},{name:"项目计划（当天完成定量，有目标）",value:2}]}},methods:{test:function(){console.log("item被点击")},getPlans:function(){var t=this;rt.getList().then(function(e){t.todo_list=e.data.show.filter(function(t){return!t.delay&&t.today_done<t.per?t:t.delay&&t.today_done<t.per_now?t:void 0}),t.done_list=e.data.show.filter(function(t){return!t.delay&&t.today_done>=t.per?t:t.delay&&t.today_done>=t.per_now?t:void 0})}).catch(function(t){alert(error)})},checkedPlan:function(t){var e=this;this.$prompt("今日已完成"+Z(t.today_done)+t.unit+"，全部剩余"+Z(100*(t.total-t.done)/t.total)+"%","请输入完成量",{validator:function(t){return{valid:/[0-9]/.test(t),message:"请输入数字"}}}).then(function(a){var n=a.result,o=a.value;n?rt.updatePlan(t,o).then(function(a){e.getPlans(),e.$toast.message("继续加油鸭"),!(t.today_done>t.per_now)&&$("#"+id).fadeOut()}).catch(function(t){}):e.$toast.message("少年还需努力啊")})}},position:"bottom-end",close:!1}),ft=mt,ht=(a("26ed"),Object(u["a"])(ft,q,G,!1,null,"34fa2a06",null)),vt=ht.exports,bt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("mu-sub-header",[t._v(t._s(t.projects.alive.length?"进行中的项目":"没有进行中的项目，点击下方“+”按钮新建"))]),a("mu-button",{staticClass:"add",attrs:{fab:"",color:this.$store.state.global.theme.color},on:{click:t.ensure}},[a("mu-icon",{attrs:{value:":iconfont icon-jiajianzujianjiahao"}})],1),a("mu-grid-list",{staticClass:"project"},t._l(t.projects.alive,function(e){return a("project-item",{key:e.id,staticClass:"project_list",attrs:{project:e,fetch:t.fetch},on:{getId:t.closeId}})}),1),t.projects.dead.length?a("div",[a("mu-sub-header",[t._v("已结束的项目")]),a("mu-grid-list",{staticClass:"project"},t._l(t.projects.dead,function(e){return a("project-item",{key:e.id,staticClass:"project_list",attrs:{project:e,fetch:t.fetch},on:{getId:t.closeId}})}),1)],1):t._e(),a("mu-dialog",{attrs:{title:"你的项目菌们很蓝瘦",width:"360",open:t.openSimple},on:{"update:open":function(e){t.openSimple=e}}},[t._v("\n    你已经拥有4个项目菌啦！先好好对待他们~\n    "),a("mu-button",{attrs:{slot:"actions",flat:"",color:"primary"},on:{click:t.closeSimpleDialog},slot:"actions"},[t._v("宝宝们我错了")])],1),a("mu-dialog",{attrs:{width:"600","max-width":"80%",open:t.openAlert},on:{"update:open":function(e){t.openAlert=e}}},[t._v("\n      计划尚未完成，确定要结束?\n      "),a("mu-button",{attrs:{slot:"actions",flat:"",color:"primary"},on:{click:function(e){t.openAlert=!1}},slot:"actions"},[t._v("我再想想")]),a("mu-button",{attrs:{slot:"actions",flat:"",color:"secondary"},on:{click:t.closePlan},slot:"actions"},[t._v("我意已决")])],1)],1)},jt=[],gt=(a("c5a3"),a("363f"),{getProjects:function(t){var e=st({method:"get",url:"/api/getprojects",data:{status:0,id:t||""}});return e},updateProject:function(t){var e=st({method:"post",url:"/api/update_project",data:t});return e}}),_t=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("mu-expansion-panel",[a("div",{attrs:{slot:"header"},slot:"header"},[t._v("\n      "+t._s(t.project.name)+"\n      "),Date.parse(new Date)<Date.parse(t.project.end_at)?a("span",[t._v("（"+t._s(t.remain())+"天后结束）")]):t._e()]),t._l(t.plans,function(e){return a("mu-list",{key:e.id,staticClass:"list"},[a("plan-list",{attrs:{plan:e,fetch:t.fetch},on:{sendId:t.closeId}})],1)}),Date.parse(new Date)<Date.parse(t.project.end_at)?a("mu-button",{attrs:{slot:"action",flat:"",color:"primary",to:{name:"newplan",query:{pid:t.project.id}}},slot:"action"},[t._v("新建计划")]):t._e()],2)],1)},yt=[],wt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("mu-list-item",[n("mu-list-item-content",[9==t.plan.status?n("img",{staticStyle:{width:"3.5rem",position:"absolute",right:"1rem"},attrs:{src:a("b131")}}):t._e(),10==t.plan.status?n("img",{staticStyle:{width:"3.5rem",position:"absolute",right:"1rem"},attrs:{src:a("2c0b")}}):t._e(),n("mu-list-item-title",[t._v(t._s(t.plan.name))]),n("mu-list-item-sub-title",[t._v("共"+t._s(t.plan.total)+t._s(t.plan.unit)+"，剩余"+t._s(t.plan.total-t.plan.done)+t._s(t.plan.unit))])],1),n("mu-list-item-action",[0==t.plan.status?n("mu-button",{attrs:{icon:""},on:{click:function(e){t.close_plan()}}},[n("mu-icon",{attrs:{value:":iconfont icon-guanbi"}})],1):t._e()],1)],1)],1)},kt=[],xt={props:["plan"],watch:{plan:function(t){}},data:function(){return{openAlert:!0,old_fetch:""}},methods:{close_plan:function(){console.log("plan_close",this.plan.id),this.$emit("sendId",this.plan.id)}}},St=xt,$t=Object(u["a"])(St,wt,kt,!1,null,null,null),Dt=$t.exports,Ft={props:["project","fetch"],components:{planList:Dt},watch:{fetch:function(t){this.fetchData()}},created:function(){this.fetchData(),this.old_fetch=this.fetch,console.log(this.fetch)},data:function(){return{plans:[],old_fetch:""}},methods:{fetchData:function(){var t=this;rt.getList(this.project.id).then(function(e){t.plans=e.data})},closeId:function(t){this.$emit("getId",t)},remain:function(){return tt(this.project.end_at)}}},Ot=Ft,Ct=Object(u["a"])(Ot,_t,yt,!1,null,"73142ad1",null),At=Ct.exports,Pt={components:{projectItem:At},mounted:function(){this.$emit("getMessage",this.show)},created:function(){this.fetchPlan(),rt.getList().then(function(t){}),$("body,html").animate({scrollTop:0},100)},data:function(){return{active_project:"",projects:"",fetch:0,close_id:"",openAlert:!1,indexes:"",open:!1,show:"project",openSimple:!1,plans:"",openFullscreen:!1,list:[],vers:[{name:"角虫养成计划（当天可多次完成）",value:1},{name:"项目计划（当天完成定量，有目标）",value:2}],project_id:""}},methods:{fetchPlan:function(){var t=this;gt.getProjects().then(function(e){t.projects=e.data,console.log("fetchPlan",t.projects.dead)})},closeId:function(t){this.openAlert=!0,this.close_id=t},closePlan:function(){var t=this;rt.closePlan(this.close_id).then(function(e){"success"==e.data.flag&&(t.fetchPlan(),t.fetch=1,t.openAlert=!1)})},closeSimpleDialog:function(){this.openSimple=!1},ensure:function(){this.list.length>4||4==this.list.length?this.openSimple=!0:this.$router.push({name:"newproject"})}}},zt=Pt,Et=(a("9d6c"),Object(u["a"])(zt,bt,jt,!1,null,"afa33dcc",null)),Mt=Et.exports,Nt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("mu-form",{ref:"form",staticClass:"projectform",attrs:{model:t.validateForm}},[a("mu-form-item",{attrs:{label:"项目名称","help-text":"汉字、字母或字符，不要超过10个字",prop:"projectname",rules:t.projectnameRules}},[a("mu-text-field",{attrs:{id:"name",color:this.$store.state.global.theme.color,prop:"projectname"},model:{value:t.validateForm.projectname,callback:function(e){t.$set(t.validateForm,"projectname",e)},expression:"validateForm.projectname"}})],1),a("mu-form-item",{attrs:{label:"开始时间",prop:"projectstart",rules:t.startRules}},[a("mu-date-input",{attrs:{id:"start",color:this.$store.state.global.theme.color,"full-width":"",prop:"projectstart","no-display":"",container:"bottomSheet"},model:{value:t.validateForm.projectstart,callback:function(e){t.$set(t.validateForm,"projectstart",e)},expression:"validateForm.projectstart"}})],1),a("mu-form-item",{attrs:{label:"结束时间",prop:"projectend",rules:t.endRules}},[a("mu-date-input",{attrs:{id:"end",color:this.$store.state.global.theme.color,"full-width":"",prop:"projectend","no-display":"",container:"bottomSheet"},model:{value:t.validateForm.projectend,callback:function(e){t.$set(t.validateForm,"projectend",e)},expression:"validateForm.projectend"}})],1),a("mu-form-item",{staticClass:"button_box"},[a("mu-button",{attrs:{color:this.$store.state.global.theme.color},on:{click:t.submit}},[t._v("创建")]),a("mu-button",{attrs:{to:{name:"project"}}},[t._v("返回")])],1)],1)],1)},Tt=[],Jt={props:["list"],mounted:function(){this.$emit("getMessage",this.show)},created:function(){var t=localStorage.projects;console.log(t),$("body,html").animate({scrollTop:0},100)},data:function(){return{show:"project",openAlert:!1,projectnameRules:[{validate:function(t){return!!t},message:"必须填写项目名称"},{validate:function(t){return t.length<11},message:"项目名称太长啦臣妾记不住啊"}],startRules:[{validate:function(t){return!!t},message:"请选择时间"}],endRules:[{validate:function(t){return!!t},message:"请选择时间"},{validate:function(t){return Date.parse(t)>=Date.parse($("#start").val())},message:"结束时间不要小于开始时间哦~"}],validateForm:{projectname:"",projectstart:"",projectend:""}}},methods:{submit:function(){var t=this;this.$refs.form.validate().then(function(e){if(console.log(55555),e){var a={};a.id=Y(),a.name=t.validateForm.projectname.trim(),a.start_at=t.validateForm.projectstart.toLocaleDateString(),a.end_at=t.validateForm.projectend.toLocaleDateString(),console.log(a),gt.updateProject(a).then(function(t){console.log(t)}),console.log(localStorage.projects)}})},openAlertDialog:function(){this.openAlert=!0},closeAlertDialog:function(){this.openAlert=!1}}},Lt=Jt,Rt=Object(u["a"])(Lt,Nt,Tt,!1,null,"43237d56",null),It=Rt.exports,Ht=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{height:"100%"}},[a("mu-paper",{staticStyle:{height:"100%"},attrs:{"z-depth":1}},[a("mu-list",[a("mu-list-item",{attrs:{button:""},on:{click:function(e){t.openAlert=!0}}},[a("mu-list-item-action",[a("mu-icon",{attrs:{value:":iconfont icon-fenxiang"}})],1),a("mu-list-item-title",[t._v("删除数据")])],1),a("mu-list-item",{attrs:{button:""},on:{click:t.loadData}},[a("mu-list-item-action",[a("mu-icon",{attrs:{value:":iconfont icon-fenxiang"}})],1),a("mu-list-item-title",[t._v("导入测试数据")])],1)],1),a("mu-dialog",{attrs:{title:"确定要清除数据吗？",width:"600","max-width":"80%","esc-press-close":!1,"overlay-close":!1,open:t.openAlert},on:{"update:open":function(e){t.openAlert=e}}},[t._v("\n      删除后不可恢复\n      "),a("mu-button",{attrs:{slot:"actions",flat:"",color:"primary"},on:{click:function(e){t.openAlert=!1}},slot:"actions"},[t._v("手滑了")]),a("mu-button",{attrs:{slot:"actions",flat:"",color:"secondary"},on:{click:t.clear},slot:"actions"},[t._v("是的")])],1)],1)],1)},qt=[],Gt=a("7e56"),Ut=a("b7ee"),Bt={mounted:function(){this.$emit("getMassage",this.show)},created:function(){$("body,html").animate({scrollTop:0},100),this.$emit("getMessage",this.show)},data:function(){return{openAlert:!1,show:"mine"}},methods:{loadData:function(){localStorage.plans=B()(Gt),localStorage.projects=B()(Ut)},update:function(){localStorage.projects&&et(JSON.parse(localStorage.projects),"projects"),localStorage.plans&&et(JSON.parse(localStorage.plans),"plans"),localStorage.record&&et(JSON.parse(localStorage.record),"record")},clear:function(){localStorage.clear(),this.openAlert=!1},changeTheme:function(){this.$store.commit()}}},Vt=Bt,Kt=Object(u["a"])(Vt,Ht,qt,!1,null,null,null),Qt=Kt.exports,Wt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("mu-form",{ref:"form",staticClass:"newplanmain",attrs:{model:t.validateForm}},[a("mu-form-item",{attrs:{label:"计划名称","help-text":"汉字、字母或字符，不要超过10个字",prop:"name",rules:t.nameRules}},[a("mu-text-field",{attrs:{color:t.color,prop:"name"},model:{value:t.validateForm.name,callback:function(e){t.$set(t.validateForm,"name",e)},expression:"validateForm.name"}})],1),a("mu-form-item",{attrs:{label:"总目标","help-text":"数字，如100，不要超过10位数",prop:"total",rules:t.totalRules}},[a("mu-text-field",{attrs:{color:t.color,type:"number",prop:"total"},model:{value:t.validateForm.total,callback:function(e){t.$set(t.validateForm,"total",e)},expression:"validateForm.total"}})],1),a("mu-form-item",{attrs:{label:"单位","help-text":"数字，如页、课、小时等，不要超过5个字",prop:"planunit",rules:t.planunitRules}},[a("mu-text-field",{attrs:{color:t.color,prop:"planunit"},model:{value:t.validateForm.planunit,callback:function(e){t.$set(t.validateForm,"planunit",e)},expression:"validateForm.planunit"}})],1),a("mu-form-item",{staticClass:"radio",attrs:{label:"优先级",prop:"planlevel"}},t._l(t.levels,function(e,n){return a("mu-flex",{key:n,staticClass:"select-control-row"},[a("mu-radio",{staticClass:"radios",attrs:{color:"grey800",value:e.value,label:e.name},model:{value:t.validateForm.planlevel,callback:function(e){t.$set(t.validateForm,"planlevel",e)},expression:"validateForm.planlevel"}})],1)}),1),a("mu-form-item",{staticClass:"radio",attrs:{label:"周重复天数",prop:"plantype"}},t._l(t.types,function(e,n){return a("mu-flex",{key:n,staticClass:"select-control-row"},[a("mu-radio",{staticClass:"radios",attrs:{color:"grey800",value:e.value,label:e.name},model:{value:t.validateForm.plantype,callback:function(e){t.$set(t.validateForm,"plantype",e)},expression:"validateForm.plantype"}})],1)}),1),a("mu-form-item",{staticClass:"button_box"},[a("mu-button",{attrs:{color:t.color},on:{click:t.submit}},[t._v("下一步")]),a("mu-button",{attrs:{to:{name:"home"}}},[t._v("返回")])],1),a("mu-dialog",{attrs:{title:"每日完成"+t.validateForm.per+t.validateForm.planunit,width:"600","max-width":"80%","esc-press-close":!1,"overlay-close":!1,open:t.openAlert},on:{"update:open":function(e){t.openAlert=e}}},[t._v("\n      剩余"+t._s(t.remain_days)+"天\n      "),a("mu-button",{attrs:{slot:"actions",flat:"",color:"primary"},on:{click:t.closeAlertDialog},slot:"actions"},[t._v("返回修改")]),a("mu-button",{attrs:{slot:"actions",flat:"",color:"primary"},on:{click:t.createPlan},slot:"actions"},[t._v("领养计划")])],1)],1)],1)},Xt=[],Yt={mounted:function(){this.$emit("getMessage",this.show)},created:function(){var t=this;$("body,html").animate({scrollTop:0},100);var e=this.$route.query.pid;this.update=this.$route.query.id,gt.getProjects(e).then(function(a){console.log(a.data),t.validateForm.end_at=a.data.end_at,t.validateForm.pid=e})},data:function(){return{color:this.$store.state.global.theme.color,ver:"",update:"",remain_days:"",now:"",list:[],show:"project",openAlert:!1,types:[{name:"7天（周一~周日）",value:7},{name:"6天（周一~周六）",value:6},{name:"5天（周一~周五）",value:5},{name:"1天（周日）",value:1}],levels:[{name:"很重要（当天必须完成）",value:1},{name:"一般重要（可以推到第二天）",value:2},{name:"重要（没有明确规定完成时间）",value:3},{name:"不重要（仅备忘）",value:4}],nameRules:[{validate:function(t){return!!t},message:"必须填写计划名称"},{validate:function(t){return t.length<=10},message:"计划名称太长啦臣妾记不住啊"}],totalRules:[{validate:function(t){return!!t},message:"必须填写总目标"},{validate:function(t){return t.length<=10},message:"大佬你确定这辈子可以完成？（害怕脸）"}],planunitRules:[{validate:function(t){return!!t},message:"必须填写单位"},{validate:function(t){return t.length<=5},message:"哇~单位这么长的嘛？"}],validateForm:{id:Y(),name:"",total:"",per:"",planunit:"",plantype:7,pid:0,ver:0,planlevel:1,created_at:"",end_at:"",status:0,done:0}}},methods:{freshData:function(){},openFullscreenDialog:function(){this.openFullscreen=!0},openAlertDialog:function(){this.openAlert=!0},closeAlertDialog:function(){this.openAlert=!1},createPlan:function(){var t=this;console.log(this.validateForm),rt.updatePlan(this.validateForm).then(function(e){t.$router.push({name:"project"})})},submit:function(){var t=this;this.$refs.form.validate().then(function(e){t.validateForm.created_at=W(),t.remain_days=tt(t.validateForm.end_at)?tt(t.validateForm.end_at):1,e&&(t.validateForm.per=(t.validateForm.total/t.remain_days).toFixed(2),t.openAlertDialog())})}}},Zt=Yt,te=Object(u["a"])(Zt,Wt,Xt,!1,null,"15ed5d5d",null),ee=te.exports,ae=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"detail"},t._l(t.plans,function(e,n){return a("mu-expansion-panel",{key:n,style:t.statusColor(e.status)},[a("div",{attrs:{slot:"header"},slot:"header"},[a("mu-icon",{attrs:{size:"20",value:":iconfont icon-weiguanzhu",color:t.iconColor(e.level)}}),t._v("\n      "+t._s(e.name)+"\n    ")],1),t._v("\n    "+t._s(t.statusText(e.status))+"，共"+t._s(e.total)+t._s(e.unit)+",已完成"+t._s(e.done)+t._s(e.unit)+",剩余"+t._s(e.total-e.done)+t._s(e.unit)+"，计划进行到"+t._s(Math.floor(e.done/e.total*100))+"%\n    "),0==e.status?a("mu-button",{attrs:{slot:"action",flat:""},on:{click:function(a){t.kill(e.id)}},slot:"action"},[t._v("结束这个计划")]):t._e()],1)}),1)},ne=[],oe={computed:{},mounted:function(){this.$emit("getMessage",this.show)},created:function(){$("body,html").animate({scrollTop:0},100),this.p_id=this.$route.query.id,this.refresh()},data:function(){return{openAlert:!1,p_id:"",show:"project",plans:[]}},methods:{refresh:function(){for(var t=X(localStorage.plans),e=0;e<t.length;e++){var a=e;console.log(t[e].pid),t[a].pid==this.p_id&&this.plans.push(t[a])}},iconColor:function(t){switch(t){case 1:return"red400";case 2:return"yellow800";case 3:return"blue300";case 4:return"green200"}},statusColor:function(t){switch(t){case 0:return"background-color:#fafafa";case 10:return"background-color:#eeeeee";case 9:return"background-color:#eeeeee"}},statusText:function(t){switch(t){case 0:return"任务正在进行中";case 10:return"任务已完成~撒花";case 9:return"很遗憾，任务已结束"}},kill:function(t){console.log(this.plans.length);for(var e=0;e<this.plans.length;e++){console.log("233");var a=e;console.log(a),this.plans[e].id==t&&(this.plans[a].status=10)}console.log(this.plans),localStorage.plans=B()(this.plans)}}},se=oe,re=(a("adbb"),Object(u["a"])(se,ae,ne,!1,null,"7d2cfc75",null)),le=re.exports;n["a"].use(C["a"]),n["a"].component("headerVue",N),n["a"].component("footerVue",H);var ie=[{path:"/",redirect:{name:"home"}},{name:"home",path:"/todo",component:vt},{name:"project",path:"/projects",component:Mt,children:[]},{name:"pro_detail",path:"/project_detail",component:le},{name:"mine",path:"/mine",component:Qt},{name:"newproject",path:"/projects/new",component:It},{name:"newplan",path:"/plan/new",component:ee}],ce=new C["a"]({scrollBehavior:function(){return{y:0}},routes:ie});n["a"].use(m["a"]),n["a"].use(h["a"]),n["a"].use(f["a"],{close:!1,position:"top"}),n["a"].use(v["a"]),n["a"].prototype.$axios=O.a,n["a"].config.productionTip=!1,a("245a"),new n["a"]({el:"#app",router:ce,store:D,render:function(t){return t(p)}})},"62ff":function(t,e,a){t.exports=a.p+"img/pink.5d09d080.jpg"},"64a9":function(t,e,a){},"78eb":function(t,e,a){},"7e56":function(t){t.exports=[{id:1580973975873,ver:0,name:"看书",created_at:"2020/2/6",end_at:"2020/2/6",total:"123",per:"12.00",unit:"页",level:4,type:7,pid:1580973969207,status:0,done:0,today_done:0,per_now:123,update_time:"2020/2/2"},{id:1580973975874,ver:0,name:"学习vue",created_at:"2020/2/6",end_at:"2020/2/16",total:"123",per:"3.00",unit:"节",level:4,type:7,pid:1580973969207,status:10,done:123,today_done:123,per_now:123,update_time:"2020/2/16"},{id:1580975214868,ver:0,name:"英语",created_at:"2020/2/6",end_at:"2020/2/6",total:"112",per:"112.00",unit:"课",level:1,type:7,pid:1580973969207,status:0,done:1.11,today_done:1.11,per_now:110.89,update_time:"2020/2/6"},{id:1580971114821,ver:0,name:"政治",created_at:"2020/2/6",end_at:"2020/2/6",total:"125",per:"2.00",unit:"课",level:1,type:7,pid:1580973969207,status:0,done:1.11,today_done:18,per_now:10,update_time:"2020/2/3"},{id:1580973962287,ver:0,name:"看书",created_at:"2020/2/6",end_at:"2020/12/6",total:"125",per:"20.00",unit:"页",level:1,type:7,pid:1580973962987,status:0,done:1.11,today_done:18,per_now:10,update_time:"2020/2/3"}]},9379:function(t,e,a){},"9d6c":function(t,e,a){"use strict";var n=a("ee2d"),o=a.n(n);o.a},"9f3d":function(t,e,a){t.exports=a.p+"img/grey.a21268db.png"},adbb:function(t,e,a){"use strict";var n=a("78eb"),o=a.n(n);o.a},aede:function(t,e,a){},b131:function(t,e,a){t.exports=a.p+"img/jieshu.27242fcd.png"},b6ed:function(t,e,a){"use strict";var n=a("9379"),o=a.n(n);o.a},b7ee:function(t){t.exports=[{id:1580973969207,name:"2019年计划",start_at:"2020/2/6",end_at:"2020/2/6"},{id:1580973962987,name:"日常",start_at:"2020/2/6",end_at:"2020/12/6"}]},c511:function(t,e,a){},c5a3:function(t,e,a){t.exports=a.p+"img/1.f478609a.jpg"},cd89:function(t,e,a){t.exports=a.p+"img/blue.830c6c2c.jpg"},ee2d:function(t,e,a){},f267:function(t,e,a){"use strict";var n=a("14ba"),o=a.n(n);o.a}});
//# sourceMappingURL=app.c2acb581.js.map