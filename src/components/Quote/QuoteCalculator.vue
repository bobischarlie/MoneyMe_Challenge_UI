<template>
  <div class="container-fluid text-center">
    <div class="row">
      <div>
        <h2>Quote Calculator</h2>
      </div>
      <div>
        <div class="mb-3">
          <div class="float-start">
            <label for="customRange1" class="form-label">$2100</label>
          </div>
          <div class="float-end">
            <label for="customRange1" class="form-label">$15000</label>
          </div>
          <input
            type="range"
            class="form-range"
            v-model="amountRequired"
            :min="min"
            :max="max"
            :step="step"
            ref="slider"
          />
          <div class="d-flex justify-content-center">
            ${{ amountRequired }}<br />How much do you need?
          </div>
        </div>
        <div class="mb-3">
          <select class="form-select">
            <option value="Product A">Product A</option>
            <option value="Product B">Product B</option>
            <option value="Product C">Product C</option>
          </select>
        </div>
        <div class="mb-3">
          <select class="form-select">
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Ms.">Ms.</option>
          </select>
        </div>
        <div>
          <div class="form-floating mb-3">
            <input
              id="txtFirstName"
              v-model="firstName"
              class="form-control"
              type="text"
              placeholder="First Name"
            />
            <label for="txtFirstName">First Name</label>
          </div>
          <div class="form-floating mb-3">
            <input
              id="txtLastName"
              v-model="lastName"
              class="form-control"
              type="text"
              placeholder="Last Name"
            />
            <label for="txtLastName">Last Name</label>
          </div>
          <div>
            <label for="example-datepicker">Choose a date</label>
            <b-form-datepicker
              id="example-datepicker"
              v-model="dateOfBirth"
              class="mb-2"
            ></b-form-datepicker>
          </div>
          <div class="form-floating mb-3">
            <input
              id="txtEmail"
              v-model="email"
              class="form-control"
              type="text"
              placeholder="Your Email"
            />
            <label for="txtEmail">Email Address</label>
          </div>
          <div class="form-floating mb-3">
            <input
              id="txtMobileNo"
              v-model="mobileNo"
              class="form-control"
              type="text"
              placeholder="Mobile Number"
            />
            <label for="txtMobileNo">Mobile Number</label>
          </div>
          <button type="button" class="btn btn-success">Calculate Quote</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      value: 2100,
      min: 2100,
      max: 15000,
      step: 100,
      amountRequired: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      mobileNo: ''
    }
  },
  methods: {
    async fetchData() {
      const id = this.$route.params.id
      if (!id) {
        this.clearData()
      } else {
        const response = await axios.get(`https://moneyme.local/quote/${id}`)
        const data = response.data
        this.amountRequired = data.amountRequired
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.dateOfBirth = data.dateOfBirth
        this.email = data.email
        this.mobileNo = data.mobileNo

        // Save data to local storage
        localStorage.setItem('quoteData', JSON.stringify(data))
      }
    },
    loadData() {
      const data = JSON.parse(localStorage.getItem('quoteData'))
      if (data) {
        this.amountRequired = data.amountRequired
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.dateOfBirth = data.dateOfBirth
        this.email = data.email
        this.mobileNo = data.mobileNo
      }
    },
    clearData() {
      this.amountRequired = ''
      this.firstName = ''
      this.lastName = ''
      this.dateOfBirth = ''
      this.email = ''
      this.mobileNo = ''
      localStorage.removeItem('quoteData')
    }
  },
  watch: {
    '$route.params.id': 'fetchData'
  },
  mounted() {
    this.loadData()
    this.fetchData()
  }
}
</script>
<style scoped></style>
