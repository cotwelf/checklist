<template>
  <div style="height:100%">
    <mu-paper :z-depth="1" style="height:100%">
      <mu-list>
        <mu-list-item button @click="update">
          <mu-list-item-action>
            <mu-icon value=":iconfont icon-fenxiang"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>保留数据</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-paper>
  </div>
</template>
<script>
import { saveStorage } from "../utils/data.js";
// import projects from "../../db/projects.json";
export default {
  mounted: function() {
    this.$emit("getMassage", this.show);
  },
  created() {
    $("body,html").animate({ scrollTop: 0 }, 100);
    this.$emit("getMessage", this.show);
    console.log(data);
  },
  data() {
    return {
      show: "mine"
    };
  },
  methods: {
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
    }
  }
};
</script>
<style>
</style>
