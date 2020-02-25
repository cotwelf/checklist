<template>
  <div>
    <mu-list-item avatar :ripple="false" button>
      <mu-list-item-content>
        <mu-list-item-title>
          <mu-icon size="20" value=":iconfont icon-weiguanzhu" :color="iconColor(plan.level)"></mu-icon>
          <span :class="{'done':done}">{{plan.name}}</span>
        </mu-list-item-title>
        <mu-list-item-sub-title
          v-if="!done"
          :class="{'delay': plan.delay}"
        >{{'今日已完成:'+dataHelper(plan.today_done)+plan.unit+',待完成:'+dataHelper((plan.delay?plan.per_now:plan.per)-plan.today_done)+plan.unit}}</mu-list-item-sub-title>
        <mu-list-item-sub-title v-else>今日已完成{{dataHelper(plan.today_done)+plan.unit}}~加个鸡腿~</mu-list-item-sub-title>
      </mu-list-item-content>
      <mu-list-item-action>
        <mu-checkbox
          color="yellow700"
          :value="plan.id"
          uncheck-icon=":iconfont icon-xuanzhong"
          @click="checked"
        ></mu-checkbox>
      </mu-list-item-action>
    </mu-list-item>
  </div>
</template>
<script>
import { numberHelper } from "@/utils/data";
export default {
  props: ["plan", "done"],
  created() {
  },
  data() {
    return {};
  },
  methods: {
    dataHelper(data){
      return numberHelper(data)
    },
    checked() {
      this.$emit("checked-plan", this.plan);
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
<style scoped>
.delay {
  color: rgb(266, 66, 66);
}
.done {
  text-decoration: line-through;
}
</style>