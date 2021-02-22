<template>
	<view id="my-children">
		<view class="title">儿童信息管理</view>
		<!--  -->
		<view class="content" v-if="list.length!==0 && isLogin" >
			<navigator v-for="(item,key) in list" :key="key" :url="'/pages/childDetail/childDetail?item='+JSON.stringify(item)"  open-type="navigate" class="item display-between-center">
				<view class="right">
					<view class="child-avatar"><image :src="avatarImg[item.sex-1]" style="height: 100%;"></image></view>
					<view>{{item.name}}</view>
				</view>
				<view class="left"><image src="../../static/images/face-right.png" mode="widthFix"></image></view>
			</navigator>
		</view>
		<!--  -->
		<view v-else class="no-child">
			<image src="../../static/images/no_child.png"></image>
			<view>您还没有添加学生~</view>
		</view>
		
		<!-- 按钮 -->
		<view  class="bootom-l-btn" @click="goDetail" >
			添加学生
		</view>
		<!-- 手机号授权 -->
		<phone-modal ref="phone"></phone-modal>
		<!-- 小程序授权 -->
		<sq-modal ref="sq" @confirm="showPhone"></sq-modal>
		<!--  -->
		<my-toast title="出错啦" loadingType="error" ref="toast" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<wyb-loading title="加载中" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				list:[],
				avatarImg:[require("../../static/images/l_boy.png"),require("../../static/images/l_gril.png")]
			};
		},
		computed:{
			isLogin() {
			  return this.$store.state.login;
			},
		},
		watch:{
			// 当获取到token时触发某些事件
			isLogin(){
				if(this.isLogin){
					this.getChildren();
				}
			}
		},
		methods:{
			// 显示授权提示弹框
			showPhone(){
				this.$refs.phone.toggleModal();
			},
			// 页面跳转
			goDetail(){
				if(this.isLogin){
					uni.navigateTo({
						url:"/pages/childInfo/childInfo"
					})
				}else{
					this.$refs.sq.toggle();
				}
			},
			// 获取学生列表  
			getChildren:async function(){
				await this.$nextTick(); //适配H5(h5使用$refs)操作子组件时如果子组件一开始是隐藏的那么直接用$refs是会undefined
				this.$refs.loading.showLoading() // 显示
				
				this.myRequest("student/findStudent",{data:{},method:'GET',contentType:"application/json"}).then(res =>{
					if(res.data.code===200){
						this.list = res.data.data;
					}
					this.$refs.loading.hideLoading();
				
				})
			}
		}, 
		onShow(){
			if(getApp().globalData.childFlag===1){
				getApp().globalData.childFlag = 0;//设为0 防止一直刷新
				this.getChildren();
			}
		},
		onLoad(){
			this.getChildren();
		}
	}
</script>

<style lang="less">
@import url("../../common/common.less");
page{
	background: rgb(255,255,255);
}
 #my-children{
	 .title{
		 font-size: 36upx;
		 letter-spacing: 2upx;
		 padding: 20upx 30upx;
		 font-weight: bold;
	 }
	 .content{
			padding: 40upx 30upx;
			.item{
			 background: rgb(245,245,245);
			 padding: 30upx;
			 border-radius: 30upx;
			 margin-bottom: 24upx;
			 .right{
				 display: flex;
				 align-items: center;
				 font-size: 24upx;
				 .child-avatar{
					 width: 80upx;
					 height: 80upx;
					 margin-right: 30upx;
				 }
			 }
			 .left{
				 width: 20upx;
			 }
		}
	 }
	 .no-child{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 120upx 0 80upx;
		image{
			width: 350upx;
			height: 350upx;
		}
		view{
			font-size: 28upx;
			letter-spacing: 2upx;
			color: @mainColor;
			margin-top: 24upx;
		}
	  }
 }

</style>
