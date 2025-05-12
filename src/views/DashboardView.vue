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
      selectedMonth: new Date().getMonth() + 1, // mặc định chọn tháng hiện tại
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
        this.filteredEmployees = this.employees; // Bắt đầu với tất cả nhân viên
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
      if (this.searchQuery.trim() === '') {
        this.filteredEmployees = this.employees;
      } else {
        this.filteredEmployees = this.employees.filter(employee =>
          employee.FullName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    async filterPayroll() {
      if (this.selectedMonth === undefined || this.selectedMonth === null) return;

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
/* Chỉnh sửa giao diện trang dashboard */
.dashboard-container {
  font-family: 'Roboto', sans-serif;
  background-color: #f7f9fb;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #1d2934;
  margin: 0;
  letter-spacing: 2px;
}

.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.search-input {
  padding: 12px 20px;
  width: 300px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1.1rem;
  transition: border-color 0.3s ease-in-out;
}

.search-input:focus {
  outline: none;
  border-color: #2a91d5;
}

.employee-table-container, .payroll-table-container {
  margin-top: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  padding: 25px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th, table td {
  padding: 15px;
  text-align: left;
  font-size: 1rem;
  border: 1px solid #e0e0e0;
  transition: background-color 0.3s ease-in-out;
}

table th {
  background-color: #3175c2;
  color: white;
  font-weight: 600;
}

table tr {
  transition: background-color 0.3s ease-in-out;
}

table tr:hover {
  background-color: #f0f4f7;
}

table td {
  color: #222424;
}

.error-message {
  text-align: center;
  color: #d23e2e;
  font-size: 1.2rem;
  margin-top: 40px;
}

.filter-month {
  margin-top: 40px;
  text-align: center;
}

.month-select {
  padding: 12px 20px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.3s ease-in-out;
}

.month-select:focus {
  outline: none;
  border-color: #2b8ac9;
}

h2 {
  display: flex;
  align-items: center;
  font-size: 2rem;
  color: #34495e;
  margin-bottom: 20px;
  font-weight: 600;
}

h2 i {
  margin-right: 10px;
  color: #3498db;
}

.status-active {
  color: #2ecc71;
  font-weight: 600;
}

.status-inactive {
  color: #e74c3c;
  font-weight: 600;
}

.status-active i, .status-inactive i {
  font-size: 1.1rem;
  margin-right: 5px;
}

.status-active:hover, .status-inactive:hover {
  opacity: 0.8;
  cursor: pointer;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .search-input {
    width: 250px;
  }

  table th, table td {
    padding: 12px;
  }

  h1 {
    font-size: 2.2rem;
  }
}

@media (max-width: 480px) {
  .search-input {
    width: 200px;
  }

  table th, table td {
    padding: 10px;
  }

  h2 {
    font-size: 1.6rem;
  }
}
</style>

