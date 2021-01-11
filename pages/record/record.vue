<template>
	<view id="record">
		<!-- header -->
		<view class="header">
			<view class="header-content">
				  <view class="header-content-title">
					  当前奖学金
				  </view>
				  <view class="header-content-number">{{integral}}</view>
			  </view>
		</view>
		<!--  -->
	  <view class="integralpage">
		  <view class="integral-header">
				<!-- 奖学金赚取 -->
			  <view class="get-integral" @click="tabHeader(1)">
				  <view class="integral-img">
					  <img :src="isGetIntegral?'/static/images/integral_icon1_active.png':'/static/images/integral_icon1.png'"/>
				  </view>
				  <view :class="{'nos_integral-title':!isGetIntegral}">
					  奖学金明细
				  </view>
			  </view>
			  <!-- 奖学金兑换 -->
			  <view class="put-integral"  @click="tabHeader(2)">
					<view class="integral-img2">
					  <img :src="!isGetIntegral?'/static/images/integral_icon2_active.png':'/static/images/integral_icon2.png'"/>
					</view>
					<view :class="{'nos_integral-title':isGetIntegral}">
					  礼品记录
					</view>
			  </view>
		  </view>
			<!-- 奖学金明细 -->
			<view class="record-container" v-if="isGetIntegral">
				<view class="table-header">
					<view class="table-header-item">日期</view>
					<view class="table-header-item border-both">类型</view>
					<view class="table-header-item">奖学金记录</view>
				</view>
				<view class="table-content"  v-for="(item,key) in records" :key="key">
					<view class="table-content-item">
						{{item.createTime}}
					</view>
					<view class="table-content-item">
						{{item.changeTypeName}}
					</view>
					<view class="table-content-item">
						{{item.integralNum}}
					</view>
				</view>
				<!--  -->
				<view class="paging" v-if="showLotteryPage">
					<view @click="prePage">上一页</view>
					<view @click="nextPage">下一页</view>
				</view>
			</view>
			<!-- 礼品明细 -->
			<view v-if="!isGetIntegral" class="record-container">
				<view class="table-header">
					<view class="table-header-item">日期</view>
					<view class="table-header-item border-both">礼品</view>
					<view class="table-header-item border-right">类型</view>
				</view>    
				<view class="table-content"  v-for="(item,key) in recordsGift" :key="key">
					<view class="table-content-item gift-item">
						{{item.createTime}}
					</view>
					<view class="table-content-item gift-item">
						{{item.trophyName}}
					</view>
					<view class="table-content-item">
						{{item.trophyType}}
					</view>
				</view>
				<!--  -->
				<view class="paging" v-if="showGiftPage">
					<view @click="prePageLP">上一页</view>
					<view @click="nextPageLP">下一页</view> 
				</view>
			</view>
	  </view>
		<!-- 提示框 -->
		<wyb-loading title="请稍后" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-toast :title="toastTitle" ref="toast" :loadingType="toastType" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
	</view>
</template>

