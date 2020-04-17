<template>
  <van-list
    v-model="loading"
    :finished="finished"
    :loading-text="'Loading'"
    finished-text="No more"
    @load="onLoad"
  >
    <nuxt-link v-for="(item,key) in list" :key="key" :to="{path:`/article/${item.articleId}`}">
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
  </van-list>
</template>

<script>
import Axios from "axios";
export default {
  props: {
    tabtype: ""
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
  mounted() {},
  methods: {
    onLoad() {
      this.page += 1;
      this.getList();
    },
    async getList() {
      this.loading = true;
      let res = await this.$axios.get(
        `/api/article/front/search/${this.page}/${this.size}?typeId=` +
          this.tabtype
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

</style>