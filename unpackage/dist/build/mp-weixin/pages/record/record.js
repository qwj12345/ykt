(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/record/record"],{"10dc":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var n={wybLoading:function(){return a.e("components/wyb-loading/wyb-loading").then(a.bind(null,"faff"))},myToast:function(){return a.e("components/my-toast/my-toast").then(a.bind(null,"c38f"))}},i=function(){var t=this,e=t.$createElement;t._self._c},o=[]},"1ba9":function(t,e,a){},3009:function(t,e,a){"use strict";a.r(e);var n=a("8267"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},"3b85":function(t,e,a){"use strict";var n=a("1ba9"),i=a.n(n);i.a},"586a":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a("52e5"),i={data:function(){return{toastTitle:"出错啦",toastType:"error",showGiftPage:!1,showLotteryPage:!1,size:10,jfpage:0,jftotalPage:0,lppage:0,lptotalPage:0,isGetIntegral:!0,records:[],recordsGift:[],types:["签到","转发","绑定产品","兑换","抽奖","注册","关注公众号","任务","完善个人信息","互动精选","过期","中奖"]}},computed:{integral:function(){return this.$store.state.person.gmtIntegralNum||0}},methods:{tabHeader:function(t){this.isGetIntegral=1===t},getIntegralList:function(){var t=this,e={page:this.jfpage,size:this.size};(0,n.myRequest)("/miniProgram/api/integral/list",{data:e}).then((function(e){t.records=e.data.data.content,t.jftotalPage=e.data.data.totalPages,e.data.data.total<=10?t.showLotteryPage=!1:t.showLotteryPage=!0,t.records.forEach((function(t,e){t.createTime=(0,n.timeFormat1)(t.createTime,3)}))}))},getGiftList:function(){var t=this,e={page:this.lppage,size:this.size};(0,n.myRequest)("/miniProgram/api/trophy/user/trophyList",{data:e}).then((function(e){t.recordsGift=e.data.data.content,t.lptotalPage=e.data.data.totalPages,e.data.data.total<=10?t.showGiftPage=!1:t.showGiftPage=!0,t.recordsGift.forEach((function(t,e){t.createTime=(0,n.timeFormat1)(t.createTime,3),"2"===t.trophyStatus?t.status="已发货":t.status="未发货"}))}))},prePage:function(){0===this.jfpage?(this.toastType="none",this.toastTitle="已经是第一页啦",this.$refs.toast.showLoading()):(this.jfpage--,this.getIntegralList())},nextPage:function(){this.jfpage===this.jftotalPage-1?(this.toastType="none",this.toastTitle="已经是最后一页啦",this.$refs.toast.showLoading()):(this.jfpage++,this.getIntegralList())},prePageLP:function(){0===this.lppage?(this.toastType="none",this.toastTitle="已经是第一页啦",this.$refs.toast.showLoading()):(this.lppage--,this.getGiftList())},nextPageLP:function(){this.lppage===this.lptotalPage-1?(this.toastType="none",this.toastTitle="已经是最后一页啦",this.$refs.toast.showLoading()):(this.lppage++,this.getGiftList())}},onShow:function(){this.getIntegralList(),this.getGiftList()}};e.default=i},8267:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={ip:"https://api.frbkw.com/"};e.default=n},8511:function(t,e,a){"use strict";a.r(e);var n=a("586a"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},b542:function(t,e,a){"use strict";a.r(e);var n=a("3009");for(var i in n)"default"!==i&&function(t){a.d(e,t,(function(){return n[t]}))}(i);var o,s,r,u,f=a("f0c5"),c=Object(f["a"])(n["default"],o,s,!1,null,null,null,!1,r,u);e["default"]=c.exports},b85b:function(t,e,a){"use strict";(function(t){a("4ce3"),a("921b");n(a("66fd"));var e=n(a("ec2e"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},ec2e:function(t,e,a){"use strict";a.r(e);var n=a("10dc"),i=a("8511");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("3b85");var s,r=a("f0c5"),u=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);e["default"]=u.exports}},[["b85b","common/runtime","common/vendor"]]]);