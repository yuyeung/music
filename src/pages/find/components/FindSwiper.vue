<template>
	<div class="banner-container">
		<!-- v-if解决不能循环的问题 -->
		<swiper v-if="swiperList.length > 1" :options="swiperOption">
			<!-- slides a标签跳转 url携带歌曲id信息 -->
			<swiper-slide v-for="(item, index) in swiperList" :key="index">
				<!-- <router-link class="link" :to="'/song/?id=' + item.targetId"> -->
				<img class="banner-img" :src="item.pic" alt />
				<span
					class="typeTitle"
					:style="{ background: item.titleColor }"
					>{{ item.typeTitle }}</span
				>
				<!-- </router-link> -->
			</swiper-slide>
			<div slot="pagination" class="swiper-pagination" />
		</swiper>
	</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import API from '@api';
export default {
	name: 'FindSwiper',
	components: {
		swiper,
		swiperSlide
	},
	data() {
		return {
			swiperList: [],
			swiperOption: {
				pagination: {
					el: '.swiper-pagination'
				},
				loop: true,
				autoplay: {
					// 3000毫秒自动播放
					delay: 3000,
					disableOnInteraction: false
				}
			}
		};
	},
	mounted() {
		this.getSwiperList();
	},
	methods: {
		async getSwiperList() {
			try {
				const res = await API.getSwiper();
				this.setSwiperList(res);
			} catch (error) {
				console.error(error);
			}
		},
		setSwiperList(res) {
			if (res.status === 200 && res.statusText === 'OK') {
				this.swiperList = res.data.banners;
			}
		}
	}
};
</script>

<style lang="less" scoped>
.banner-container /deep/ .swiper-pagination-bullet-active {
	background: #c20c0c;
}
.swiper-container {
	border-radius: 3vw;
}

.banner-container {
	padding: 0 3.5vw;
	.banner-img {
		width: 100%;
		height: 100%;
	}
	.typeTitle {
		position: absolute;
		right: 0;
		bottom: 1vw;
		color: #fff;
		font-size: smaller;
		padding: 3px 6px;
		opacity: 0.8;
		border-top-left-radius: 1.3vw;
	}
}
</style>
