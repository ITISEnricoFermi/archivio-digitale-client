<template>
<div class="editDocument">
  <div class="row">
    <div class="col-1-of-1">
      <input type="text" class="module-input-text" placeholder="Titolo" autocomplete="off" required v-model="documentToEdit.name">
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-1">
      <textarea class="module-input-textarea" placeholder="Descrizione" v-model="documentToEdit.description"></textarea>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-3">
      <select class="module-input-select" v-model="documentToEdit.type" required>
          <option class="module-input-option" value="" disabled>Tipo</option>
          <option class="module-input-option" v-bind:value="type._id" v-for="type in types">
            {{ type.type }}
          </option>
        </select>
    </div>
    <div class="col-1-of-3">
      <select class="module-input-select" v-model="documentToEdit.faculty">
          <option class="module-input-option" value="" disabled>Specializzazione</option>
          <option class="module-input-option" :value="faculty._id" v-for="faculty in faculties">
            {{ faculty.faculty }}
          </option>
        </select>
    </div>
    <div class="col-1-of-3">
      <select class="module-input-select" v-model="documentToEdit.subject" required>
          <option class="module-input-option" value="" disabled>Materia</option>
          <optgroup :label="faculty.faculty" v-for="faculty in faculties">
            <option class="module-input-option" :value="subject._id" v-for="subject in faculty.subjects">
              {{ subject.subject }}
            </option>
          </optgroup>
        </select>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-3">
      <select class="module-input-select" v-model="documentToEdit.class">
          <option class="module-input-option" value="0">Classe</option>
          <option class="module-input-option" :value="schoolClass._id" v-for="schoolClass in schoolClasses">
            {{ schoolClass.class }}
          </option>
        </select>
    </div>
    <div class="col-1-of-3">
      <select class="module-input-select" v-model="documentToEdit.section">
          <option class="module-input-option" value="">Sezione</option>
          <option class="module-input-option" v-for="section in sections" :value="section._id">
            {{ section.section }}
          </option>
        </select>
    </div>
    <div class="col-1-of-3">
      <select class="module-input-select" v-model="documentToEdit.visibility">
          <option class="module-input-option" value="" disabled>Visibilità</option>
          <option class="module-input-option" v-for="visibility in visibilities" :value="visibility._id">{{visibility.visibility}}</option>
        </select>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-3">
      <button class="button button--yellow" @click="closePopUp">
          <span><i class="fas fa-ban"></i></span>
          <span>Annulla</span>
        </button>
    </div>
    <div class="col-1-of-3">
      <button class="button button--red" @click="remove(id)">
          <span><i class="fas fa-trash-alt"></i></span>
          <span>Elimina il documento</span>
        </button>
    </div>
    <div class="col-1-of-3">
      <button class="button button--green" @click="edit(id)">
          <span><i class="fas fa-save"></i></span>
          <span>Salva documento</span>
        </button>
    </div>
  </div>
</div>
</template>

<script>
import {
  eventBus
} from '@/main'

import axios from 'axios'

export default {
  name: 'editDocument',
  props: ['id', 'types', 'faculties', 'visibilities', 'sections', 'schoolClasses'],
  data: () => {
    return {
      progress: 0,
      uploading: false,
      documentToEdit: {
        name: '',
        type: '',
        faculty: '',
        subject: '',
        class: '0',
        section: '',
        visibility: 'pubblico',
        description: ''
      },
      response: false,
      responseMessage: ''
    }
  },
  created () {
    axios.get('/documents/info/' + this.id)
      .then((response) => {
        let document = response.data

        this.documentToEdit = {
          name: document.name,
          type: document.type._id,
          faculty: document.faculty._id,
          subject: document.subject._id,
          class: document.class ? document.class._id : 0,
          section: document.section ? document.section._id : '',
          visibility: document.visibility._id,
          description: document.description
        }
      })
      .catch((e) => {
        this.response = true
        this.responseMessage = e.response.data
        console.log(this.responseMessage)
      })
  },
  methods: {
    closePopUp () {
      eventBus.closePopUp()
    },
    edit (id) {
      axios.patch('/documents/' + id, this.documentToEdit)
        .then((response) => {
          eventBus.closePopUp()
          this.$socket.emit('documentUpdated')
        })
        .catch((e) => {
          this.response = true
          this.responseMessage = e.response.data
        })
    },
    remove (id) {
      axios.delete('/documents/' + id)
        .then((response) => {
          eventBus.closePopUp()
          this.$socket.emit('documentDeleted')
        })
        .catch((e) => {
          this.response = true
          this.response = e.response.data
        })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