<script>
	import {myRequest,timeFormat1} from "../../common/common.js"
	export default {
		data() {
			return {
				toastTitle:"出错啦",
				toastType:"error",
				showGiftPage:false,
				showLotteryPage:false,
				size:10,
				jfpage:0,
				jftotalPage:0,
				lppage:0,
				lptotalPage:0,
				isGetIntegral:true,
				records:[],
				recordsGift:[],
				types:['签到','转发','绑定产品','兑换','抽奖','注册','关注公众号','任务','完善个人信息','互动精选','过期','中奖']
			};
		},
		computed: {
		  integral() {
		    return this.$store.state.person.gmtIntegralNum||0;
		  }
		 },
		 methods:{
			 // 切换
			 tabHeader(index){
				 index === 1 ? this.isGetIntegral = true : this.isGetIntegral = false;
			 },
			 getIntegralList(){
				 let data = {
					 page:this.jfpage,
					 size:this.size
				 }
	
				 // 奖学金明细
				 myRequest('/miniProgram/api/integral/list',{data:data}).then(res => {
					 this.records= res.data.data.content;
					 // Math.ceil将小数向上转为整数
					 this.jftotalPage = res.data.data.totalPages;
					 if(res.data.data.total<=10){
						 this.showLotteryPage = false;
					 }else{
						 this.showLotteryPage = true;
					 }
					 this.records.forEach((item,index) => {
						 item.createTime = timeFormat1(item.createTime,3);
					 })
				 })
			 },
			 getGiftList(){
				 let data = {
					 page:this.lppage,
					 size:this.size
				 }
				  // 礼品记录 
				 myRequest('/miniProgram/api/trophy/user/trophyList',{data:data}).then(res => {
					 this.recordsGift= res.data.data.content;
					 // Math.ceil将小数向上转为整数
					 this.lptotalPage = res.data.data.totalPages;
					 if(res.data.data.total<=10){
						 this.showGiftPage = false;
					 }else{
						 this.showGiftPage = true;
					 }
					 this.recordsGift.forEach((item,key) => {
						 item.createTime = timeFormat1(item.createTime,3);
						 if(item.trophyStatus==="2"){
							 item.status = '已发货';
						 }else{
							 item.status = '未发货';
						 }
					 })
				 })
			 },
			 prePage(){
				 if(this.jfpage === 0){
					 this.toastType = "none";
					 this.toastTitle = '已经是第一页啦';
					 this.$refs.toast.showLoading() // 显示
				 }else{
					 this.jfpage--;
					 this.getIntegralList();
				 }
			 },
			 nextPage(){
				 if(this.jfpage === this.jftotalPage-1){
					 this.toastType = "none";
					 this.toastTitle = '已经是最后一页啦';
					 this.$refs.toast.showLoading() // 显示
				 }else{
					 this.jfpage++;
					 this.getIntegralList();
				 }
			 },
			 prePageLP(){
				 if(this.lppage === 0){
					 this.toastType = "none";
					 this.toastTitle = '已经是第一页啦';
					 this.$refs.toast.showLoading() // 显示
				 }else{
					 this.lppage--;
					 this.getGiftList();
				 }
			 },
			 nextPageLP(){
				 if(this.lppage === this.lptotalPage-1){
					 this.toastType = "none";
					 this.toastTitle = '已经是最后一页啦';
					 this.$refs.toast.showLoading() // 显示
				 }else{
					 this.lppage++;
					 this.getGiftList();
				 }
			 },
		 },
		 onShow() {
		 	this.getIntegralList();
			this.getGiftList();
		 }
	}
</script>

<style lang="less">
	@import url("../../common/common.less");
#record{
	.header{
	    width:100vw;
	    height: 302upx;
	    position: relative;
		background: url(../../static/images/bg_img.png);
		background-size: cover;
		.header-content{
		    display: flex;
		    flex-direction: column;
		    align-items: center;
		    justify-content: center;
			color: #fff;
			margin-top: 40upx;
		}
		.header-content-title{
		    font-size: 26upx;
		    margin-bottom: 12upx;
			letter-spacing: 2upx;
		}
		.header-content-number{
		    font-size: 84upx;
		    font-weight: bold;
			letter-spacing: 2upx;
		}
	  }
	  
	  .integralpage{
	      position: relative;
	      padding: 0 0 40upx;
	      width: 682upx;
	      margin: 0 auto;
	      margin-top: -66upx;
	      z-index: 2;
		  .integral-header{
		      display: flex;
		      align-items: center;
		      font-weight: bold;
		      color: @mainColor;
		      background: #fff;
		      height: 100upx;
		      border-radius: 50upx;
		      font-size: 30upx;
		  }
		  .integral-img{
		      height: 40upx;
		      width: 36upx;
		      margin-right: 24upx;
		  }
		  .integral-img2{
		      height: 40upx;
		      width: 40upx;
		      margin-right: 24upx;
		  }
		  .nos_integral-title{
		      color: #999 !important;
		  }
		  .get-integral{
		      width: 50%;
		      display: flex;
		      align-items: center;
		      justify-content: center;
		      border-right: 1px solid #999;
		      box-sizing: border-box;
		  }
		  .put-integral{
		      width: 50%;
		      display: flex;
		      align-items: center;
		      justify-content: center
		  }
	  }
		.record-container{
			background: #fff;
			margin-top: 24upx;
			border-radius: 40upx;
			padding: 40upx 30upx 80upx;
		}
		.table-header{
			display: flex;
			margin-bottom: 20upx;
		}
		.table-header-item{
			width: calc(100% / 3);
			text-align: center;
			font-size: 30upx;
			color: #333;
		}
		.border-both{
			box-sizing: border-box;
			border-right: 2upx solid #f0f0f0;
			border-left: 2upx solid #f0f0f0;
		}
		.border-right{
			box-sizing: border-box;
			border-right: 2upx solid #f0f0f0;
		}
		.gift-item{
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.table-content-item{
			width: calc(100% / 3);
			text-align: center;
			padding: 14upx 0;
		}
		.table-content{
			display: flex;
			font-size: 26upx;
			color: #666;
		}
		.paging{
			margin-top: 50upx;
			font-size: 26upx;
			color: @mainColor;
			display: flex;
			justify-content: space-around;
		}
	  // 解决外边距溢出
	  .header::before {
		  display: table;
		  content: "";
	  }
}

</style>
