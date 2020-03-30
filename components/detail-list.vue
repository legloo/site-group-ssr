<template>
  <van-list
    v-model="loading"
    :finished="finished"
    :loading-text="'Loading'"
    finished-text="No more"
    @load="onLoad"
  >
    <nuxt-link v-for="(item,key) in list" :key="key" :to="{path:`/detail?id=${item.source}`}">
      <div class="card-item">
        <div class="card-image">
          <img :src="item.img" :alt="item.img" />
        </div>
        <div class="card-content">
          <h4>{{item.title}}</h4>
          <p class="card-content-footer">
            <span>{{item.time}}</span>
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
    type: ""
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },
  watch: {
    keywords() {
      this.list = [];
      this.getList();
    }
  },
  mounted() {},
  methods: {
    onLoad() {
      this.getList();
    },
    async getList() {
      console.log(this.type);
      this.loading = true;
      let res = await Axios.get("https://api.myjson.com/bins/9v108");
      this.list = this.list.concat(res.data);
      this.loading = false;
      if (this.list.length > 30) {
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