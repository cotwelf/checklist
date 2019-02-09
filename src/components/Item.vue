<template>
  <!-- <div>{{computedId}}. 名称: {{name}},{{others}}</div> -->
  <div>
      <span>{{id}}</span>
      <span class="name">{{name}}</span>
      <br/>
      <span class="tips">每日{{per}},进度{{remain}}</span>

  </div>
</template>

<script>
export default {
    props: ['id','name','remain','per'],
    computed: {
        computedId() {
            return this.id + 1;
        }
    },
    
}
</script>
<style>
    .name{
        color: rgb(19, 19, 19)
    }
    .tips{
        color:rgb(202, 202, 202)
    }
</style>

