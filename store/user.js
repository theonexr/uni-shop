export default{
	namespaced:true,
	
	satte:()=>({
		address:{},
		token:','
	}),
	mutations:{
		// 更新收货地址
		updateAddress(state,address){
			state.address = address
		}
	},
	getters:{
		
	},
}