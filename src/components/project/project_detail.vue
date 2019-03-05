<template>
  <div class="detail">
    <mu-expansion-panel
      v-for="(plan,index) in plans"
      :key="index"
      :style="statusColor(plan.status)"
    >
      <div slot="header">
        <mu-icon size="20" value=":iconfont icon-weiguanzhu" :color="iconColor(plan.level)"></mu-icon>
        {{plan.name}}
      </div>
      {{statusText(plan.status)}}，共{{plan.total}}{{plan.unit}},已完成{{plan.done}}{{plan.unit}},剩余{{plan.total-plan.done}}{{plan.unit}}，计划进行到{{Math.floor((plan.done/plan.total)*100)}}%
      <mu-button slot="action" v-if="plan.status ==0" flat>结束这个计划</mu-button>
    </mu-expansion-panel>
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
    this.p_id = this.$route.query.id;
    this.$axios
      .get("/api/get_todo_list", { params: { user_id: "1", p_id: this.p_id } })
      .then(res => {
        this.plans = res.data;
        console.log(this.plans);
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      openAlert: false,
      p_id: "",
      show: "project",
      plans: []
    };
  },
  methods: {
    iconColor(level) {
      switch (level) {
        case 1:
          return "red400";
        case 2:
          return "yellow800";
        case 3:
          return "blue300";
        case 4:
          return "green200";
      }
    },
    statusColor(status) {
      switch (status) {
        case 0:
          return "background-color:#fafafa";
        case 10:
          return "background-color:#eeeeee";
        case 9:
          return "background-color:#eeeeee";
      }
    },
    statusText(status) {
      switch (status) {
        case 0:
          return "任务正在进行中";
        case 10:
          return "任务已完成~撒花";
        case 9:
          return "很遗憾，任务已结束";
      }
    }
  }
};
</script>
<style scoped>
.detail {
  height: 100%;
}
</style>
