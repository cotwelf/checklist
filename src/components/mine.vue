<template>
  <div>小姐姐还在开发中~</div>
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
          level: "1",
          per: "2",
          remain: "100",
          status: "0"
        },
        {
          id: "2",
          name: "狍几",
          level: "2",
          per: "2",
          remain: "100",
          status: "0"
        },
        {
          id: "3",
          name: "狍毛",
          level: "3",
          per: "2",
          remain: "100",
          status: "0"
        },
        {
          id: "4",
          name: "haha",
          level: "4",
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
      //   console.log("2333");

      $("#" + index).fadeOut();
    },
    OpenTask(index) {
      $("#" + index).fadeIn();
    },
    GetColor() {
      switch (this.level) {
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
