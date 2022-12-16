<template>
	<view>
		<view class="good_list">
			
				<view class="good-item">
					<!-- 商品左侧图片区域 -->
					<view class="good-item-left">
						<image class="goods-pic" :src="goods.goods_small_logo" mode=""></image>
					</view>
					<!-- 商品右侧区域 -->
					<view class="good-item-right">
						<!-- 商品标题 -->
						<view class="goods-name">{{goods.goods_name}}</view>
						<view class="goods-info-box">
							<!-- 商品价格 -->
							<view class="goods-price">{{goods.goods_price|tofixed}}</view>
						</view>
					</view>
				</view>

		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			goods:{
				type:Object,
				default:{}
			}
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.good-item{
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
	.good-item-left{
		margin-right: 5px;
		.goods-pic{
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.good-item-right{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.goods-name{
			font-size: 13px;
		}
		.goods-info-box{
			.goods-price{
				color: #C00000;
				font-size: 16px
			}
		}
	}
}
</style>