<template>
<div class="edit">
  <div class="row">
    <div class="col-1-of-1">
      <input type="text" class="textfield" placeholder="Titolo" autocomplete="off" required v-model="documentToEdit.name">
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-1">
      <textarea class="textarea" placeholder="Descrizione" v-model="documentToEdit.description"></textarea>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-3">
      <select class="select" v-model="documentToEdit.type" required>
          <option class="module-input-option" value="" disabled>Tipo</option>
          <option class="module-input-option" :value="type._id" v-for="(type, index) in types" :key="index">
            {{ type.type }}
          </option>
        </select>
    </div>
    <div class="col-1-of-3">
      <select class="select" v-model="documentToEdit.faculty">
          <option class="module-input-option" value="" disabled>Specializzazione</option>
          <option class="module-input-option" :value="faculty._id" v-for="(faculty, index) in faculties" :key="index">
            {{ faculty.faculty }}
          </option>
        </select>
    </div>
    <div class="col-1-of-3">
      <select class="select" v-model="documentToEdit.subject" required>
          <option class="module-input-option" value="" disabled>Materia</option>
          <optgroup :label="faculty.faculty" v-for="(faculty, index) in faculties" :key="index">
            <option class="module-input-option" :value="subject._id" v-for="(subject, index) in faculty.subjects" :key="index">
              {{ subject.subject }}
            </option>
          </optgroup>
        </select>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-3">
      <select class="select" v-model="documentToEdit.class">
          <option class="module-input-option" value="0">Classe</option>
          <option class="module-input-option" :value="schoolClass._id" v-for="(schoolClass, index) in schoolClasses" :key="index">
            {{ schoolClass.class }}
          </option>
        </select>
    </div>
    <div class="col-1-of-3">
      <select class="select" v-model="documentToEdit.section">
          <option class="module-input-option" value="">Sezione</option>
          <option class="module-input-option" :value="section._id" v-for="(section, index) in sections" :key="index">
            {{ section.section }}
          </option>
        </select>
    </div>
    <div class="col-1-of-3">
      <select class="select" v-model="documentToEdit.visibility">
          <option class="module-input-option" value="" disabled>Visibilità</option>
          <option class="module-input-option" :value="visibility._id" v-for="(visibility, index) in visibilities" :key="index">{{visibility.visibility}}</option>
        </select>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-3">
      <button class="button button--yellow" @click="closePopUp">
          <span class="icon"><i class="fas fa-ban"></i></span>
          <span class="crop">Annulla</span>
        </button>
    </div>
    <div class="col-1-of-3">
      <button class="button button--red" @click="remove(entity._id)">
          <span class="icon"><i class="fas fa-trash-alt"></i></span>
          <span class="crop">Elimina il documento</span>
        </button>
    </div>
    <div class="col-1-of-3">
      <button class="button button--green" @click="edit(entity._id)">
          <span class="icon"><i class="fas fa-save"></i></span>
          <span class="crop">Salva documento</span>
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
  props: ['entity', 'types', 'faculties', 'visibilities', 'sections', 'schoolClasses'],
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
      }
    }
  },
  async created () {
    this.documentToEdit = {
      name: this.entity.name,
      type: this.entity.type._id,
      faculty: this.entity.faculty._id,
      subject: this.entity.subject._id,
      class: this.entity.class ? this.entity.class._id : 0,
      section: this.entity.section ? this.entity.section._id : '',
      visibility: this.entity.visibility._id,
      description: this.entity.description
    }
  },
  methods: {
    closePopUp () {
      eventBus.closePopUp()
    },
    async edit (id) {
      try {
        let response = await axios.patch('/documents/' + id, {
          document: this.documentToEdit
        })
        eventBus.notification({
          title: response.data.messages[0],
          temporary: true
        })
        eventBus.closePopUp()
        this.$socket.emit('documentUpdated')
      } catch (e) {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      }
    },
    async remove (id) {
      try {
        let response = await axios.delete('/documents/' + id)
        eventBus.notification({
          title: response.data.messages[0],
          temporary: true
        })
        eventBus.closePopUp()
        this.$socket.emit('documentDeleted')
      } catch (e) {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.section-title {
    font-size: $font-default-2;
    font-weight: bold;
}

.row--title {
    margin-bottom: $gutter-vertical-1!important;
}
</style>
