
<template>
  <div>
    <mu-container>
      <mu-bottom-nav :value.sync="show" color="pink200" shift>
        <mu-bottom-nav-item
          value="project"
          title="项目进度"
          icon=":iconfont icon-fenlei1"
          :to="{ name: 'project'}"
        ></mu-bottom-nav-item>
        <mu-bottom-nav-item
          value="todo"
          title="今日计划"
          icon=":iconfont
           icon-yanchurili"
          :to="{ name: 'home'}"
        ></mu-bottom-nav-item>
        <mu-bottom-nav-item
          value="mine"
          title="我的"
          icon=":iconfont icon-wodedamaijihuo"
          :to="{name:'mine'}"
        ></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-container>
  </div>
</template>
<script>
export default {
  props: ["show"],
  data() {
    return {
      shift: "todo"
    };
  },
  methods: {}
};
</script>
<style scope>
.container {
  margin: 0;
  padding: 0;
}
.mu-bottom-nav {
  height: 65px;
}
</style>

