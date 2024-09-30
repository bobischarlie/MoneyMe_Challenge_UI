import axios from 'axios'

let config = null

export const loadConfig = async () => {
  if (!config) {
    const response = await axios.get('/config.json')
    config = response.data
  }
  return config
}
