<template>
	<view>
		<my-search @gotoSearch="gotoSearch"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧的滚动视图区域 -->
			<scroll-view class="left-scroll-view" scroll-y :style="{height:wh +'px'}">
				<block v-for="(item,i) in cateList" :key="i" >
					<view :class="['left-scroll-view-item',i===active?'active':'']" @click="activeChanged(i)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右侧的滚动视图区域 -->
			<scroll-view class="right-scroll-view" scroll-y :style="{height:wh +'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
					<view class="cate-lv2-title">/{{item2.cat_name}}/</view>
					<!-- 动态渲染三级分类的列表 -->
					<view class="cate-lv3-list">
						<!-- 三级分类item -->
						<view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="item3.cat_id" @click="gotoGoodsList(item3)">
							<!-- 图片 -->
							<!-- <image :src="item3.cat_icon" mode=""></image> -->
							<image src="../../static/logo.png" mode=""></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh:0 ,//当前设备高度
				cateList:[] ,//一级分类
				active:0  ,//样式切换
				cateLevel2:[] ,// 2级分类
				scrollTop:0 //滚动条距离顶部距离
			};
		},
		onLoad() {
			/* uni.getSystemInfoSync()获取适配机型及信息 */
			const sysInfo = uni.getSystemInfoSync()
			// console.log(sysInfo)
			this.wh = sysInfo.windowHeight -50
			this.getCateList()
			
		},
		methods:{
			// 获取分类信息
		 	async getCateList(){
				const {data:res} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) return uni.$showMsg()
				// console.log(res)
				this.cateList = res.message
				// 为二级分类赋值
				this.cateLevel2 = res.message[0].children
			},
			//动态切换样式
			activeChanged(i){
				// console.log(i)
				this.cateLevel2 = this.cateList[i].children
				this.active = i
				this.scrollTop = this.scrollTop === 0 ?1:0
			},
			// 跳转商品列表
			gotoGoodsList(item3){
				uni.navigateTo({
					url:'../../subpkg/goods_list/goods_list?cid='+item3.cat_id
				})
			},
			gotoSearch(){
				uni.navigateTo({
					url:'../../subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll-view-container{
	display: flex;
	.left-scroll-view{
		width: 120px;
		.left-scroll-view-item{
			background-color: #F7F7F7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			position: relative;
			&.active{
				background-color: #ffffff;
				&::before{
					content: "";
					display: block;
					width: 3px;
					height: 30px;
					background-color: #C00000;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
	}
    .right-scroll-view{
		.cate-lv2-title{
			font-size: 12px;
			font-weight: bold;
			text-align: center;
			padding: 15px 0;
		}
		.cate-lv3-list{
			display: flex;
			flex-wrap: wrap;
			.cate-lv3-item{
				width: 33.33%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				image{
					width: 60px;
					height: 60px;
				}
				text{
					font-size: 12px
				}
			}
		}
	}
}
</style>
