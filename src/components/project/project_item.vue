<template>
  <div>
    <mu-expansion-panel >
      <div slot="header">
        {{project.name}}
        <b>{{remain()}}</b>天后结束
      </div>
      <mu-list class="list" v-for="plan in plans " :key="plan.id">
        <plan-list :plan='plan'/>
      </mu-list>
      
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
import planList from'@/components/project/project_plan'
import { remainDays } from '@/utils/data'
export default {
  props:['project'],
  components:{
    planList
  },
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