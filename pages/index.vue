<template>
  <div class="container">
    <van-nav-bar title="天天头条" :fixed="true">
      <template #right>
        <van-icon name="search" @click="searchShow = !searchShow" />
      </template>
    </van-nav-bar>
    <van-search
      v-show="searchShow"
      v-model="searchValue"
      placeholder="please input keywords"
      left-icon
      @search="search"
    >
      <template slot="right-icon">
        <van-icon name="search" @click="search" />
      </template>
    </van-search>
    <div class="main" :class="{'main-searchShow':searchShow}">
      <van-swipe class="banner" :autoplay="5000" indicator-color="#eee">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <nuxt-link :to="{path:`/article/${image.articleId}`}">
            <div class="banner-content">
              <img :src="image.headImgUrl" :alt="image.headImgDesc" />
              <!-- <img v-lazy="image.src" :alt="image.alt" /> -->
              <p class="title">{{image.title}}</p>
            </div>
          </nuxt-link>
        </van-swipe-item>
      </van-swipe>
      <van-tabs
        v-model="activeName"
        :border="false"
        :title-inactive-color="'#a2a0a0'"
        :line-height="'1px'"
        :ellipsis="false"
      >
        <van-tab v-for="(item) in tabs" :key="'tabs'+item.id" :title="item.name" :name="item.name">
          <homeList :tabtype="item.id" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Lazyload } from "vant";

import axios from "axios";

Vue.use(Lazyload);

import homeList from "~/components/home-list.vue";

export default {
  components: {
    homeList
  },
  head() {
    return {
      title: "天天头条，更快看到每日头条新闻资讯",
      meta: [
        { charset: "utf-8" },
        {
          hid: "keywords-home",
          name: "keywords",
          content:
            "每日头条新闻,阅读,资讯,热点,头条,社会,娱乐,游戏,财经,军事,科技,健康,历史，综艺，星座，动漫，漫画，搞笑，情感，养生，时尚，体育，国际"
        },
        {
          hid: "description-home",
          name: "description",
          content:
            "天天头条是一个面向全球中文用户的资讯分享网站，每日热点新闻，网罗了国内外热点头条、明星八卦、精彩综艺、体育资讯，内涵段子、福利美图、养生知识、财经，科技前沿等等。它通过智能计算用户的兴趣，让您更加享受阅读的乐趣，畅享高效的阅读平台"
        }
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    };
  },
  async asyncData(context) {
    let [banner_data, tabs_data] = await Promise.all([
      axios.get("/apis/api/article/front/recommend"),
      axios.get("/apis/api/articleType/dict")
    ]);
    return {
      images: banner_data.data.data,
      tabs: tabs_data.data.data,
      activeName: tabs_data.data.data[0].name
    };
  },
  mounted() {},
  methods: {
    search() {
      this.$router.push(`/search-result?wd=${this.searchValue}`);
    }
    // getl
  },
  data() {
    return {
      list: [],
      searchShow: false,
      searchValue: ""
      // images:
    };
  }
};
</script>

<style>
.van-nav-bar__title{
  color: #999;
}
</style>


<style lang="scss" scoped>
@import "~assets/sass/resources.scss";
.container {
  // width: px2rem(375);
  max-width: 500px;
  margin: auto;
  .van-search {
    padding: 0 13px;
    background-color: transparent;
    margin-bottom: 12px;
    border-radius: 5px;
    position: fixed;
    top: 50px;
    width: 100%;
    z-index: 10;
    max-width: 500px;
    .van-search__content {
      background-color: #f5f8ff;
      box-shadow: 0 0 5px 3px #a2a0a0;
    }
  }
  .main {
    margin-top: 46px;
    padding: 10px 13px 13px 13px;
  }
  .main-searchShow {
    margin-top: 88px;
  }
  .van-nav-bar--fixed {
    max-width: 500px;
    left: unset;
  }
  .van-nav-bar {
    background-color: #161515;
    .van-nav-bar__title {
      color: #999;
    }
    .van-nav-bar__right {
      font-size: 17px;
      .van-icon-search {
        color: #fff;
      }
    }
  }
  .banner {
    height: 200px;
    box-shadow: 0 0 11px 1px #bbbaba;
    border-radius: 5px;
    .banner-content {
      position: relative;
      height: 100%;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
      }
      .title {
        text-align: left;
        padding: 0 20px;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0px;
        font-size: 20px;
        font-weight: 400;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        height: 50px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .van-tabs {
    /deep/ .van-tabs__line {
      bottom: 21px;
      z-index: 0;
    }
  }
}
</style>