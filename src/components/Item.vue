<template>
  <!-- <div>{{computedId}}. 名称: {{name}},{{others}}</div> -->
  <div>
    <mu-container v-for="(item,index) in items" :key="index">
    <mu-expansion-panel>
        <div slot="header">{{name}}</div>
        每日{{per}},进度{{remain}}
        <mu-button slot="action" flat>Cancel</mu-button>
        <mu-button slot="action" flat color="primary">Save</mu-button>
    </mu-expansion-panel>
    </mu-container>
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

