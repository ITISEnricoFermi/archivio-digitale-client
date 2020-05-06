export default {
  computed: {
    date () {
      const object = this.document || this.project || this.collection
      const timestamp = object._id.toString().substring(0, 8)
      const date = new Date(parseInt(timestamp, 16) * 1000)

      // return date.toLocaleDateString('it-IT', options)

      return new Intl.DateTimeFormat('it-IT', {
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date)
    }
  }
}
