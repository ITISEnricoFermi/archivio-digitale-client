import eventBus from '@/utils/eventBus'

export default {
  methods: {
    edit () {
      eventBus.openPopUp(this.document, 'appEditDocument', 80)
    },

    download () {
      const a = document.createElement('A')
      a.href = `/static/documents/${this.document._id}`
      a.download = this.document.name
      a.click()
    },
    view () {
      // let type = this.document.mimetype.split('/')[0]
      // if (type === 'video') {
      //   return eventBus.openPopUp(this.document, 'appVideo', 70)
      // }
      window.open(`/files/${this.document._id}`, '_blank')
    }
  }
}
