<template>
	<view id="subject">
		<view class="title">
			<view>已添加课程</view>
			<view class="title-desc1">填写重量，可计算儿童当日负重情况</view>
		</view>
		<!--  -->
		<view class="content">
			<view v-for="(item,key) in list" :key="key" class="item display-between-center">
				<view class="name">{{item.name}}</view>
				<view class="weight">{{item.weight}}kg</view>
				<view class="btns">
					<view @click="showEidt(item)">编辑</view>
					<view class="line"></view>
					<view @click="del(item.id)">删除</view>
				</view>
			</view>
		</view>

		<!-- 按钮 -->
		<view class="fix-btn" >
			<view class="bootom-l-btn" style="margin: 0;" @click="showEidt" >
				添加其他课程
			</view>
		</view>
		<!--  -->
		<e-modal  :visible.sync="visible">
			<view class="edit-subject">
				<view class="top">
					添加课程
				</view>
				<view class="item">
					<view>课名:</view>
					<input v-model="name" />
				</view>
				<view class="item item2">
					<view>教材重量:</view>
					<input v-model="weight" type="number"/>
				</view>
				<view class="btn" @click="edit">保存</view>
			</view>
		</e-modal>
		<!--  -->
		<my-toast :title="toastTitle" :loadingType="toastType" ref="toast" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<wyb-loading title="加载中" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				visible:false,
				toastTitle:"出错啦",
				toastType:"ring",
				list:[],
				id:-1,
				name:"",
				weight:""
			};
		},

		methods:{
			showEidt(item){
				if(item.id){
					this.id = item.id;
					this.name = item.name;
					this.weight = item.weight;
				}else{
					this.name = "";
					this.weight = "";
					this.id = -1;
				}
				this.visible = true;
			},
			// 编辑
			edit(){
				if(this.name!=="" && this.weight !== ""){
					if(this.id===-1){//新增
						let data = {
							name:this.name,
							weight:this.weight
						}
						this.$refs.loading.showLoading(); // 显示
						this.myRequest("/gmt/api/gmtChild/gmtClassCard/add",{data}).then(res => {
							this.$refs.loading.hideLoading(); 
							console.log(res.data)
							if(res.data.code===0){
								this.toastType = "ring";
								this.toastTitle = "添加成功";
								getApp().globalData.subjectFlag = 1;//做个标记 让首页课程表刷新
								this.$refs.toast.showLoading() // 显示
								this.visible = false;
								this.getSubject();
							}else{
								this.toastType = "error";
								this.toastTitle = "添加失败";
								this.$refs.toast.showLoading() // 显示
							}
						})
					}else{
						let data = {
							id:this.id,
							name:this.name,
							weight:this.weight
						}
						this.$refs.loading.showLoading(); // 显示
						this.myRequest("/gmt/api/gmtChild/gmtClassCard/update",{data}).then(res => {
							this.$refs.loading.hideLoading(); 
							
							if(res.data.code===0){
								this.toastType = "ring";
								this.toastTitle = "修改成功";
								this.$refs.toast.showLoading() // 显示
								this.visible = false;
								getApp().globalData.subjectFlag = 1;//做个标记 让首页课程表刷新
								this.getSubject();
							}else{
								this.toastType = "error";
								this.toastTitle = "修改失败";
								this.$refs.toast.showLoading() // 显示
							}
						})
					}
					
				}else{
					this.toastType = "none";
					this.toastTitle = "请填写完整";
					this.$refs.toast.showLoading() // 显示
				}

			},
			// 删除
			del(id){
				uni.showModal({
				    title: '删除科目',
				    content: '确认删除此科目？',
					confirmColor:'#F49D1A',
				    success:res => {
				        if (res.confirm) {
				            let data = {
				            	id 
				            }
				            this.$refs.loading.showLoading(); // 显示
				            this.myRequest("gmt/api/gmtChild/gmtClassCard/delete",{data}).then(res => {
				            	this.$refs.loading.hideLoading(); 
				            	console.log(res.data)
								if(res.data.code===0){
									this.toastType = "ring";
									this.toastTitle = "删除成功";
									this.$refs.toast.showLoading() // 显示
									getApp().globalData.subjectFlag = 1;//做个标记 让首页课程表刷新
									this.getSubject();
								}else{
									this.toastType = "error";
									this.toastTitle = "删除失败";
									this.$refs.toast.showLoading() // 显示
								}
				            })
				        } else if (res.cancel) {
				            
				        }
				    }
				});
			},
			// 获取科目
			getSubject(){
				this.$refs.loading.showLoading(); // 显示
				this.myRequest("gmt/api/gmtChild/gmtClassCard/selectData").then(res => {
					this.$refs.loading.hideLoading(); 
					if(res.data.code===0){
						this.list= res.data.data;
						console.log(this.list)
					}else{
						this.toastType = "error";
						this.toastTitle = "请求出错";
						this.$refs.toast.showLoading() // 显示
					}
				})
			}

		}, 

		onLoad(){
			this.getSubject();
		}
	}
</script>

<style lang="less">
@import url("../../common/common.less");
page{
	background: rgb(251,251,251);
}
 #subject{
	 padding-bottom: 180upx;
	 .title{
		 font-size: 36upx;
		 letter-spacing: 2upx;
		 padding: 30upx 30upx 10upx 30upx;
		 font-weight: bold;
		 display: flex;
		 align-items: center;
		 .title-desc1{
			 color: #999;
			 font-size: 24upx;
			 font-weight: normal;
			 margin-left: 30upx;
		 }
	 }
	 
	 .content{
			padding: 30upx;
			.item{
				 box-shadow: 0 6upx 18upx 0upx #efefef;
				 padding: 40upx 30upx 40upx 32upx; 
				 border-radius:  30upx;
				 margin-bottom: 28upx;
				 font-size: 30upx;
				 background: #fff;
				 .name{
					 font-weight: bold;
					 letter-spacing: 2upx;
					 width: 200upx;
					 overflow: hidden;
				 }
				 .weight{
					 color: #333;
				 }
				 .btns{
					 display: flex;
					 align-items: center;
					 font-size: 26upx;
					 color: @mainColor;
					 .line{
						 width: 2upx;
						 height: 30upx;
						 background: #E2E2E2;
						 margin: 0 20upx;
					 }
				 }
			 }
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
		
		.item{
			margin-top: 46upx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32upx;
			view{
				width: 140upx;
				text-align: right;
			}
			input{
				border: 2upx solid #e2e2e2;
				border-radius: 40upx;
				height: 60upx;
				width: 280upx;
				margin-left: 20upx;
				box-sizing: border-box;
				padding: 0 20upx;
				font-size: 28upx;
			}
		}
		.item2{
			margin-top: 30upx;
			margin-bottom: 50upx;
			input{
				padding: 0 60upx 0 20upx;
				position: relative;
			}
			input::after{
				content: "kg";
				font-size: 28upx;
				color: #666;
				position: absolute;
				right: 20upx;
				top: 50%;
				transform: translate(0,-50%);
			}
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
