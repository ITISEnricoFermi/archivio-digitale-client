<template>
<div class="module">
  <div class="row">
    <div class="col-1-of-1">
      <input type="text" class="textfield" placeholder="Cerca un documento" autocomplete="off" v-model="query.fulltext" @keyup.enter="search">
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-3">
      <select class="select" v-model="query.type">
            <option class="module-input-option" value=undefined selected>Tipo</option>
            <option class="module-input-option" :value="type._id" v-for="(type, index) in types" :key="index">
              {{ type.type }}
            </option>
          </select>
    </div>
    <div class="col-1-of-3">
      <select class="select" v-model="query.faculty">
            <option class="module-input-option" value=undefined selected>Specializzazione</option>
            <option class="module-input-option" :value="faculty._id" v-for="(faculty, index) in faculties" :key="index">
              {{ faculty.faculty }}
            </option>
          </select>
    </div>
    <div class="col-1-of-3">
      <select class="select" v-model="query.subject">
            <option class="module-input-option" value=undefined selected>Materia</option>
            <optgroup :label="faculty.faculty" v-for="(faculty, index) in faculties" :key="index">
              <option class="module-input-option" :value="subject._id" v-for="(subject, index) in faculty.subjects" :key="index">
                {{ subject.subject }}
              </option>
            </optgroup>
          </select>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-2">
      <select class="select" v-model="query.class">
            <option class="module-input-option" value=undefined selected>Classe</option>
            <option class="module-input-option" v-bind:value="schoolClass._id" v-for="(schoolClass, index) in schoolClasses" :key="index">
              {{ schoolClass.class }}
            </option>
          </select>
    </div>
    <div class="col-1-of-2">
      <select class="select" v-model="query.section">
            <option class="module-input-option" value=undefined selected>Sezione</option>
            <option class="module-input-option" :value="section._id" v-for="(section, index) in sections" :key="index">
              {{ section.section }}
            </option>
          </select>
    </div>
  </div>
  <div class="row">
    <div clas="col-1-of-1">
      <button class="button button--green" @click="search">Cerca</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'searchDocuments',
  props: ['types', 'faculties', 'sections', 'schoolClasses'],
  data: () => {
    return {
      subjects: '',
      query: {
        fulltext: undefined,
        type: undefined,
        faculty: undefined,
        subject: undefined,
        class: undefined,
        section: undefined
      },
      help: undefined
    }
  },
  created () {
    this.query.fulltext = this.$route.query.q
    this.search()
  },
  sockets: {
    documentDeleted () {
      this.search()
    }
  },
  methods: {
    async search () {
      for (let i = 0; i < this.query.length; i++) {
        if (Object.keys(this.query)[i] !== '') {
          return false
        }
      }

      try {
        let response = await axios.post('/public/search/documents/', this.query)
        let documents = response.data

        for (let i = 0; i < documents.length; i++) {
          documents[i].own = false
        }

        this.$emit('searchDocuments', documents)
      } catch (e) {
        this.$emit('searchDocuments', [])
        this.$emit('alert', {
          messages: e.response.data.messages,
          color: 'alert--yellow'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
