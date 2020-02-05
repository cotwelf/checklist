<template>
  <mu-list-item
    avatar
    :ripple="false"
    button
    v-if="showtask(task.status,Number(task.dose),Number(task.per),task.ver,task.type)  && (Number(task.per)-Number(task.dose))>0"
    :id="task.id"
  >
    <mu-list-item-content>
      <mu-list-item-title>
        <mu-icon size="20" value=":iconfont icon-weiguanzhu" :color="iconColor(task.level)"></mu-icon>
        {{task.name}}
        <mu-icon v-if="task.ver==1" size="18" value=":iconfont icon-huiyuan" color="red"></mu-icon>
      </mu-list-item-title>
      <mu-list-item-sub-title v-if="task.ver!=0">
        {{'今日待完成'+(Number(task.per)-Number(task.dose))+task.unit}}
      </mu-list-item-sub-title>
    </mu-list-item-content>
    <mu-list-item-action>
      <mu-checkbox
        color="yellow700"
        v-model="selects"
        :value="task.id"
        uncheck-icon=":iconfont icon-xuanzhong"
        checked-icon=":iconfont icon-xuanzhong"
        @click="closeTask(task.id,task.ver,Number(task.done),Number(task.dose),Number(task.total),task.unit,Number(task.per))"
      ></mu-checkbox>
    </mu-list-item-action>
  </mu-list-item>
</template>