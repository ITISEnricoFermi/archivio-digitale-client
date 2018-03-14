<template>
<main class="panel panel__upload">
  <app-create-document :types="types" :faculties="faculties" :visibilities="visibilities" :sections="sections" :schoolClasses="schoolClasses" @alert="documentsAlert = $event" @progress="documentsProgress = $event"></app-create-document>
  <app-progress v-if="documentsProgress" :value="documentsProgress" :isStripped="true" :isAnimated="true"></app-progress>
  <transition name="fade">
    <app-alert v-if="documentsAlert.message" :alert="documentsAlert" @alert="documentsAlert = $event"></app-alert>
  </transition>
  <app-create-collection :collectionsPermissions="collectionsPermissions" @alert="collectionsAlert = $event"></app-create-collection>
  <transition name="fade">
    <app-alert v-if="collectionsAlert.message" :alert="collectionsAlert" @alert="collectionsAlert = $event"></app-alert>
  </transition>
</main>
</template>

<script>
import createDocument from './createDocument'
import createCollection from './createCollection'
import Progress from '@/components/progress/progress'
import Alert from '@/components/alert/alert'

export default {
  props: ['types', 'faculties', 'visibilities', 'sections', 'schoolClasses', 'collectionsPermissions'],
  data: () => {
    return {
      documentsProgress: undefined,
      collectionResponse: '',
      progress: '',
      documentsAlert: {
        message: undefined,
        color: undefined
      },
      collectionsAlert: {
        message: undefined,
        color: undefined
      }
    }
  },
  components: {
    appCreateDocument: createDocument,
    appCreateCollection: createCollection,
    appProgress: Progress,
    appAlert: Alert
  }
}
</script>

<style lang="scss">
</style>
