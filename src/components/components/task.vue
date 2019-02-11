<template>
  <div>
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
          @click="Donetask(index)"
        ></mu-checkbox>
      </mu-list-item-action>
    </mu-list-item>
    <mu-divider></mu-divider>
  </div>
</template>
<script>
export default {
  props: ['name','remain','per'],
  methods: {
    handleClose() {},
    Donetask(index) {
      //   console.log("2333");

      this.tasks.splice(index, 1);
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
