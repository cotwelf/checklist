<template>
    <div>
       <mt-cell-swipe
  title="标题文字"
  :right="[
    {
      content: 'Delete',
      style: { background: 'red', color: '#fff' },
      handler: () => this.$messagebox('delete')
    }
  ]"></mt-cell-swipe>
  <hr/>
    </div>
</template>
<script>
export default {
    data(){
        return{
            name:'',per:'',remain:'',
            tasks:[
                {name:'狍球',per:'2',remain:'100'},
                {name:'狍几',per:'2',remain:'100'},
                {name:'狍毛',per:'2',remain:'100'},
                {name:'haha',per:'2',remain:'100'},

        ]

        }
    },
    methods:{
        handleClose(){}
    },
    created(){
      // get请求
      // this.$axios.get('')
      // .then(res=>{
      //   this.data = res.data.message;
      //   console.log(res);
      // })
      // .catch(err=>{
      //   console.log(err);
      // })

      // post请求
      // $this.$asios.post('','content = xxx')
      // .then(res=>{
      //   this.data = res.data.message;
      //   console.log(res);
      // })
      // .catch(err=>{
      //   console.log(err);
      // })
    }
}
</script>
