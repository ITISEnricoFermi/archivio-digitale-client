<template>
<main>
  <div class="module module--padded">
    <div class="row">
      <div class="col-1-of-1">
        <input type="text" class="textfield" placeholder="Cerca un documento" autocomplete="off" v-model="query.fulltext" @keyup.enter="search">
        <moon-loader :loading="true" :color="'#000'" :size="'20px'" v-if="loading"></moon-loader>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-3">
        <select class="select" v-model="query.type">
          <option class="module-input-option" value="" selected>Tipo</option>
          <option class="module-input-option" :value="type._id" v-for="(type, index) in types" :key="index">
            {{ type.type }}
          </option>
        </select>
      </div>
      <div class="col-1-of-3">
        <select class="select" v-model="query.faculty">
          <option class="module-input-option" value="" selected>Specializzazione</option>
          <option class="module-input-option" :value="faculty._id" v-for="(faculty, index) in faculties" :key="index">
            {{ faculty.faculty }}
          </option>
        </select>
      </div>
      <div class="col-1-of-3">
        <select class="select" v-model="query.subject">
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
        <select class="select" v-model="query.grade">
          <option class="module-input-option" value="" selected>Classe</option>
          <option class="module-input-option" v-bind:value="grade._id" v-for="(grade, index) in grades" :key="index">
            {{ grade.grade }}
          </option>
        </select>
      </div>
      <div class="col-1-of-3">
        <select class="select" v-model="query.section">
          <option class="module-input-option" value="" selected>Sezione</option>
          <option class="module-input-option" :value="section._id" v-for="(section, index) in sections" :key="index">
            {{ section.section }}
          </option>
        </select>
      </div>
      <div class="col-1-of-3">
        <select class="select" v-model="query.visibility">
          <option class="module-input-option" value="" selected>Visibilità</option>
          <option class="module-input-option" :value="visibility._id" v-for="(visibility, index) in visibilities" :key="index">
            {{ visibility.visibility }}
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div clas="col-1-of-1">
        <button class="button button--green" @click="search">
          <span class="icon"><i class="fas fa-search"></i></span>
          <span class="crop">Cerca</span>
        </button>
      </div>
    </div>
  </div>
  <transition name="fade">
    <app-alert v-if="documentsAlert.messages" :alert="documentsAlert" @alert="documentsAlert = $event"></app-alert>
  </transition>
  <transition-group name="fade">
    <app-document :document="document" v-for="document in documents" :key="document._id"></app-document>
  </transition-group>
</main>
</template>

<script>
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import Document from '@/components/document/document'
import Alert from '@/components/alert/alert'

import v1 from '@/utils/v1'

export default {
  props: ['types', 'faculties', 'visibilities', 'sections', 'grades'],
  data () {
    return {
      subjects: '',
      query: {
        fulltext: '',
        type: '',
        faculty: '',
        subject: '',
        grade: '',
        section: '',
        visibility: ''
      },
      help: undefined,
      loading: false,
      documents: undefined,
      documentsAlert: {
        messages: undefined,
        color: undefined
      }
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
    async search () {
      this.loading = true
      for (let i = 0; i < this.query.length; i++) {
        if (Object.keys(this.query)[i] !== '') {
          return false
        }
      }

      try {
        const response = await v1.post('/documents/search/', this.query)
        this.loading = false
        this.documents = response.data
      } catch (e) {
        this.loading = false
        this.documents = []
        this.documentsAlert = {
          messages: e.response.data.messages,
          color: 'alert--yellow'
        }
      }
    }
  },
  components: {
    MoonLoader: MoonLoader,
    appDocument: Document,
    appAlert: Alert
  }
}
</script>

<style scoped lang="scss">
.module {
  &:not(:last-child) {
    margin-bottom: 3vh;
  }
}
</style>
