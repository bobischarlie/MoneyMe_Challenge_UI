import QuoteBreakdown from '../QuoteBreakdown/QuoteBreakdown.vue'
import axios from 'axios'

export default {
  data() {
    return {
      payment: null,
      interestRate: '',
      monthlyBreakdown: [],
      totalAmountToPay: '',
      totalInterest: 0,
      errors: [],
      establishmentFee: 300
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
      const establishmentFeeToAdd = this.establishmentFee / this.Term

      this.payment = this.PMT(monthlyRate, numberOfPayments, presentValue) + establishmentFeeToAdd
      this.setMonthlyBreakdownItems()
      this.totalInterest = this.totalAmountToPay - this.AmountRequired - this.establishmentFee
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
    async validated() {
      this.errors = []
      if (this.applicantAge < 18) {
        this.errors.push('Applicant must be at least 18 years old.')
      }
      await this.isEmailOrNumberBlacklisted()
      return this.errors.length == 0
    },
    async isEmailOrNumberBlacklisted() {
      try {
        const mobileNo = encodeURIComponent(this.MobileNo)
        const emailDomain = encodeURIComponent(this.Email.split('@')[1])
        const uri = `${this.$config.moneyMeApiURL}/blacklist/GetBlacklisted?mobileNo=${mobileNo}&emailDomain=${emailDomain}`
        const encodedURI = encodeURI(uri)
        const response = await axios.get(encodedURI)
        const data = response.data

        if (data.data != null) {
          data.data.forEach((element) => {
            const val = element.value
            if (element.type == 1) {
              this.errors.push(`The email domain (${val}) is blacklisted, please choose another.`)
            } else {
              this.errors.push(
                `Mobile No ${val} is blacklisted, please choose another mobile number.`
              )
            }
          })
        }
      } catch (error) {
        console.error('Error fetching blacklist data:', error)
      }
    },
    async handleApplyNow() {
      if (await this.validated()) {
        try {
          const id = this.$route.params.id
          const response = await axios.put(`${this.$config.moneyMeApiURL}/quote/${id}`, {
            FirstName: this.FirstName,
            LastName: this.LastName,
            MobileNo: this.MobileNo,
            Email: this.Email,
            Title: this.Title,
            DateOfBirth: this.DateOfBirth,
            AmountRequired: this.AmountRequired,
            Repaymentamount: this.totalAmountToPay,
            EstablishmentFee: this.establishmentFee,
            TotalInterest: this.totalInterest,
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
        this.errors.forEach((item) => {
          console.error(item)
        })
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
    fieldsWithValidation() {
      return [this.MobileNo, this.Email]
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
    },
    fieldsWithValidation: {
      handler() {
        this.errors = []
      },
      deep: true
    }
  },
  components: {
    QuoteBreakdown
  }
}
