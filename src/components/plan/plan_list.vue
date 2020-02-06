<template>
  <div class="plan_list_box">
    <mu-button v-show="!tasks" color="pink200" :to="{name:'project'}">没有进行中的计划，戳我去添加~</mu-button>
    <mu-list textline="two-line" v-show="tasks">
      <mu-sub-header>今天也要元气满满加油鸭O(∩_∩)O~~</mu-sub-header>
      <plan-item v-for='task in tasks' :key='task.id' :plan='task' @id='getId'></plan-item>
      <span v-for="(task,index) in tasks" :key="index">
        <mu-list-item
          avatar
          :ripple="false"
          button
          :id="task.id"
        >
          <mu-list-item-content>
            <mu-list-item-title>
              <mu-icon size="20" value=":iconfont icon-weiguanzhu" :color="iconColor(task.level)"></mu-icon>
              {{task.name}}
              <mu-icon v-if="task.ver==1" size="18" value=":iconfont icon-huiyuan" color="red"></mu-icon>
            </mu-list-item-title>
            <mu-list-item-sub-title v-if="task.ver!=0">
              {{'今日待完成'+(Number(task.per)-Number(task.dose))+task.unit}}
            </mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-checkbox
              color="yellow700"
              v-model="selects"
              :value="task.id"
              uncheck-icon=":iconfont icon-xuanzhong"
              checked-icon=":iconfont icon-xuanzhong"
              @click="closeTask(task.id,task.ver,Number(task.done),Number(task.dose),Number(task.total),task.unit,Number(task.per))"
            ></mu-checkbox>
          </mu-list-item-action>
        </mu-list-item>
      </span>
    </mu-list>
    <mu-list class="add_margin" textline="two-line" v-if="tasks.length">
      <mu-sub-header>以下为今日份已完成的任务菌们</mu-sub-header>
      <span v-for="(task,index) in tasks" :key="index">
        <mu-list-item
          avatar
          :ripple="false"
          button
          :id="task.id"
        >
          <mu-list-item-content>
            <mu-list-item-title>
              <mu-icon size="20" value=":iconfont icon-weiguanzhu" color="blueGrey100"></mu-icon>
              {{task.name}}
              <mu-icon v-show="task.ver==1" size="18" value=":iconfont icon-huiyuan" color="red"></mu-icon>
            </mu-list-item-title>
            <mu-list-item-sub-title v-if="task.ver!=0">
              今日份已完成~加个鸡腿
              <!-- <span
                class="tips"
                v-if="realPer(task.end_at,Number(task.done),Number(task.total),Number(task.per),index)[0]"
              >,建议{{realPer(task.end_at,Number(task.done),Number(task.total),Number(task.per),index)[1]}}{{task.unit}}</span>-->
            </mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <!-- <mu-list-item-after-text>第12次</mu-list-item-after-text> -->
            <mu-checkbox
              color="yellow700"
              v-model="selects"
              :value="task.id"
              uncheck-icon=":iconfont icon-xuanzhong"
              checked-icon=":iconfont icon-xuanzhong"
              @click="closeTask(task.id,task.ver,Number(task.done),Number(task.dose),Number(task.total),task.unit,Number(task.per))"
            ></mu-checkbox>
          </mu-list-item-action>
        </mu-list-item>
      </span>
    </mu-list>
    <!-- <mu-button fab color="pink200" class="add" @click="openBotttomSheet">
      <mu-icon value=":iconfont icon-jiajianzujianjiahao"></mu-icon>
    </mu-button>-->
    <mu-bottom-sheet :open.sync="open">
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
    </mu-bottom-sheet>
  </div>
</template>
<script>
import {
  remainDays,
  addRecord,
  getData,
  updatePlan,
} from "@/utils/data.js";
import plansApi from "@/api/plans";
import planItem from "@/components/plan/plan_item.vue";
export default {
  components:{
    planItem
  },
  created() {
    console.log(!this.tasks);
    // console.log(this.$store.state.projects)
    this.getPlans()
    // localStorage.clear();
    this.$emit("getMessage", this.show);
    $("body,html").animate({ scrollTop: 0 }, 100);
  },
  data() {
    return {
      show: "todo",
      openSimple: false,
      selects: [],
      getId:'',
      tasks: [],
      open: false,
      vers: [
        { name: "普通计划（当天完成定量）", value: 0 },
        { name: "角虫养成计划（当天可多次完成）", value: 1 },
        { name: "项目计划（当天完成定量，有目标）", value: 2 }
      ]
    };
  },
  methods: {
    getPlans() {
      plansApi
        .getList()
        .then(response => {
          this.tasks = response.data.show;
        })
        .catch(err => {
          alert(error);
        });
    },
    closeBottomSheet() {
      this.open = false;
    },
    openBotttomSheet() {
      this.open = true;
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
    finishTask(plan_id, done) {
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
