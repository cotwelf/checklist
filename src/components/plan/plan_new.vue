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
      <mu-form-item label="所属项目" class="project" prop="projects">
        <mu-flex class="select-control-row" v-for="(item,index) in list " :key="index">
          <mu-radio
            :index="index"
            color="pink200"
            :value="item.id"
            v-model="validateForm.project"
            :label="item.name"
            class="radios"
          ></mu-radio>
          <span class="radios" style="font-size:15px">{{item.created_at}}至{{item.end_str}}</span>
        </mu-flex>
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
      <mu-form-item label="周重复天数" help-text="请选择每周安排几天时间" prop="plantype">
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
      <mu-form-item>
        <mu-button color="pink200" @click="submit">下一步</mu-button>
        <mu-button :to="{name:'home'}">返回</mu-button>
      </mu-form-item>
      <mu-dialog
        title="Use Google's location service?"
        width="600"
        max-width="80%"
        :esc-press-close="false"
        :overlay-close="false"
        :open.sync="openAlert"
      >
        {{per}}
        <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">返回修改</mu-button>
        <mu-button slot="actions" flat color="primary" @click="submit">领养计划</mu-button>
      </mu-dialog>
    </mu-form>
  </div>
</template>
<script>
export default {
  mounted: function() {
    this.$emit("getMessage", this.show);
  },
  created() {
    // TODO
    // console.log($(".project").length);
    // for (var i = 0; i < $(".project").length; i++) {
    //   if ($(".project").children[i].checked) {
    //     var p_index = $(".project").children[i].attr("index");
    //     console.log(p_index);
    //   }
    // }
    $("body,html").animate({ scrollTop: 0 }, 100);
    this.$axios
      .get("/api/get_project_list", { params: { user_id: 1 } })
      .then(res => {
        this.list = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      per: "",
      list: [],
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
      planunitRules: [
        { validate: val => !!val, message: "必须填写单位" },
        {
          validate: val => val.length <= 5,
          message: "哇~单位这么长的嘛？"
        }
      ],
      validateForm: {
        planname: "",
        plantotal: "",
        planunit: "",
        plantype: 6,
        project: 1
      }
    };
  },
  methods: {
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
      var time1 = Date.parse(new Date(date));
      var time2 = Date.parse(new Date());
      var remain = Math.abs(parseInt((time2 - time1) / 1000 / 3600 / 24));
      return remain ? remain : 0;
    },
    submit() {
      this.$refs.form.validate().then(result => {
        this.validateForm.plantotal;
        this.openAlertDialog();
        console.log("form valid: ", result);
      });
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
