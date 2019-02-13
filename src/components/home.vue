<template>
  <div>
    <mu-list textline="two-line">
      <mu-sub-header>今天也要元气满满加油鸭O(∩_∩)O~~</mu-sub-header>
      <span v-for="(task,index) in tasks" :key="index">
        <mu-list-item avatar :ripple="ture" button v-if="task.status == 0" :id="task.id">
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
            <mu-list-item-sub-title>每天{{task.per}}，剩余{{task.done}}%</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <!-- <mu-list-item-after-text>第12次</mu-list-item-after-text> -->
            <mu-checkbox
              color="yellow700"
              v-model="selects"
              :value="task.id"
              uncheck-icon=":iconfont icon-xuanzhong"
              checked-icon=":iconfont icon-xuanzhong"
              @click="CloseTask(task.id,task.ver,task.done,task.total)"
            ></mu-checkbox>
          </mu-list-item-action>
        </mu-list-item>
      </span>
    </mu-list>
  </div>
</template>
<script>
export default {
  mounted: function() {
    this.$emit("getMessage", this.show);
  },
  created() {
    $("body,html").animate({ scrollTop: 0 }, 100);
  },
  data() {
    return {
      show: "todo",
      openSimple: false,
      selects: [],
      id: "",
      name: "",
      per: "",
      done: "",
      status: "",
      total: "",
      tasks: [
        {
          id: "1",
          name: "狍球",
          level: "1",
          per: "2",
          total: "222",
          done: "100",
          status: "0",
          // 0:普通计划（简单重复或当天结束）；1：角虫养成计划; 2:项目计划（有目标）
          ver: "1"
        },
        {
          id: "2",
          name: "狍几",
          level: "2",
          per: "2",
          total: "222",
          done: "100",
          status: "0",
          ver: "2"
        },
        {
          id: "3",
          name: "狍毛",
          level: "3",
          per: "2",
          total: "222",
          done: "100",
          status: "0",
          ver: "0"
        },
        {
          id: "4",
          name: "haha",
          level: "4",
          per: "2",
          total: "222",
          done: "100",
          status: "0",
          ver: "0"
        }
      ]
    };
  },
  methods: {
    CloseTask(id, ver, done, total) {
      if (ver == 0) {
        this.$toast.message("恭喜你，经验值+1");
        $("#" + id).fadeOut();
      } else {
        this.$prompt(
          "已完成" + done + "，剩余" + (total - done),
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
            $("#" + id).fadeOut();
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
<style>
.list {
  margin-top: 10px;
}
.demo-list-wrap {
  width: 100%;
  max-width: 360px;
  overflow: hidden;
}
</style>
