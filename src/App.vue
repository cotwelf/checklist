<template>
  <div >
    <img class="bg" :src="this.$store.state.global.theme.bgi" alt>
    <header-vue :title="title" class="header"></header-vue>
    <router-view class="main" @getMessage="showMsg"></router-view>
    <footer-vue class="footer" style="width:100%" :show="show"></footer-vue>
  </div>
</template>

<script>
import image from '@/assets/img/index'
import css from '@/assets/css/compatible.css'
export default {
  created(){
     console.log(this.$store.state.global.theme)
     this.width = window.screen.width
     this.height = window.screen.height
  },
  data() {
    return {
      show: "",
      title: "角虫养成计划",
      bgi:"@/assets/img/bgm/bg.png",
      width:'',
      height:''
    };
  },
  methods: {
    showMsg(show) {
      this.show = show;
    },
  }
};
</script>
 
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.header {
  position: fixed;
  display: block;
  top: 0;
  width: 100%;
  z-index: 999;
}
/* .mu-appbar-title{
  position: fixed;
  top: 3rem;
} */
/* mu-paper {
  height: 100%;
} */
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.bg {
  position: fixed;
  z-index: -999;
  width: 100%;
  height: 100%;
  opacity: 0.3;
}
</style>
