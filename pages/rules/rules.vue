<template>
	<view id="rule">
		<view>
			此项目一开始是个人为了加入‘盐课堂’（写完后发现不招人了）顺便练习nodejs编写后台，走向全栈而编写的项目，如有没有任何商业行为，如有侵权，请联系微信/手机15159223513。
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contentText:''
			};
		},
		methods:{
			// prevImg(){
			// 	uni.previewImage({
			// 		//当前显示图片
			// 		urls: [this.uploadImgUrl]
			// 	})
			// },
		},
		onLoad(query) { 
			// let data = {
			// 	type:query.type,
			// 	company:"GMT"
			// }
			// this.myRequest('miniProgram/api/sys/getExplain',{data}).then(res => {
			// 	this.contentText = res.data.data.content;
			// })
		}
	}
</script>

<style lang="less">
	@import url("../../common/common.less");
	page{
		background: rgb(251,251,251);
	}
	#rule{
		padding: 30upx 24upx;
		img,image{
			max-width: 726upx;
		}
	}
</style>
