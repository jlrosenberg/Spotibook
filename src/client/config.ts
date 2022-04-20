

const dev = {
  apiUrl: 'http://localhost:4443/api',
}


const prod = {
  apiUrl: window.location.hostname + '/api',
}
const localhosts = ['lvh.me', 'localhost']
const isDeployed  = !localhosts.includes(window.location.hostname)
export const config = isDeployed ? prod : dev;