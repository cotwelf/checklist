<template>
  <div>
    <mu-appbar :color="this.$store.state.global.theme.color" class="header">
      {{title}}
      <!-- <mu-button flat slot="right">
        <i class="iconfont icon-shezhi" style="font-size: 30px"></i>
      </mu-button>-->
    </mu-appbar>
  </div>
</template>
<script>
import css from '@/assets/css/compatible.css'
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

