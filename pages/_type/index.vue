<template>
  <div class="container" @click="popShow = false">
    <van-nav-bar title="天天头条" :fixed="true" left-arrow @click-left="onClickLeft">
      <template #right id="popShow">
        <van-icon name="search" @click.stop="searchShow = !searchShow" />
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
      <van-tabs
        v-model="activeName"
        :border="false"
        :title-inactive-color="'#a2a0a0'"
        :line-height="'1px'"
        :ellipsis="false"
      >
        <van-tab v-for="(item) in tabs" :key="'tabs'+item.id" :name="item.code">
          <template #title>
            <nuxt-link :to="{path:`/${item.code}`}">{{item.name}}</nuxt-link>
          </template>
        </van-tab>
      </van-tabs>
      <ul class="article-list">
        <nuxt-link
          v-for="(item,key) in f_list"
          :key="key"
          :to="{path:`/${item.typeCode}/${item.articleId}`}"
        >
          <div class="card-item">
            <img :src="item.headImgUrl" :alt="item.headImgDesc" />
            <div class="card-content">
              <h2>{{item.title}}</h2>
              <p class="card-content-footer">
                <span>{{item.gmtCreated}}</span>
                <span>{{item.source}}</span>
              </p>
            </div>
          </div>
        </nuxt-link>
      </ul>
      <div class="pre-next">
        <div class="left">
          <button v-show="page !== 0" @click="pagebe">Prev</button>
        </div>
        <div class="right">
          <button v-show="f_list.length === size" @click="pageNext">Next</button>
        </div>
      </div>
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
  async asyncData({ params }) {
    let [tabs_data] = await Promise.all([
      axios.get("/apis/api/articleType/dict")
    ]);
  let tabs_U = tabs_data.data.data.unshift({
      code: "",
      id: "index",
      name: "ALL",
      showIdx: 1
    })
    return {
      tabs: tabs_data.data.data,
      activeName: params.type
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  created() {
    this.typecode = this.$route.params.type;
    let c_tab = this.tabs.filter(x => x.code === this.$route.params.type)[0];
    this.typecode = c_tab.id;
    this.getList();
  },
  methods: {
    async pagebe() {
      this.page--;
      await this.getList();
      this.backTop();
    },
    async pageNext() {
      this.page++;
      await this.getList();
      this.backTop();
    },
    async getList() {
      let res = await this.$axios.get(
        `/api/article/front/search/${this.page}/${this.size}?typeId=${this.typecode}`
      );
      this.f_list = res.data.data.contents;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    destroyed() {
      window.removeEventListener("scroll", this.scrollToTop);
    },
    search() {
      this.$router.push(`/search-result?wd=${this.searchValue}`);
    },
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      // getl
    }
  },
  data() {
    return {
      scrollTop: 0,
      page: 0,
      size: 5,
      f_list: [],
      //   activeName: '',
      searchShow: false,
      searchValue: "",
      popShow: false,
      typecode: ""
      // images:
    };
  }
};
</script>

<style>
.van-nav-bar__title {
  color: #fff;
}
</style>


<style lang="scss" scoped>
@import "~assets/sass/resources.scss";
.container {
  // width: px2rem(375);
  max-width: 500px;
  margin: auto;
  .footer {
    font-size: 13px;
    padding: 20px 13px;
  }
  .pre-next {
    display: flex;
    .left {
      flex: 0 0 50%;
      text-align: left;
      font-size: 16px;
    }
    .right {
      flex: 0 0 50%;
      text-align: right;
      font-size: 16px;
    }
    button {
      border: 1px solid #dad6d6;
      background-color: #fff;
      // padding-top: px2rem(5);
      // padding-left: px2rem(50);
      // padding-right: px2rem(50);
      // padding-bottom: px2rem(5);
      width: 83%;
      height: 40px;
      color: #969696;
      border-radius: 5px;
    }
  }
  .article-list {
    margin-top: 20px;
  }
  .card-item {
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 0px 2px 15px -9px #7b7979;
    margin-bottom: 22px;
    overflow: hidden;
    img {
      font-size: 12px;
      width: 100%;
      display: block;
    }
    .card-content {
      border-top: 1px solid #eee;
      padding: 10px;
      h2 {
        font-size: 18px;
        color: #444;
        font-weight: 600;
      }
      .card-content-footer {
        display: flex;
        font-size: 12px;
        justify-content: space-between;
        margin-top: 11px;
        span {
          color: #aaa;
          background-color: #f5f5f5;
          border: 1px solid #f5f5f5;
          padding: 2px 5px 3px 5px;
          border-radius: 4px;
        }
      }
    }
  }
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
    padding: 0px 13px 13px 13px;
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
      color: #fff;
    }
    .navbar-links {
      position: absolute;
      width: 84px;
      background-color: rgba(255, 255, 255, 0.9);
      top: 45px;
      border-radius: 5px;
      height: 300px;
      overflow-y: scroll;
      line-height: 38px;
      a {
        color: #000;
      }
    }
    .van-icon {
      color: #fff;
      vertical-align: middle;
      font-size: 20px;
    }
    // .van-nav-bar__right {
    //   font-size: 17px;
    //   .van-icon-search {
    //     color: #fff;
    //   }
    // }
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
    margin-bottom: 10px;
    /deep/ .van-tab__text a {
      color: unset;
    }
  }
}
</style>