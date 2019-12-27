<template>
  <div>
    <mu-grid-list class="project">
      <mu-sub-header>{{list.length?"进行中":"先点击下方按钮新建项目吧~"}}</mu-sub-header>
      <mu-grid-tile v-for="(list, index) in list" :key="index">
        <img :src="image">
        <span slot="title">{{list.name}}</span>
        <span slot="subTitle">
          <b>{{remain(list.end_at)}}</b>天后结束
        </span>
        <mu-button slot="action" icon :to="{name:'pro_detail',query:{id : list.id}}">
          <mu-icon value=":iconfont icon-yanchurili"></mu-icon>
        </mu-button>
      </mu-grid-tile>
      <mu-button fab color="pink200" class="add" @click="ensure">
        <mu-icon value=":iconfont icon-jiajianzujianjiahao"></mu-icon>
      </mu-button>
    </mu-grid-list>
    <mu-dialog
      :title="list.length?list[Number(indexes)].name:''"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :open.sync="openAlert"
    >
      <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
        <mu-card-header :title="list.length?list[Number(indexes)].created_at:''" sub-title="创建时间"></mu-card-header>
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
    <mu-dialog title="你的项目菌们很蓝瘦" width="360" :open.sync="openSimple">
      你已经拥有4个项目菌啦！先好好对待他们~
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">宝宝们我错了</mu-button>
    </mu-dialog>
  </div>
</template>
<script>
import newproject from "./project_new.vue";
import img from "../../img/project_img/1.jpg";
import { remainDays } from "../../utils/data.js";
export default {
  components: {
    newproject
  },
  computed: {},
  mounted: function() {
    this.$emit("getMessage", this.show);
  },
  created() {
    // localStorage.clear();
    if (!localStorage.projects) {
      localStorage.projects = "[]";
    } else if (JSON.parse(localStorage.projects).length > 0) {
      console.log(this.list);
      console.log(JSON.parse(localStorage.projects));
      const projects = JSON.parse(localStorage.projects);
      this.list = projects;
    }

    $("body,html").animate({ scrollTop: 0 }, 100);
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
      list: []
    };
  },
  methods: {
    closeSimpleDialog() {
      this.openSimple = false;
    },
    ensure() {
      if (this.list.length > 4 || this.list.length == 4) {
        this.openSimple = true;
      } else {
        this.$router.push({ name: "newproject" });
      }
    },
    donePercent(done, total) {
      return parseInt((done / total) * 100) + "%";
    },
    remain(date) {
      return remainDays(date);
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
<style scoped>
.add {
  position: fixed;
  bottom: 80px;
  left: 10px;
}
</style>
