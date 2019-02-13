<template>
  <div>
    <mu-container>
      <mu-grid-list>
        <mu-sub-header>December</mu-sub-header>
        <mu-grid-tile v-for="(tile, index) in list" :key="index">
          <img :src="tile.image">
          <span slot="title">{{tile.title}}</span>
          <span slot="subTitle">
            by
            <b>{{tile.author}}</b>
          </span>
          <mu-button slot="action" icon>
            <mu-icon value="star_border"></mu-icon>
          </mu-button>
        </mu-grid-tile>
      </mu-grid-list>
    </mu-container>
  </div>
</template>
<script>
import breakfast from "../img/306240.jpg";
import burger from "../img/306885.jpg";
export default {
  mounted: function() {
    this.$emit("getMessage",  this.show);
  },
  created() {
    $("body,html").animate({ scrollTop: 0 }, 100);
  },
  data() {
    return {
      show: "project",
      list: [
        {
          image: breakfast,
          title: "Breakfast",
          author: "Myron"
        },
        {
          image: burger,
          title: "Burger",
          author: "Linyu"
        },
        {
          image: burger,
          title: "Burger",
          author: "Linyu"
        },
        {
          image: burger,
          title: "Burger",
          author: "Linyu"
        },
        {
          image: burger,
          title: "Burger",
          author: "Linyu"
        },
        {
          image: burger,
          title: "Burger",
          author: "Linyu"
        },
        {
          image: burger,
          title: "Burger",
          author: "Linyu"
        },
        {
          image: burger,
          title: "Burger",
          author: "Linyu"
        },
        {
          image: burger,
          title: "Burger",
          author: "Linyu"
        }
      ]
    };
  }
};
</script>
<style>
.gridlist-demo {
  width: 360px;
  height: 450px;
  overflow-y: auto;
}
</style>
