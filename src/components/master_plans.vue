<template>
  <div>
    <mu-list textline="two-line">
      <mu-sub-header>今天也要元气满满加油鸭O(∩_∩)O~~</mu-sub-header>
      <span v-for="(task,index) in tasks" :key="index" :id="index">
        <mu-list-item avatar :ripple="ture" button v-if="task.status == 0">
          <mu-list-item-content>
            <mu-list-item-title>
              <mu-icon
                size="20"
                value=":iconfont icon-weiguanzhu"
                v-if="task.prev == 1"
                color="red400"
              ></mu-icon>
              <mu-icon
                size="20"
                value=":iconfont icon-weiguanzhu"
                v-if="task.prev ==2 "
                color="yellow800"
              ></mu-icon>
              <mu-icon
                size="20"
                value=":iconfont icon-weiguanzhu"
                v-if="task.prev ==3 "
                color="blue300"
              ></mu-icon>
              <mu-icon
                size="20"
                value=":iconfont icon-weiguanzhu"
                v-if="task.prev ==4 "
                color="green200"
              ></mu-icon>
              {{task.name}}
            </mu-list-item-title>
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
        {
          id: "1",
          name: "狍球",
          prev: "1",
          per: "2",
          remain: "100",
          status: "0"
        },
        {
          id: "2",
          name: "狍几",
          prev: "2",
          per: "2",
          remain: "100",
          status: "0"
        },
        {
          id: "3",
          name: "狍毛",
          prev: "3",
          per: "2",
          remain: "100",
          status: "0"
        },
        {
          id: "4",
          name: "haha",
          prev: "4",
          per: "2",
          remain: "100",
          status: "0"
        }
      ]
    };
  },
  methods: {
    handleClose() {},
    CloseTask(index) {
      $("#" + index).fadeOut();
    },
    OpenTask(index) {
      $("#" + index).fadeIn();
    },
    GetColor() {
      switch (this.prev) {
        case 1:
          "red";
          break;
      }
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
