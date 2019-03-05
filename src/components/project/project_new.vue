<template>
  <div>
    <mu-form ref="form" :model="validateForm" class="projectform">
      <mu-form-item
        label="项目名称"
        help-text="汉字、字母或字符，不要超过10个字"
        prop="projectname"
        :rules="projectnameRules"
      >
        <mu-text-field
          id="name"
          color="pink200"
          v-model="validateForm.projectname"
          prop="projectname"
        ></mu-text-field>
      </mu-form-item>
      <mu-form-item label="开始时间" prop="projectstart" :rules="startRules">
        <mu-date-input
          id="start"
          color="pink200"
          v-model="validateForm.projectstart"
          full-width
          prop="projectstart"
          no-display
          container="bottomSheet"
        ></mu-date-input>
      </mu-form-item>
      <mu-form-item label="结束时间" prop="projectend" :rules="endRules">
        <mu-date-input
          id="end"
          color="pink200"
          v-model="validateForm.projectend"
          full-width
          prop="projectend"
          no-display
          container="bottomSheet"
        ></mu-date-input>
      </mu-form-item>
      <mu-form-item style="margin:0 auto">
        <mu-button color="pink200" @click="submit" style="width:45%">创建</mu-button>
        <mu-button :to="{name:'project'}" style="width:45%">返回</mu-button>
      </mu-form-item>
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
      projectnameRules: [
        { validate: val => !!val, message: "必须填写项目名称" },
        {
          validate: val => val.length < 11,
          message: "项目名称太长啦臣妾记不住啊"
        }
      ],
      startRules: [{ validate: val => !!val, message: "请选择时间" }],
      endRules: [
        { validate: val => !!val, message: "请选择时间" },
        {
          validate: val =>
            $("#start").val() < $("#end").val() ||
            $("#start").val() == $("#end").val(),
          message: "结束时间不要小于开始时间哦~"
        }
      ],
      validateForm: {
        projectname: "",
        projectstart: "",
        projectend: ""
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(result => {
        console.log($("#start").val() < $("#end").val());
        console.log();
        if (result) {
          this.$axios
            .post("api/create_project", {
              name: this.validateForm.projectname,
              start: this.validateForm.projectstart,
              end: this.validateForm.projectend,
              user_id: 1
            })
            .then(res => {
              this.$router.push({ name: "project" });
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    openAlertDialog() {
      this.openAlert = true;
    },
    closeAlertDialog() {
      this.openAlert = false;
    }
  }
};
</script>
<style>
.radios {
  margin-top: 15px;
}
.projectform {
  margin: 0 auto;
  width: 90%;
  margin-bottom: 12%;
}
</style>
