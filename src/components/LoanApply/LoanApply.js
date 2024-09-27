import QuoteBreakdown from '../QuoteBreakdown/QuoteBreakdown.vue'
import axios from 'axios'

export default {
  data() {
    return {
      payment: null,
      interestRate: '',
      monthlyBreakdown: [],
      totalAmountToPay: '',
      blacklistMessage: '',
      totalInterest: ''
    }
  },
  props: {
    Title: String,
    FirstName: String,
    LastName: String,
    MobileNo: String,
    Email: String,
    DateOfBirth: String,
    AmountRequired: { type: Number, default: 0 },
    Term: { type: Number, default: 1 },
    SelectedProduct: String
  },
  methods: {
    calculatePayment() {
      if (this.SelectedProduct === 'Product A') {
        this.interestRate = 0
      } else {
        this.interestRate = 8
      }
      const monthlyRate = this.interestRate / 100 / 12
      const numberOfPayments = this.Term
      const presentValue = this.AmountRequired

      this.payment = this.PMT(monthlyRate, numberOfPayments, presentValue)
      this.setMonthlyBreakdownItems()
    },
    PMT(rate, nper, pv) {
      if (rate === 0) return pv / nper
      return (rate * pv) / (1 - Math.pow(1 + rate, -nper))
    },
    setMonthlyBreakdownItems() {
      const breakdownList = []
      for (let i = 0; i < this.Term; i++) {
        if (this.SelectedProduct === 'Product B') {
          if (i < 2) {
            breakdownList.push({
              Amount: this.AmountRequired / this.Term,
              Remarks: '0% interest on first 2 months.'
            })
            continue
          }
        }
        breakdownList.push({ Amount: this.payment, Remarks: '' })
      }
      this.totalAmountToPay = breakdownList.reduce((sum, item) => sum + item.Amount, 0).toFixed(2)
      this.monthlyBreakdown = breakdownList
    },
    validated() {
      const errors = []
      if (this.applicantAge < 18) {
        errors.push('Applicant must be at least 18 years old.')
      }
      if (!this.isEmailOrNumberBlacklisted()) {
        errors.push(this.blacklistMessage)
      }
      return errors.length == 0
    },
    async isEmailOrNumberBlacklisted() {
      const mobileNo = encodeURIComponent(this.MobileNo)
      const emailDomain = encodeURIComponent(this.Email.split('@')[1])
      const uri = `https://localhost:7057/blacklist/GetBlacklisted?mobileNo=${mobileNo}&emailDomain=${emailDomain}`
      const encodedURI = encodeURI(uri)
      const response = await axios.get(encodedURI)
      const data = response.data
      this.blacklistMessage = data.message
      return data.data == null
    },
    async handleApplyNow() {
      if (this.validated()) {
        try {
          const id = this.$route.params.id
          const response = await axios.put(`https://localhost:7057/Quote/${id}`, {
            FirstName: this.FirstName,
            LastName: this.LastName,
            MobileNo: this.MobileNo,
            Email: this.Email,
            Title: this.Title,
            DateOfBirth: this.DateOfBirth,
            AmountRequired: this.AmountRequired,
            Repaymentamount: this.totalAmountToPay,
            EstablishmentFee: 300,
            TotalInterest: this.totalAmountToPay - this.AmountRequired,
            Term: this.Term,
            Product: this.SelectedProduct,
            Status: 1
          })
          console.log('Application submitted successfully:', response.data)
          this.$router.push({ name: 'SuccessPage' }).then(() => {
            window.location.reload()
          })
        } catch (error) {
          console.error('Error submitting application:', error)
        }
      } else {
        console.error('Validation failed')
      }
    }
  },
  mounted() {
    this.calculatePayment()
  },
  computed: {
    calculatePaymentIfChanged() {
      return [this.AmountRequired, this.Term, this.interestRate, this.SelectedProduct]
    },
    firstTwoMonthsForProductB() {
      if (this.SelectedProduct === 'Product B') {
        return this.AmountRequired / this.Term
      }
      return null
    },
    applicantAge() {
      const today = new Date()
      const birthDate = new Date(this.DateOfBirth)
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDifference = today.getMonth() - birthDate.getMonth()
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    },
    fullName() {
      return `${this.FirstName} ${this.LastName}`
    }
  },
  watch: {
    calculatePaymentIfChanged: {
      handler() {
        this.calculatePayment()
      },
      deep: true
    }
  },
  components: {
    QuoteBreakdown
  }
}
