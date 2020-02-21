<template>
<div>
    <mu-list-item>
            <mu-list-item-content>
              <img v-if="plan.status == 9" style="width:3.5rem;position:absolute;right:1rem" src="@/assets/img/jieshu.png">
              <img v-if="plan.status == 10" style="width:3.5rem;position:absolute;right:1rem" src="@/assets/img/wancheng.png">
              <mu-list-item-title>{{plan.name}}</mu-list-item-title>
              <mu-list-item-sub-title>每天完成{{plan.per}}{{plan.unit}}</mu-list-item-sub-title>

            </mu-list-item-content>
            <mu-list-item-action>
        <mu-button v-if="plan.status == 0" icon @click="close_plan()">
          <mu-icon value=":iconfont icon-guanbi"></mu-icon>
        </mu-button>
      </mu-list-item-action>
          </mu-list-item>
          </div>
</template>
<script>
export default {
    props:['plan'],
    watch: {
      plan(val){}
    },
    data(){
      return{
        openAlert:true,
        old_fetch:'',
      }
    },
    methods: {
      close_plan(){
        console.log('plan_close',this.plan.id)
        this.$emit('sendId',this.plan.id)
      }
    },
}
</script>