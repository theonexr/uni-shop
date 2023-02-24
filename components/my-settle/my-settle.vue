<template>
	<view>
		<view class="my-settle-container">
			<!-- 全选 -->
			<label class="radio" @click="changeAllState">
				<radio :checked="isFullCheck" color="#c00000" /><text>全选</text>
			</label>
			<!-- 合计 -->
			<view class="amount-box">
				合计<text class="amount">￥{{checkedGoodsAmount}}</text>
			</view>
			<!-- 结算 -->
			<view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
			...mapState('m_user',['token']),
			// 是否全选
			isFullCheck(){
				return this.total === this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			changeAllState(){
				this.updateAllGoodsState(!this.isFullCheck)
			},
			// 结算
			settlement(){
				// 1.先判断是否勾选了要结算的商品
				if(!this.checkedCount) return uni.$showMsg('请选择要结算的商品')
				// 2.判断用户是否选择了收获地址
				// if(!this.addstr) return uni.$showMsg("请选择收获地址")
				// 3.判断用户是否登录
				if(!this.token) return uni.$showMsg('请先登录！')
			}
		}

	}
</script>

<style lang="scss">
.my-settle-container{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
	.radio{
		display: flex;
		align-items: center;
	}
	.amount-box{
		.amount{
			color: #c00000;
			font-weight: bold;
		}
	}
	.btn-settle{
		background-color: #c00000;
		height: 50px;
		line-height: 50px;
		color: white;
		padding: 0 10px;
		min-width: 100px;
		text-align: center;
	}
}
</style>