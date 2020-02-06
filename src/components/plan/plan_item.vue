<template>
  <mu-list-item avatar :ripple="false" button>
    <mu-list-item-content>
      <mu-list-item-title>
        <mu-icon size="20" value=":iconfont icon-weiguanzhu" :color="iconColor(plan.level)"></mu-icon>
        {{plan.name}}
      </mu-list-item-title>
      <mu-list-item-sub-title
        v-if="plan.ver!=0"
      >{{'今日待完成'+(Number(plan.per)-Number(plan.dose))+plan.unit}}</mu-list-item-sub-title>
    </mu-list-item-content>
    <mu-list-item-action>
      <mu-checkbox
        color="yellow700"
        :value="plan.id"
        uncheck-icon=":iconfont icon-xuanzhong"
        checked-icon=":iconfont icon-xuanzhong"
        @click="check"
       
      ></mu-checkbox>
    </mu-list-item-action>
  </mu-list-item>
</template>
<script>
export default {
  props: ["plan"],
  created(){
      console.log(this.plan)
  },
  data() {
    return {};
  },
  methods: {
      check(){
          console.log('233')
          this.$emit('getId',this.plan.id)
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
    }
  }
};
</script>