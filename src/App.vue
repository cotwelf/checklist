<template>
  <div>
    <header-vue :title="title" class="header"></header-vue>
    <mu-paper :z-depth="1">
      <router-view class="main" @getMessage="showMsg"></router-view>
    </mu-paper>
    <footer-vue class="footer" style="width:100%" :show="show"></footer-vue>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Item from "./components/Item.vue";

export default {
  // components: {
  //   Item
  // },
  data() {
    return {
      show: "",
      title: "角虫养成计划"
    };
  },
  methods: {
    showMsg(show) {
      this.show = show;
    }
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
.main {
  top: 110px;
  position: absolute;
  height: 111%;
  width: 100%;
}
mu-paper {
  height: 100%;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
