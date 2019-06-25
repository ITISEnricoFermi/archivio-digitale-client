<template>
<div class="module module--padded">
  <div class="row">
    <div class="col-1-of-1">
      <input type="text" class="textfield" placeholder="Cerca un documento" autocomplete="off" v-model="query.fulltext" @keyup.enter="go">
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
      <select class="select" v-model="query.grade">
            <option class="module-input-option" value=undefined selected>Classe</option>
            <option class="module-input-option" :value="grade._id" v-for="(grade, index) in grades" :key="index">
              {{ grade.grade }}
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
      <button class="button button--green" @click="go">
        <span class="icon">
          <i class="fas fa-search"></i>
        </span>
        <span class="crop">Cerca</span>
      </button>
    </div>
  </div>
</div>
</template>

<script>

import v1 from '@/utils/v1'

export default {
  data () {
    return {
      subjects: '',
      types: [],
      faculties: [],
      sections: [],
      grades: [],
      query: {
        fulltext: '',
        type: undefined,
        faculty: undefined,
        subject: undefined,
        grade: undefined,
        section: undefined
      },
      help: undefined
    }
  },
  async created () {
    this.types = await this.getDocumentTypes()
    this.faculties = await this.getFaculties()
    this.sections = await this.getSections()
    this.grades = await this.getGrades()
  },
  mounted () {
    this.query.fulltext = this.$route.query.fulltext
    this.query.type = this.$route.query.type
    this.query.faculty = this.$route.query.faculty
    this.query.subject = this.$route.query.subject
    this.query.grade = this.$route.query.grade
    this.query.section = this.$route.query.section

    if (Object.values(this.query).every(el => el === undefined || el === '')) {
      return this.$router.push({ path: '/' })
    }

    this.search()
  },
  sockets: {
    documentDeleted () {
      this.search()
    }
  },
  methods: {
    go () {
      this.$router.push({ path: 'search', query: this.query })
      return window.location.reload()
    },
    async search () {
      for (let i = 0; i < this.query.length; i++) {
        if (Object.keys(this.query)[i] !== '') {
          return false
        }
      }

      try {
        const response = await v1.post('/documents/search/', this.query)
        let documents = response.data
        this.$emit('searchDocuments', documents)
      } catch (e) {
        this.$emit('searchDocuments', [])
        this.$emit('alert', {
          messages: e.response.data.messages,
          color: 'alert--yellow'
        })
      }
    },
    async getDocumentTypes () {
      const response = await v1.get('/document_types/')
      return response.data
    },
    async getFaculties () {
      const response = await v1.get('/faculties/')
      return response.data
    },
    async getSections () {
      const response = await v1.get('/sections/')
      return response.data
    },
    async getGrades () {
      const response = await v1.get('/grades/')
      return response.data
    }
  }
}
</script>

<style scoped lang="scss">
</style>
