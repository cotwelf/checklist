<template>
  <div>
    <mu-form :model="form" :label-position="labelPosition" label-width="100">
      <mu-form-item prop="plan_name" label="计划名称">
        <mu-text-field v-model="form.p_name"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="plan_total" label="总目标">
        <mu-date-input v-model="form.p_start_at" type="number" actions></mu-date-input>
      </mu-form-item>
      <mu-form-item prop="plan_start_at" label="开始时间">
        <mu-date-input v-model="form.p_start_at" type="date" actions></mu-date-input>
      </mu-form-item>
      <mu-form-item prop="plan_end_at" label="结束时间">
        <mu-date-input v-model="form.p_start_at" type="date" actions></mu-date-input>
      </mu-form-item>
      <mu-form-item prop="radio" label="Radio">
        <mu-radio v-model="form.radio" value="male" label="Male"></mu-radio>
        <mu-radio v-model="form.radio" value="female" label="Female"></mu-radio>
      </mu-form-item>
      <mu-form-item prop="checkbox" label="Checkbox">
        <mu-checkbox v-model="form.checkbox" value="eat" label="Eat"></mu-checkbox>
        <mu-checkbox v-model="form.checkbox" value="sleep" label="Sleep"></mu-checkbox>
        <mu-checkbox v-model="form.checkbox" value="run" label="Run"></mu-checkbox>
        <mu-checkbox v-model="form.checkbox" value="movie" label="Movie"></mu-checkbox>
      </mu-form-item>
      <mu-form-item prop="switch" label="Switch">
        <mu-switch v-model="form.switch"></mu-switch>
      </mu-form-item>
      <mu-form-item prop="slider" label="Slider">
        <mu-slider v-model="form.slider"></mu-slider>
      </mu-form-item>
      <mu-form-item prop="textarea" label="Textarea">
        <mu-text-field multi-line :rows="3" :rows-max="6" v-model="form.textarea"></mu-text-field>
      </mu-form-item>
    </mu-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
        "Option 5",
        "Option 6",
        "Option 7",
        "Option 8",
        "Option 9",
        "Option 10"
      ],
      labelPosition: "left",
      form: {
        plan_name: "",
        plan_start_at: "",
        plan_end_at: "",
        radio: "",
        checkbox: [],
        switch: false,
        slider: 30,
        textarea: ""
      }
    };
  },
  methods: {}
};
</script>
<style>
.mu-demo-form {
  width: 90%;
  max-width: 460px;
  height: 90%;
}
</style>
