<template>
  <div>
    <mu-grid-list class="project">
      <mu-sub-header>{{list.length?"进行中":"先点击下方按钮新建项目吧~"}}</mu-sub-header>
        <mu-expansion-panel class="project_list" v-for="(list, index) in list" :key="index" >
          <div slot="header" >{{list.name}}  <b>{{remain(list.end_at)}}</b>天后结束</div>
         <!-- list -->
         <div class='list' v-for="(plan,pid) in list.plans " :key="pid">{{plan.name}}</div>

               
<!-- list -->
          <mu-button slot="action" flat color="primary" @click="openBotttomSheet(list.id)" :to="{name:'newplan',query:{pid:list.id}}">新建计划</mu-button>
        </mu-expansion-panel>
      <mu-button fab color="pink200" class="add" @click="ensure">
        <mu-icon value=":iconfont icon-jiajianzujianjiahao"></mu-icon>
      </mu-button>
    </mu-grid-list>

    <mu-dialog title="你的项目菌们很蓝瘦" width="360" :open.sync="openSimple">
      你已经拥有4个项目菌啦！先好好对待他们~
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">宝宝们我错了</mu-button>
    </mu-dialog>
    <!-- 新建计划start -->
        <!-- <mu-bottom-sheet :open.sync="open">
      <mu-list>
        <mu-sub-header>选择计划类型</mu-sub-header>
        <mu-list-item
          style="height:80px"
          button
          v-for="(ver,index) in vers"
          :key="index"
          :to="{name:'newplan',query:{ver:ver.value}}"
        >
          <mu-list-item-action>
            <mu-icon value=":iconfont icon-weiguanzhu" color="red400"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{ver.name}}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet> -->
    <!-- 新建计划end -->
  </div>
</template>
<script>
import img from "@/img/project_img/1.jpg";
import { remainDays } from "@/utils/data.js";
import projectsApi from "@/api/projects"
import plansApi from '@/api/plans'
export default {
  computed: {},
  mounted: function() {
    this.$emit("getMessage", this.show);
  },
  created() {
    
    projectsApi.getProjects().then(response=>{
      
      const list=response.data
    //   plansApi.getList().then(response=>{
    //   console.log('66666')
    //   const plans = response.data
    //   for(var i=0;i<list.length;i++){
    //     var index = i;
    //     var arr = []
    //     for(var j=0;j<plans.length;j++){
    //       plans[j].pid==list[index].id?arr.push(plans[j]):''
    //     }
    //     list[index].plans = arr
    //   }
      this.list=list
    //   console.log(this.list)
      
    // })
    })

    // $("body,html").animate({ scrollTop: 0 }, 100);
  },
  data() {
    return {
      openAlert: false,
      indexes: "",
      open:false,
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
      project_id:''
    };
  },
  methods: {
    closeBottomSheet() {
      this.project_id=''
      this.open = false;
    },
    openBotttomSheet(project_id) {
      this.project_id=project_id
      this.open = true;
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
.project_list{
  width: 100%;
  margin: 0.5rem 0.5rem
}
.list{
  /* background: pink; */
  margin: 5px 1px
}
</style>
