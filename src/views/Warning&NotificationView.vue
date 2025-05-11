<template>
  <div class="warning-view">
    <h1>Warnings & Notifications</h1>

    <!-- Work Anniversary Warnings -->
    <div v-if="upcomingAnniversaries.length">
      <h2>Work Anniversary Warnings:</h2>
      <ul>
        <li v-for="employee in upcomingAnniversaries" :key="employee.EmployeeID">
          <strong>{{ employee.FullName }}</strong> sẽ kỷ niệm {{ employee.DaysUntilAnniversary }} ngày làm việc vào ngày {{ employee.HireDate }}.
        </li>
      </ul>
    </div>

    <!-- Excessive Leave Warnings -->
    <div v-if="excessiveLeaveRequests.length">
      <h2>Excessive Leave Warnings (Month {{ currentMonth }}):</h2>
      <ul>
        <li v-for="employee in excessiveLeaveRequests" :key="employee.EmployeeID">
          <strong>{{ employee.FullName }}</strong> đã sử dụng quá nhiều ngày nghỉ ({{ employee.TotalLeaveDays }} days).
        </li>
      </ul>
    </div>

    <!-- Salary Discrepancy Warnings -->
    <div v-if="salaryDiscrepancies.length">
      <h2>Salary Discrepancy Warnings:</h2>
      <ul>
        <li v-for="employee in salaryDiscrepancies" :key="employee.EmployeeID">
          <strong>{{ employee.FullName }}</strong> có sự thay đổi lương lớn giữa hai kỳ:
          <br>
          <strong>Tháng Trước:</strong> {{ employee.PreviousSalary }} VND
          <br>
          <strong>Tháng hiện tại:</strong> {{ employee.CurrentSalary }} VND
          <br>
          <strong>Chênh Lệch:</strong> {{ employee.DifferencePercent }} %
        </li>
      </ul>
    </div>

    <!-- Send Salary Notifications Button -->
    <div>
      <button @click="sendSalaryEmails">Send Salary Notifications</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      upcomingAnniversaries: [],
      excessiveLeaveRequests: [],
      salaryDiscrepancies: [],
      currentMonth: '', // Store the current month
    };
  },
  methods: {
    // Send salary notifications via email (simulated)
    sendSalaryEmails() {
      axios.get('http://127.0.0.1:5000/send-salary-emails')
        .then(response => {
          this.$toast.success('Salary notifications have been sent to all employees.');
        })
        .catch(error => {
          this.$toast.error('There was an error sending salary notifications.');
        });
    },

    // Fetch data for upcoming work anniversaries
    fetchUpcomingAnniversaries() {
      axios.get('http://127.0.0.1:5000/employee-anniversary-warning')
        .then(response => {
          this.upcomingAnniversaries = response.data;
        })
        .catch(error => {
          console.error('Error fetching work anniversary data:', error);
        });
    },

    // Fetch data for excessive leave requests
    fetchExcessiveLeaveRequests() {
      axios.get('http://127.0.0.1:5000/leave-days-warning')
        .then(response => {
          this.excessiveLeaveRequests = response.data.employees_with_warning;
          this.currentMonth = response.data.current_month; // Store the current month
        })
        .catch(error => {
          console.error('Error fetching leave request data:', error);
        });
    },

    // Fetch data for salary discrepancies
    fetchSalaryDiscrepancies() {
      axios.get('http://127.0.0.1:5000/salary-alerts')
        .then(response => {
          this.salaryDiscrepancies = response.data.alerts;
        })
        .catch(error => {
          console.error('Error fetching salary discrepancy data:', error);
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
/* Main container */
.warning-view {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f3f4f6;
  padding: 30px 20px;
  border-radius: 12px;
  max-width: 1200px;
  margin: 40px auto;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

/* Heading styles */
h1 {
  font-size: 2.5rem;
  text-align: center;
  color: #333;
  font-weight: 700;
  margin-bottom: 20px;
}

/* Section Title */
h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 12px;
  font-weight: 600;
}

/* Unordered list styles */
ul {
  list-style-type: none;
  padding: 0;
}

/* List item styling */
li {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  margin: 15px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
}

li:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Bold text within list items */
strong {
  color: #2d87f0;
  font-weight: 600;
}

/* Button Styling */
button {
  background-color: #2d87f0;
  color: white;
  padding: 14px 24px;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: 100%;
  max-width: 200px;
  display: block;
  margin: 40px auto 0;
}

button:hover {
  background-color: #1a6cc8;
}

button:focus {
  outline: none;
}

button:active {
  transform: scale(0.98);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  li {
    padding: 15px;
    font-size: 0.95rem;
  }

  button {
    width: 90%;
    font-size: 1rem;
  }
}

/* Larger screen styling */
@media (min-width: 1024px) {
  .warning-view {
    padding: 40px;
  }

  button {
    font-size: 1.2rem;
  }
}

</style>


