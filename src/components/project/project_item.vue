<template>
  <div>
    <mu-expansion-panel >
      <div slot="header">
        {{project.name}}
        <b>{{remain()}}</b>天后结束
      </div>
      <div class="list" v-for="plan in plans " :key="plan.id">{{plan.name}}</div>
      <mu-button
        slot="action"
        flat
        color="primary"
        :to="{name:'newplan',query:{pid:project.id}}"
      >新建计划</mu-button>
    </mu-expansion-panel>
  </div>
</template>
<script>
import planApi from '@/api/plans'
import { remainDays } from '@/utils/data'
export default {
  props:['project'],
  created(){
      planApi.getList(this.project.id).then(res =>{
          this.plans = res.data
      })
  },
  data() {
    return {
        plans:[]
    };
  },
  methods:{
      remain(){
          return remainDays(this.project.end_at)
      }
  }
};
</script>
<style scoped>

</style>