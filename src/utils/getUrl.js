export default (env) => {
  if (env !== 'production') {
    return process.env.VUE_APP_LOCAL || 'http://localhost:3000'
  } else {
    return process.env.VUE_APP_REMOTE || window.location.origin
  }
}
