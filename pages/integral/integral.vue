<template>
	<view id="integral">
		<page-top :bgImg='1'></page-top>
		<!--  -->
		  <view class="integralpage">
			  <view class="integral-header">
					<!-- 奖学金赚取 -->
				  <view class="get-integral" @click="tabHeader(1)">
					  <view class="integral-img">
						  <img :src="isGetIntegral?'/static/images/integral_icon1_active.png':'/static/images/integral_icon1.png'"/>
					  </view>
					  <view :class="{'nos_integral-title':!isGetIntegral}">
						  赚奖学金
					  </view>
				  </view>
				  <!-- 奖学金兑换 -->
				  <view class="put-integral"  @click="tabHeader(2)">
						<view class="integral-img2">
						  <img  :src="isGetIntegral?'/static/images/integral_icon2.png':'/static/images/integral_icon2_active.png'"/>
						</view>
						<view :class="{'nos_integral-title':isGetIntegral}">
							奖学金兑换
						</view>
				  </view>
			  </view>
			  <!--  -->
			  <view v-if="isGetIntegral">
				 <!-- 签到 -->
				 <view class="integral-content">
					<view class="get-integral-title">
						连续签到领好礼
					</view> 
					<view class="sign-list"> 
						<view v-for="(item,key) in signItem" :key="key" class="sign-item">
							<view v-show="item.sign" class="coin">
								<img src="/static/images/coin.png"/>
							</view>
							<view v-if="!item.sign" class="no-sign">
								<view v-if="key!==6"  :class="{'no-sign-click sign-beforn-text':item.signTo,'sign-beforn-text':!item.signTo}">+{{item.integral}}</view>
								<view v-else class="gift-img">
									<img src="/static/images/sign_icon.png"/>
								</view>
							</view>
							<view class="sign-text" :class="{'sign-color333':item.sign}">
								{{item.text}}
							</view>
						</view>
					</view>
					<!--  -->
					<view class="sign-info">
						您已累积签到<text class="colorRed">{{totalTime}}</text>天，共获得<text class="colorRed">{{totalIntegral}}</text>奖学金
					</view>
					<!--  -->
					<view :class="{'sign-btn':!todaySign,'after-sign-btn':todaySign}" @click="goSign">
						{{signBtnText}}
					</view>
				</view>
				<view class="integral-content">
					<view class="get-integral-title">
						做任务赚奖学金
					</view>
					<view class="get-item" v-for="(item,key) in getItems" :key="key">
						<!--  -->
						<view class="get-left">
							<view class="get-item-img">
								<img :src="item.imgUrl"/>
							</view>
								<view class="get-item-content">
									<view class="get-item-title">
										{{item.title}}
									</view>
									<view class="get-item-text">
										{{item.text}}
									</view>
								</view>
						</view>
						<!--  -->
						<view class="get-btn" v-if="!item.success" @click="goPage(item)">
							去完成
						</view>
						<!--  -->
						<view class="after-get-btn"  v-if="item.success">
							已完成
						</view>
						
					</view>
					</view>
					<!--  -->
					<view v-if="showGZH" class="official-account" >
						<official-account  @error='errorLoad'></official-account>
						<view v-show="errorOfficial" class="official-error">
							请在微信搜索“GMTforkids”关注公众号，即可完成任务~~
						</view>
					</view>
			  </view>

			  <!--  -->
			  <view class="put-integral-content" v-if="!isGetIntegral">
					<view class="put-item" v-for="(item,key) in putItems" :key="key">
					  <!--  -->
					  <view class="put-left">
						  <view class="put-item-img">
							  <img :src="item.trophyImg"/>
						  </view>
							<view class="put-item-content">
								<view class="put-item-title">
									{{item.trophyName}}
								</view>
								<!-- trophyIntegral：原价    promotionTrophyIntegral：优惠价-->
								<view class="del-item-text" v-if="item.promotionTrophyIntegral!==0">
									{{item.trophyIntegral}}奖学金
								</view>
								<view class="put-item-text">
									<span v-if="item.promotionTrophyIntegral===0">{{item.trophyIntegral}}</span><span v-if="item.promotionTrophyIntegral!==0">{{item.promotionTrophyIntegral}}</span>奖学金
								</view>
							</view>
					  </view>
					  <!--  -->
					  <view v-if="item.integralStatus==='000000'" class="get-btn" @click="showMseeage(item)">
						  兑换
					  </view>
					  <view v-if="item.integralStatus==='000002'" class="get-btn" style="background:#ddd;color:#999;font-size:12px">
						  积分不足
					  </view>
					  <view v-if="item.integralStatus==='000001'" style="width:60px">
						  <img src="https://level8cases.oss-cn-hangzhou.aliyuncs.com/sale_over-987e55f6-7e76-490a-a526-dc31692593aa.png" mode='widthFix'/>
					  </view>
				  </view>
			  </view>
		  </view>
		  <!-- 提示框 -->
		  <wyb-loading title="请稍后" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		  <my-toast :title="toastTitle" ref="toast" :loadingType="toastType" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		  <my-modal ref="modal" :msgText="msgText" @confirmAction="changeGift"></my-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				errorOfficial:false,
				showGZH:false,
				id:0,
				isGetIntegral:true,
				getItems:[
					{imgUrl:require('../../static/images/tasks/task_1.png'),title:'完善个人信息',text:'完善个人信息得50奖学金',success:false,url:'/pages/myInfo/myInfo'},
					{imgUrl:require('../../static/images/tasks/task_2.png'),title:'问卷调查',text:'填写问卷调查得50奖学金',success:false,url:'/pages/comingsoon/comingsoon'},
					{imgUrl:require('../../static/images/tasks/task_3.png'),title:'精选文章 ',text:'留言互动，每篇得50奖学金',success:false,url:'/pages/message/message?type=1'},
					{imgUrl:require('../../static/images/tasks/task_4.png'),title:'关注公众号',text:'关注公众号得200奖学金',success:false,url:''},
		
				],
				putItems:[],
				signItem:[{text:'1天',ani:null,sign:true,signTo:false,integral:8},
							{text:'2天',ani:null,sign:true,signTo:false,integral:8},
							{text:'3天',ani:null,sign:false,signTo:false,integral:8},
							{text:'4天',ani:null,sign:false,signTo:false,integral:8},
							{text:'5天',ani:null,sign:false,signTo:false,integral:8},
							{text:'6天',ani:null,sign:false,signTo:false,integral:8},
							{text:'7天',ani:null,sign:false,signTo:false,integral:8}],
				todaySign:false,
				signBtnText:'签到',
				totalTime:0,
				totalIntegral:0,
				toastTitle:"出错啦",
				toastType:"error",
				trophyType:-1,
				msgText:""
			};
		},
		watch: {
			todaySign:function(val){
				val===true ? this.signBtnText = '已签到' : this.signBtnText = '签到';
			}
		},
		methods:{
			// 页面跳转
			goPage(item){
				if(item.url!==''){
					uni.navigateTo({
						url:item.url
					})
				}else{
					this.showGZH = true;
					this.pageScrollToBottom();
				}
			},
			 // 页面滚到底部,以便点击关注公众号任务时自动滚动到底部
			pageScrollToBottom() {                
				wx.createSelectorQuery().select('#integral').boundingClientRect(function(rect) {
				if (rect){
					// 使页面滚动到底部
					wx.pageScrollTo({
						scrollTop: rect.height+100
					})
				}
				}).exec()
			},
			// 切换
			tabHeader(index){
				if(index === 1)
					this.isGetIntegral = true;
				else{
					this.isGetIntegral = false;
				}
			},
			// 签到
			goSign(){
				this.$refs.loading.showLoading() // 显示
				this.myRequest('/miniProgram/api/sign').then(res => {
					this.$refs.loading.hideLoading() // 
					if(res.data.status === 0){
						this.toastType = "ring";
						this.toastTitle = "签到成功";
						this.$refs.toast.showLoading() // 显示
						
						let signInfo = JSON.parse(res.data.data);
						let signInfo2 = JSON.parse(res.data.data2);
						this.todaySign = signInfo.todaySign;
						this.signItem = signInfo.signRecord;
						// this.signItem[this.index].signTo = true;//根据signTo实现动画效果
						this.$store.dispatch("changeIntegralAction",res.data.userTotalIntegral);
						
						this.totalTime = signInfo2.totalTime;
						this.totalIntegral = signInfo2.totalIntegral;
						for(let key=0;key<7;key++){
							this.signItem[key].text = `${key+1}天`;
							this.signItem[key].signTo = false;//根据signTo实现动画效果，动画完后signTo重新为false 
						}
						// setTimeout(function(){
						// 	this.signItem[this.index].sign = true; //因为动画效果有0.5s，所以改变每一个签到状态的图标需要延迟0.5s
						// },500)
					}else if(res.data.status === 10013){
						this.toastType = "none";
						this.toastTitle = "已签到，请勿重复签到！";
						this.$refs.toast.showLoading() // 显示
					}else{
						this.toastType = "none";
						this.toastTitle = "签到失败，请稍后再试！";
						this.$refs.toast.showLoading() // 显示
	
					}
				})
			},
			// 点击兑换
			showMseeage(item){
				this.id = item.id;//为了在真的兑换奖品时可以
				let data = {
					goodsId:item.id
				}
			
				this.$refs.loading.showLoading() // 显示
				this.myRequest('/miniProgram/api/goods/conversion/str',{data:data}).then(res => {
					this.$refs.loading.hideLoading() // 
					if(res.data.status === 0){
						this.msgText = res.data.str;
						this.$refs.modal.toggleModal();
					}else if(res.data.status === 10016 || res.data.status === 10017|| res.data.status === 10019){
						this.toastType = "none";
						this.toastTitle = res.data.msg;
						this.$refs.toast.showLoading() // 显示
					}else{
						this.toastType = "none";
						this.toastTitle = "兑换失败，请联系客服";
						this.$refs.toast.showLoading() // 显示
					}
				})
	
			},
			// 兑换奖品
			changeGift(){
				let data = {
					goodsId:this.id
				}
				this.$refs.loading.showLoading() // 显示
				this.myRequest('/miniProgram/api/goods/conversion',{data:data}).then(res => {
					this.$refs.loading.hideLoading() // 
					if(res.data.status === 0){
						this.toastType = "ring";
						this.toastTitle = res.data.msg;
						this.$refs.toast.showLoading() // 显示
						this.$store.dispatch("changeIntegralAction",res.data.integralNum);
					}else{
						this.toastType = "none";
						this.toastTitle = "兑换失败，请联系客服";
						this.$refs.toast.showLoading() // 显示
					}

				})
	
			},
			// 公众号组件加载失败
			errorLoad(e){
				console.log('official',e)
				if(e.type === 'error'){
					this.errorOfficial = true;
				}else{
					this.errorOfficial = false;
				}
			},
			// 获取签到信息
			getSignList(){
				this.myRequest('/miniProgram/api/sign/list').then(res => {
					let signInfo = JSON.parse(res.data.data);
					let signInfo2 = JSON.parse(res.data.data2);
					console.log(signInfo)
					this.totalTime = signInfo2.totalTime;
					this.totalIntegral = signInfo2.totalIntegral;
					this.todaySign = signInfo.todaySign;
					this.signItem = signInfo.signRecord;
		
					for(let key=0;key<7;key++){
						this.signItem[key].text = `${key+1}天`;
						this.signItem[key].signTo = false;
					}
					for(let key=0;key<7;key++){
						if(this.signItem[key].sign == false){
							this.index = key;
						}
					}
				})
			},
			// 获取任务  
			getTaskList(){
				this.myRequest('/miniProgram/api/notification/task').then(res => {
					this.getItems[0].success = res.data.data.userInfo;
					this.getItems[1].success = res.data.data.questionnaire;
					this.getItems[2].success = res.data.data.article;
					this.getItems[3].success = res.data.data.followWeChat;

					// 获取完任务列表后在获取兑换列表  分步获取
					this.getGift();
				})
			},
			// 获取兑换物品的列表
			getGift(){
				this.myRequest('/miniProgram/api/trophy/exchangeGoodsList').then(res => {
				   this.putItems = res.data.data;
				})
			}

		},
		onShow() {
			this.getSignList();
			this.getTaskList();
		}
	}
