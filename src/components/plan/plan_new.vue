<template>
  <div>
    <mu-form ref="form" :model="validateForm" class="newplanmain">
      <mu-form-item
        label="计划名称"
        help-text="汉字、字母或字符，不要超过10个字"
        prop="planname"
        :rules="plannameRules"
      >
        <mu-text-field color="pink200" v-model="validateForm.planname" prop="planname"></mu-text-field>
      </mu-form-item>

      <mu-form-item
        label="总目标"
        help-text="数字，如100，不要超过10位数"
        prop="plantotal"
        :rules="plantotalRules"
      >
        <mu-text-field
          color="pink200"
          type="number"
          v-model="validateForm.plantotal"
          prop="plantotal"
        ></mu-text-field>
      </mu-form-item>
      <mu-form-item
        label="单位"
        help-text="数字，如页、课、小时等，不要超过5个字"
        prop="planunit"
        :rules="planunitRules"
      >
        <mu-text-field color="pink200" v-model="validateForm.planunit" prop="planunit"></mu-text-field>
      </mu-form-item>
      <!-- <mu-form-item label="结束时间" prop="end_at" :rules="endAtRules">
        <mu-date-input
          id="end"
          color="pink200"
          v-model="validateForm.end_at"
          full-width
          prop="end_at"
          no-display
          container="bottomSheet"
        ></mu-date-input>
        </mu-form-item> -->
      <mu-form-item label="优先级" prop="planlevel" class="radio">
        <mu-flex class="select-control-row" v-for="(level,index) in levels " :key="index">
          <mu-radio
            color="pink200"
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
            color="pink200"
            :value="type.value"
            v-model="validateForm.plantype"
            :label="type.name"
            class="radios"
          ></mu-radio>
        </mu-flex>
      </mu-form-item>
      <mu-form-item class="button_box">
        <!-- TODO 按钮离底部太近 -->
        <mu-button color="pink200" @click="submit" >下一步</mu-button>

        <mu-button :to="{name:'home'}" >返回</mu-button>
      </mu-form-item>
      <mu-dialog
        :title="'每日完成'+per+validateForm.planunit"
        width="600"
        max-width="80%"
        :esc-press-close="false"
        :overlay-close="false"
        :open.sync="openAlert"
      >
        可用天数{{remain_days}}
        <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">返回修改</mu-button>
        <mu-button slot="actions" flat color="primary" @click="createPlan">领养计划</mu-button>
      </mu-dialog>
    </mu-form>
  </div>
</template>
<script>
import { remainDays, pushData, randomId } from "../../utils/data.js";
import getProject from'@/api/projects'
import getPlan from '@/api/plans'
export default {
  mounted: function() {
    this.$emit("getMessage", this.show);
  },
  created() {
    
    $("body,html").animate({ scrollTop: 0 }, 100);
    const pid = this.$route.query.pid
    getProject.getProjects(pid).then(response=>{
      this.end_date = response.data.end_at
      console.log(this.end_date)
      console.log(this.end_date>'2022/2/1')
    })
  },
  data() {
    return {
      ver: "",
      remain_days: "",
      per: "",
      now: "",
      list: [],
      show: "project",
      openAlert: false,
      end_date: "",
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
      plannameRules: [
        { validate: val => !!val, message: "必须填写计划名称" },
        {
          validate: val => val.length <= 10,
          message: "计划名称太长啦臣妾记不住啊"
        }
      ],
      plantotalRules: [
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
        planname: "",
        plantotal: "",
        planunit: "",
        plantype: 7,
        project: 0,
        planver: 0,
        planlevel: 1,
        created_at:'',
        end_at:'',
      }
    };
  },
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
    remain(date) {
      return remainDays(date);
    },
    createPlan() {
      getPlan.createPlan(this.validateForm).then(response=>{
        console.log(response)
      })


      // var now = new Date();
      // this.now = now.toLocaleDateString();
      // console.log("now===========" + now);
      // const plan = {};
      // plan.id = randomId();
      // plan.ver = this.ver;
      // plan.name = this.validateForm.planname;
      // plan.created_at = this.now;
      // plan.end_at = this.end_date ? this.end_date : this.now;
      // plan.total = this.validateForm.plantotal;
      // plan.per = this.per ? this.per : this.validateForm.plantotal;
      // plan.unit = this.validateForm.planunit;
      // plan.level = this.validateForm.planlevel;
      // plan.type = this.validateForm.plantype;
      // plan.pid = this.pid;
      // plan.status = 0;
      // pushData("plans", plan);
      // this.$router.push({ name: "home" });
    },
    submit() {
      console.log(this.validateForm.end_at.toLocaleDateString())
      this.$refs.form.validate().then(result => {
        console.log(this.list);
        if (result) {
          var p_length = $(".project > .mu-form-item-content").children()
            .length;
          for (var i = 0; i < p_length; i++) {
            var checked_ele = $(
              $(".project > .mu-form-item-content").children()[i]
            ).find("input")[0];
            if (checked_ele.checked) {
              this.end_date = this.list[$(checked_ele).attr("index")].end_at;
              this.checked_pid = this.list[$(checked_ele).attr("index")].id;
              var days =
                (Number(this.remain(this.end_date)) / 7) *
                Number(this.validateForm.plantype);
              console.log(Number(this.remain(this.end_date)) / 7);
              console.log(this.end_date);
              var _per = Number(this.validateForm.plantotal) / days;
              this.remain_days = Math.floor(days);
              this.per = Math.ceil(_per * 100) / 100;
            }
          }
          this.openAlertDialog();
          // if (this.ver != 0) {
          //   this.openAlertDialog();
          // } else {
          //   this.createPlan();
          // }
        }
        console.log();
        console.log("form valid: ", result);
      });
    }
  }
};
</script>
<style scoped>
.main {
  padding:8rem 1rem;
}
.button_box{
  margin-bottom: 5rem;
  text-align: center
}
.mu-form-item-content>.mu-button{
  width: 90%;
  margin: 0 auto;
  margin-bottom: 1rem;
  height: 3rem
}
.select-control-row,.radio>div{
  flex-direction: column !important; 
  align-self: flex-start !important
}
</style>
