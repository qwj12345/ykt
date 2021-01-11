<template>
	<view id="bags">
		<page-top></page-top>
		<!-- 有绑定产品时 -->
		<view class="product-list" v-if="products.length !== 0">
			<view v-for="(item,key) in products" :key="key" class="product-item" :class="{'padb':!item.open}">
				<view class="flex-row" :class="{'border-bottom':item.open}"  @click="openDetail(key)">
					<view class="product-info"> 
						<!--  -->
						<view class="product-img">
							<img :src="item.goodsImg"/>
						</view>
						<!--  -->
						<view class="product-text">
							<view class="product-title">
								{{item.encode}} 
							</view>
							
							<view class="product-status">
								状态：{{item.statusName}}
							</view>
							<view class="product-time">
								拥有者：{{item.childName}}
							</view>
							<view class="product-time">
								购买时间：{{item.goodsAddTime}}
							</view>
						</view>
					</view>
					<view class="face-right" :class="{'face-bottom':item.open}">
						<img src="/static/images/face-right-9.png"/>
					</view>
				</view>
				
				<!--  -->
				<view class="product-option" v-if="item.open">
					<view  class="option-item" @click="showBind(item)">
						<view class="option-img">
							<img src="https://level8cases.oss-cn-hangzhou.aliyuncs.com/1-8ada8757-e9dc-4939-8d47-28ec698727e0.png"/>
						</view>
						<view v-if="!item.childId" class="option-text">
							绑定所有者
						</view>
						<view v-else class="option-text" style="color: red;">
							已绑定儿童
						</view>
					</view>
					<view class="option-item" @click="goGS(item)">
						<view class="option-img">
							<img src="https://level8cases.oss-cn-hangzhou.aliyuncs.com/2-80c6c000-d6fd-42b1-8c8f-8e841c8eabef.png"/>
						</view>
						<view v-if="item.statusName==='正常' || item.statusName==='拾到'" class="option-text" >
							挂失登记
						</view>
						<view v-else class="option-text colorR">
							已寻回登记
						</view>
					</view>
					<view class="option-item" @click="goRule">
						<view class="option-img">
							<img src="https://level8cases.oss-cn-hangzhou.aliyuncs.com/3-86dffe87-6e9b-4793-a580-2fb6c017a8d5.png"/>
						</view>
						<view class="option-text">
							保修
						</view>
					</view>

					<view class="option-item" @click="goRepair(item)">
						<view class="option-img">
							<img src="https://level8cases.oss-cn-hangzhou.aliyuncs.com/4-a7712f20-921c-4268-b737-a68e86ca6202.png"/>
						</view>
						<view class="option-text">
							<span v-if="item.repairsType===5">报修登记</span>
							<span v-if="item.repairsType===3" class="colorFF7">待收货</span>
							<span v-if="item.repairsType===0" class="colorFF7">上报中</span>
							<span v-if="item.repairsType!==0 && item.repairsType!==5 && item.repairsType!==3" class="colorR">维修中</span>
						</view>
					</view>
	
				</view>
			</view>
		</view>
		<!-- 没有绑定产品时 -->
		<view v-if="products.length === 0" class="no-product">
			<image class="no-product-img" src="../../static/images/no_product.png"/>
			<view class="no-product-text">
				您还没绑定产品~
			</view>
			<navigator  url="/pages/register/register" open-type="navigate"  class="no-product-btn">
				前往绑定
			</navigator>
		</view>
		<!-- 选择需要绑定孩子的弹框 -->
		<e-modal  :visible.sync="visible">
			<view class="edit-subject">
				<view class="top">
					绑定所有者
				</view>
				<radio-group v-if="children.length!==0" class="children" @change="changeRadio">
					<view class="child" v-for="(item,key) in children" :key="key">
						<radio color="rgb(244,157,26)" :value="item.id" :checked="item.id === childId" />
						<view>{{item.name}}</view>
					</view>
				</radio-group >
				<view v-if="children.length===0" class="no-child-text">
					您还没有添加孩子哦~
				</view>
				<view v-if="children.length!==0" class="btn" @click="bindChild">确定</view>
				<view v-if="children.length===0" class="btn" @click="goChild">立即添加</view>
			</view>
		</e-modal>
		<!-- 提示框 -->
		<wyb-loading title="请稍后" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-toast :title="toastTitle" ref="toast" :loadingType="toastType" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-modal ref="modal" :msgText="msgText" confirmText="确认" @confirmAction="confirmReport"></my-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				visible:false,
				msgText:"",
				toastTitle:"出错啦",
				toastType:"error",
				totalPage:0,
				page:0,
				products:[],
				productId:'',
				productCode:'',
				modalType:-1,
				children:[],
				childId:'' //
				// products:[{open:false,goodsImg:"https://level8cases.oss-cn-hangzhou.aliyuncs.com/矩形5拷贝-9d8d1b40-7ca3-41c0-a2cd-4cae3d1378ef.png",statusName:"正常",goodsAddTime:"2020/05/20",encode:"LA-1688-02T00",repairsType:5}]
			};
		},
		methods:{
			openDetail(key){
				this.products[key].open === true ? this.products[key].open = false : this.products[key].open = true;
			},
			// 选择孩子单选框事件
			changeRadio(e){
				this.childId = parseInt(e.detail.value);
			},
			// 跳到添加孩子
			goChild(){
				uni.navigateTo({
					url:"../childInfo/childInfo"
				})
			},
			// 绑定弹窗
			showBind(item){
				this.$refs.loading.showLoading() // 显示
				this.myRequest("gmt/api/gmtChild/child/gmtChildList",{data:{},contentType:"application/json"}).then(res =>{
					this.$refs.loading.hideLoading();
					if(res.data.code===0){
						this.children = res.data.data;
						this.childId = this.children[0].id;
						this.productId = item.id;
						this.visible = true;
					}else{
						this.toastType = "error";
						this.toastTitle = "出错啦~";
						this.$refs.toast.showLoading() // 显示
					}
				
				})
			},
			// 挂失 取消挂失
			goGS(item){
				if(item.statusName==='正常' || item.statusName==='拾到'){
					this.modalType = 2;
					this.msgText = "<div style='text-align:center'>当您确认挂失时，表示同意我们将您的信息发送给拾到者，以便联系！</div>";
				}else{
					this.modalType = 3;
					this.msgText = "<div style='text-align:center'>您已找到失物？将取消挂失该产品</div>";
				}
			
				this.productCode = item.encode;
				this.$refs.modal.toggleModal(); // 显示
			},
			// 上报维修
			goRepair(item){
				if(item.repairsType === 5){
					item = JSON.stringify(item)
					item=item.replace(/\%/g,"%25");
					item=item.replace(/\#/g,"%23");
					item=item.replace(/\&/g,"%26");
					uni.navigateTo({
						url:'/pages/repair/repair?product='+item
					})
				}else if(item.repairsType === 0 || item.repairsType === 3){
					this.msgText = "<div style='text-align:center'>您确定取消上报维修吗？</div>";
					this.$refs.modal.toggleModal(); // 显示
					this.modalType = 1;
					this.productId = item.id;
				}
	
			},
			goRule(){
				uni.navigateTo({
					url:'/pages/rules/rules?type=BX'
				})
			},
			// 弹框事件
			confirmReport(){
				if(this.modalType===1){//取消上报
					let data = {
						id:this.productId,
					}
					this.$refs.loading.showLoading() // 显示
					this.myRequest('/miniProgram/api/repairs/del',{data:data}).then(res => {
						this.$refs.loading.hideLoading()
						if(res.data.status === 0){
							this.toastType = "ring";
							this.toastTitle = "取消成功";
							this.$refs.toast.showLoading() // 显示
							this.products = [];
							this.page = 0;
							this.getProducts();  //改变一个产品状态后重新获取下产品列表
						
						}else{
							this.toastType = "error";
							this.toastTitle = "取消失败";
							this.$refs.toast.showLoading() // 显示
						}
					})
				}else if(this.modalType===2){//挂失登记
					let data = {
						goodsCode:this.productCode,
					}
					this.$refs.loading.showLoading() // 显示
					this.myRequest('/miniProgram/api/goods/verlustanzeige',{data:data}).then(res => {
						this.$refs.loading.hideLoading() 
						if(res.data.status === 0){
							this.toastType = "ring";
							this.toastTitle = "挂失成功";
							this.$refs.toast.showLoading() // 显示
							this.products = [];
							this.page = 0;
							this.getProducts();  //改变一个产品状态后重新获取下产品列表
							
						}else{
						   this.msgText = "<div style='text-align:center'>挂失失败，如未填写个人信息请先填写</div>";
						   this.$refs.modal.toggleModal(); // 显示
						}
						
					})
				}else if(this.modalType===3){//取消挂失登记
					let data = {
						goodsCode:this.productCode
					}
					this.$refs.loading.showLoading() // 显示
					this.myRequest('/miniProgram/api/goods/restore/status',{data:data}).then(res => {
						this.$refs.loading.hideLoading() 
						if(res.data.status === 0){
							this.toastType = "ring";
							this.toastTitle = "取消挂失成功";
							this.$refs.toast.showLoading() // 显示
							this.products = [];
							this.page = 0;
							this.getProducts();  //改变一个产品状态后重新获取下产品列表 
						}else{
							this.toastType = "error";
							this.toastTitle = "取消失败";
							this.$refs.toast.showLoading(); // 显示
						}
					})
				}

			},
			// 绑定孩子
			bindChild(){
				let data = {
					childId:this.childId,
					goodsCodeId :this.productId,
				}
				this.$refs.loading.showLoading() // 显示
				this.myRequest('/gmt/api/gmtChild/gmtChildBag/binding',{data:data}).then(res => {
					this.$refs.loading.hideLoading() // 显示
					if(res.data.code === 0){
						this.toastType = "ring";
						this.toastTitle = "绑定成功";
						this.$refs.toast.showLoading() // 显示
						this.products = [];
						this.page = 0;
						this.getProducts();  //改变一个产品状态后重新获取下产品列表
						getApp().globalData.bagFlag = 1;//做个标记 让首页孩子产品更新
					}else{
						this.toastType = "error";
						this.toastTitle = "绑定失败";
						this.$refs.toast.showLoading() // 显示
					}
					this.visible = false;
				})
			},
			// 获取产品列表
			getProducts(){
				let data = {
					page:0,
					size:10
				}
				this.$refs.loading.showLoading() // 显示
				this.myRequest('/miniProgram/api/goods/list',{data:data}).then(res => {
					this.$refs.loading.hideLoading() // 显示
					let products = this.products.concat(res.data.data);
					this.totalPage = Math.ceil(res.data.total/this.size);
					products.forEach(item => {
						item.open = false;  //设置产品为未打开的样子
						item.childName ? item.childName = item.childName : item.childName = "未绑定";
					})
					this.products = products;
				})
			
			},
		},
		onShow() {
			this.products = [];
			this.getProducts();
		}
	}
