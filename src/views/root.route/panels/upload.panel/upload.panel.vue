<template>
<main class="panel panel__upload">
  <app-create-document :types="types" :faculties="faculties" :visibilities="visibilities" :sections="sections" :grades="grades" @alert="documentsAlert = $event" @progress="documentsProgress = $event"></app-create-document>
  <app-progress v-if="documentsProgress" :value="documentsProgress" :isStripped="true" :isAnimated="true"></app-progress>
  <transition name="fade">
    <app-alert v-if="documentsAlert.messages" :alert="documentsAlert" @alert="documentsAlert = $event"></app-alert>
  </transition>
  <app-create-collection :collectionsPermissions="collectionsPermissions" @alert="collectionsAlert = $event"></app-create-collection>
  <transition name="fade">
    <app-alert v-if="collectionsAlert.messages" :alert="collectionsAlert" @alert="collectionsAlert = $event"></app-alert>
  </transition>
</main>
</template>

<script>
import createDocument from './documents.add'
import createCollection from './collections.add'
import Progress from '@/components/progress/progress'
import Alert from '@/components/alert/alert'

export default {
  props: ['types', 'faculties', 'visibilities', 'sections', 'grades', 'collectionsPermissions'],
  data: () => {
    return {
      documentsProgress: undefined,
      collectionResponse: '',
      progress: '',
      documentsAlert: {
        messages: undefined,
        color: undefined
      },
      collectionsAlert: {
        messages: undefined,
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
