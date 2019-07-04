<template>
  <div class="plan_list_box">
    <mu-list textline="two-line">
      <mu-sub-header>今天也要元气满满加油鸭O(∩_∩)O~~</mu-sub-header>
      <span v-for="(task,index) in tasks" :key="index">
        <mu-list-item
          avatar
          :ripple="false"
          button
          v-if="showtask(task.status,Number(task.dose),Number(task.per),task.ver,task.type)  && (Number(task.per)-Number(task.dose))>0"
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
              <span
                class="tips"
                v-if="realPer(task.end_at,Number(task.done),Number(task.total),Number(task.per),index)[0]"
              >,建议{{realPer(task.end_at,Number(task.done),Number(task.total),Number(task.per),index)[1]}}{{task.unit}}</span>
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
    <mu-list class="add_margin" textline="two-line" v-if="tasks.length">
      <mu-sub-header>以下为今日份已完成的任务菌们</mu-sub-header>
      <span v-for="(task,index) in tasks" :key="index">
        <mu-list-item
          avatar
          :ripple="false"
          button
          v-if="showtask(task.status,Number(task.dose),Number(task.per),task.ver,task.type)  && !((Number(task.per)-Number(task.dose))>0)"
          :id="task.id"
        >
          <mu-list-item-content>
            <mu-list-item-title>
              <mu-icon size="20" value=":iconfont icon-weiguanzhu" color="blueGrey100"></mu-icon>
              {{task.name}}
              <mu-icon v-if="task.ver==1" size="18" value=":iconfont icon-huiyuan" color="red"></mu-icon>
            </mu-list-item-title>
            <mu-list-item-sub-title v-if="task.ver!=0">
              今日份已完成~加个鸡腿
              <span
                class="tips"
                v-if="realPer(task.end_at,Number(task.done),Number(task.total),Number(task.per),index)[0]"
              >,建议{{realPer(task.end_at,Number(task.done),Number(task.total),Number(task.per),index)[1]}}{{task.unit}}</span>
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
    <mu-button fab color="pink200" class="add" @click="openBotttomSheet">
      <mu-icon value=":iconfont icon-jiajianzujianjiahao"></mu-icon>
    </mu-button>
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
  today
} from "../../utils/data.js";
export default {
  created() {
    console.log("2333333");

    this.$axios
      // .get("/api/update_plan")
      .get("/api/data")
      .then(res => {
        console.log(res.data.data.items);
      });
    // .catch(err => {
    //   console.log(error);
    // });
    // localStorage.clear();
    this.today = today();
    this.refresh();
    this.$emit("getMessage", this.show);
    console.log(this.tasks);
    $("body,html").animate({ scrollTop: 0 }, 100);
  },
  data() {
    return {
      records: [],
      today: "",
      ture: "",
      show: "todo",
      openSimple: false,
      selects: [],
      id: "",
      name: "",
      per: "",
      done: "",
      status: "",
      total: "",
      tasks: "",
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
      this.tasks = getData(localStorage.plans);
      var tasks = this.tasks;
      var records = localStorage.records ? getData(localStorage.records) : [];
      for (var i = 0; i < tasks.length; i++) {
        tasks[i].dose = 0;
      }
      if (records.length > 0) {
        for (var i = 0; i < records.length; i++) {
          var plan_id = records[i].plan_id;
          if (records[i].finished_at == this.today) {
            var done = records[i].done;
            for (var j = 0; j < tasks.length; j++) {
              if (tasks[j].id == plan_id) {
                tasks[j].dose = Math.round(done * 100) / 100;
              }
            }
          }
        }
      }

      this.tasks = tasks;
      console.log(tasks);
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
    weekly(type) {
      const mydate = new Date();
      const w_today = mydate.getDay(); //0:周日-6:周六
      switch (type) {
        case 7:
          return 1;
        case 6:
          if (w_today == 0) {
            return 0;
          } else {
            return 1;
          }
        case 5:
          if (w_today == 6 || w_today == 0) {
            return 0;
          } else {
            return 1;
          }
        case 1:
          if (w_today == 6) {
            return 1;
          } else {
            return 0;
          }
      }
    },
    showtask(status, dose, per, ver, type) {
      if (this.weekly(type)) {
        if (
          status == 0 &&
          (Number(dose) > Number(per)) | (Number(dose) == Number(per))
        ) {
          return ver == 1 ? 1 : 0;
        } else {
          return status == 0 ? 1 : 0;
        }
      }
    },
    finishTask(plan_id, done) {
      updatePlan(plan_id, done);
      addRecord(plan_id, done);
      this.refresh();
    },
    realPer(end_date, done, total, per, index) {
      var r_per =
        (total - done ? done : 0) /
        (this.remain(end_date) == 0 ? 1 : this.remain(end_date));
      console.log(total);
      console.log("剩余时间" + this.remain(end_date));
      var res = [r_per > per, Math.round(r_per * 100) / 100];
      return res;
    },
    closeTask(id, ver, done, dose, total, unit, per) {
      if (ver == 0) {
        this.$toast.message("恭喜你，经验值+1");
        $("#" + id).fadeOut();
        this.finishTask(id, total);
      } else {
        this.$prompt(
          "今日已完成" +
            Math.round(dose * 100) / 100 +
            (ver == 1
              ? "，剩余" +
                (done ? Math.round((total - done) * 100) / 100 : total) +
                unit
              : ""),
          ver == 1 ? "请输入完成量" : "请输入当前进度",
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
