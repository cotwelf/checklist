<template>
  <div>
    <mu-sub-header>{{projects.alive.length?"进行中的项目":"没有进行中的项目，点击下方“+”按钮新建"}}</mu-sub-header>
    <mu-button fab :color="this.$store.state.global.theme.color" class="add" @click="ensure">
        <mu-icon value=":iconfont icon-jiajianzujianjiahao"></mu-icon>
      </mu-button>
    <mu-grid-list class="project">
      <project-item v-for="item in projects.alive" :key="item.id" :project="item" @getId="closeId" :fetch='fetch' class="project_list" />
    </mu-grid-list>
    <div v-if='projects.dead.length'>
      <mu-sub-header>已结束的项目</mu-sub-header>
    <mu-grid-list class="project">
      <project-item v-for="item in projects.dead" :key="item.id" :project="item" @getId="closeId" :fetch='fetch' class="project_list" />
    </mu-grid-list>
    </div>
    <mu-dialog title="你的项目菌们很蓝瘦" width="360" :open.sync="openSimple">
      你已经拥有4个项目菌啦！先好好对待他们~
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">宝宝们我错了</mu-button>
    </mu-dialog>
    <!-- 结束计划框 -->
    <mu-dialog
        width="600"
        max-width="80%"
        :open.sync="openAlert"
      >
        计划尚未完成，确定要结束?
        <mu-button slot="actions" flat color="primary" @click="openAlert = false">我再想想</mu-button>
        <mu-button slot="actions" flat color="secondary" @click="closePlan">我意已决</mu-button>
      </mu-dialog>
  </div>
</template>
<script>
import img from "@/img/project_img/1.jpg";
import css from "@/assets/css/projects.css"
import projectsApi from "@/api/projects";
import plansApi from "@/api/plans";
import projectItem from "@/components/project/project_item.vue";
export default {
  components: {
    projectItem
  },
  mounted: function() {
    this.$emit("getMessage", this.show);
  },
  created() {
    this.fetchPlan()
    plansApi.getList().then(response =>{

    })
    $("body,html").animate({ scrollTop: 0 }, 100);
  },
  data() {
    return {
      active_project:'',
      projects: '',
      fetch:0,
      close_id:'',
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
    fetchPlan(){
      projectsApi.getProjects().then(response => {
        this.projects = response.data
        console.log("fetchPlan",this.projects.dead)
        
      });
    },
    closeId(val){
      this.openAlert = true
      this.close_id = val
    },
    closePlan(){
      plansApi.closePlan(this.close_id).then(response=>{
        if(response.data.flag == 'success'){
          this.fetchPlan()
          this.fetch=1
          this.openAlert = false
        }
      })
    },
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
