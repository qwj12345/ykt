<template>
	<view id="child-detail">
		<view class="title display-between-center">
			<image :src="avatarImg[child.sex-1]" mode="widthFix"></image>
			<view>{{child.name}}</view>
		</view>
		<!--  -->
		<view class="content">
			<navigator :url="'/pages/childInfo/childInfo?id='+child.id" open-type="navigate" class="item display-between-center">
				<view class="right">
					<view class="child-avatar"><image src="../../static/images/info_icon.png" mode="widthFix"></image></view>
					<view>儿童基础信息管理</view>
				</view>
				<view class="left"><image src="../../static/images/face-right.png" mode="widthFix"></image></view>
			</navigator>
			<navigator :url="'/pages/timeTable/timeTable?id='+child.id" open-type="navigate" class="item display-between-center">
				<view class="right">
					<view class="child-avatar"><image src="../../static/images/study_icon.png" mode="widthFix"></image></view>
					<view>课程表管理</view>
				</view>
				<view class="left"><image src="../../static/images/face-right.png" mode="widthFix"></image></view>
			</navigator>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				child:{},
				avatarImg:[require("../../static/images/l_boy.png"),require("../../static/images/l_gril.png")]
			};
		},
		onLoad(query){
			this.child = JSON.parse(query.item);
		}
	}
</script>

<style lang="less">
@import url("../../common/common.less");
page{
	background: rgb(251,251,251);
}
 #child-detail{
	 .title{
		 font-size: 24upx;
		 letter-spacing: 1upx;
		 padding: 20upx 30upx;
		 justify-content: flex-start;
		 image{
			 width: 80upx;
			 margin-right: 40upx;
		 }
	 }
	 .content{
			padding: 30upx;
			.item{
			 box-shadow: 0 6upx 18upx 0upx #efefef;
			 padding: 38upx 30upx; 
			 border-radius:  30upx;
			 margin-bottom: 28upx;
			 background: #fff;
			 .right{
				 display: flex;
				 align-items: center;
				 font-size: 24upx;
				 .child-avatar{
					 width: 50upx;
					 margin-right: 20upx;
				 }
			 }
			 .left{
				 width: 20upx;
			 }
		}
	 }

 }

</style>
