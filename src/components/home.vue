<template>
  <div>
    <mu-list textline="two-line">
      <mu-sub-header>未完成</mu-sub-header>
      <span v-for="(task,index) in tasks" :key="index" v-if="task.status == 0" :id="index">
        <mu-list-item avatar :ripple="ture" button>
          <mu-list-item-content>
            <mu-list-item-title>{{task.name}}</mu-list-item-title>
            <mu-list-item-sub-title>周末要来你这里出差，要不要一起吃个饭呀周末要来你这里出差，要不要一起吃个饭呀周末要来你这里出差，要不要一起吃个饭呀</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-list-item-after-text>第12次</mu-list-item-after-text>
            <mu-checkbox
              color="yellow700"
              v-model="selects"
              :value="task.id"
              uncheck-icon=":iconfont icon-31yiguanzhudianpu"
              checked-icon=":iconfont icon-31xuanzhong"
              @click="CloseTask(index)"
            ></mu-checkbox>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
      </span>
    </mu-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selects: [],
      id: "",
      name: "",
      title: "今日计划",
      per: "",
      remain: "",
      status: "",
      tasks: [
        { id: "1", name: "狍球", per: "2", remain: "100", status: "0" },
        { id: "2", name: "狍几", per: "2", remain: "100", status: "0" },
        { id: "3", name: "狍毛", per: "2", remain: "100", status: "1" },
        { id: "4", name: "haha", per: "2", remain: "100", status: "1" }
      ]
    };
  },
  methods: {
    handleClose() {},
    CloseTask(index) {
      //   console.log("2333");

      $("#" + index).fadeOut();
    },
    OpenTask(index) {
      $("#" + index).fadeIn();
    }
  }
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
