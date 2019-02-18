<template>
  <div>
    <mu-card-header :title="list.created_at" sub-title="创建时间">
      <mu-avatar slot="avatar">
        <img :src="image">
      </mu-avatar>
    </mu-card-header>
    <!-- <mu-card-media title="Image Title" sub-title="Image Sub Title">
            <img>
    </mu-card-media>-->
    <mu-card-title sub-title="计划"></mu-card-title>
    <mu-card-text class="card_list">
      散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
      调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
      <span></span>
      似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
      找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
    </mu-card-text>
    <mu-card-actions>
      <mu-button flat>编辑</mu-button>
      <mu-button flat @click="closeSimpleDialog">返回</mu-button>
    </mu-card-actions>
  </div>
</template>
<script>
export default {
  mounted: function() {
    this.$emit("getMessage", this.show);
  },
  created() {
    alert("23333");
    $("body,html").animate({ scrollTop: 0 }, 100);
    this.$axios
      .get("/api/get_todo_list")
      .then(tasks => {
        this.tasks = tasks.data;
        console.log(this.tasks);
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      ture: "",
      show: "todo",
      openSimple: false,
      selects: [],
      id: "",
      name: "",
      per: "",
      done: "",
      status: "",
      total: "",
      tasks: ""
    };
  },
  methods: {
    remain(date) {
      var time1 = Date.parse(new Date(date));
      var time2 = Date.parse(new Date());
      var remain = Math.abs(parseInt((time2 - time1) / 1000 / 3600 / 24));
      // var remain = this.list.end_at - today;
      console.log(date);
      console.log(time2);
      return remain ? remain : 0;
    },
    getPlan(id) {
      this.$axios
        .get("/api/get_todo_list", { params: { user_id: 1, p_id: 1 } })
        .then(tasks => {
          this.tasks = tasks.data;
          console.log(this.tasks);
        })
        .catch(err => {
          console.log(err);
        });
    },
    showDetail() {
      $(".card").fadeIn();
    }
  }
};
</script>
<style>
.list {
  margin-top: 10px;
}
.demo-list-wrap {
  width: 100%;
  max-width: 360px;
  overflow: hidden;
}
</style>
