<template>
	<view id="repair">
		<view class="form">
		  <view class="form-item position">
			  <view class="form-title">
				  <span style="color:red;margin-top:2px;margin-right:2px">*</span> 损坏部位
			  </view>
			  <input placeholder="请选择损坏部位" v-model="option" class="input marginR10" disabled='true' @click="openPosition"/>
			  <view class="face-right" @click="openPosition">
				  <img :style="{transform:showPosition ? 'rotate(90deg)' : ''}" class="icon-img"  src="/static/images/face-right-9.png"/>
			  </view>
			  <!--  -->
			  <view class="openPosition"  id="openPosition" v-if="showPosition">
				<view>
				  <view v-for="(item,key) in options" :key="key" class="option-item border-bottom" @click="choosePosition(item)">
					{{item}}
				  </view>
				</view>
			  </view>
		  </view>
		  <!--  -->
		  <view class="form-item-textarea">
			  <view class="form-title">
				 <span style="color:red;margin-top:2px;margin-right:2px">*</span> 损坏描述
			  </view>
			  <textarea v-if="!showPosition" placeholder="损坏描述" v-model="remark" class="textarea" :disabled="hasEdit"/>
			  <view class="textarea" v-if="showPosition">
	
			  </view>
		  </view>
		  <!--  -->
		  <view class="form-item-textarea">
			  <view class="form-title">
				<span style="color:red;margin-top:2px;margin-right:2px">*</span>  损坏图片
			  </view>
			  <view class="upload">
				  <view v-if="uploadImgUrl===''" class="upload-border" @click="uploadImg(0)">
					  <img  src="/static/images/add.png" mode='widthFix'/>
				  </view>
				  <img @click="prevImg" v-if="uploadImgUrl!==''" style="width:80px;height:80px" :src="uploadImgUrl"/>
				  <view class="close-img" v-if="uploadImgUrl!==''" @click="delImg(1)">
					  <img src="/static/images/error.png" mode='widthFix'/>
				  </view>
			  </view>
		  </view>
		</view>
		<view class="cut-block"  @click="goRule">
		  <img  src="/static/images/repair-q.png" mode='widthFix'/>
		  内标图在哪看？
		</view>
		<!--  -->
		<view class="form2" >
				<!--  -->
		  <view class="form-item-textarea">
			  <view class="form-title">
			   <span style="color:red;margin-top:2px;margin-right:2px">*</span>  内标图
			  </view>
			  <view class="upload">
				  <view v-if="uploadImgUrl2===''" class="upload-border" @click="uploadImg(1)">
					  <img  src="../../static/images/add.png" mode='widthFix'/>
				  </view>
				  <img @click="prevImg" v-if="uploadImgUrl2!==''" style="width:80px;height:80px" :src="uploadImgUrl2"/>
				  <view class="close-img" v-if="uploadImgUrl2!==''" @click="delImg(2)">
					  <img src="../../static/images/error.png" mode='widthFix'/>
				  </view>
			  </view>
		  </view>
		  <view class="form-item position">
			  <view class="form-title">
				  内标编码-1
			  </view>
			  <input v-model="number1" placeholder="请填写内标编码" class="input"/>
		  </view>
		  <view class="form-item position">
			  <view class="form-title">
				  内标编码-2
			  </view>
			  <input v-model="number2" placeholder="请填写内标编码" class="input"/>
		  </view>
	
		</view>
		<!-- 按钮 -->
		<view class="fix-btn" >
			<view class="bootom-l-btn" style="margin: 0;" @click="reportRepair">
				保存
			</view>
		</view>
		<!-- 提示框 -->
		<wyb-loading title="请稍后" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-toast :title="toastTitle" ref="toast" :loadingType="toastType" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-modal ref="modal" :msgText="msgText" confirmText="确认" @confirmAction="confirmReport"></my-modal>
	</view>
</template>

