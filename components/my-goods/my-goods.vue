<template>
	<view>
		<view class="good_list">

			<view class="good-item">
				<!-- 商品左侧图片区域 -->
				<view class="good-item-left">
					<radio :checked="goods.goods_state" color="#C00000" @click="radioChangeHandler" v-if="showRadio"/>
					<image class="goods-pic" :src="goods.goods_small_logo" mode=""></image>
				</view>
				<!-- 商品右侧区域 -->
				<view class="good-item-right">
					<!-- 商品标题 -->
					<view class="goods-name">{{goods.goods_name}}</view>
					<view class="goods-info-box">
						<!-- 商品价格 -->
						<view class="goods-price">{{goods.goods_price|tofixed}}</view>
						<uni-number-box :min="1" @change="NumberChangeHandler" :value="goods.goods_count" v-if="showNum"></uni-number-box>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			},
			// 是否展示左侧的radio
			showRadio:{
				type:Boolean,
				default:false
			},
			// 是否展示数字选择框
			showNum:{
				type:Boolean,
				default:false
			}
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		data() {
			return {

			};
		},
		methods:{
			radioChangeHandler(){
				// 通过this.$emit()触发外界通过@绑定的radio-change事件
				// 同时把商品的id和勾选状态作为参数传递给radio-change事件处理函数
				this.$emit('radio-change',{
					// 商品id
					goods_id:this.goods.goods_id,
					// 商品勾选状态
					goods_state:!this.goods.goods_state
				})
			},
			// 监听商品数量变化
			NumberChangeHandler(val){
				this.$emit('num-change',{
					goods_id:this.goods.goods_id,
					goods_count: +val
				})
			}
		}
	}
</script>

<style lang="scss">
	.good-item {
		width: 750rpx;
		box-sizing: border-box;
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.good-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.good-item-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}

			.goods-info-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.goods-price {
					color: #C00000;
					font-size: 16px
				}
			}
		}
	}
</style>
