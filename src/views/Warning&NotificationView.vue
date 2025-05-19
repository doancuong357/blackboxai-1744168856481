<template>
  <div class="warning-view">
    <h1 class="main-title">📢 Notifications & Alerts</h1>

    <!-- Tabs -->
    <div class="tabs">
      <button
        :class="{ active: currentTab === 'anniversary' }"
        @click="currentTab = 'anniversary'"
      >
        🎉 Work Anniversaries
      </button>
      <button
        :class="{ active: currentTab === 'leave' }"
        @click="currentTab = 'leave'"
      >
        🌴 Excessive Leave
      </button>
      <button
        :class="{ active: currentTab === 'salary' }"
        @click="currentTab = 'salary'"
      >
        💰 Salary Discrepancies
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <div v-if="currentTab === 'anniversary'">
        <h2>Upcoming Work Anniversaries:</h2>
        <ul v-if="upcomingAnniversaries.length">
          <li v-for="employee in upcomingAnniversaries" :key="employee.EmployeeID">
            <strong>{{ employee.FullName }}</strong> sẽ kỷ niệm 
            <span class="highlight">{{ employee.YearsOfService }} năm</span> làm việc vào ngày 
            <span class="highlight">{{ employee.HireDate }}</span>.
          </li>
        </ul>
        <p v-else>Không có nhân viên nào sắp đến ngày kỷ niệm.</p>
      </div>

      <div v-if="currentTab === 'leave'">
        <h2>Excessive Leave (Month {{ currentMonth }}):</h2>
        <ul v-if="excessiveLeaveRequests.length">
          <li v-for="employee in excessiveLeaveRequests" :key="employee.EmployeeID">
            <strong>{{ employee.FullName }}</strong> đã sử dụng 
            <span class="highlight">{{ employee.TotalLeaveDays }}</span> ngày nghỉ trong tháng.
          </li>
        </ul>
        <p v-else>Không có cảnh báo về ngày nghỉ.</p>
      </div>

      <div v-if="currentTab === 'salary'">
        <h2>Salary Discrepancies:</h2>
        <ul v-if="salaryDiscrepancies.length">
          <li v-for="employee in salaryDiscrepancies" :key="employee.EmployeeID">
            <strong>{{ employee.FullName }}</strong> có sự thay đổi lương giữa hai kỳ:
            <br />
            <span class="label">Tháng trước:</span> {{ employee.PreviousSalary }} $
            <br />
            <span class="label">Tháng này:</span> {{ employee.CurrentSalary }} $
            <br />
            <span class="label">Chênh lệch:</span> <span class="highlight">{{ employee.DifferencePercent }}%</span>
          </li>
        </ul>
        <p v-else>Không có cảnh báo về lương.</p>
      </div>
    </div>

    <!-- Always-visible Send Email Button -->
    <div class="send-email-container">
      <button @click="sendSalaryEmails">📤 Send Salary Emails</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentTab: 'anniversary',
      upcomingAnniversaries: [],
      excessiveLeaveRequests: [],
      salaryDiscrepancies: [],
      currentMonth: '',
    };
  },
  methods: {
    sendSalaryEmails() {
      axios
        .get('http://127.0.0.1:5000/send-salary-emails')
        .then((response) => {
          this.$toast?.success
            ? this.$toast.success(response.data || 'Gửi email bảng lương thành công.')
            : alert(response.data);
        })
        .catch((error) => {
          console.error('Lỗi gửi email:', error);
          this.$toast?.error
            ? this.$toast.error('Lỗi khi gửi bảng lương.')
            : alert('Lỗi gửi email.');
        });
    },
    fetchUpcomingAnniversaries() {
      axios
        .get('http://127.0.0.1:5000/employee-anniversary-warning')
        .then((response) => {
          this.upcomingAnniversaries = response.data;
        })
        .catch((error) => {
          console.error('Lỗi khi lấy dữ liệu kỷ niệm làm việc:', error);
        });
    },
    fetchExcessiveLeaveRequests() {
      axios
        .get('http://127.0.0.1:5000/leave-days-warning')
        .then((response) => {
          this.excessiveLeaveRequests = response.data.employees_with_warning;
          this.currentMonth = response.data.current_month;
        })
        .catch((error) => {
          console.error('Lỗi khi lấy dữ liệu nghỉ phép:', error);
        });
    },
    fetchSalaryDiscrepancies() {
      axios
        .get('http://127.0.0.1:5000/salary-alerts')
        .then((response) => {
          this.salaryDiscrepancies = response.data.alerts;
        })
        .catch((error) => {
          console.error('Lỗi khi lấy dữ liệu lương:', error);
        });
    },
  },
  mounted() {
    this.fetchUpcomingAnniversaries();
    this.fetchExcessiveLeaveRequests();
    this.fetchSalaryDiscrepancies();
  },
};
</script>

<style scoped>
.warning-view {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9fafb;
  padding: 40px 20px;
  border-radius: 16px;
  max-width: 1000px;
  margin: 50px auto;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
}

.main-title {
  font-size: 2.5rem;
  text-align: center;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 30px;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.tabs button {
  background: #e5e7eb;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tabs button.active {
  background-color: #2563eb;
  color: white;
  transform: scale(1.05);
}

.tabs button:hover {
  background-color: #cbd5e1;
}

.tab-content {
  background-color: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

h2 {
  font-size: 1.5rem;
  color: #1e40af;
  margin-bottom: 15px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 15px 20px;
  background: #f1f5f9;
  border-radius: 10px;
  margin-bottom: 12px;
  border-left: 4px solid #2563eb;
  transition: transform 0.2s;
}

li:hover {
  transform: translateY(-2px);
}

.label {
  font-weight: 500;
  color: #4b5563;
}

.highlight {
  color: #2563eb;
  font-weight: 600;
}

.send-email-container {
  text-align: center;
  margin-top: 20px;
}

.send-email-container button {
  background-color: #10b981;
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 12px rgba(16, 185, 129, 0.3);
}

.send-email-container button:hover {
  background-color: #059669;
  transform: scale(1.03);
}

@media (max-width: 768px) {
  .tabs {
    flex-direction: column;
    align-items: center;
  }

  .tabs button {
    width: 90%;
  }
}
</style>
