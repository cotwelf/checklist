<template>
  <div>
    <mu-form ref="form" :model="validateForm">
      <mu-form-item label="计划名称" help-text="汉字、字母或字符" prop="planname" :rules="plannameRules">
        <mu-text-field v-model="validateForm.planname" prop="planname"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="总目标" help-text="数字" prop="plantotal" :rules="plantotalRules">
        <mu-text-field v-model="validateForm.plantotal" prop="plantotal"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="密码" prop="password" :rules="passwordRules">
        <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="isAgree" :rules="argeeRules">
        <mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
      </mu-form-item>
      <mu-form-item>
        <mu-button color="primary" @click="submit">提交</mu-button>
        <mu-button @click="clear">重置</mu-button>
      </mu-form-item>
    </mu-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      plannameRules: [
        { validate: val => !!val, message: "必须填写计划名称" },
        { validate: val => val.length >= 10, message: "计划名称不能超过10个字" }
      ],
      plantotalRules: [
        { validate: val => !!val, message: "必须填写总目标" },
        { validate: val => val.length >= 10, message: "计划名称不能超过10个字" }
      ],
      passwordRules: [
        // { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => {
            console.log(this);
          }
        },
        {
          validate: val => val.length >= 3 && val.length <= 10,
          message: "密码长度大于3小于10"
        }
      ],
      argeeRules: [{ validate: val => !!val, message: "必须同意用户协议" }],
      validateForm: {
        username: "",
        password: "",
        isAgree: false
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
        username: "",
        password: "",
        isAgree: false
      };
    }
  }
};
</script>
<style>
.mu-demo-form {
  width: 90%;
  max-width: 460px;
  height: 90%;
}
</style>
