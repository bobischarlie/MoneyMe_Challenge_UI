import QuoteBreakdown from '../QuoteBreakdown/QuoteBreakdown.vue'

export default {
  data() {
    return {
      payment: null,
      interestRate: '',
      monthlyBreakdown: [],
      totalAmountToPay: ''
    }
  },
  props: {
    FullName: String,
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
