<template>
  <div>
    <mu-appbar color="pink200" style="height:100px;padding-top:10%">
      {{title}}
      <!-- <mu-button flat slot="right">
        <i class="iconfont icon-shezhi" style="font-size: 30px"></i>
      </mu-button>-->
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
  methods: {}
};
</script>
<style scoped>
</style>

