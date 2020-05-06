import Vue from 'vue'
import Vuex from 'vuex'

// const [
//   user
// ] = await Promise.all([
//   v1.get('/users/' + localStorage.getItem('id'))
// ])

// this.user = user.data

import v1 from '@/utils/v1'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    types: [],
    faculties: [],
    subjects: [],
    visibilities: [],
    sections: [],
    grades: [],
    privileges: [],
    collectionPermissions: []
  },
  mutations: {
    setTypes (state, payload) {
      state.types = payload
    },
    setFaculties (state, payload) {
      state.faculties = payload
    },
    setSubjects (state, payload) {
      state.subjects = payload
    },
    setGrades (state, payload) {
      state.grades = payload
    },
    setSections (state, payload) {
      state.sections = payload
    },
    setVisibilities (state, payload) {
      state.visibilities = payload
    },
    setPrivileges (state, payload) {
      state.privileges = payload
    },
    setCollectionPermissions (state, payload) {
      state.collectionPermissions = payload
    }
  },
  actions: {
    async fetchTypes ({ commit }) {
      const response = await v1.get('/document_types/')
      commit('setTypes', response.data)
    },
    async fetchFaculties ({ commit }) {
      const response = await v1.get('/faculties/')
      commit('setFaculties', response.data)
    },
    async fetchSubjects ({ commit }) {
      const response = await v1.get('/subjects')
      commit('setSubjects', response.data)
    },
    async fetchGrades ({ commit }) {
      const response = await v1.get('/grades')
      commit('setGrades', response.data)
    },
    async fetchSections ({ commit }) {
      const response = await v1.get('/sections')
      commit('setSections', response.data)
    },
    async fetchVisibilities ({ commit }) {
      const response = await v1.get('/document_visibility/')
      commit('setVisibilities', response.data)
    },
    async fetchPrivileges ({ commit }) {
      const response = await v1.get('/privileges')
      commit('setPrivileges', response.data)
    },
    async fetchCollectionPermissions ({ commit }) {
      const response = await v1.get('/collection_permissions/')
      commit('setCollectionPermissions', response.data)
    }
  },
  getters: {
    getTypes (state) {
      return state.types
    },
    getFaculties (state) {
      return state.faculties
    },
    getSubjects (state) {
      return state.subjects
    },
    getGrades (state) {
      return state.grades
    },
    getSections (state) {
      return state.sections
    },
    getVisibilities (state) {
      return state.visibilities
    },
    getPrivileges (state) {
      return state.privileges
    },
    getCollectionPermissions (state) {
      return state.collectionPermissions
    }
  },
  modules: {
  }
})
