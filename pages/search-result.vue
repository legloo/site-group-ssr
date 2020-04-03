<template>
  <div class="container">
    <van-nav-bar title="COOKBOOK" left-arrow @click-left="onClickLeft"  :fixed="true">
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
      <searchList :date="date" :source="source" :keywords="keyword" />
    </div>
    <!-- <nuxt-link to="/about">关于</nuxt-link> -->
  </div>
</template>

<script>
import Vue from "vue";
import { Lazyload } from "vant";

import axios from "axios";

Vue.use(Lazyload);

import searchList from "~/components/search-list.vue";

export default {
  components: {
    searchList
  },
  head() {
    return {
      title: "search-cookbook",
      meta: [
        { charset: "utf-8" },
        {
          hid: "description-search",
          name: "description",
          content: "description-search"
        }
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    };
  },
  created() {
    this.searchValue = this.$route.query.wd;
    this.date = this.$route.query.date;
    this.source = this.$route.query.source;
    this.keyword = this.searchValue;
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    search() {
      this.keyword = this.searchValue;
    }
  },
  data() {
    return {
      list: [],
      searchShow: true,
      searchValue: "",
      keyword: "",
      date: "",
      source: ""
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
    padding: 4px 13px 13px 13px;
  }
  .main-searchShow {
    margin-top: 88px;
  }
  .van-nav-bar--fixed{
    max-width: 500px;
    left: unset;
  }
  .van-nav-bar {
    background-color: #161515;
    .van-nav-bar__arrow {
      color: #fff;
      font-size: 16px;
    }
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
}
</style>