<template>
	<view id="welfare">
		<page-top @login="showSQ"></page-top>
		<!-- 会员福利列表 -->
		<view class="lists">
		  <view  v-for="(item,key) in lists" :key='key'>
			<view   @click="goPage(item.url)"  class="list-item">
			  <!-- left -->
			  <view class="item-left">
				<view class="item-img">
				  <img :src="item.image" mode="widthFix"/> 
				</view>
				<view class="item-left-content">
				  <view class="left-title">{{item.title}}</view>
				  <view class="left-content" v-html="item.text">{{item.text}}</view>
				</view>
			  </view>
			  <!-- right -->
			  <view class="item-right">
				<img src="/static/images/face-right-9.png" />
			  </view>
			</view>
		  </view>
		</view>
		<!-- 手机号授权 -->
		<phone-modal ref="phone"></phone-modal>
		<!-- 小程序授权 -->
		<sq-modal ref="sq" @confirm="showPhone"></sq-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists:[
				  {title:'获取奖学金',text:'点击查看奖学金获取方式',image:'https://level8cases.oss-cn-hangzhou.aliyuncs.com/1-f938e960-3a30-4444-a202-3c63f89b6417.png',url:'/pages/integral/integral'},
				  {title:'会员抽奖',text:'奖学金、GMT产品、旅游等您来',image:'https://level8cases.oss-cn-hangzhou.aliyuncs.com/2-4c488fbd-c053-4529-9558-ac9b05370450.png',url:'/pages/lottery/lottery'},
				  {title:'独家精选',text:'您将会收到独家精选信息',image:'https://level8cases.oss-cn-hangzhou.aliyuncs.com/3-d8b07684-f860-43d1-b968-add38d04ea11.png',url:'/pages/message/message'},
				  {title:'新品发布会',text:'每次发布会，邀请年度总奖学金数量前5的会员参与',image:'https://level8cases.oss-cn-hangzhou.aliyuncs.com/4-f47ab062-493e-4880-8273-60e311d6ba9c.png',url:'/pages/comingsoon/comingsoon'},  
				  {title:'新品体验官',text:'新品上市，征集产品体验官',image:'https://level8cases.oss-cn-hangzhou.aliyuncs.com/5-3c2dc0c0-5c38-4305-938b-d0085594e489.png',url:'/pages/comingsoon/comingsoon'},  
				  {title:'生日福利',text:'',image:'https://level8cases.oss-cn-hangzhou.aliyuncs.com/6-c0dc31f7-7ae2-4d97-82b6-5a41ca2f3f68.png',url:'/pages/comingsoon/comingsoon'}
				],
			};
		},
		computed:{
			isLogin() {
			  return this.$store.state.login;
			},
		},
		methods:{
			// 授权框显示
			showPhone(){
				this.$refs.phone.toggleModal();
			},
			showSQ(){
				this.$refs.sq.toggle();
			},
			// 页面跳转
			goPage(url){
				if(this.isLogin)
					uni.navigateTo({
						url
					})
				else  //还未授权
					this.$refs.sq.toggle();
			},
			
		}
	}
</script>

<style lang="less">
	@import url("../../common/common.less");

	#welfare{
		.lists{
		  position: relative;
		  padding:0px 26upx 0 34upx;
		  margin-top: -140upx;
		  z-index: 5;
		}
		.list-item{
		  background: #fff;
		  border-radius: 16px;
		  padding: 0upx 30upx;
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  margin-bottom: 30upx;
		  position: relative;
		  height: 162upx;
		  box-sizing: border-box;
		}

		.item-left{
		  display: flex;
		  align-items: center;
		  width:calc(100% - 40px);
		  height: 100%;
		}
		.item-img{
		  width: 90upx;
		  margin-right: 18upx;
		}
		.item-left-content{
		  display: flex;
		  flex-direction: column;
		}
		.left-title{
		  font-size: 30upx;
		  margin-bottom: 6upx;
		}
		.left-content{
		  font-size: 24upx;
		  color: #999;  
		  
		}
		.item-right{
		  width: 36upx;
		  height: 36upx;
		}
		img{
		  width:100%;
		  height: 100%;
		}

	}
</style>
