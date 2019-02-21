<template>
  <div>
    <mu-button fab color="pinkA100" class="add" @click="openFullscreenDialog">
      <mu-icon value=":iconfont icon-jiajianzujianjiahao"></mu-icon>
    </mu-button>
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen">
      <mu-appbar color="pinkA100" title="新建计划" class="title">
        <mu-button slot="left" flat @click="closeFullscreenDialog">
          <mu-icon value=":iconfont icon-fanhui"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="padding: 10px;">
        <newPlan class="newplanmain"></newPlan>
      </div>
    </mu-dialog>
  </div>
</template>
<script>
import newPlan from "./components/new_plan.vue";
export default {
  components: {
    newPlan
  },
  mounted: function() {
    this.$emit("getMessage", this.show);
  },
  created() {
    $("body,html").animate({ scrollTop: 0 }, 100);
    
  },
  data() {
    return {
      show: "project",
      openFullscreen: false,
      items: [
        {
          text: "Dashboard",
          disabled: false
        },
        {
          text: "Link 1",
          disabled: true
        },
        {
          text: "Link 2",
          disabled: true
        }
      ]
    };
  },
  methods: {
    openFullscreenDialog() {
      this.openFullscreen = true;
    },
    closeFullscreenDialog() {
      this.openFullscreen = false;
    }
  }
};
</script>
<style>
.add {
  position: fixed;
  bottom: 80px;
  left: 10px;
}
.title {
  position: fixed;
  width: 100%;
  top: 0;
}
.newplanmain {
  width: 90%;
  margin-top: 25%;
}
</style>
