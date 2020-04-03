<template>
  <div class="container">
    <van-nav-bar title="COOKBOOK" left-arrow @click-left="onClickLeft" :fixed="true">
      <template #right>
        <van-icon name="search" @click="searchShow = !searchShow" />
      </template>
    </van-nav-bar>
    <van-search
      v-show="searchShow"
      v-model="searchValue"
      @keyup.enter="search"
      left-icon
      placeholder="please input keywords"
      @search="search"
    >
      <template slot="right-icon">
        <van-icon name="search" @click="search" />
      </template>
    </van-search>
    <div class="main" :class="{'main-searchShow':searchShow}">
      <h1>{{article.title}}</h1>
      <div class="title-bottom">
        <nuxt-link :to="{path:`/search-result?date=${article.gmtCreated}`}">
          <span class="time">{{article.gmtCreated}}</span>
        </nuxt-link>
        <nuxt-link :to="{path:`/search-result?source=${this.article.source}`}">
          <span class="source">{{article.source}}</span>
        </nuxt-link>
      </div>
      <!-- <div class="head-img">
        <img :src="article.headImgUrl" :alt="article.headImgDesc" />
      </div>-->
      <div class="content" v-html="article.content"></div>

      <div class="share">
        <a target="_blank" :href="getShareHref('facebook')">
          <span>
            <svg
              t="1585144559737"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              p-id="10740"
              width="44"
              height="44"
            >
              <path
                d="M511.922276 511.609221m-511.609221 0a511.609221 511.609221 0 1 0 1023.218442 0 511.609221 511.609221 0 1 0-1023.218442 0Z"
                fill="#3A5A98"
                p-id="10741"
              />
              <path
                d="M873.837341 150.598776c199.795873 199.795873 199.804509 523.742792-0.008636 723.553779-199.804509 199.795873-523.757905 199.795873-723.553778 0L873.837341 150.598776z"
                fill="#345387"
                p-id="10742"
              />
              <path
                d="M1020.219594 569.232889L650.137037 199.141697l-192.146542 192.146542 11.44701 11.44701-109.398609 109.389973 89.5423 89.542301-11.777336 11.770859 96.941188 96.941188-111.758394 111.758395 190.918072 190.918072c215.291005-43.568588 381.473432-222.312068 406.314868-443.823148z"
                fill="#2E4D72"
                p-id="10743"
              />
              <path
                d="M422.47713 321.554749v85.800756h-62.859239v104.923006h62.859239v311.763691h129.125378V512.278511h86.649243s8.117834-50.319776 12.045052-105.318102h-98.202043v-71.745677c0-10.71295 14.072352-25.132901 27.991414-25.132901h70.355282V200.853783h-95.656584c-135.505218-0.006477-132.307742 105.013683-132.307742 120.700966z"
                fill="#FFFFFF"
                p-id="10744"
              />
            </svg>
          </span>
        </a>
        <a target="_blank" :href="getShareHref('twitter')">
          <span>
            <svg
              t="1585144536647"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              p-id="9983"
              width="48"
              height="48"
            >
              <path
                d="M512.274401 959.556658c247.17718 0 447.556658-200.366167 447.556658-447.556658 0-247.16387-200.379477-447.556658-447.556658-447.556658-247.188443 0-447.569968 200.392788-447.569968 447.556658 0 247.190491 200.382549 447.556658 447.569968 447.556658"
                fill="#78CBEF"
                p-id="9984"
              />
              <path
                d="M736.810405 394.754891c-16.48353 7.310541-34.227463 12.256931-52.82122 14.478763 19.004336-11.383557 33.588558-29.396772 40.435279-50.868671-17.780793 10.536804-37.440415 18.183179-58.42392 22.294079-16.741549-17.872942-40.666677-29.038412-67.134113-29.038412-50.766282 0-91.948998 41.192954-91.948998 91.972548 0 7.220439 0.784296 14.222791 2.366199 20.943574-76.439183-3.841618-144.191723-40.421969-189.587726-96.109044-7.915657 13.630985-12.452493 29.422369-12.452493 46.282688 0 31.877646 16.241893 60.042683 40.924696 76.552835-15.072616-0.460748-29.26981-4.637177-41.682371-11.485946v1.131393c0 44.585086 31.698466 81.757243 73.804725 90.185867-7.723167 2.160398-15.841554 3.239573-24.246628 3.239574a91.24866 91.24866 0 0 1-17.294447-1.63105c11.691747 36.527109 45.654023 63.139936 85.90705 63.845394-31.477307 24.682804-71.144672 39.382725-114.227718 39.382725-7.42624 0-14.762379-0.410578-21.946982-1.270642 40.706609 26.070168 89.057546 41.308653 140.992081 41.308653 169.209337 0 261.697922-140.132017 261.697922-261.695874 0-3.997248-0.078839-7.979138-0.244709-11.899595a186.466924 186.466924 0 0 0 45.883373-47.618859"
                fill="#FFFFFF"
                p-id="9985"
              />
            </svg>
          </span>
        </a>
        <a target="_blank" :href="getShareHref('line')">
          <span>
            <svg
              t="1585144511832"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              p-id="9225"
              width="48"
              height="48"
            >
              <path
                d="M544.059897 959.266898h-64.949141c-228.633593 0-415.697442-187.063849-415.697442-415.697442v-64.949141c0-228.633593 187.063849-415.697442 415.697442-415.697442h64.949141c228.633593 0 415.697442 187.063849 415.697442 415.697442v64.949141C959.756315 772.203049 772.692466 959.266898 544.059897 959.266898z"
                fill="#00C300"
                p-id="9226"
              />
              <path
                d="M766.611611 483.278993c0-114.902459-115.252628-208.458957-256.895899-208.458957s-256.8959 93.532948-256.8959 208.458957c0 103.062249 91.384837 189.402403 214.85824 205.703681 8.361048 1.797943 19.734366 5.511575 22.606364 12.658294 2.616027 6.492457 1.704769 16.651447 0.84061 23.237078l-3.666533 21.9992c-1.121154 6.539556-5.137857 25.409762 22.256195 13.849073 27.417601-11.53714 147.924808-87.11114 201.826227-149.139137 37.226423-40.869407 55.068648-82.299902 55.068649-128.330715V483.278993zM667.426816 473.703617c7.435455 0.310237 13.212216 6.588702 12.903003 14.024157-0.291807 7.001328-5.900651 12.611196-12.903003 12.903003h-37.600141v24.055162h37.600141c7.448766 0.310237 13.235766 6.599965 12.925529 14.047707-0.291807 7.014638-5.911914 12.633721-12.925529 12.925528h-51.051946c-7.436479-0.013311-13.462044-6.038876-13.475355-13.475355V436.127026c0-7.473339 6.07164-13.498904 13.475355-13.498904h51.051946c7.435455 0.536516 13.028941 6.99928 12.491401 14.435759-0.483274 6.689043-5.803382 12.009151-12.491401 12.491401h-37.600141v24.124786h37.600141V473.703617zM584.82282 538.207369c0.025597 7.416001-5.965156 13.449758-13.382181 13.475355-0.038908 0-0.077815 0-0.116723 0-4.222503-0.01843-8.195178-2.004767-10.742605-5.371303l-52.313373-71.230678v63.126626c0 7.442622-6.032732 13.475355-13.475355 13.475355-7.442622 0-13.475355-6.032732-13.475355-13.475355l0 0v-102.057818c0-7.442622 6.032732-13.475355 13.475355-13.475355 4.233766 0 8.220775 1.989409 10.766154 5.371303l52.313373 71.230678v-63.126626c0.438223-7.442622 6.827267-13.120067 14.268866-12.681843 6.830339 0.402387 12.279457 5.851505 12.681844 12.681843L584.82282 538.207369zM461.98013 538.207369c0 7.442622-6.032732 13.475355-13.475355 13.475355-7.442622 0-13.475355-6.032732-13.475354-13.475355l0 0v-102.057818c0.310237-7.435455 6.588702-13.212216 14.024157-12.903003 7.001328 0.291807 12.611196 5.900651 12.903003 12.903003v102.057818H461.98013zM409.152767 551.682724h-51.051946c-7.433407-0.013311-13.451805-6.041947-13.451806-13.475355v-102.057818c0.310237-7.435455 6.588702-13.212216 14.024158-12.903003 7.001328 0.291807 12.611196 5.900651 12.903002 12.903003v88.558914h37.600141c7.448766 0 13.486617 6.038876 13.486618 13.486617 0 7.448766-6.037852 13.486617-13.486618 13.486618H409.152767z"
                fill="#FFFFFF"
                p-id="9227"
              />
            </svg>
          </span>
        </a>
        <a target="_blank" :href="getShareHref('whatsapp')">
          <span>
            <svg
              t="1585144488332"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              p-id="8383"
              width="48"
              height="48"
            >
              <path
                d="M544.059897 959.266898h-64.949141c-228.633593 0-415.697442-187.063849-415.697442-415.697442v-64.949141c0-228.633593 187.063849-415.697442 415.697442-415.697442h64.949141c228.633593 0 415.697442 187.063849 415.697442 415.697442v64.949141C959.756315 772.203049 772.692466 959.266898 544.059897 959.266898z"
                fill="#4DC247"
                p-id="8384"
              />
              <path
                d="M576.882589 541.680388c-8.480842 0-24.804646 31.690275-34.608348 31.690274-2.554594-0.107508-5.03342-0.893852-7.181531-2.280192-18.284544-9.164798-34.288896-18.626522-49.313389-32.989585-12.424848-11.764442-26.127506-29.410082-33.286512-44.754028-0.988049-1.452893-1.563473-3.147423-1.663814-4.901339 0-7.523509 22.570528-21.544595 22.570528-33.970467 0-3.260051-16.643256-47.649575-18.968499-53.23487-3.260051-8.480842-4.878814-11.103012-13.679108-11.103012-4.263458 0-8.207465-0.979858-12.082871-0.979859-6.885629 0-12.082871 2.62217-17.007759 7.181532-15.685923 14.705041-23.527861 30.048987-24.166765 51.616107v2.598621c-0.341978 22.570528 10.761035 45.072456 23.185883 63.380549 28.042171 41.493977 57.133825 77.743613 103.825043 98.94623 14.043611 6.543651 46.395316 20.245285 62.05769 20.245285 18.626522 0 49.017486-11.740893 56.49492-30.048987 2.964148-7.523509 5.562769-16.643256 5.562769-24.804645 0-1.321836 0-3.282576-0.683955-4.90134C635.656678 569.449182 582.445358 541.680388 576.882589 541.680388zM510.583967 714.790727c-39.829139 0-79.338826-12.082871-112.671413-33.970467l-79.042923 25.124098 25.808053-76.078775c-25.459932-34.906298-39.189211-76.990033-39.213784-120.194922 0-112.967316 92.106676-205.073992 205.119043-205.073992s205.142592 92.084151 205.142592 205.051466C715.725535 622.684051 623.619883 714.790727 510.583967 714.790727zM510.583967 263.423169c-135.879821 0-246.225991 110.39122-246.225991 246.22599 0 44.776553 12.082871 88.869151 35.246228 127.079527l-44.41205 132.277793 136.199274-43.773145c119.12701 65.765178 269.012559 22.506023 334.776713-96.62201 20.106036-36.419601 30.662294-77.338154 30.685843-118.939639 0-135.834771-110.39122-246.225991-246.271041-246.225991L510.583967 263.423169z"
                fill="#FFFFFF"
                p-id="8385"
              />
            </svg>
          </span>
        </a>
      </div>
      <div class="midNav">
        <div class="pre-container" :class="{'nopreornext':!neighbor_pre}">
          <nuxt-link
            v-if="neighbor_pre"
            :to="{path:`/article/${neighbor_pre.articleId}`}"
            class="prev"
          >
            <van-icon name="arrow-left" @click="search" />Prev
          </nuxt-link>
        </div>
        <div class="next-container" :class="{'nopreornext':!neighbor_next}">
          <nuxt-link
            v-if="neighbor_next"
            :to="{path:`/article/${neighbor_next.articleId}`}"
            class="next"
          >
            Next
            <van-icon name="arrow" @click="search" />
          </nuxt-link>
        </div>
      </div>
      <div class="advertisement_container">
        <h2>You May Also Like</h2>
      </div>
      <nuxt-link
        v-for="(item,key) in relatelist"
        :key="key"
        :to="{path:`/article/${item.articleId}`}"
      >
        <div class="card-item">
          <div class="card-image">
            <img :src="item.headImgUrl" :alt="item.headImgDesc" />
          </div>
          <div class="card-content">
            <h2>{{item.title}}</h2>
            <p class="card-content-footer">
              <span>{{item.gmtCreated}}</span>
              <span>{{item.source}}</span>
            </p>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import { Lazyload } from "vant";

