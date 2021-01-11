<template>
	<view id="message">
	  <view class="message-item" v-for="(item,key) in messages" :key="key">
		  <view class="msg-time-title">
			  {{item.releaseTime}}
		  </view>
		  <view class="msg-arti-content"   @click="goDetail(item)">
			  <view class="msg-title">
				  <span class="tag">{{types[item.articleType]}}</span>{{item.title}}
			  </view>
			  <!--  -->
			  <view class="msg-describes">
				  {{item.describes}}
			  </view>
			  <!--  -->
			  <view class="article-img" v-if="item.articleType === 0 || item.articleType === 3">
				  <img :src="item.articleImg"/>
			  </view>
			  <!--  -->
			  <view class="go-detail" v-if="item.articleType === 0 || item.articleType === 3">
				  <view>阅读原文</view>
				  <view class="msg-right">
					<view class="right-padding-r" v-if="item.forwardFlag===0">
						分享即得<span class="right-text-num">{{item.integralNum}}</span>奖学金
					</view>
					<view class="go-detail-img">
						<img src="/static/images/face-right-9.png"/>
					</view>
				  </view>
			  </view>
			  <view class="height30" v-if="item.articleType !== 0 && item.articleType !== 3">

			  </view>
		  </view>
	  </view>
	  <!-- 提示框 -->
	  <wyb-loading title="请稍后" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
	  <my-toast :title="toastTitle" ref="toast" :loadingType="toastType" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
	</view>
</template>

<script>
	import {timeFormat1} from "../../common/common.js"
	export default {
		data() {
			return {
				toastTitle:"出错啦",
				toastType:"error",
				size:10,
				page:0,
				totalPage:0,
				url:'',
				messages:[{forwardFlag:0,releaseTime:'10:56',articleType:0,title:'haha',integralNum:10,describes:"我们FIFO华东师范本年度发布会山东矿机发动机佛山大部分十多年来范德萨发红包的搜救",articleImg:'https://level8cases.oss-cn-hangzhou.aliyuncs.com/lADPBGnDZ0PGI6zNAYfNA4Q_900_391-eee11ea1-9fdb-4a3f-a51a-c4f9985d83de.jpg'}],
				types:['独家精选','通知','通知','独家精选','通知']
			}
		},
		methods: {
			goDetail(item){
				let url = encodeURIComponent(item.wxUrl)
				let content = encodeURIComponent(item.content)
				if(item.articleType === 0 || item.articleType === 3){
					if(item.wxUrl !== '' &&  item.wxUrl !== undefined)
						uni.navigateTo({
							url:'/pages/articleDetail/articleDetail?url='+url+'&id='+item.id
						})
					else
						uni.navigateTo({
							url:'/pages/articleDetail/articleDetail?article='+content+'&id='+item.id
						})
				}
			},
			getList(){
				let data = {
					page:this.page,
					size:this.size
				} 
				this.$refs.loading.showLoading();
				this.myRequest(this.url,{data:data,method:'GET',contentType:"application/json"}).then(res => {
					this.$refs.loading.hideLoading();
					res.data.data.content.forEach(item => {
						item.releaseTime = timeFormat1(item.releaseTime);
					})
					this.messages = this.messages.concat(res.data.data.content);
					this.totalPage = res.data.data.totalPages;
				})
			}
		},
		onReachBottom(){
			if(this.page === this.totalPage-1){
				this.toastType = "none";
				this.toastTitle = "已经到底啦！";
				this.$refs.toast.showLoading() // 显示
			}else{
				this.page++;
				this.getList();
			}
		},
		onLoad(query){
			this.page = 0;
			this.messages = [];
			console.log(query)
			if(query.type === "0")
				this.url = '/miniProgram/api/notification/info';      //文章和通知都获取 
			else{
				this.url = '/miniProgram/api/notification/article/info';//只获取文章列表
				uni.setNavigationBarTitle({
					title: '独家精选' 
				})
			}
			this.getList();
		}
	}
</script>

<style lang="less">
	@import url("../../common/common.less");
	#message{
		padding: 0 34upx 100upx;
		.message-item{
		    padding: 44upx 0 0 0;
		}
		.msg-time-title{
		    font-size: 22upx;
		    color: #999;
		    text-align: center;
		    margin-bottom: 20upx;
		}
		.msg-arti-content{
		    background: #fff;
		    border-radius: 15upx;
		    padding: 32upx 40upx 0;
		}
		.msg-title{
		    margin-bottom: 16upx;
		    font-size: 36upx;
		    /* font-weight: bold; */
		    line-height: 56upx;
			letter-spacing: 2upx;
			}
		.tag{
		    padding: 0upx 16upx;
		    margin-right: 20upx;
		    border-radius: 22upx;
		    font-size: 24upx;
		    background: rgba(255,214,55, 0.3);
		    color:#f26f18;
		    font-weight: normal;
			// box-sizing: border-box;
			letter-spacing: normal;
		}
		
		.msg-describes{
		    font-size: 26upx;
		    color: #666;
		    margin-bottom: 20upx;
			letter-spacing: 2upx;
			line-height: 38upx;
		}
		.article-img{
		    width: 100%;
		    height: 300upx;
		    border-radius: 16upx;
		    overflow: hidden;
		}
		.msg-right{
		    display: flex;
		    font-size: 22upx;
		    color: #888;
		}
		.right-text-num{
		    color: #f26f18;
		}
		.right-padding-r{
		    padding-right: 10upx;
			letter-spacing: normal;
		}
		.go-detail{
		    display: flex;
		    justify-content: space-between;
		    align-items: center;
		    padding: 28upx 0;
		    width: 100%;
		    font-size: 28upx;
		    color: #333;
			letter-spacing: 2upx;
		}
		.go-detail-img{
		    width: 32upx;
		    height: 32upx;
		}
		.height30{
		    height: 60upx;
		}
	}
</style>