<script>
	import global from '@/common/global.vue'
	export default {
		data() {
			return {
				toastTitle:"",
				toastType:'',
				msgText:"",
				  uploadImgUrl:'',
				  uploadImgUrl2:'',
				  number1:'',
				  number2:'',
				  showPosition:false,
				  product:{},
				  options:[123,568,789],
				  option:'',
				  remark:'',
				  isGo:false,
			};
		},
		methods:{
			goRule(){
				
			},
			openPosition(){
				this.showPosition == true ? this.showPosition = false : this.showPosition = true;
			},
			choosePosition(item){
				this.showPosition = false;
				this.option = item;
			  }, 
			// 最终确认
		  confirmReport(){
			  if(this.isGo){
				  let data = {
				    id:this.product.id,
				    repairsRtr:this.option,
				    remake:this.remark,
				    damageImg:this.uploadImgUrl,
				    vendorCode:this.number1,
				    purContractNumber:this.number2,
				    insideImg:this.uploadImgUrl2
				  }
				  this.$refs.loading.showLoading() // 显示
				  this.myRequest('/miniProgram/api/repairs/add',{data:data}).then(res => {
				  	this.$refs.loading.hideLoading() // 显示
				    if(res.data.status === 0){
				  	this.toastType = "ring";
				  	this.toastTitle = "上报成功";
				  	this.$refs.toast.showLoading() // 显示 
				  	setTimeout(()=>{
				  	  uni.navigateBack()   
				  	},1500)
				   }else if(res.data.status === 10037){
						this.toastType = "none";
						this.toastTitle = "输入不完整";
						this.$refs.toast.showLoading() // 显示
				    }
				    else{
				  	  this.toastType = "error";
				  	  this.toastTitle = "上报失败";
				  	  this.$refs.toast.showLoading() // 显示
				    }
				  })
			  }
		  },
		  // 弹框
			  reportRepair(){
				if(this.option !== '' && this.remark !== ''&& this.uploadImgUrl !== ''&& this.uploadImgUrl2 !== ''){
					this.$refs.loading.showLoading() // 显示
				  this.myRequest('/miniProgram/api/repairs/str').then(res => {
					  this.isGo = false;
					if(res.data.status === 0){
						this.isGo = true;
					  this.msgText = res.data.data;
					}else if(res.data.status === 10009 || res.data.status === 99999){
					  this.msgText = "系统出错";
					}else{
					  this.msgText = res.data.msg; 
					}
					this.$refs.loading.hideLoading();
					this.$refs.modal.toggleModal();
				  })
				}else{
				  this.toastType = "none";
				  this.toastTitle = "请输入完整信息";
				  this.$refs.toast.showLoading() // 显示
				}
		
			  },
			  uploadImg(type){
				let that = this;
				uni.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function (res) {
							uni.uploadFile({
								url: global.ip+'file/weixin/upload', 
								filePath: res.tempFilePaths[0], 
								name: 'file',
								formData:{
									'token':wx.getStorageSync('gtoken')
								},
								header: {
								'Content-Type': 'multipart/form-data' // 默认值
								},
								success (res1){
									if(type===0){
									  that.uploadImgUrl = JSON.parse(res1.data).url;
									}else{
									  that.uploadImgUrl2 = JSON.parse(res1.data).url;
									}
								},
								fail(err){
									console.log(err)
								}
							})
	  
					}
				})
			},
			delImg(type){
				type === 1 ? this.uploadImgUrl = '' : this.uploadImgUrl2 = '';
			},
			prevImg(){
				uni.previewImage({
					//当前显示图片
					urls: [this.uploadImgUrl]
				})
			},
		},
		onLoad(query){
		  this.showPosition = false;
		  this.product = JSON.parse(query.product);
	console.log(this.product)
		  this.options = JSON.parse(this.product.goodsMaintainOption);
		  this.option = '';
		  this.remark = '';
		  this.uploadImgUrl = '';
		  this.uploadImgUrl2 = '';
		  this.number2 = '';
		  this.number1 = '';
		}
	}
</script>

<style lang="less">
@import url("../../common/common.less");
#repair{
	padding-bottom: 180upx;
	.position{
	  position: relative;
	}
	.transform90{
	  transform: rotate(90deg)
	}
	.upload{
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    font-size: 24upx;
	    color: #bbb;
	    position: relative;
	}
	.upload-border{
	    padding: 50upx;
	    border: 2upx dashed #ddd;
	    border-radius: 16upx;
		img,image{
			width: 60upx;
		}
	}
	.close-img{
	    position: absolute;
	    top: -16upx;
	    right: -16upx;
	    width: 32upx;
	    z-index: 2;
	}
	/* .icon-img{
	  transition:all 0.6s ease;
	} */
	@keyframes mymove
	{
	  from{
	    height:0px;
	  }
	  to{
	    height: 100%;
	  }
	}
	.openPosition{
	  border: 1px solid #efeff4;
	  border-bottom:none; 
	  position: absolute;
	  background: #fff;
	  width: calc(100vw - 120px);
	  top: 100%;
	  right: 20px;
	  z-index: 10;
	  color: #666;
	  /* animation:mymove 1s ease; */
	  overflow: hidden;
	}
	.border-bottom{
	  border-bottom: 1px solid #efeff4;
	}
	.form{
	  padding: 0 16upx;
	  background: #fff;
	  margin-top: 50upx;
	}
	.form2{
		padding: 0 16upx;
		background: #fff;
		margin-top: 8upx;
	}
	.form-item{
	  padding: 20upx 14upx;
	  border-bottom: 2upx solid #efeff4;
	  display: flex;
	  font-size: 26upx;
	  align-items: center;
	}
	.form-item-textarea{
	  padding: 20upx;
	  border-bottom: 2upx solid #efeff4;
	  display: flex;
	  font-size: 26upx;
	}

	.input{
	  width: calc(100% - 140px);
	}
	.marginR10{
	  margin-right: 28upx;
	}
	.face-right{
	  width: 32upx;
	  height: 32upx;
	}
	.form-item-textarea{
	  padding: 20upx;
	  border-bottom: 2upx solid #efeff4;
	  display: flex;
	  font-size: 28upx;
	}
	.form-title{
	  width: 200upx;
	  display: flex;
	  font-size: 28upx;
	}
	.textarea{
	  padding: 4upx 0 0 0;
	  width: calc(100% - 220upx);
	  height: 160upx;
	  font-size: 26upx;
	}
	.cut-block{
		font-size:22upx;
		color:#999;
		line-height:44upx;
		margin-top:40upx;
		margin-left:20upx;
		display:flex;align-items:center;text-decoration:underline;
	}
	.cut-block img{
		width: 24upx;
		margin-right: 12upx;
	}
	.report-btn{
	    background: #FFD637;
	    height: 48px;
	    line-height: 48px;
	    text-align: center;
	    border-radius: 30px;
	    width: 80vw;
	    margin: 0 auto;
	    margin-top: 150px;
	    font-size: 18px;
	}
	.position-panel{
	  background: #fff;
	}
	.option-item{
	  text-align: center;
	  height: 30px;
	  line-height: 30px;
	  /* border-bottom: 1px solid #efeff4; */
	  font-size: 26upx;
	}
}
</style>
