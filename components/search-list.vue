<template>
  <van-list
    v-model="loading"
    :finished="finished"
    :loading-text="'Loading'"
    finished-text="No more"
    @load="onLoad"
  >
    <nuxt-link v-for="(item,key) in list" :key="key" :to="{path:`/detail?id=${item.articleId}`}">
      <div class="card-item">
        <div class="card-image">
          <img :src="item.headImgUrl" :alt="item.headImgDesc" />
        </div>
        <div class="card-content">
          <h4>{{item.title}}</h4>
          <p class="card-content-footer">
            <span>{{item.gmtCreated}}</span>
            <span>{{item.source}}</span>
          </p>
        </div>
      </div>
    </nuxt-link>
  </van-list>
</template>

<script>
import Axios from "axios";
export default {
  props: {
    keywords: "",
    date: "",
    source: ""
  },
  data() {
    return {
      page: 0,
      size: 5,
      list: [],
      loading: false,
      finished: false
    };
  },
  watch: {
    keywords() {
      this.page = 1;
      this.finished = false;
      this.list = [];
      this.getList();
    }
  },
  mounted() {},
  methods: {
    onLoad() {
      this.page += 1;
      this.getList();
    },
    async getList() {
      this.loading = true;
      let query = '?'
       query += this.keywords ? `keyword=${this.keywords}&` : "";
       query += this.date ? `date=${this.date}&` : "";
       query += this.source ? `source=${this.source}` : "";
      let res = await this.$axios.get(
        `/api/article/front/search/${this.page}/${this.size}${query}`
      );
      this.list = this.list.concat(res.data.data.contents);
      this.loading = false;
      if (this.list.length >= res.data.data.totalCount) {
        this.finished = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/sass/resources.scss";

.card-item {
  border: 1px solid #eee;
  border-radius: 5px;
  box-shadow: 0px 2px 15px -9px #7b7979;
  margin-bottom: 22px;
  .card-image {
    height: 200px;
    font-size: 12px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .card-content {
    border-top: 1px solid #eee;
    padding: 10px;
    h4 {
      color: #000;
      font-size: 17px;
    }
    .card-content-footer {
      display: flex;
      font-size: 12px;
      color: #696767;
      justify-content: space-between;
      margin-top: 11px;
    }
  }
}
</style>