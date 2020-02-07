<template>
  <div class="plan_list_box">
    <mu-button v-show="!todo_list" color="pink200" :to="{name:'project'}">没有进行中的计划，戳我去添加~</mu-button>
    <mu-list textline="two-line" v-show="todo_list">
      <mu-sub-header>今天也要元气满满加油鸭O(∩_∩)O~~</mu-sub-header>
      <plan-item v-for="item in todo_list" :key="item.id" :plan="item" @checked-plan="checkedPlan"></plan-item>
    </mu-list>
    <mu-list class="add_margin" textline="two-line" v-if="done_list.length">
      <mu-sub-header>以下为今日份已完成的任务菌们</mu-sub-header>
      <plan-item v-for="task in done_list" :key="task.id" :plan="task" @checked-plan="checkedPlan" :done='1'></plan-item>
    </mu-list>
  </div>
</template>
<script>
import { remainDays, addRecord, numberHelper } from "@/utils/data.js";
import plansApi from "@/api/plans";
import planItem from "@/components/plan_list/plan_item.vue";
export default {
  components: {
    planItem
  },
  created() {
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
          this.todo_list = response.data.show.filter(item => {
            if (!item.delay && item.today_done < item.per) {
              return item;
            } else if ((item.delay && item.today_done < item.per_now)) {
              return item;
            }
          });
          this.done_list = response.data.show.filter(item => {
            if (!item.delay && item.today_done >= item.per) {
              return item;
            } else if (
              (item.delay && item.today_done >= item.per_now)
            ) {
              return item;
            }
          });
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
          numberHelper(plan.today_done) +
          ("，全部剩余" + numberHelper((plan.total - plan.done)*100/plan.total) + "%"),
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
            .updatePlan(plan, value)
            .then(response => {
              this.getPlans();
              this.$toast.message("继续加油鸭");
              plan.today_done > plan.per_now ? "" : $("#" + id).fadeOut();
            })
            .catch(err => {});
        } else {
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
