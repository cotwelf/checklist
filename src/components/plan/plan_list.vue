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
              <mu-icon
                size="20"
                value=":iconfont icon-weiguanzhu"
                v-if="task.level == 1"
                color="red400"
              ></mu-icon>
              <mu-icon
                size="20"
                value=":iconfont icon-weiguanzhu"
                v-if="task.level ==2 "
                color="yellow800"
              ></mu-icon>
              <mu-icon
                size="20"
                value=":iconfont icon-weiguanzhu"
                v-if="task.level ==3 "
                color="blue300"
              ></mu-icon>
              <mu-icon
                size="20"
                value=":iconfont icon-weiguanzhu"
                v-if="task.level ==4 "
                color="green200"
              ></mu-icon>
              {{task.name}}
              <mu-icon v-if="task.ver==1" size="18" value=":iconfont icon-huiyuan" color="red"></mu-icon>
            </mu-list-item-title>
            <mu-list-item-sub-title
              v-if="task.ver!=0"
            >{{(task.per-task.dose)>0?'今日待完成'+(task.per-task.dose)+task.unit:'今日份已完成~加个鸡腿'}}</mu-list-item-sub-title>
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
    <mu-button fab color="pinkA100" class="add" :to="{name:'newplan'}">
      <mu-icon value=":iconfont icon-jiajianzujianjiahao"></mu-icon>
    </mu-button>
  </div>
</template>
<script>
export default {
  mounted: function() {
    this.$emit("getMessage", this.show);
  },
  created() {
    $("body,html").animate({ scrollTop: 0 }, 100);
    // 假设1是userid
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
      tasks: ""
    };
  },
  methods: {
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
      this.$axios.post("/api/update_plan", { id: id, finish: finish });
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
    closeTask(id, ver, done, total, dose, unit, per) {
      if (ver == 0) {
        this.$toast.message("恭喜你，经验值+1");
        $("#" + id).fadeOut();
        this.finishTask(id, total);
      } else {
        this.$prompt(
          "今日已完成" +
            dose +
            (ver == 1 ? "，剩余" + (total - done) + unit : ""),
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
</style>
