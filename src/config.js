import pkg from '../package.json';


export default {
    // API_URL:'https://hoopitapp.herokuapp.com/api',
    API_URL: 'http://localhost:5000/api',
    development: {
        endpoint: pkg.proxy
      },
      production: {
        endpoint: window.location.hostname
      }

}