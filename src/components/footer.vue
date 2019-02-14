
<template>
  <div>
    <mu-container style="width:100%;">
      <mu-bottom-nav :value.sync="smg" color="pinkA100" shift>
        <mu-bottom-nav-item
          value="project"
          title="项目进度"
          icon=":iconfont icon-bianji"
          :to="{ name: 'project', params: { userId: 123 }}"
        ></mu-bottom-nav-item>
        <mu-bottom-nav-item
          value="todo"
          title="今日计划"
          icon=":iconfont icon-31dingdan"
          :to="{ name: 'home', params: { userId: 123 }}"
        ></mu-bottom-nav-item>
        <mu-bottom-nav-item value="mine" title="我的" icon=":iconfont icon-mine" :to="{name:'mine'}"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-container>
  </div>
</template>
<script>
export default {
  props: ["smg"],
  data() {
    return {
      shift: "todo"
    };
  },
  methods: {}
};
</script>
