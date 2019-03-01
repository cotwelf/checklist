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
        <mu-button slot="action" icon @click="openAlertDialog(index,list.id)">
          <mu-icon value=":iconfont icon-yanchurili"></mu-icon>
        </mu-button>
      </mu-grid-tile>
      <mu-button fab color="pinkA100" class="add" @click="ensure">
        <mu-icon value=":iconfont icon-jiajianzujianjiahao"></mu-icon>
      </mu-button>
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
          <mu-list-item v-for="(plan,index) in plans" :key="index" class="content">
            <mu-list-item-content>
              <mu-list-item-title>{{plan.name}}，已完成{{donePercent(plan.done,plan.total)}}</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-card>
      <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">编辑</mu-button>
      <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">返回</mu-button>
    </mu-dialog>
    <mu-dialog title="你的项目菌们很蓝瘦" width="360" :open.sync="openSimple">你已经拥有了四个项目菌啦！先好好完成这些吧~
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">宝宝们我错了</mu-button>
    </mu-dialog>
  </div>
</template>
<script>
import newproject from "./project_new.vue";
import img from "../../img/306240.jpg";
export default {
  components: {
    newproject
  },
  computed: {},
  mounted: function() {
    this.$emit("getMessage", this.show);
  },
  created() {
    $("body,html").animate({ scrollTop: 0 }, 100);
    this.$axios
      .get("/api/get_project_list", { params: { user_id: 1 } })
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
      openFullscreen: false,
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
    closeSimpleDialog() {
      this.openSimple = false;
    },
    ensure() {
      this.$axios
        .get("/api/ensure", { params: { user_id: 1 } })
        .then(res => {
          if (res.data > 4 || res.data == 4) {
            this.openSimple = true;
          } else {
            this.$router.push({ name: "newproject" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
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
.mu-list {
  height: 200px;
}
.add {
  position: fixed;
  bottom: 80px;
  left: 10px;
}
</style>
