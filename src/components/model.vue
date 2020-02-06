<template>
  <div>
    <mu-bottom-sheet :open.sync="open">
      <mu-list>
        <mu-sub-header>选择计划类型</mu-sub-header>
        <mu-list-item
          style="height:80px"
          button
          v-for="(ver,index) in vers"
          :key="index"
          :to="{name:'newplan',query:{ver:ver.value}}"
        >
          <mu-list-item-action>
            <mu-icon value=":iconfont icon-weiguanzhu" color="red400"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{ver.name}}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
  </div>
</template>