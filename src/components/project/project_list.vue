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
        <!-- <mu-button slot="action" icon :to="{name:'detail',params:{id:list.id}}"> -->
        <mu-button slot="action" icon @click="openAlertDialog(index,list.id)">
          <mu-icon value=":iconfont icon-yanchurili"></mu-icon>
        </mu-button>
      </mu-grid-tile>
    </mu-grid-list>
    <mu-dialog
      :title="list[Number(indexes)].name"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :open.sync="openAlert"
    >
      <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
        <mu-card-header :title="list[Number(indexes)].created_at" sub-title="创建时间"></mu-card-header>

        <mu-card-title title="计划" sub-title="plans"></mu-card-title>

        <mu-list>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item v-for="(plan,index) in plans" :key="index">
            <mu-list-item-content>
              <mu-list-item-title>{{plan.name}}，已完成{{donePercent(plan.done,plan.total)}}</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-card>
      <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">Disagree</mu-button>
      <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">Agree</mu-button>
    </mu-dialog>
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
        // console.log(this.list);
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      openAlert: false,
      indexes: "",
      tasks: "",
      ture: "",
      show: "project",
      openSimple: false,
      image: img,
      plans: "",
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
    donePercent(done, total) {
      return parseInt((done / total) * 100) + "%";
    },
    getPlanList(p_id) {
      this.$axios
        .get("/api/get_todo_list", { params: { user_id: "1", p_id: p_id } })
        .then(res => {
          this.plans = res.data;
          console.log(this.plans);
        })
        .catch(err => {
          console.log(err);
        });
    },
    remain(date) {
      var time1 = Date.parse(new Date(date));
      var time2 = Date.parse(new Date());
      var remain = Math.abs(parseInt((time2 - time1) / 1000 / 3600 / 24));
      // var remain = this.list.end_at - today;
      // console.log(date);
      // console.log(time2);
      return remain ? remain : 0;
    },
    openAlertDialog(index, p_id) {
      // console.log(this.list);
      this.indexes = index;
      this.getPlanList(p_id);
      console.log(this.plans);

      this.openAlert = true;
    },
    closeAlertDialog() {
      this.openAlert = false;
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
