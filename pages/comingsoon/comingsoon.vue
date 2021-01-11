<template>
	<view id="commingsoon">
		<image src="https://level8cases.oss-cn-hangzhou.aliyuncs.com/12-8217f934-bfc7-46b3-a542-7a969d7ed3f0.png"></image>
		<view>等待开放，尽请期待</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
	@import url("../../common/common.less");
	page{
		background: #fff;
	}
	#commingsoon{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 160upx;
		image{
			width: 360upx;
			height: 360upx;
		}
		view{
			margin-top: 40upx;
			font-size: 28upx;
			color: @mainColor;
			letter-spacing: 2upx;
		}
	}
</style>
