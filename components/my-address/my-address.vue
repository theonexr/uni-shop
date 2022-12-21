<template>
	<view>
		<!-- 选择收货地址的盒子 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="ChooseAddress">请选择收货地址+</button>
		</view>
		<!-- 渲染收货信息的盒子 -->
		<view class="address-info-box" v-else>
			<view class="row1">
				<view class="rowl-left">
					<view class="username">收货人:<text>{{address.userName}}</text></view>
				</view>
				<view class="rowl-right">
					<view class="phone">电话:<text>{{address.telNumber}}</text></view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址:</view>
				<view class="row2-right">{{address.provinceName+'xxx'+address.cityName+'xxx'+address.countyName+'xxx'+address.detailInfo}}</view>
			</view>
		</view>
		<!-- 底部边框线 -->
		<view class="imgBox">
			<image src="../../static/461c60e9ec8ed310613e0c118e244609.jpeg" class="img" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-address",
		data() {
			return {
				address: {} ,//收货地址
				getGoods:{
					cityName:"广州市",
					countyName:"海珠区",
					detailInfo:"新港中路333号",
					provinceName:"广东省",
					telNumber:"020-81167888",
					userName:"张三"
				}
			};
		},
		methods:{
			// 选择收获地址
			  async ChooseAddress(){
				// 小程序提供chooseAddress()方法，可选择地址
				// const res = await uni.chooseAddress().catch(err=>err)
				// uni.chooseAddress({
				// 	success(res) {
				// 		console.log(res)
				// 	}
				// })
				this.address = this.getGoods
				
				// console.log(res)
				// 用户成功的选择了收货地址
				// if(err === null && succ.errMsg === 'chooseAddress:ok'){
				// 	this.address = succ
				// }
			}
		}
	}
</script>

<style lang="scss">
	.imgBox {
		width: 100%;
		height: 20px;
		overflow: hidden;

		.img {

			margin-top: -110px;
			width: 100%;
			margin-bottom: -110px;
		}
	}

	.address-choose-box {
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address-info-box {
		font-size: 12px;
		height: 90px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 0 5px;

		.row1 {
			display: flex;
			justify-content: space-between;

			.rowl-left {}

			.rowl-right {
				display: flex;
				justify-content: space-between;
			}
		}

		.row2 {
			display: flex;
			// justify-content: space-between;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}

			.row2-right {}
		}
	}
</style>
