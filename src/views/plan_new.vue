<template>
  <div>
    <mu-form ref="form" :model="validateForm" class="newplanmain">
      <mu-form-item
        label="计划名称"
        help-text="汉字、字母或字符，不要超过10个字"
        prop="name"
        :rules="nameRules"
      >
        <mu-text-field :color="color" v-model="validateForm.name" prop="name"></mu-text-field>
      </mu-form-item>

      <mu-form-item
        label="总目标"
        help-text="数字，如100，不要超过10位数"
        prop="total"
        :rules="totalRules"
      >
        <mu-text-field
          :color="color"
          type="number"
          v-model="validateForm.total"
          prop="total"
        ></mu-text-field>
      </mu-form-item>
      <mu-form-item
        label="单位"
        help-text="数字，如页、课、小时等，不要超过5个字"
        prop="planunit"
        :rules="planunitRules"
      >
        <mu-text-field :color="color" v-model="validateForm.planunit" prop="planunit"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="优先级" prop="planlevel" class="radio">
        <mu-flex class="select-control-row" v-for="(level,index) in levels " :key="index">
          <mu-radio
            color="grey800"
            :value="level.value"
            v-model="validateForm.planlevel"
            :label="level.name"
            class="radios"
          ></mu-radio>
        </mu-flex>
      </mu-form-item>
      <mu-form-item label="周重复天数" prop="plantype"  class="radio">
        <mu-flex class="select-control-row" v-for="(type,index) in types " :key="index">
          <mu-radio
            color="grey800"
            :value="type.value"
            v-model="validateForm.plantype"
            :label="type.name"
            class="radios"
          ></mu-radio>
        </mu-flex>
      </mu-form-item>
      <mu-form-item class="button_box">
        <!-- TODO 按钮离底部太近 -->
        <mu-button :color="color" @click="submit" >下一步</mu-button>
        <mu-button :to="{name:'home'}" >返回</mu-button>
      </mu-form-item>
      <mu-dialog
        :title="'每日完成'+validateForm.per+validateForm.planunit"
        width="600"
        max-width="80%"
        :esc-press-close="false"
        :overlay-close="false"
        :open.sync="openAlert"
      >
        剩余{{remain_days}}天
        <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">返回修改</mu-button>
        <mu-button slot="actions" flat color="primary" @click="createPlan">领养计划</mu-button>
      </mu-dialog>
    </mu-form>
  </div>
</template>
<script>
import { remainDays, pushData, randomId, today } from "@/utils/data.js";
import getProject from'@/api/projects'
import getPlan from '@/api/plans'
export default {
  mounted: function() {
    this.$emit("getMessage", this.show);
  },
  created() {
    $("body,html").animate({ scrollTop: 0 }, 100);
    const pid = this.$route.query.pid
    this.update = this.$route.query.id
    getProject.getProjects(pid).then(response=>{
      console.log(response.data)
      this.validateForm.end_at = response.data.end_at
      this.validateForm.pid = pid
    })
  },
  data() {
    return {
      color:this.$store.state.global.theme.color,
      ver: "",
      update:"",
      remain_days: "",
      now: "",
      list: [],
      show: "project",
      openAlert: false,
      types: [
        { name: "7天（周一~周日）", value: 7 },
        { name: "6天（周一~周六）", value: 6 },
        { name: "5天（周一~周五）", value: 5 },
        { name: "1天（周日）", value: 1 }
      ],
      levels: [
        { name: "很重要（当天必须完成）", value: 1 },
        { name: "一般重要（可以推到第二天）", value: 2 },
        { name: "重要（没有明确规定完成时间）", value: 3 },
        { name: "不重要（仅备忘）", value: 4 }
      ],
      nameRules: [
        { validate: val => !!val, message: "必须填写计划名称" },
        {
          validate: val => val.length <= 10,
          message: "计划名称太长啦臣妾记不住啊"
        }
      ],
      totalRules: [
        { validate: val => !!val, message: "必须填写总目标" },
        {
          validate: val => val.length <= 10,
          message: "大佬你确定这辈子可以完成？（害怕脸）"
        }
      ],
      planunitRules: [
        { validate: val => !!val, message: "必须填写单位" },
        {
          validate: val => val.length <= 5,
          message: "哇~单位这么长的嘛？"
        }
      ],
      // endAtRules:[
      //   { validate: val => !!val, message: "请选择时间" },
      // ],
      validateForm: {
        // 新建计划
        id:randomId(),
        name: "",
        total: "",
        per:'',
        planunit: "",
        plantype: 7,
        pid: 0,
        ver: 0,
        planlevel: 1,
        created_at:'',
        end_at:'',
        status:0,
        done:0
      }
    };
  },
  // watch:{
  //   validateForm:{
  //     deep:true,
  //     handler:function(newItems, oldItems){ 
  //       console.log(newItems.planlevel) 
  //   }}
  // },
  methods: {
    freshData() {},
    openFullscreenDialog() {
      this.openFullscreen = true;
    },
    openAlertDialog() {
      this.openAlert = true;
    },
    closeAlertDialog() {
      this.openAlert = false;
    },
    createPlan() {
      console.log(this.validateForm)
      getPlan.updatePlan(this.validateForm).then(response=>{
        this.$router.push({ name: "project" });
      })
    },
    submit() {
      this.$refs.form.validate().then(result => {
        this.validateForm.created_at = today()
        this.remain_days = remainDays(this.validateForm.end_at)?remainDays(this.validateForm.end_at):1
        if (result) {
          // 计算每天完成数量this.validateForm.per
          this.validateForm.per = (this.validateForm.total/this.remain_days).toFixed(2)
          this.openAlertDialog();
        }
      });
    }
  },
};
</script>
<style scoped>
</style>
