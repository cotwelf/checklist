<template>
  <div>
    <mu-form ref="form" :model="validateForm" class="newplanmain">
      <mu-form-item
        label="计划名称"
        help-text="汉字、字母或字符，不要超过10个字"
        prop="planname"
        :rules="plannameRules"
      >
        <mu-text-field id="name" color="pink200" v-model="validateForm.planname" prop="planname"></mu-text-field>
      </mu-form-item>
      <mu-form-item
        label="总目标"
        help-text="数字，如100，不要超过10位数"
        prop="plantotal"
        :rules="plantotalRules"
      >
        <mu-text-field
          id="total"
          color="pink200"
          type="number"
          v-model="validateForm.plantotal"
          prop="plantotal"
        ></mu-text-field>
      </mu-form-item>
      <mu-form-item label="单位" help-text="数字，如页、课、小时等，不要超过5个字" prop="planper" :rules="planperRules">
        <mu-text-field id="unit" color="pink200" v-model="validateForm.planper" prop="planper"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="周重复天数" help-text="请选择每周安排几天时间" prop="plantype">
        <mu-flex id="type" class="select-control-row" v-for="(type,index) in types " :key="index">
          <mu-radio
            color="pink200"
            :value="type.value"
            v-model="validateForm.plantype"
            :label="type.name"
            class="radios"
          ></mu-radio>
        </mu-flex>
      </mu-form-item>
      <mu-form-item label="开始时间" prop="planstart" :rules="timeRules">
        <!-- <mu-text-field color="pink200" v-model="validateForm.planname" ></mu-text-field> -->
        <mu-date-input
          id="start"
          color="pink200"
          v-model="validateForm.planstart"
          full-width
          prop="planstart"
          no-display
          container="bottomSheet"
        ></mu-date-input>
      </mu-form-item>
      <mu-form-item label="结束时间" prop="planend" :rules="timeRules">
        <!-- <mu-text-field color="pink200" v-model="validateForm.planname" ></mu-text-field> -->
        <mu-date-input
          id="start"
          color="pink200"
          v-model="validateForm.planend"
          full-width
          prop="planend"
          no-display
          container="bottomSheet"
        ></mu-date-input>
      </mu-form-item>
      <mu-form-item label="所属项目" prop="projects">
        <mu-flex id="project" class="select-control-row" v-for="(item,index) in list " :key="index">
          <mu-radio
            color="pink200"
            :value="item.id"
            v-model="validateForm.project"
            :label="item.name"
            class="radios"
          ></mu-radio>
          <span class="radios" style="font-size:15px">{{item.created_at}}至{{item.end_str}}</span>
        </mu-flex>
      </mu-form-item>
      <mu-form-item label="所属项目" prop="projects">
        <div>2333333333</div>
      </mu-form-item>
      <mu-form-item>
        <mu-button color="pink200" @click="openAlertDialog">下一步</mu-button>
        <mu-button :to="{name:'project'}">返回</mu-button>
      </mu-form-item>
      <mu-dialog
        title="Use Google's location service?"
        width="600"
        max-width="80%"
        :esc-press-close="false"
        :overlay-close="false"
        :open.sync="openAlert"
      >Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
        <mu-button slot="actions" flat color="primary" @click="submit">Disagree</mu-button>
        <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">Agree</mu-button>
      </mu-dialog>
    </mu-form>
  </div>
</template>
<script>
export default {
  props: ["list"],
  mounted: function() {
    this.$emit("getMessage", this.show);
  },
  created() {
    $("body,html").animate({ scrollTop: 0 }, 100);
  },
  data() {
    return {
      show: "project",
      openAlert: false,
      types: [
        { name: "6天（月曜日-土曜日）", value: 6 },
        { name: "5天（月曜日-金曜日）", value: 5 },
        { name: "1天（土曜日限定）", value: 1 }
      ],
      projects: [{ id: 1, name: "角虫养成" }, { id: 2, name: "大角虫养成" }],
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
      planperRules: [
        { validate: val => !!val, message: "必须填写单位" },
        {
          validate: val => val.length <= 5,
          message: "你确定单位这么长的嘛？"
        }
      ],
      timeRules: [{ validate: val => !!val, message: "请选择时间" }],
      argeeRules: [{ validate: val => !!val, message: "必须同意用户协议" }],
      validateForm: {
        planname: "",
        plantotal: "",
        planper: "",
        plantype: 6,
        planstart: "",
        planend: "",
        project: 1
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(result => {
        console.log("form valid: ", result);
      });
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        planname: "",
        plantotal: "",
        planper: "",
        plantype: 6
      };
    },
    openFullscreenDialog() {
      this.openFullscreen = true;
    },
    openAlertDialog() {
      this.openAlert = true;
    },
    closeAlertDialog() {
      this.openAlert = false;
    },
    conputePer() {
      console.log("233333");
    }
  }
};
</script>
<style>
.radios {
  margin-top: 15px;
}
.newplanmain {
  margin: 0 auto;
  width: 90%;
  margin-bottom: 12%;
}
</style>
