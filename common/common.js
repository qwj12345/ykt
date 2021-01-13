import global from '@/common/global'
import store from '@/store/index.js'
// 时间戳转
export function timeFormat(nS) {
    let date = new Date(parseInt(nS)) // 时间戳为10位需乘1000，为13位则不用
    console.log(date)
    let Y = date.getFullYear() // 年
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) // 月
    let D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() + '' // 日
    // return 125896455;
    return `${Y}/${M}/${D}`; // yyyy-mm-dd
}
// 格林尼治时间转
export function timeFormat1(nS,type) {
    let date = new Date(nS) // 
    let Y = date.getFullYear() // 年
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) // 月
    let D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate();// 日
    let H = date.getHours() < 10 ? '0' + date.getHours() + '' : date.getHours(); //时
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() + '' : date.getMinutes(); //分
    let Z = date.getDay();
    if(type === 0)
        return {
			month:`${M}月${Y}`,
			day:`${D}`,
			week:`${Z}`	
		}
	else if (type===3){
		return `${Y}/${M}/${D}`; // yyyy-mm-dd
	}
    else
        return `${M}/${D} ${H}:${minute}`; // mm-dd hh:minute
}
//两个时间相差天数 兼容firefox chrome
export function dateDifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式 
        var dateSpan,
            tempDate,
            iDays;
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
        dateSpan = sDate2 - sDate1;
        dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays
    };
// -----------------------封装uni.request请求--------------------
export function myRequest(url,config){
    return new Promise(function(resolve,reject){ 
        let { 
            data = {}, 
            contentType = 'application/x-www-form-urlencoded',//application/json
            method = 'POST',
            ...other
        } = {...config}   //解构赋值

        uni.getStorageSync("gtoken")? url=url+"?token="+uni.getStorageSync("gtoken"):url=url;//把token绑定在后面
		
        uni.request({
            url:global.ip + url,
            data:{...data},
            method: method,
            header: {
                'content-type': contentType
            },
            success(res){ 
                resolve(res)
            }
        })
    })
}
// -----------------------封装uni.request请求多种参数模式--------------------
export function myRequest2(url,config){
    return new Promise(function(resolve,reject){
        let { 
            data = {}, 
            contentType = 'application/x-www-form-urlencoded',//application/x-www-form-urlencoded
            method = 'POST',
            ...other
        } = {...config}   //解构赋值
		
        uni.getStorageSync("gtoken")? url=url+"?token="+uni.getStorageSync("gtoken"):url=url;//把token绑定在后面
		other.otherParams ? url += other.otherParams:url = url;//有其他需要拼接在后面的参数时
		
        uni.request({
            url:global.ip + url,
            data:data,
            method: method,
            header: {
                'content-type': contentType
            },
            success(res){ 
                resolve(res)
            }
        })
    })
}
 // -----------------------------------
export function loginUser(){
	return new Promise(function(resolve,reject){
		uni.login({
		  success:loginRes => {
			if (loginRes.code) {
			 uni.getUserInfo({
			   success: user => {
				  getApp().globalData.login = 1;
				  uni.request({
					url:global.ip+"wx/wxLogin",
					method:"POST",
					data:{
						code:loginRes.code,
						encryptedData:user.encryptedData,
						iv:user.iv
					},
					success:reqRes => {
						
						resolve(reqRes)
						if(reqRes.data.code === 200){
							store.commit("changeLogin",true);
							uni.setStorageSync('openId', reqRes.data.data.openId);
						}else{
							store.commit("changeLogin",false);
						}
					},
					fail:reqRes => {
						reject(reqRes)
						console.log(121212,reqRes)
					}
				  })
			   },fail(err){ //用户未授权
				  getApp().globalData.login = 0;
				  getApp().globalData.hasAgree = false;
				}
			 })
			} else {
			  console.log('登录失败！' + user.errMsg)
			}
		  }
		})
	})
    // ----------------------------------------------
}
//async await方式实现异步 获取token
export async function getToken(encryptedData,iv){
	let result = "";
	result = await new Promise(function(resolve,reject){ 
		uni.login({
		success (res) {
			if (res.code) {
			 uni.request({
					url: global.ip+'miniProgram/api/get/gmt/crm/token', //仅为示例，并非真实的接口地址
					data: {
						encryptedData: encryptedData,
						iv: iv,
						code:res.code
					},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success (res) {
						if(res.data.status === 0){
							store.commit("changeLogin",true);
							uni.setStorageSync('gtoken', res.data.token);
						}else{
							store.commit("changeLogin",false);
							console.log(9869,res.data);
						}
					
						resolve(res)
					}
				})
				
			}
		}
	})
	})

	return result
  }
  // 
  export function userToken(){
	  uni.getUserInfo({
		success: function(e) {//用户已授权
			getApp().globalData.login = 1;
			  // -----------------判断是否绑定手机号------------------
			  getToken(e.encryptedData,e.iv).then(res => {
				  if(res.data.status === 0){
					getApp().globalData.phone = 1;
					console.log('已绑定手机号');
				  }else{
					getApp().globalData.phone = 0;
				  }
				 
			  })
			  // ------------------------------
		},
		fail(err){ //用户未授权
		  getApp().globalData.login = 0;
		  getApp().globalData.hasAgree = false;
		}
	  })
  }
//----------登录----------------
  export function myLogin(){
	uni.login({
	  success (res) {
		if (res.code) {	
			userToken();
		} else {
			console.log('登录失败！' + res.errMsg)
		}
	  }
	})  
  }