</script>

<style lang="less">
	@import url("../../common/common.less");
	@btnH:80upx;
#integral{

	.integralpage{
	    position: relative;
	    padding: 0 0 40upx;
	    width: 682upx;
	    margin: 0 auto;
	    margin-top: -100upx;
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
		.sign-list{
		    display: flex;
		    justify-content: space-between;
		    padding: 32upx 0px;
		}
		.coin{
		    width: 68upx;
		    height: 68upx;
		    margin-bottom: 12upx;
		}
		
		.sign-item{
		    display: flex;
		    align-items: center;
		    flex-direction: column;
		}
		.sign-text{
		    color: #999;
		    font-size: 20upx;
		}
		.no-sign-click{
		    opacity: 0;
		    margin-top: -50px;
		}
		.sign-beforn-text{
		    transition: all 0.5s linear;
		}
		.no-sign{
		    width: 68upx;
		    height: 68upx;
		    background: rgba(255,214,55, 0.3);
		    color:#f9ac12;
		    border-radius: 50%;
		    margin-bottom: 12upx;
		    font-size: 24upx;
		    display: flex;
		    justify-content: center;
		    align-items: center;
		}
		.gift-img{
		    width: 40%;
		    height: 40%;
		}
		.sign-color333{
		    color: #333;
		}
		.sign-info{
		    font-size: 22upx;
		    text-align: center;
		    padding: 16upx 0 12upx 0;
			letter-spacing: 2upx;
		    color: rgb(136, 136, 136);
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
		.integral-content{
		    padding: 40upx;
		    background: #fff;
		    margin-top: 30upx;
		    border-radius: 26upx;
		}
		.put-integral-content{
		    padding: 20upx;
		    background: #fff;
		    margin-top: 30upx;
		    border-radius: 26upx;
		}
		.get-item{
		    display: flex;
		    justify-content: space-between;
		    align-items: center;
		    padding: 22upx 0;
		}
		.put-item{
		    display: flex;
		    justify-content: space-between;
		    align-items: center;
		    padding: 12px 0;
		}
		.get-left{
		    display: flex;
		    margin-right: 8upx;
		    width: calc(100% - 120upx);
		}
		.get-item-img{
		    width: 90upx;
		    height: 90upx;
		    margin-right: 22upx;
		    flex-shrink: 0;
		}
		.put-left{
		    display: flex;
		    width: calc(100% - 120upx);
		}
		.put-item-img{
		    width: 210upx;
		    height: 152upx;
		    margin-right: 40upx;
		    border-radius: 8px;
		    overflow: hidden;
		}
		.get-integral-title{
		    font-weight: bold;
		    margin-bottom: 20upx;
			letter-spacing: 2upx;
		}
		.get-item-content{
		    display: flex;
		    flex-direction: column;
		    justify-content: center;
		
		}
		.get-item-title{
		    font-size: 26upx;
		    font-weight: bold;
			margin-bottom: 10upx;
			letter-spacing: 2upx;
		}
		
		.get-item-text{
		    color: #999;
		    font-size: 22upx;
		}
		
		.put-item-content{
		    display: flex;
		    justify-content: center;
		    flex-direction: column;
		    width: calc(100% - 105px);
		}
		.put-item-title{
		    overflow: hidden;    
		 	text-overflow: ellipsis;
		 	white-space: nowrap;
		    font-size: 30upx;
		    font-weight: bold;
		    margin-bottom: 8upx;
		    box-sizing: border-box;
			letter-spacing: 2upx;
		}
		
		.put-item-text{
		    color:#f15822;
		    font-size: 24upx;
		}
		.del-item-text{
		    color:#bbb;
		    font-size: 22upx;
		    text-decoration: line-through;
		    margin-bottom: 6upx;
		}
		.get-btn{
		    .back-btn-color();
		    width: 108upx;
		    height: 58upx;
		    line-height: 58upx;
		    text-align: center;
		    font-size: 24upx;
		    border-radius: 30upx;
			color: #fff;
		}
		.after-get-btn{
		    background: #efefef;
		    color: #999;
		    width: 108upx;
		    height: 58upx;
		    line-height: 58upx;
		    text-align: center;
		    font-size: 24upx;
		    border-radius: 30upx;
		}
		.colorRed{
		    color: red;
		}
		.sign-btn{
		    .back-btn-color();
		    height: 74upx;
			width: 314upx;
		    line-height: 74upx;
		    text-align: center;
		    border-radius: 38upx;
		    margin: 0 auto;
		    font-weight: bold;
			color: #fff;
			letter-spacing: 2upx;
		}
		.after-sign-btn{
		    background: #efefef;
		    color:#999;
		    height: 74upx;
		    line-height: 74upx;
		    text-align: center;
		    border-radius: 38upx;
		    width: 314upx;
		    margin: 0 auto;
		    font-weight: bold;
			letter-spacing: 2upx;
		}
	}
	.official-error{
	    font-size: 28upx;
	    padding: 32upx 28upx;
	    background: #fff;
	    border-radius: 20upx;
	    color: @mainColor;
		margin-top: 10upx;
	}
}
</style>
