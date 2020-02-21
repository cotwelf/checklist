<template>
  <div>
    <mu-expansion-panel >
      <div slot="header">
        {{project.name}}
        <b>{{remain()}}</b>天后结束
      </div>
      <mu-list class="list" v-for="plan in plans " :key="plan.id">
        <plan-list :plan='plan' :fetch='fetch' @sendId="closeId" />
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
  props:['project','fetch'],
  components:{
    planList
  },
    watch: {
    fetch(val){
this.fetchData()
    }
  },
  created(){
      this.fetchData()
      this.old_fetch = this.fetch
      console.log(this.fetch)
  },
  data() {
    return {
        plans:[],
        old_fetch:''
    };
  },
    
  methods:{
    fetchData(){
      planApi.getList(this.project.id).then(res =>{
          this.plans = res.data
      })
    },
    closeId(val){
      this.$emit('getId',val)
    },
      remain(){
          return remainDays(this.project.end_at)
      }
  }
};
</script>
<style scoped>

</style>