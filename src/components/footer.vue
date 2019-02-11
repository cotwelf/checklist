
<template>
  <div>
    <mu-container style="max-width: 400px; width:100%;" color="#f48fb1">
      <mu-bottom-nav :value.sync="shift" color="#f48fb1" shift>
        <mu-bottom-nav-item value="movies" title="今日计划" icon=":iconfont icon-31dingdan"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="music" title="新建项目" icon=":iconfont icon-bianji" size="30"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="pictures" title="我的" icon=":iconfont icon-mine"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shift: "movies"
    };
  },
  methods: {
    handleClose() {}
  }
};
</script>
