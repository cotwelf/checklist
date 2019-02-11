<template>
  <div>
    <mu-appbar style="width: 100%;" color="#f48fb1">
      <mu-button icon slot="left">
        <i class="iconfont icon-fenlei" style="font-size: 30px"></i>
      </mu-button>
      {{title}}
      <mu-button flat slot="right">
        <i class="iconfont icon-shezhi" style="font-size: 30px"></i>
      </mu-button>
    </mu-appbar>
  </div>
</template>
<script>
export default {
  props: ["title"],
  data() {
    return {
      //   title: ""
    };
  },
  methods: {
    handleClose() {}
  }
};
</script>
<style>
</style>

