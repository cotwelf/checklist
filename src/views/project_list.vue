<template>
  <div>
    <mu-grid-list class="project">
      <mu-sub-header>{{list.length?"进行中":"先点击下方按钮新建项目吧~"}}</mu-sub-header>
      <project-item v-for="item in projects" :key="item.id" :project="item" class="project_list" />
      <mu-button fab color="pink200" class="add" @click="ensure">
        <mu-icon value=":iconfont icon-jiajianzujianjiahao"></mu-icon>
      </mu-button>
    </mu-grid-list>

    <mu-dialog title="你的项目菌们很蓝瘦" width="360" :open.sync="openSimple">
      你已经拥有4个项目菌啦！先好好对待他们~
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">宝宝们我错了</mu-button>
    </mu-dialog>
  </div>
</template>
<script>
import img from "@/img/project_img/1.jpg";
import projectsApi from "@/api/projects";
import plansApi from "@/api/plans";
import projectItem from "@/components/project/project_item.vue";
export default {
  components: {
    projectItem
  },
  computed: {},
  mounted: function() {
    this.$emit("getMessage", this.show);
  },
  created() {
    projectsApi.getProjects().then(response => {
      this.projects = response.data;
    });
    $("body,html").animate({ scrollTop: 0 }, 100);
  },
  data() {
    return {
      projects: [],
      openAlert: false,
      indexes: "",
      open: false,
      show: "project",
      openSimple: false,
      plans: "",
      openFullscreen: false,
      list: [],
      vers: [
        // { name: "普通计划（当天完成定量）", value: 0 },
        { name: "角虫养成计划（当天可多次完成）", value: 1 },
        { name: "项目计划（当天完成定量，有目标）", value: 2 }
      ],
      project_id: ""
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
.project_list {
  width: 100%;
  margin: 0.5rem 0.5rem;
}
.list {
  /* background: pink; */
  margin: 5px 1px;
}
</style>
