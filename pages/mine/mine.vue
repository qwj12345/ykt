<template>
	<view id="mine">
		<page-top @login="showSQ"></page-top>
		<!--  -->
		<view class="user-operate">
		  <view class="operate-item" v-for="(item,key) in operates" :key="key" @click="goPage(item.url)">
			<view class="o-left"> 
			  <view class="o-img">
				<img :src="item.img">
			  </view>
				{{item.title}}
			</view>
			<view class="o-right">
				<img src="/static/images/face-right-9.png"/>
			</view>
		  </view>
		</view>
		<!--  -->
	<!-- 	<view class="footer-banner">
			<img src="https://level8cases.oss-cn-hangzhou.aliyuncs.com/640-47d004cf-f8c2-4e32-bfca-75333f2f2610.gif" />
		</view> -->
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
				operates:[
				  {title:'我的信息',url:'/pages/myInfo/myInfo',img:require('../../static/images/users/user_1.png')},
				  {title:'学生信息管理',url:'/pages/children/children',img:require('../../static/images/users/user_2.png')},
				  {title:'关于我们',url:'/pages/rules/rules',img:require('../../static/images/users/user_3.png')},
				  {title:'拭目以待',url:'',img:require('../../static/images/users/user_4.png')}, 
				  {title:'拭目以待',url:'',img:require('../../static/images/users/user_5.png')},
				  {title:'拭目以待',url:'',img:require('../../static/images/users/user_6.png')},
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
			goPage(url){
				if(this.isLogin){
					if(url==="/pages/children/children"){
						uni.switchTab({
							url
						})
					}else{
						if(url !== ''){
							uni.navigateTo({
								url
							})
						}
						
					}
				}else{
					this.showSQ();
				}

			}
		}
	}
</script>

<style lang="less">
@import url("../../common/common.less");

#mine{
	.footer-banner{
		width: 688upx;
		height: 326upx;
		margin: 60upx auto;
		border-radius: 26upx;
		overflow: hidden;
	}	
	.user-operate{
	    padding: 40upx 30upx;
	    width: 682upx;
	    margin: 0 auto;
	    border-radius: 16upx;
	    position: relative;
	    margin-top: -140upx;
	    background: #fff;
	    z-index: 5;
	    box-sizing: border-box;
	}
	.operate-item{
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    padding: 14upx 0px;
	    box-sizing: border-box;
	}
	.o-left{
	    font-size: 30upx;
	    color: #333;
		letter-spacing: 2upx;
	    display: flex;
	    align-items: center;
	}
	.o-img{
	  width: 70upx;
	  height: 70upx;
	  margin-right: 20upx;
	}
	.o-right{
	    width: 30upx;
	    height: 30upx;
	}
}
</style>