</script>

<style lang="less">
@import url("../../common/common.less");
#bags{
	.product-list{
	  position: relative;
	  width: 682upx;
	  margin: 0 auto;
	  margin-top: -140upx;
	  z-index: 5;
	}

	.product-item{
	    background: #fff;
	    border-radius: 16upx;
	    padding: 40upx 30upx 0 38upx;
	    margin-bottom: 30upx;
	}
	.padb{
	    padding-bottom: 40upx !important;
	}
	.flex-row{
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	}
	
	.border-bottom{
	    border-bottom: 2upx solid #efeff4;
	    padding-bottom: 20upx;
	}
	.product-info{
	    display: flex;
	    justify-content: space-between;
	}
	.product-img{
	    width: 180upx;
	    height:180upx;
	    margin-right: 30upx;
		border-radius: 12upx;
		overflow: hidden;
	}
	.product-text{
	    display: flex;
	    justify-content: space-around;
	    flex-direction: column;
	}
	.product-title{
	    font-size: 32upx;
	    display: flex;
	}

	.product-status{
	    color: #ff7836;
	    font-size: 24upx;
	}
	.product-time{
	    color: #999;
	    font-size: 24upx;
	}
	.product-option{
	    display: flex;
	    justify-content: space-between;
	    padding: 20upx 10upx 24upx;
	
	}
	.option-item{
	    display: flex;
	    flex-flow: column;
	    align-items: center;
	    color: #333;
	}
	.option-img{
	    width: 64upx;
	    height: 64upx;
	    margin-bottom: 20upx;
	}
	.option-text{
	    font-size: 20upx;
	}
	.face-right{
	    width: 20px;
	    height: 20px;
	    transition: all 0.3 linear;
	}
	
	.face-bottom{
	    transform: rotate(90deg);
	}
	.colorR{
	    color: red;
	}
	.colorFF7{
	    color: #ff7836;
	}
	.no-product{
	    margin-top: 120upx;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	}
	.no-product-img{
	    width: 360upx;
		height: 360upx;
	}
	.no-product-text{
	    color: @mainColor;
	    margin-top: 20upx;
	    margin-bottom: 40upx;
	    font-size: 28upx;
		letter-spacing: 2upx;
	}
	.no-product-btn{
	    background: linear-gradient(left,rgb(255,169,41),rgb(255,131,31));
	    width: 360upx;
	    margin: 40upx auto;
	    box-sizing: border-box;
	    height: 96upx;
	    border-radius: 48upx;
	    color: #fff;
	    font-size: 32upx;
	    letter-spacing: 2upx;
	    text-align: center;
	    line-height: 96upx;
	    box-shadow: 0 4upx 16upx 0upx rgb(255,155,31);
	}
	.edit-subject{
		width: 520upx;
		padding: 0 14upx;
		.top{
			font-size: 36upx;
			padding: 32upx 0 26upx;
			text-align: center;
			letter-spacing: 2upx;
			border-bottom: 2upx dashed  #eee;
		}
		.children{
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20upx 0;
			.child{
				padding: 16upx 0;
				font-size: 28upx;
				display: flex;
				align-items: center;
				radio{
					transform: scale(0.7);
					margin-right: 10upx;
				}
			}
		}
		.no-child-text{
			font-size: 32upx;
			letter-spacing: 2upx;
			text-align: center;
			padding: 80upx 0 70upx;
		}
		.btn{
			font-size: 32upx;
			letter-spacing: 2upx;
			color: #fff;
			height: 66upx;
			line-height: 66upx;
			width: 216upx;
			text-align: center;
			border-radius: 40upx;
			background: linear-gradient(left,rgb(255,169,41),rgb(255,131,31));
			margin: 0 auto;
			margin-bottom: 30upx;
		}
	}
}
</style>
