已用组件 u-charts.js

页面背景颜色没有统一

// 挂载在Vue上 就不用每个页面都导入这个方法 直接this.myRequest()
Vue.prototype.myRequest = myRequest

最好不要用公共样式文件  （.css .less等）因为uniapp会把公共样式打包在每个文件中 导致打包后过大  可以直接把样式放在App.vue中


条件编译
<!-- #ifndef H5 -->
<view class="flex_row_c_c" v-for="(picker_item,picker_index) in 60" :key="picker_index">{{picker_item}}分</view>
<!-- #endif -->
<!-- #ifdef H5 -->
<view class="flex_row_c_c" v-for="(picker_item,picker_index) in 60" :key="picker_index">{{picker_item-1}}分</view>
<!-- #endif -->


js中这样设置upx
this.cWidth3=uni.upx2px(316);//这里要与样式的宽高对应
this.cHeight3=uni.upx2px(316);//这里要与样式的宽高对应 

页面导航栏样式在pages.json中设置
{
	"path" : "pages/record/record",
	"style": {
		"navigationBarTitleText": "积分记录",
		"navigationBarTextStyle": "white",
		"navigationBarBackgroundColor": "#F49D1A",
		"backgroundColor": "#F49D1A"
	}
}

uniapp会把小于40k的图片转为base64 所以可以直接把小于40k的本地图片设为背景图片  但是最好不要直接用本地图片做背景图片 因为自动转成base64时本地图片也还存在 相当于两倍大小了 （转成base64或者弄成在线）

this.$refs.XXX.methodsName()可以用组件里的方法  如：my-modal组件

map、canvas、video、textarea 是由客户端创建的原生组件，原生组件的层级是最高的，所以页面中的其他组件无论设置 z-index 为多少，都无法盖在原生组件上。
原生组件暂时还无法放在 scroll-view 上，也无法对原生组件设置 css 动画。（解决办法 https://blog.csdn.net/liya_nan/article/details/82023761）


@click触发不了可能是前面标签有错