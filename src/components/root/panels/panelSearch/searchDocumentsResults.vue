<template>
  <div class="module" v-if="documents">
    <div class="row" v-for="document in documents">
      <div class="col-1-of-1">
        <article class="module-document-search-article">
          <a v-bind:href="'documents/' + document.directory" class="module-document-search-article--name u-margin-bottom-medium" download>{{document.name}}</a>
          <p class="module-document-search-article--delete u-margin-bottom-medium" v-if="document.own" @click="removeDocument(document._id)">Elimina</p>
          <p class="module-document-search-article--description u-margin-bottom-medium">{{document.description}}</p>
          <p class="module-document-search-article--info">
            <span>Tipo: </span>{{document.type.type}},
            <span>Specializzazione: </span>{{document.faculty.faculty}},
            <span>Materia: </span>{{document.subject.subject}},
            <span>Classe: </span>{{document.class.class}},
            <span>Sezione: </span>{{document.section.section}},
            <span>Pubblicato da: </span>{{document.author.firstname}} {{document.author.lastname}}
          </p>
        </article>
      </div>
    </div>
    <div class="row" v-if="documents.length === 0">
      <div class="col-1-of-1">
        <p class="module-document-search-noresults">Nessun risultato</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchDocumentsResults",
  props: ["documents"]
}
</script>

<style scoped lang="scss">
</style>
