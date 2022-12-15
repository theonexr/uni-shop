<template>
	<view>
		<view class="search-box">
			<uni-search-bar placeholder="请输入搜索内容" v-model="kw"  @input="input" :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		<!-- 搜索建议 -->
		<view class="sugg-list" v-if="searchResult.length!==0">
			<view class="sugg-item" @click="gotoDetail(item)" v-for="(item,i) in searchResult" :key="i">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16" ></uni-icons>
			</view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="delHistory"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,i) in historyList" @click="GotoGoodsList(item)" :key="i"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null, //延时器timerid
				kw:'',//搜索关键词
				searchResult:[],
				historyList:[] ,//历史搜索
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw')||'[]')
		},
		methods:{
			// 防抖
			input(){
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					// console.log(this.kw)
					this.getSearchList()
				},500)
			},
			async getSearchList(){
				if(this.kw===''){
					this.searchResult = []
					return ''
				}
				const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
				if(res.meta.status!==200) return uni.$showMsg()
				this.searchResult = res.message

			},
			
			gotoDetail(item){
				if(this.kw.split('').join("").length!=0){
					//搜索历史存放到数组开头
					this.historyList.unshift(this.kw)
					// 扩展运算符去重
					this.historyList = [...new Set(this.historyList)]
					// 限制搜索历史数量
					if(this.historyList.length>6){
						this.historyList.splice(this.historyList.length-1,1)
					}
					// 调用uni.setStorageSync持久化储存搜索历史到本地
					uni.setStorageSync('kw',JSON.stringify(this.historyList))
				}
				this.kw = ''
				uni.navigateTo({
					url:'../../subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
				})
			},
			// 清空搜索历史
			delHistory(){
				this.historyList = []
				uni.removeStorageSync("kw")
			},
			GotoGoodsList(kw){
				uni.navigateTo({
					url:'../../subpkg/goods_list/goods_list?query='+kw
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-box{
		// 吸顶效果
		position: sticky;
		top: 0;
		z-index: 900;
	}
	.sugg-list{
		padding: 0 5px;
		.sugg-item{
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.goods-name{
				// 文字禁止换行
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;	// 文字超过后用...代替
				margin-right: 3px;
			}
		}
	}
	.history-box{
		padding: 0 5px;
		.history-title{
			display: flex;
			justify-content: space-between;
			height: 40px;
			align-items: center;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}
		.history-list{
			display: flex;
			flex-wrap: wrap;
			.uni-tag{
				margin-top: 5px;
				margin-right: 5px;
				background-color: #e8e8e8;
				color: #000000;
			}
		}
	}
</style>
