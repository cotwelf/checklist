<template>
  <div>小姐姐还在开发中~
    <mu-avatar>
      <img src="../img/306240.jpg">
    </mu-avatar>
  </div>
</template>
<script>
export default {
  mounted: function() {
    this.$emit("getMassage", this.show);
  },
  created() {
    $("body,html").animate({ scrollTop: 0 }, 100);
  },
  data() {
    return {
      show: "mine"
    };
  },
  methods: {}
};
</script>
<style>
</style>
