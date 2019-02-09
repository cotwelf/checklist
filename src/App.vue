<template>
  <div>
    <p v-for="(name, index) in names" :key="index"  :v-if="isPink">
      <button @click="del(index)">delete</button>
      <Item :id="index" :name="name.label" :per="name.per" :others="1"   />
    </p>
    add<input type="text" v-model="label">
    per<input type="text" v-model="per">
    status<input type="text" v-model="status">
    <button @click="add">add</button>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Item from './components/Item.vue'

export default {
  components: {
    Item
  },
  data() {
    return {
      label:'',per:'',status:'',
      names: [{
        label: '狍球',per:1,status:'ture'
      }, {
        label: '狍几',per:2,status:'ture'
      }, {
        label: '狍毛',per:0,status:'ture'
      },{
        label: '艺术设计概论',per:22,status:'false'
      }],
      isPink:true,
    }
  },
  methods:{
        del(index){
            this.names.splice(index,1)
        },
        add(){
          this.names.push({label:this.label,per:this.per,status:this.status})
        }
    }  
}
</script>
 
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.pink{
  background-color: pink
}
.green{
  background-color: green
}
</style>
