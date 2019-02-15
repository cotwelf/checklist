<template>
  <div>
    <mu-grid-list class="project">
      <mu-sub-header>进行中</mu-sub-header>
      <mu-grid-tile v-for="(list, index) in list" :key="index">
        <img :src="image">
        <span slot="title">{{list.name}}</span>
        <span slot="subTitle">
          <b>{{remain(list.end_at)}}</b>天后结束
        </span>
        <mu-button slot="action" icon :to="{name:'mine'}">
          <mu-icon value=":iconfont icon-yanchurili"></mu-icon>
        </mu-button>
      </mu-grid-tile>
    </mu-grid-list>
  </div>
</template>
<script>
import img from "../../img/306240.jpg";
export default {
  computed: {},
  mounted: function() {
    this.$emit("getMessage", this.show);
  },
  created() {
    $("body,html").animate({ scrollTop: 0 }, 100);
    this.$axios
      .get("/api/get_project_list")
      .then(res => {
        this.list = res.data;
        console.log(this.list);
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      tasks: "",
      ture: "",
      show: "project",
      openSimple: false,
      image: img,
      list: [
        {
          id: "1",
          name: "Breakfast",
          end_at: "2020-02-02",
          created_at: "2018-01-01"
        }
      ]
    };
  },
  methods: {
    remain(date) {
      var time1 = Date.parse(new Date(date));
      var time2 = Date.parse(new Date());
      var remain = Math.abs(parseInt((time2 - time1) / 1000 / 3600 / 24));
      // var remain = this.list.end_at - today;
      console.log(date);
      console.log(time2);
      return remain ? remain : 0;
    },
    getPlan(id) {
      this.$axios
        .get("/api/get_todo_list", { params: { user_id: 1, p_id: 1 } })
        .then(tasks => {
          this.tasks = tasks.data;
          console.log(this.tasks);
        })
        .catch(err => {
          console.log(err);
        });
    },
    showDetail() {
      $(".card").fadeIn();
    }
  }
};
</script>
<style>
.card {
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  position: absolute;
  top: 0px;
  display: none;
}
.card_list {
  height: 300px;
  overflow: scroll;
}
</style>
