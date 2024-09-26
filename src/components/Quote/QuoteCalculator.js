import axios from 'axios'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.vue'
import LoanApply from '../LoanApply/LoanApply.vue'

export default {
  data() {
    return {
      rngAmountProperties: {
        min: 2100,
        max: 15000,
        rngAmountRequiredPosition: 'calc(0% + (10px))'
      },
      rngTermProperties: {
        min: 1,
        max: 24,
        rngTermPosition: 'calc(0% + (10px))'
      },
      term: '',
      amountRequired: '',
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      email: '',
      mobileNo: '',
      startDate: '',
      isLoading: true,
      selectedProduct: 'Select'
    }
  },
  components: { LoadingSpinner, LoanApply },
  methods: {
    async fetchData() {
      const id = this.$route.params.id
      if (!id) {
        this.clearData()
      } else {
        try {
          const response = await axios.get(`https://moneyme.local/quote/${id}`)
          const data = response.data
          this.amountRequired = data.amountRequired
          this.term = data.term
          this.firstName = data.firstName
          this.lastName = data.lastName
          this.dateOfBirth = data.dateOfBirth
          this.email = data.email
          this.mobileNo = data.mobileNo

          // Save data to local storage
          localStorage.setItem('quoteData', JSON.stringify(data))
        } finally {
          this.isLoading = false
        }
      }
    },
    loadData() {
      const data = JSON.parse(localStorage.getItem('quoteData'))
      if (data) {
        this.amountRequired = data.amountRequired
        this.term = data.term
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.dateOfBirth = data.dateOfBirth
        this.email = data.email
        this.mobileNo = data.mobileNo
      }
    },
    clearData() {
      this.amountRequired = '2100'
      this.term = '1'
      this.firstName = ''
      this.lastName = ''
      this.dateOfBirth = ''
      this.email = ''
      this.mobileNo = ''
      localStorage.removeItem('quoteData')
    },
    setValue() {
      const newValue = Number(
        ((this.amountRequired - this.rngAmountProperties.min) * 100) /
          (this.rngAmountProperties.max - this.rngAmountProperties.min)
      )
      const newPosition = 10 - newValue * 0.2
      this.rngAmountProperties.rngAmountRequiredPosition = `calc(${newValue}% + (${newPosition}px))`
    },
    setTermPos() {
      const newValue = Number(
        ((this.term - this.rngTermProperties.min) * 100) /
          (this.rngTermProperties.max - this.rngTermProperties.min)
      )
      const newPosition = 10 - newValue * 0.2
      this.rngTermProperties.rngTermPosition = `calc(${newValue}% + (${newPosition}px))`
    },
    updateRngTerm() {
      if (this.selectedProduct == 'Product B') {
        this.rngTermProperties.min = 6
        if (this.term < 6) this.term = 6
      } else {
        this.rngTermProperties.min = 1
      }
      this.setTermPos()
    }
  },
  watch: {
    amountRequired: 'setValue',
    '$route.params.id': 'fetchData',
    term: 'setTermPos',
    selectedProduct: ['updateRngTerm', 'setTermPos']
  },
  mounted() {
    this.loadData()
    this.fetchData()
    this.setValue()
    this.setTermPos()
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`
    }
  }
}
