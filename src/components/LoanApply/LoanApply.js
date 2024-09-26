export default {
  data() {
    return {
      payment: null,
      interestRate: ''
    }
  },
  props: {
    FullName: String,
    MobileNo: String,
    Email: String,
    DateOfBirth: String,
    AmountRequired: '',
    Term: '',
    SelectedProduct: ''
  },
  methods: {
    calculatePayment() {
      if (this.SelectedProduct == 'Product A') {
        this.interestRate = 0
      } else if (this.SelectedProduct == 'Product B') {
        this.interestRate = 10
      } else {
        this.interestRate = 8
      }
      const monthlyRate = this.interestRate / 100 / 12
      const numberOfPayments = this.Term
      const presentValue = this.AmountRequired

      this.payment = this.PMT(monthlyRate, numberOfPayments, presentValue)
    },
    PMT(rate, nper, pv) {
      if (rate === 0) return pv / nper
      return (rate * pv) / (1 - Math.pow(1 + rate, -nper))
    }
  },
  mounted() {
    this.calculatePayment()
  },
  computed: {
    calculatePaymentIfChanged() {
      return [this.AmountRequired, this.Term, this.InterestRate, this.SelectedProduct]
    }
  },
  watch: {
    calculatePaymentIfChanged: 'calculatePayment'
  }
}
