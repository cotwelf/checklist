<template>
  <div class="plan_list_box">
    <mu-list textline="two-line">
      <!-- todo列表 -->
      <mu-sub-header>今天也要元气满满加油鸭O(∩_∩)O~~</mu-sub-header>
      <span v-for="(task,index) in tasks" :key="index">
        <mu-list-item
          avatar
          :ripple="false"
          button
          v-if="todotask(task.per,task.dose)"
          :id="task.id"
        >
          <mu-list-item-content>
            <mu-list-item-title>
              <mu-icon size="20" value=":iconfont icon-weiguanzhu" :color="iconColor(task.level)"></mu-icon>
              {{task.name}}
              <mu-icon v-if="task.ver==1" size="18" value=":iconfont icon-huiyuan" color="red"></mu-icon>
            </mu-list-item-title>
            <!-- 计划落后了 -->
            <mu-list-item-sub-title
              v-if="!check(task.per,task.done,task.total,task.remain_day)"
              style="color:red"
            >{{'今日待完成'+(real_per(task.done, task.total, task.remain_day))+task.unit}}</mu-list-item-sub-title>
            <!-- 计划尽在掌握 -->
            <mu-list-item-sub-title
              v-if="check(task.per,task.done,task.total,task.remain_day)"
            >{{'今日待完成'+Math.round((task.per-task.dose)*100)/100+task.unit}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-icon
              size="20"
              value=":iconfont icon-xuanzhong"
              @click="doTask(task.id, task.dose, task.done, task.total, task.remain_day,task.per,task.unit)"
            ></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
      </span>
    </mu-list>
    <mu-list class="add_margin" textline="two-line" v-if="tasks.length">
      <!-- done_today列表 -->
      <mu-sub-header>以下为今日份已完成的任务菌们</mu-sub-header>
      <span v-for="(task,index) in tasks" :key="index">
        <mu-list-item
          avatar
          :ripple="false"
          button
          v-if="!todotask(task.per,task.dose)"
          :id="task.id"
        >
          <mu-list-item-content>
            <mu-list-item-title>
              <mu-icon size="20" value=":iconfont icon-weiguanzhu" color="blueGrey100"></mu-icon>
              {{task.name}}
              <mu-icon v-if="task.ver==1" size="18" value=":iconfont icon-huiyuan" color="red"></mu-icon>
            </mu-list-item-title>
            <!-- 计划落后了 -->
            <mu-list-item-sub-title
              v-if="!check(task.per,task.done,task.total,task.remain_day)"
              style="color:red"
            >今日完成{{task.dose}}{{task.unit}}</mu-list-item-sub-title>
            <!-- 计划尽在掌握中  -->
            <mu-list-item-sub-title
              v-if="check(task.per,task.done,task.total,task.remain_day)"
            >今日完成{{task.dose}}{{task.unit}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-icon
              size="20"
              value=":iconfont icon-xuanzhong"
              color="yellow700"
              @click="doTask(task.id, task.dose, task.done, task.total, task.remain_day,task.per,task.unit)"
            ></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
      </span>
    </mu-list>
    <mu-button fab color="pink200" class="add" @click="openBotttomSheet">
      <mu-icon value=":iconfont icon-jiajianzujianjiahao"></mu-icon>
    </mu-button>
    <mu-bottom-sheet :open.sync="open">
      <mu-list>
        <img class="dialog_pic" src="../../img/dialog.png" alt />
        <div class="dialog_main">
          <mu-form-item prop="input" label="Input">
            <mu-text-field></mu-text-field>
          </mu-form-item>
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
        </div>
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
  today
} from "../../utils/data.js";
export default {
  created() {
    this.today = today();
    this.refresh();

    this.$emit("getMessage", this.show);
    $("body,html").animate({ scrollTop: 0 }, 100);
  },
  data() {
    return {
      records: [],
      today: "",
      ture: "",
      show: "todo",
      openSimple: false,
      id: "",
      name: "",
      per: "",
      done: "",
      status: "",
      total: "",
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
    refresh() {
      this.$axios.get("/api/data").then(res => {
        this.tasks = res.data.data.items;
        console.log(res.data.data.items);
      });
      // .catch(err => {
      //   console.log(error);
      // });
    },
    todotask(per, dose) {
      if (per > dose) {
        return true;
      } else {
        return false;
      }
    },
    // 这个实际每天应该完成的放后端计算
    real_per(done, total, remain_day, per) {
      let real_per = Math.round(((total - done) / remain_day) * 100) / 100;
      if (real_per > per) {
        return real_per;
      } else {
        return per;
      }
    },
    check(per, done, total, remain_day) {
      let real_per = this.real_per(done, total, remain_day, per);
      console.log(real_per);
      if (real_per > per) {
        return false;
      } else {
        return true;
      }
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
    remain(date) {
      return remainDays(date);
    },
    finishTask(plan_id, done) {
      updatePlan(plan_id, done);
      addRecord(plan_id, done);
      this.refresh();
    },
    doTask(id, dose, done, total, remain_day, per, unit) {
      let real_per = this.real_per(done, total, remain_day, per);
      this.$prompt(
        "计划完成" +
          real_per +
          unit +
          ",今日已完成" +
          Math.round(dose * 100) / 100 +
          unit,
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
          real_per > dose ? "" : $("#" + id).fadeOut();
          this.finishTask(id, value);
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
.dialog_pic {
  width: 6rem;
  position: absolute;
  top: 0;
  right: 0;
}
.dialog_main {
  margin-top: 4.5rem;
  background: #fff;
}
.mu-bottom-sheet {
  background-color: transparent !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
.mu-list {
  padding: 0 !important;
}
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
<style>
/* .mu-dialog {
  background-color: transparent !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  background: url("../../img/modal.png") no-repeat !important;
  background-repeat: no-repeat !important;
  background-size: 100% !important;
  -moz-background-size: 100% !important;
  border: none !important;
} */
</style>


