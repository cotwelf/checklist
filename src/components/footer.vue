
<template>
  <div>
    <mu-container style="width:100%;">
      <mu-bottom-nav :value.sync="show" color="pinkA100" shift>
        <mu-bottom-nav-item
          value="project"
          title="项目进度"
          icon=":iconfont icon-fenlei1"
          :to="{ name: 'project', params: { userId: 123 }}"
        ></mu-bottom-nav-item>
        <mu-bottom-nav-item
          value="todo"
          title="今日计划"
          icon=":iconfont
           icon-yanchurili"
          :to="{ name: 'home', params: { userId: 123 }}"
        ></mu-bottom-nav-item>
        <mu-bottom-nav-item
          value="mine"
          title="我的"
          icon=":iconfont icon-wodedamaijihuo"
          :to="{name:'mine',params:{userId: 123}}"
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