import axios from "axios";

Vue.use(Lazyload);

export default {
  components: {},
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: "keywords-article",
          name: "keywords",
          content: this.article.keywords ? this.article.keywords.join(",") : ""
        },
        {
          hid: "description-article",
          name: "description",
          content: this.article.summary
        }
      ]
    };
  },
  async asyncData({ query, params }) {
    let [article, neighbor, relate] = await Promise.all([
      axios.get(`/apis/api/article/front/detail/${params.id}`),
      axios.get(`/apis/api/article/front/adjacent/${params.id}`),
      axios.get(`/apis/api/article/front/related/${params.id}`)
    ]);
    return {
      article: article.data.data,
      neighbor_pre: neighbor.data.data.pre ? neighbor.data.data.pre : null,
      neighbor_next: neighbor.data.data.next ? neighbor.data.data.next : null,
      relatelist: relate.data.data
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.locationu = window.location.href;
    document.getElementsByClassName("container")[0].scrollTop = 0;
  },
  methods: {
    getShareHref(item) {
      let content = "";
      if (item === "facebook") {
        content += `${this.locationu}&utm_source=facebook&utm_medium=organic&utm_campaign=share`;
        return `https://www.facebook.com/sharer.php?title=${
          this.article.title
        }&u=${encodeURIComponent(content)}`;
      }
      if (item === "twitter") {
        content += `${this.locationu}&utm_source=twitter&utm_medium=organic&utm_campaign=share`;
        return `https://twitter.com/share?text=${
          this.article.title
        }&url=${encodeURIComponent(content)}`;
      }
      if (item === "whatsapp") {
        content += this.article.title;
        content +=
          "\n\n" +
          `${this.locationu}&` +
          "utm_source=whatsapp&utm_medium=organic&utm_campaign=share";
        return "whatsapp://send?text=" + encodeURIComponent(content);
      }
      if (item === "line") {
        return `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
          this.locationu
        )}`;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    search() {
      this.$router.push(`/search-result?wd=${this.searchValue}`);
    }
  },
  data() {
    return {
      searchShow: false,
      searchValue: "",
      shareBtns: ["facebook", "twitter", "line", ""],
      svg: "",
      locationu: ""
    };
  }
};
</script>

<style>
.content {
  font-family: sofia-pro, sans-serif;
  font-size: 19px;
  line-height: 27px;
  letter-spacing: -0.5px;
  color: #666;
  margin-bottom: 0;
  text-shadow: none;
  font-style: normal;
  font-weight: 400;
  margin-top: 10px;
}
.content img {
  width: 100%;
  margin: 10px 0;
}
.content pre {
  background-color: #2f2d2d;
  color: #adadad;
  padding: 10px;
  overflow-x: scroll;
  margin: 10px 0;
  border-radius: 5px;
}
.content code {
  background-color: #2f2d2d;
  color: #adadad;
  word-break: break-all;
  display: block;
  margin: 10px 0;
}
.content p {
  word-break: break-all;
}
</style>

<style lang="scss" scoped>
@import "~assets/sass/resources.scss";
.container {
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
    .van-search__content {
      background-color: #f5f8ff;
      box-shadow: 0 0 5px 3px #a2a0a0;
    }
  }
  .main-searchShow {
    margin-top: 88px !important;
  }
  .main {
    .advertisement_container {
      font-size: 15px;
      margin: 17px 0;
    }
    margin-top: 46px;
    padding: 4px 24px 10px 24px;
    h1 {
      font-family: sofia-pro, sans-serif;
      font-size: 38px;
      line-height: 42px;
      margin: 0;
      padding: 0;
      font-weight: 600;
      letter-spacing: -1.5px;
      color: #222;
    }
    .title-bottom {
      padding: 17px 0;
      display: flex;
      justify-content: space-between;
      a {
        font-size: 12px;
        letter-spacing: 0;
        color: #999;
        background-color: #eee;
        padding: 3px 6px 3px 6px;
        border-radius: 9999px;
        transition: 1s;
      }
    }
    // .head-img {
    //   img {
    //     width: 100%;
    //     border: 1px solid #eee;
    //     border-radius: 5px;
    //   }
    // }
    .content {
      // line-height: 26px;
      // font-size: 16px;
      // margin-top: 7px;
      // color: #333;
      // font-family: Open Sans, sans-serif;
      // text-align: left;
      // letter-spacing: 0.3px;
    }
    .share {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      span {
        margin: 0 4px;
      }
    }
    .midNav {
      display: flex;
      font-size: 23px;
      padding: 23px 0;
      justify-content: space-between;
      .pre-container {
        flex: 0 0 30%;
        text-align: left;
        background-color: #a3a3a3;
        border-radius: 5px;
        overflow: hidden;
      }
      .next-container {
        flex: 0 0 60%;
        text-align: right;
        background-color: #c83221;
        border-radius: 5px;
        overflow: hidden;
      }
      .nopreornext {
        background-color: #fff;
      }
      a {
        text-align: center;
        color: #ffffff;
        line-height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: unset;
      }
    }
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
      font-family: sofia-pro, sans-serif;
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
</style>