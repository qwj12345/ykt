(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/message/message"],{"0738":function(t,e,a){"use strict";a.r(e);var n=a("19b8"),i=a("1bee");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("f12d");var r,s=a("f0c5"),l=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=l.exports},"19b8":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var n={wybLoading:function(){return a.e("components/wyb-loading/wyb-loading").then(a.bind(null,"faff"))},myToast:function(){return a.e("components/my-toast/my-toast").then(a.bind(null,"c38f"))}},i=function(){var t=this,e=t.$createElement;t._self._c},o=[]},"1bee":function(t,e,a){"use strict";a.r(e);var n=a("9859"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},3009:function(t,e,a){"use strict";a.r(e);var n=a("8267"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},3044:function(t,e,a){},8267:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={ip:"https://xc.frbkw.com/"};e.default=n},9859:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a("52e5"),i={data:function(){return{toastTitle:"出错啦",toastType:"error",size:10,page:0,totalPage:0,url:"",messages:[{forwardFlag:0,releaseTime:"10:56",articleType:0,title:"haha",integralNum:10,describes:"我们FIFO华东师范本年度发布会山东矿机发动机佛山大部分十多年来范德萨发红包的搜救",articleImg:"https://level8cases.oss-cn-hangzhou.aliyuncs.com/lADPBGnDZ0PGI6zNAYfNA4Q_900_391-eee11ea1-9fdb-4a3f-a51a-c4f9985d83de.jpg"}],types:["独家精选","通知","通知","独家精选","通知"]}},methods:{goDetail:function(e){var a=encodeURIComponent(e.wxUrl),n=encodeURIComponent(e.content);0!==e.articleType&&3!==e.articleType||(""!==e.wxUrl&&void 0!==e.wxUrl?t.navigateTo({url:"/pages/articleDetail/articleDetail?url="+a+"&id="+e.id}):t.navigateTo({url:"/pages/articleDetail/articleDetail?article="+n+"&id="+e.id}))},getList:function(){var t=this,e={page:this.page,size:this.size};this.$refs.loading.showLoading(),this.myRequest(this.url,{data:e,method:"GET",contentType:"application/json"}).then((function(e){t.$refs.loading.hideLoading(),e.data.data.content.forEach((function(t){t.releaseTime=(0,n.timeFormat1)(t.releaseTime)})),t.messages=t.messages.concat(e.data.data.content),t.totalPage=e.data.data.totalPages}))}},onReachBottom:function(){this.page===this.totalPage-1?(this.toastType="none",this.toastTitle="已经到底啦！",this.$refs.toast.showLoading()):(this.page++,this.getList())},onLoad:function(e){this.page=0,this.messages=[],console.log(e),"0"===e.type?this.url="/miniProgram/api/notification/info":(this.url="/miniProgram/api/notification/article/info",t.setNavigationBarTitle({title:"独家精选"})),this.getList()}};e.default=i}).call(this,a("543d")["default"])},b542:function(t,e,a){"use strict";a.r(e);var n=a("3009");for(var i in n)"default"!==i&&function(t){a.d(e,t,(function(){return n[t]}))}(i);var o,r,s,l,u=a("f0c5"),c=Object(u["a"])(n["default"],o,r,!1,null,null,null,!1,s,l);e["default"]=c.exports},efb0:function(t,e,a){"use strict";(function(t){a("4ce3"),a("921b");n(a("66fd"));var e=n(a("0738"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},f12d:function(t,e,a){"use strict";var n=a("3044"),i=a.n(n);i.a}},[["efb0","common/runtime","common/vendor"]]]);