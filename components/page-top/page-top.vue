<template>
	<view>
		<!-- 头部 -->
		<view class="header"  :style="{height:bgImg===0?'302rpx':'265rpx'}">
		  <img class="header-img" :src="bgImg===0 ? require('../../static/images/bg_img.png') :require('../../static/images/bg_img_s.png')"/>
		  <!-- 用户信息 -->
		  <view class="header-user">
			<!-- 用户头像和名称 -->
			<view class="user-info">
			  <view class="user-avatar">
				<open-data v-if="isLogin" type="userAvatarUrl"></open-data>
				<img v-if="!isLogin" src="/static/images/d-user.png" @click="Login"/>
			  </view>
			  <view v-if="isLogin" class="user-name">
				Hi~,<open-data type="userNickName"></open-data>
			  </view>
			  <view v-if="!isLogin" class="user-name" @click="Login">
				点击登录
			  </view>
			</view>
			<!-- 积分 -->
			<view class="integral" @click="goDetail">
			  <view class="integral-left">
				<view class="fly-logo">
				  <img src="/static/images/money_icon.png"/>
				</view>
				<view class="text">
				  奖学金
				</view>
			  </view>
			  <view class="integral-right">
				{{integral}}
			  </view>
			</view>
		  </view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		props: {
			bgImg:{
				default:0
			}
		},
		computed: {
		  integral() {
		    return this.$store.state.person.gmtIntegralNum||0;
		  },
		  // 也可以直接监听person
		  // person() {
		  //   return this.$store.state.person;
		  // },
		 isLogin() {
			  return this.$store.state.login;
			},
		 },
		 methods:{
			 Login(){
				 this.$emit("login")
			 },
			 goDetail(){
				 uni.navigateTo({
				 	url:"/pages/integral/integral"
				 })
			 }
		 }
	}
</script>

<style scoped lang="less">
		/* 头部（头像、昵称和积分部分） */
		.header{
		    width:100vw;
		    height: 302upx;
		    position: relative;
		  }
		  .header-img{
		    width: 100%;
		    height: 100%;
		    display: block;
		    position: absolute;
		    top: 0;
		    left:0;
		    z-index: 0;
		  }
		  
		  .header-user{
		    position: relative;
		    display: flex;
		    justify-content: space-between;
		    align-items: center;
		    padding: 30upx 0 20upx 34upx;
		    z-index: 2;
		  }
		  .user-info{
		    display: flex;
		    align-items: center;
			color: #fff;
		  }
		  .user-avatar{
		    border-radius: 50%;
		    width: 86upx;
		    height: 86upx;
		    overflow: hidden;
		    margin-right: 26upx;
		  }
		  .user-name{
		    font-weight: bold;
			font-size: 34upx;
		  }
		  
		  .integral{
		    height: 52upx;
		    border-top-left-radius:26upx;
		    border-bottom-left-radius:26upx;
		    background: rgba(255, 249, 79, 1);
		    display: flex;
		    padding-left: 22upx;
		    align-items: center; 
		    color:rgb(255, 88, 30);
		    font-size:22upx;
		  }
		  
		  .integral-left{
		    display: flex;
		    margin-right: 10upx;
			.text{
				align-self: flex-end;
			}
		  }
		  .fly-logo{
		    width: 27upx;
		    height: 33upx;
		    margin-right: 8upx;
		  }
		  .integral-right{
		    font-size: 30upx;
		    margin-right: 6vw;
		  }
		  image,img{
		    width:100%;
		    height: 100%;
		  }
		/* 头部（头像、昵称和积分部分）END */
		
</style>
