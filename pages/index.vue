<template>
  <div class="container">
    <van-nav-bar title="COOKBOOK">
      <template #right>
        <van-icon name="search" @click="searchShow = !searchShow" />
      </template>
    </van-nav-bar>
    <div class="main">
      <van-search
        v-show="searchShow"
        v-model="searchValue"
        placeholder="please input keywords"
        left-icon
        @search="search"
      >
        <!-- <template #action>
          <van-icon name="search" @click="search" />
        </template> -->
        <template slot="right-icon">
          <van-icon name="search" @click="search" />
        </template>
      </van-search>

      <van-swipe class="banner" :autoplay="5000" indicator-color="#eee">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <nuxt-link :to="{path:`/detail?id=${image.articleId}`}">
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
      title: "home-cookbook",
      meta: [
        { charset: "utf-8" },
        {
          hid: "description-home",
          name: "description",
          content: "description-home"
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
   mounted() {
   this.getlist()
 },
  methods: {
    async getlist(){
    let res = await  this.$axios.get("/api/article/front/recommend")
      
    },
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


<style lang="scss" scoped>
@import "~assets/sass/resources.scss";
.container {
  // width: px2rem(375);
  max-width: 500px;
  margin: auto;
  .van-search {
    padding: 0;
    box-shadow: 0 0 15px 9px #a2a0a0;
    margin-bottom: 12px;
    border-radius: 5px;
  }
  .main {
    padding: 4px 13px 13px 13px;
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
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0px;
        text-align: center;
        font-size: 20px;
        font-weight: 400;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        height: 50px;
      }
    }
  }
  .van-tabs {
    margin-top: 20px;
    /deep/ .van-tabs__line {
      bottom: 21px;
    }
  }
}
</style>