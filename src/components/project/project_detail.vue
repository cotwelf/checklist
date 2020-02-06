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
      <mu-button slot="action" v-if="plan.status ==0" @click="kill(plan.id)" flat>结束这个计划</mu-button>
    </mu-expansion-panel>
  </div>
</template>
<script>
import {
  remainDays,
  addRecord,
  getData,
  updatePlan,
  today
} from "@/utils/data.js";
export default {
  computed: {},
  mounted: function() {
    this.$emit("getMessage", this.show);
  },
  created() {
    $("body,html").animate({ scrollTop: 0 }, 100);
    this.p_id = this.$route.query.id;
    this.refresh();
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
    refresh() {
      var res = getData(localStorage.plans);
      for (var i = 0; i < res.length; i++) {
        var index = i;
        console.log(res[i].pid);
        if (res[index].pid == this.p_id) {
          this.plans.push(res[index]);
        }
      }
    },
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
    },
    kill(plan_id) {
      console.log(this.plans.length);
      for (var i = 0; i < this.plans.length; i++) {
        console.log("233");
        var t = i;
        console.log(t);
        if (this.plans[i].id == plan_id) {
          this.plans[t].status = 10;
        }
      }
      console.log(this.plans);
      localStorage.plans = JSON.stringify(this.plans);
    }
  }
};
</script>
<style scoped>
.detail {
  height: 100%;
}
</style>
