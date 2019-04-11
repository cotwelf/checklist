<template>
  <div>
    小姐姐还在开发中~
    <mu-avatar>
      <img src="../img/306240.jpg">
    </mu-avatar>
    <mu-button slot="actions" flat color="primary" @click="update">保留数据</mu-button>
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
