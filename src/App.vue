<template>
  <div>
    <mu-paper :z-depth="1">
      <header-vue :title="title" class="header"></header-vue>
      <router-view class="main"></router-view>
      <footer-vue class="footer" @onChangeView="onChangeView"></footer-vue>
    </mu-paper>
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
      title: "角虫养成计划"
    };
  },
  methods: {
    onChangeView(newTitle) {
      this.title = newTitle;
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
  margin-top: 60px;
}
.footer {
  position: fixed;
  bottom: 0;
}
.main {
  position: absolute;
  height: 100%;
  width: 100%;
}
mu-paper {
  height: 100%;
}
.footer {
  position: absolute;
  width: 100%;
}
</style>
