<template>
  <div>
    <mu-list textline="two-line">
      <mu-sub-header>今天也要元气满满加油鸭O(∩_∩)O~~</mu-sub-header>
      <span v-for="(task,index) in tasks" :key="index">
        <mu-list-item
          avatar
          :ripple="false"
          button
          v-if="showtask(task.status,task.dose,task.per,task.ver)"
          :id="task.id"
        >
          <mu-list-item-content>
            <mu-list-item-title>
              <mu-icon size="20" value=":iconfont icon-weiguanzhu" :color="iconColor(task.level)"></mu-icon>
              {{task.name}}
              <mu-icon v-if="task.ver==1" size="18" value=":iconfont icon-huiyuan" color="red"></mu-icon>
            </mu-list-item-title>
            <mu-list-item-sub-title v-if="task.ver!=0">
              {{(task.per-task.dose)>0?'今日待完成'+(task.per-task.dose)+task.unit:'今日份已完成~加个鸡腿'}}
              <span
                class="tips"
                v-if="realPer(task.end_at,task.total,task.per,index)[0]"
              >,建议{{realPer(task.end_at,task.total,task.per,index)[1]}}{{task.unit}}</span>
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
              @click="closeTask(task.id,task.ver,task.done,task.total,task.dose,task.unit,task.per)"
            ></mu-checkbox>
          </mu-list-item-action>
        </mu-list-item>
      </span>
    </mu-list>
    <mu-button fab color="pinkA100" class="add" @click="openBotttomSheet">
      <mu-icon value=":iconfont icon-jiajianzujianjiahao"></mu-icon>
    </mu-button>
    <mu-bottom-sheet :open.sync="open">
      <mu-list>
        <mu-sub-header>选择计划类型</mu-sub-header>
        <mu-list-item
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
export default {
  conputed: function() {
    // this.$store.dispatch("getPlanList", { user_id: "1", status: "0" });
    // console.log(this.$store.state.planlist);
    // this.tasks = this.$store.state.planlist;
  },
  created() {
    this.$emit("getMessage", this.show);
    $("body,html").animate({ scrollTop: 0 }, 100);
    // this.$store.dispatch("getPlanList", { user_id: "1", status: "0" });
    // var that = this;
    // function log(that) {
    //   console.log(that.$store.state.planlist);
    // }
    // log(that);
    // this.tasks = this.$store.state.planlist;
    // setTimeout(log(that), 3000);
    var that = this;
    async function getplanlist(obj) {
      var getdata = await obj.$store.dispatch("getPlanList", {
        user_id: "1",
        status: "0"
      });
      obj.tasks = obj.$store.state.planlist;
    }
    getplanlist(that);

    // console.log("以下为vue文件打印");
    // console.log(this.$store.state.planlist);

    // 假设1是userid
  },
  data() {
    return {
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
      var time1 = Date.parse(new Date(date));
      var time2 = Date.parse(new Date());
      var remain = Math.abs(parseInt((time2 - time1) / 1000 / 3600 / 24));
      return remain ? remain : 0;
    },
    showtask(status, dose, per, ver) {
      if (
        (status == 0) &
        ((Number(dose) > Number(per)) | (Number(dose) == Number(per)))
      ) {
        return ver == 1 ? 1 : 0;
      } else {
        return status == 0 ? 1 : 0;
      }
    },
    finishTask(id, finish) {
      this.$axios.post("/api/update_plan", {
        id: id,
        finish: finish,
        user_id: 1
      });
      this.$axios
        .get("/api/get_todo_list", { params: { user_id: "1", status: "0" } })
        .then(tasks => {
          this.tasks = tasks.data;
          console.log(this.tasks);
        })
        .catch(err => {
          console.log(err);
        });
    },
    realPer(end_date, total, per, index) {
      var now = new Date();
      var r_per =
        total / (this.remain(end_date) == 0 ? 1 : this.remain(end_date));
      var res = [r_per > per, Math.ceil(r_per)];
      return res;
    },
    closeTask(id, ver, done, total, dose, unit, per) {
      if (ver == 0) {
        this.$toast.message("恭喜你，经验值+1");
        $("#" + id).fadeOut();
        // todo
        this.finishTask(id, total);
      } else {
        this.$prompt(
          "今日已完成" +
            dose +
            (ver == 1
              ? "，剩余" + Math.round((total - done) * 100) / 100 + unit
              : ""),
          ver == 1 ? "请输入完成时间(min)" : "请输入当前进度",
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
            this.$toast.message("你输入的时间：" + value);
            // $("#" + id).fadeOut(); 状态变为已完成，但还可以继续做
            (ver == 1) | (Number(dose) + value < Number(per))
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
.demo-list-wrap {
  width: 100%;
  max-width: 360px;
  overflow: hidden;
}
.add {
  position: fixed;
  bottom: 80px;
  left: 10px;
}
.tips {
  color: red;
}
</style>
