<template>
  <div style="height:100%">
    <mu-paper :z-depth="1" style="height:100%">
      <mu-list>
        <mu-list-item button @click="openAlert=true">
          <mu-list-item-action>
            <mu-icon value=":iconfont icon-fenxiang"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>删除数据</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="update">
          <mu-list-item-action>
            <mu-icon value=":iconfont icon-fenxiang"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>保留数据</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="loadData">
          <mu-list-item-action>
            <mu-icon value=":iconfont icon-fenxiang"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>导入测试数据</mu-list-item-title>
        </mu-list-item>
      </mu-list>
      <mu-dialog
        title="确定要清除数据吗？"
        width="600"
        max-width="80%"
        :esc-press-close="false"
        :overlay-close="false"
        :open.sync="openAlert"
      >
        删除后不可恢复
        <mu-button slot="actions" flat color="primary" @click="openAlert = false">手滑了</mu-button>
        <!-- <mu-button slot="actions" flat color="primary" @click="clear">是的</mu-button> -->
      </mu-dialog>
    </mu-paper>
  </div>
</template>
<script>
import { saveStorage } from "@/utils/data.js";
import plans from './../../db/test_db/plans.json';
import projects from './../../db/test_db/projects.json';
export default {
  mounted: function() {
    this.$emit("getMassage", this.show);
  },
  created() {
    $("body,html").animate({ scrollTop: 0 }, 100);
    this.$emit("getMessage", this.show);
  },
  data() {
    return {
      openAlert: false,
      show: "mine"
    };
  },
  methods: {
    loadData(){
      localStorage.plans = JSON.stringify(plans)
      localStorage.projects = JSON.stringify(projects)
    },
    update() {
      localStorage.projects
        ? saveStorage(JSON.parse(localStorage.projects), "projects")
        : "";
      localStorage.plans
        ? saveStorage(JSON.parse(localStorage.plans), "plans")
        : "";
      localStorage.record
        ? saveStorage(JSON.parse(localStorage.record), "record")
        : "";
    },
    clear() {
      localStorage.clear();
      this.openAlert = false;
    },
    changeTheme(){
      this.$store.commit()
    }
  }
};
</script>
<style>
</style>
