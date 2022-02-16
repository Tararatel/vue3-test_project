<template>
  <div style="text-align: center; margin: 2rem 0">
    <h1 class="title">Employees List</h1>
  </div>

  <button @click="isShow = !isShow" v-show="!isShow" class="btn btnPrimary">
    Добавить
  </button>
  <div v-show="isShow" class="note-form__wrapper">
    <form @submit.prevent="onSubmit" class="note-form">
      <input
        v-model="createEmployee.employee_name"
        placeholder="Type the Name"
      />
      <input
        v-model="createEmployee.employee_salary"
        placeholder="Type the Salary"
      />
      <input v-model="createEmployee.employee_age" placeholder="Type the Age" />
      <button class="btn btnPrimary" type="submit" v-show="!isShowBtn">
        Submit
      </button>
      <button
        class="btn btnPrimary"
        type="submit"
        v-show="isShowBtn"
        @click.prevent="onUpdate(currentId)"
      >
        Edit employee
      </button>
    </form>
  </div>

  <div v-if="loading">
    <p>Loading page...</p>
  </div>
  <div v-else>
    <table>
      <thead>
        <tr>
          <td></td>
          <td></td>
          <td>name</td>
          <td>salary</td>
          <td>age</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, id) in employees" :key="employee.id">
          <td class="tdRemove" @click="onRemove(id)">&#10006;</td>
          <td class="tdEdit" @dblclick="onEdit(id)">&#9998;</td>
          <td>{{ employee.employee_name }}</td>
          <td>{{ employee.employee_salary }}</td>
          <td>{{ employee.employee_age }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import DataRequests from '../services/DataRequests';

export default defineComponent({
  data() {
    return {
      isShow: false,
      isShowBtn: false,
      createEmployee: {},
      currentId: null,
    };
  },
  setup() {
    const loading = ref(true);
    const employees = ref({});

    onMounted(() => getPeople());

    const getPeople = () => {
      DataRequests.getEmployee()
        .then((res) => {
          employees.value = res.data.data;
          loading.value = false;
        })
        .catch((error) => console.log(error));
    };
    return { loading, employees };
  },

  methods: {
    onRemove(id) {
      const yourResult = confirm('Are you sure?');
      if (yourResult) {
        DataRequests.delEmployee(id)
          .then((res) => console.log('Success deleted'))
          .then(() => this.employees.splice(id, 1))
          .catch((error) => console.log(error));
      }
    },
    onSubmit() {
      DataRequests.addEmployee(this.createEmployee)
        .then((res) => {
          this.createEmployee = res.data.data;
          this.employees.push(this.createEmployee);
          console.log('New employee has been added!');
        })
        .then(() => {
          this.createEmployee = {};
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onEdit(id) {
      this.currentId = id;
      DataRequests.getSpecificEmployee(id)
        .then((res) => {
          this.isShowBtn = !this.isShowBtn;
          this.isShow = !this.isShow;
          this.createEmployee = res.data.data;
        })
        .catch((error) => console.log(error));
    },
    onUpdate(currentId) {
      DataRequests.updEmployee(currentId, this.createEmployee)
        .then((res) => {
          console.log('Current employee has been updated!');
          this.employees.splice(currentId, 1, res.data.data);
        })
        .then(() => {
          this.createEmployee = {};
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>
