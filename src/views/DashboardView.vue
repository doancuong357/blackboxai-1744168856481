<template>
  <div class="dashboard-container">
    <!-- Tiêu đề -->
    <div class="header">
      <h1>HR Dashboard</h1>
    </div>

    <!-- Tìm kiếm nhân viên -->
    <div class="search-container">
      <input 
        v-model="searchQuery" 
        @input="searchEmployees" 
        placeholder="Tìm kiếm nhân viên..." 
        type="text" 
        class="search-input"
      />
    </div>

    <!-- Hiển thị danh sách nhân viên -->
    <div v-if="employees.length > 0" class="employee-table-container">
      <h2><i class="fas fa-users"></i> Danh sách nhân viên</h2>
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Chức vụ</th>
            <th>Phòng ban</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in filteredEmployees" :key="employee.EmployeeID">
            <td>{{ employee.FullName }}</td>
            <td>{{ employee.Email }}</td>
            <td>{{ employee.PositionName }}</td>
            <td>{{ employee.DepartmentName }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Thông báo nếu không có nhân viên -->
    <div v-else class="error-message">
      <p>Không có nhân viên nào để hiển thị.</p>
    </div>

    <!-- Lọc bảng lương theo tháng -->
    <div class="filter-month">
      <label for="month">Chọn tháng:</label>
      <select v-model="selectedMonth" @change="filterPayroll" class="month-select">
        <option v-for="month in months" :key="month.value" :value="month.value">{{ month.name }}</option>
      </select>
    </div>

    <!-- Hiển thị bảng lương -->
    <div v-if="payroll.length > 0" class="payroll-table-container">
      <h2><i class="fas fa-calendar-dollar"></i> {{ filterTitle }}</h2>
      <table>
        <thead>
          <tr>
            <th>Tên nhân viên</th>
            <th>Lương cơ bản</th>
            <th>Thưởng</th>
            <th>Phụ cấp</th>
            <th>Lương thực nhận</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="salary in filteredPayroll" :key="salary.SalaryID">
            <td>{{ salary.FullName }}</td>
            <td>{{ salary.BaseSalary | currency }}</td>
            <td>{{ salary.Bonus | currency }}</td>
            <td>{{ salary.Deductions | currency }}</td>
            <td>{{ salary.NetSalary | currency }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Thông báo nếu không có bảng lương -->
    <div v-else class="error-message">
      <p>Không có bảng lương cho tháng này.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      employees: [],
      payroll: [],
      searchQuery: '',
      selectedMonth: new Date().getMonth() + 1,
      filteredEmployees: [],
      filteredPayroll: [],
      months: [
        { value: 1, name: 'Tháng 1' },
        { value: 2, name: 'Tháng 2' },
        { value: 3, name: 'Tháng 3' },
        { value: 4, name: 'Tháng 4' },
        { value: 5, name: 'Tháng 5' },
        { value: 6, name: 'Tháng 6' },
        { value: 7, name: 'Tháng 7' },
        { value: 8, name: 'Tháng 8' },
        { value: 9, name: 'Tháng 9' },
        { value: 10, name: 'Tháng 10' },
        { value: 11, name: 'Tháng 11' },
        { value: 12, name: 'Tháng 12' }
      ],
      filterTitle: '',
      errorMessage: ''
    };
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/employees-page');
        this.employees = response.data.employees;
        this.filteredEmployees = this.employees;
      } catch (error) {
        console.error('Lỗi khi tải danh sách nhân viên:', error);
        this.errorMessage = "Không thể tải danh sách nhân viên.";
      }
    },
    async fetchPayroll() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/salaries/current-month');
        this.payroll = response.data.salaries;
        this.filterTitle = response.data.filter_title;
        this.filteredPayroll = this.payroll;
      } catch (error) {
        console.error('Lỗi khi tải bảng lương:', error);
        this.errorMessage = "Không thể tải bảng lương.";
      }
    },
    searchEmployees() {
      this.filteredEmployees = this.searchQuery.trim()
        ? this.employees.filter(e => e.FullName.toLowerCase().includes(this.searchQuery.toLowerCase()))
        : this.employees;
    },
    async filterPayroll() {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/salaries/month/${new Date().getFullYear()}/${this.selectedMonth}`);
        this.payroll = response.data.salaries;
        this.filterTitle = response.data.filter_title;
        this.filteredPayroll = this.payroll;
      } catch (error) {
        console.error('Lỗi khi lọc bảng lương:', error);
        this.errorMessage = "Không thể lọc bảng lương cho tháng này.";
      }
    }
  },
  created() {
    this.fetchEmployees();
    this.fetchPayroll();
  },
  watch: {
    selectedMonth() {
      this.filterPayroll();
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(145deg, #f0f4f8, #dfe9f3);
  padding: 40px;
  border-radius: 20px;
  color: #2e3c49;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
}

.header {
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: white;
  margin-bottom: 30px;
}

.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.search-input {
  padding: 12px 18px;
  width: 320px;
  margin-top:10px;
  border-radius: 6px;
  border: 1px solid #cbd3da;
  font-size: 1rem;
  background-color: #ffffff;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #33ede0;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
}

.employee-table-container,
.payroll-table-container {
  margin-top: 40px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(16px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  padding: 25px 30px;
}

h2 {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
}

h2 i {
  margin-right: 12px;
  color: #13cb97;
  font-size: 1.3rem;
}

label {
  font-size: larger;
  font-weight: 600;
}

.filter-month {
  margin-top: 40px;
  text-align: center;
}

.month-select {
  padding: 10px 16px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #cbd3da;
  background-color: #ffffff;
  transition: border 0.3s ease, box-shadow 0.3s ease;
}

.month-select:focus {
  outline: none;
  border-color: #7698bb;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  padding: 16px 20px;
  text-align: left;
  font-size: 0.95rem;
  border-bottom: 1px solid #e6ecf2;
}

table th {
  background-color: #13cb97;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

table tbody tr {
  transition: all 0.3s ease;
}

table tbody tr:hover {
  background-color: rgba(19, 203, 151, 0.08);
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
}

.error-message {
  text-align: center;
  color: #c0392b;
  font-size: 1.15rem;
  margin-top: 40px;
}
</style>