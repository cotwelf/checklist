<template>
  <div class="plan_list_box">
    <mu-button v-show="!todo_list" color="pink200" :to="{name:'project'}">没有进行中的计划，戳我去添加~</mu-button>
    <mu-list textline="two-line" v-show="todo_list">
      <mu-sub-header>今天也要元气满满加油鸭O(∩_∩)O~~</mu-sub-header>
      <plan-item v-for="item in todo_list" :key="item.id" :plan="item" @checked-plan="checkedPlan"></plan-item>
    </mu-list>
    <mu-list class="add_margin" textline="two-line" v-if="done_list.length">
      <mu-sub-header>以下为今日份已完成的任务菌们</mu-sub-header>
      <plan-item v-for="task in done" :key="task.id" :plan="task" @checked-plan="checkedPlan"></plan-item>
    </mu-list>
  </div>
</template>
<script>
import { remainDays, addRecord, getData, updatePlan } from "@/utils/data.js";
import plansApi from "@/api/plans";
import planItem from "@/components/plan_list/plan_item.vue";
export default {
  components: {
    planItem
  },
  created() {
    console.log(this.checkPlan);
    // console.log(this.$store.state.projects)
    this.getPlans();
    // localStorage.clear();
    this.$emit("getMessage", this.show);
    $("body,html").animate({ scrollTop: 0 }, 100);
  },
  computed: {},
  data() {
    return {
      show: "todo",
      selects: [],
      todo_list: [],
      done_list: [],
      vers: [
        { name: "普通计划（当天完成定量）", value: 0 },
        { name: "角虫养成计划（当天可多次完成）", value: 1 },
        { name: "项目计划（当天完成定量，有目标）", value: 2 }
      ]
    };
  },
  methods: {
    // 获取计划列表
    getPlans() {
      plansApi
        .getList()
        .then(response => {
          console.log(response.data);
          this.todo_list = response.data.show.filter(
            item => item.per_now > item.today_done
          );
          this.done_list = response.data.show.filter(
            item => item.per_now <= item.today_done
          );
        })
        .catch(err => {
          alert(error);
        });
    },
    // 选择某任务
    checkedPlan(plan) {
      console.log("checkedPlan");
      this.$prompt(
        "今日已完成" +
          plan.today_done +
          ("，剩余" + (plan.per_now - plan.today_done) + plan.unit),
        "请输入完成量",
        {
          validator(value) {
            return {
              valid: /[0-9]/.test(value),
              message: "请输入数字"
            };
          }
        }
      ).then(({ result, value }) => {
        if (result) {
          plansApi
            .updatePlan(plan,value)
            .then(response => {
              console.log(response)
              console.log("update_done");
              this.$toast.message("继续加油鸭");
              plan.today_done > plan.per_now ? "" : $("#" + id).fadeOut();
              this.finishTask(id, value);
            })
            .catch(err => {});
        } else {
          this.$toast.message("少年还需努力啊");
        }
      });
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
    finishTask(plan) {
      updatePlan(plan_id, done);
      addRecord(plan_id, done);
      this.refresh();
    },

    closeTask(id, ver, done, dose, total, unit, per) {
      this.$prompt(
        "今日已完成" +
          Math.round(dose * 100) / 100 +
          ("，剩余" +
            (done ? Math.round((total - done) * 100) / 100 : total) +
            unit),
        "请输入完成量",
        {
          validator(value) {
            return {
              valid: /[0-9]/.test(value),
              message: "请输入正确时间"
            };
          }
        }
      ).then(({ result, value }) => {
        if (result) {
          this.$toast.message("经验值+" + value);
          // $("#" + id).fadeOut(); 状态变为已完成，但还可以继续做
          (ver == 1) | (Number(dose) + Number(value) < Number(per))
            ? ""
            : $("#" + id).fadeOut();
          this.selects = [];
          this.finishTask(id, value);
        } else {
          this.selects = [];
          this.$toast.message("少年还需努力啊");
        }
      });
    }
  },
  position: "bottom-end",
  close: false
};
</script>
<style scoped>
.list {
  margin-top: 10px;
}
.add {
  position: fixed;
  bottom: 80px;
  left: 10px;
}
.tips {
  color: red;
}
.add_margin {
  margin-bottom: 8rem;
}
</style>
