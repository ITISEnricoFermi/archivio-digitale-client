<template>
<div class="module">
  <div class="row">
    <div class="col-1-of-1">
      <input type="text" class="module-input-text" placeholder="Cerca un documento" autocomplete="off" v-model="query.fulltext" @keyup.enter="search">
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-3">
      <select class="module-input-select" v-model="query.type">
            <option class="module-input-option" value="" selected>Tipo</option>
            <option class="module-input-option" :value="type._id" v-for="(type, index) in types" :key="index">
              {{ type.type }}
            </option>
          </select>
    </div>
    <div class="col-1-of-3">
      <select class="module-input-select" v-model="query.faculty">
            <option class="module-input-option" value="" selected>Specializzazione</option>
            <option class="module-input-option" :value="faculty._id" v-for="(faculty, index) in faculties" :key="index">
              {{ faculty.faculty }}
            </option>
          </select>
    </div>
    <div class="col-1-of-3">
      <select class="module-input-select" v-model="query.subject">
            <option class="module-input-option" value="" selected>Materia</option>
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
      <select class="module-input-select" v-model="query.class">
            <option class="module-input-option" value="" selected>Classe</option>
            <option class="module-input-option" v-bind:value="schoolClass._id" v-for="(schoolClass, index) in schoolClasses" :key="index">
              {{ schoolClass.class }}
            </option>
          </select>
    </div>
    <div class="col-1-of-3">
      <select class="module-input-select" v-model="query.section">
            <option class="module-input-option" value="" selected>Sezione</option>
            <option class="module-input-option" :value="section._id" v-for="(section, index) in sections" :key="index">
              {{ section.section }}
            </option>
          </select>
    </div>
    <div class="col-1-of-3">
      <select class="module-input-select" v-model="query.visibility">
            <option class="module-input-option" value="" selected>Visibilità</option>
            <option class="module-input-option" :value="visibility._id" v-for="(visibility, index) in visibilities" :key="index">
              {{ visibility.visibility }}
            </option>
          </select>
    </div>
  </div>
  <div class="row">
    <div clas="col-1-of-1">
      <button class="button button--green" @click="search"><span><i class="fas fa-search"></i></span>Cerca</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'searchDocuments',
  props: ['types', 'faculties', 'visibilities', 'sections', 'schoolClasses'],
  data: () => {
    return {
      subjects: '',
      query: {
        fulltext: '',
        type: '',
        faculty: '',
        subject: '',
        class: '',
        section: '',
        visibility: ''
      },
      help: undefined
    }
  },
  sockets: {
    documentDeleted () {
      this.search()
    },
    documentUpdated () {
      this.search()
    }
  },
  methods: {
    search () {
      for (let i = 0; i < this.query.length; i++) {
        if (Object.keys(this.query)[i] !== '') {
          return false
        }
      }

      axios.post('/documents/search/', this.query)
        .then((response) => {
          this.$emit('searchDocuments', response.data)
        })
        .catch((e) => {
          this.$emit('searchDocuments', [])
          this.$emit('alert', {
            messages: e.response.data.messages,
            color: 'alert--yellow'
          })
        })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
