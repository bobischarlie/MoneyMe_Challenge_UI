import axios from 'axios'

export default {
  data() {
    return {
      value: 2100,
      min: 2100,
      max: 15000,
      step: 100,
      amountRequired: '2100',
      term: 1,
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      email: '',
      mobileNo: '',
      startDate: '',
      rngAmountRequiredPosition: 'calc(0% + (10px))',
      rngTermPosition: 'calc(0% + (10px))'
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
        this.term = data.term
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
      const newValue = Number(((this.amountRequired - 2100) * 100) / (15000 - 2100))
      const newPosition = 10 - newValue * 0.2
      this.rngAmountRequiredPosition = `calc(${newValue}% + (${newPosition}px))`
    },
    setTermPos() {
      const newValue = Number(((this.term - 1) * 100) / (12 - 1))
      const newPosition = 10 - newValue * 0.2
      this.rngTermPosition = `calc(${newValue}% + (${newPosition}px))`
    }
  },
  watch: {
    amountRequired: 'setValue',
    '$route.params.id': 'fetchData',
    term: 'setTermPos'
  },
  mounted() {
    this.loadData()
    this.fetchData()
    this.setValue()
    this.setTermPos()
  }
}
