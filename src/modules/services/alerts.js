export default {
  alerts: [
    ['Hard work beats talent when talent doesn’t work hard.- Tim Notke', 'info']
  ],
  random () {
    const r = Math.floor(Math.random() * this.alerts.length)
    return {
      message: this.alerts[r][0],
      variant: this.alerts[r][1]
    }
  }
}
