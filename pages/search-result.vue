<template>
  <div class="container">
    <van-nav-bar title="COOKBOOK" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="search" @click="searchShow = !searchShow" />
      </template>
    </van-nav-bar>
    <div class="main">
      <van-search
        v-show="searchShow"
        v-model="searchValue"
        left-icon
        placeholder="please input keywords"
        @search="search"
      >
        <!-- <template #action>
          <van-icon name="search" @click="search" />
        </template> -->
        <template slot="right-icon">
          <van-icon name="search" @click="search" />
        </template>
      </van-search>
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