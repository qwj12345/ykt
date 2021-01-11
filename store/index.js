import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({  
    state: {  
		isGmtInviteUser:0,
		hasAgree:true,
		person:{},
		login:false//获取toekn有没有成功
    },  
	getters:{
		
	},
	mutations: {
	   changeIntegral(state,num){
		   state.person.gmtIntegralNum = num;
	   },
	   changePerson(state,person){
		   state.person = person;
	   },
	   changeLogin(state,isLogin){
		   state.login = isLogin;
	   },
	   changeInvite(state,num){
		   state.isGmtInviteUser = num;
	   }
	},
	// 异步时才要用actiton
	actions: {
		changeIntegralAction(context,num){
			context.commit('changeIntegral',num)
		},
		changePersonAction(context,person){
			context.commit('changePerson',person)
		},
	} 
}) 

 export default store;