<template>
  <div>
    <mu-appbar style="width: 100%;" color="pinkA100">
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
<style>
</style>

