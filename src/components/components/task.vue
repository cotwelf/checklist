<template>
  <div @click="CloseTask()">
    <mu-list-item avatar :ripple="ture" button>
      <mu-list-item-content>
        <mu-list-item-title>
          <mu-icon size="20" value=":iconfont icon-weiguanzhu" v-if="level == 1" color="red400"></mu-icon>
          <mu-icon size="20" value=":iconfont icon-weiguanzhu" v-if="level ==2 " color="yellow800"></mu-icon>
          <mu-icon size="20" value=":iconfont icon-weiguanzhu" v-if="level ==3 " color="blue300"></mu-icon>
          <mu-icon size="20" value=":iconfont icon-weiguanzhu" v-if="level ==4 " color="green200"></mu-icon>
          {{name}}
        </mu-list-item-title>
        <mu-list-item-sub-title>周末要来你这里出差，要不要一起吃个饭呀周末要来你这里出差，要不要一起吃个饭呀周末要来你这里出差，要不要一起吃个饭呀</mu-list-item-sub-title>
      </mu-list-item-content>
      <mu-list-item-action>
        <mu-list-item-after-text>第12次</mu-list-item-after-text>
        <mu-checkbox
          color="yellow700"
          v-model="selects"
          :value="id"
          uncheck-icon=":iconfont icon-31yiguanzhudianpu"
          checked-icon=":iconfont icon-31xuanzhong"
          @click="CloseTask(id)"
        ></mu-checkbox>
      </mu-list-item-action>
    </mu-list-item>
  </div>
</template>
<script>
export default {
  props: ["id", "name", "remain", "per", "level"],
  data() {
    return {
      selects: []
    };
  },
  methods: {
    CloseTask(id) {
      this.fadeOut();
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
