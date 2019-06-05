import Vue from 'vue'

export default new Vue({
  methods: {
    openPopUp (entity, component, width) {
      this.$emit('openPopUp', entity, component, width)
    },
    closePopUp () {
      this.$emit('closePopUp')
    },
    uploading (progress) {
      this.$emit('uploading', progress)
    },
    notification (notification) {
      this.$emit('notification', notification)
    },
    push (message, body) {
      if (!('Notification' in window)) { // Verifica se il browser supporta le notifiche
        alert('This browser does not support desktop notification')
      } else if (Notification.permission === 'granted') { // Verifica che ci siano i permessi per le notifiche
        /* eslint no-unused-vars: "off" */
        let notification = new Notification(message, {
          body,
          icon: '/img/icons/android-chrome-512x512.png'
        })
      } else if (Notification.permission !== 'denied') { // Altrimenti chiede il permesso
        Notification.requestPermission((permission) => {
          if (permission === 'granted') { // Se l'utente accetta
            /* eslint no-unused-vars: "off" */
            let notification = new Notification(message, {
              body,
              icon: '/img/icons/android-chrome-512x512.png'
            })
          }
        })
      }
    }
  }
})
