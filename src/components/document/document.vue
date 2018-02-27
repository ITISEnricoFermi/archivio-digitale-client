<template>
<div class="module document-box">
  <div class="document-box-header">
    <div class="document-box-header__img">
      <img v-bind:src="'pics/' + document.author.img" alt="Foto profilo utente">
    </div>
    <div class="document-box-header__info">
      <p class="document-box-header__info--head heading-fourth">
        <span>{{document.author.firstname}} {{document.author.lastname}}</span> ha pubblicato
        <span>{{document.name}}</span>.
      </p>
      <p class="document-box-header__info--date heading-fifth">{{ this.date }}
      </p>
    </div>
  </div>
  <div class="document-box-info">
    <p class="document-box-info__description">{{document.description}}</p>
  </div>
  <div class="document-box-footer">
    <ul class="document-box-footer__info">
      <li v-if="document.subject" class="u-bg-color-blue">{{document.subject.subject}}</li>
      <li v-if="document.class || document.section" class="u-bg-color-yellow">
        <span v-if="document.class">{{document.class.class}}</span>
        <span v-if="document.section">{{document.section.section}}</span>
      </li>
      <li v-if="document.type" class="u-bg-color-green">{{document.type.type}}</li>
    </ul>
  </div>
  <div class="document-box-left">
    <ul>
      <li class="u-noselect">
        <a v-bind:href="'documents/' + document.directory" download>
          <i class="fas fa-download"></i>
        </a>
      </li>
      <li class="u-noselect">
        <a v-bind:href="'documents/' + document.directory" target="_blank">
          <i class="fas fa-eye"></i>
        </a>
      </li>
      <li class="u-noselect">
        <a v-if="document.own" @click.prevent="editDocument(document._id)">
          <i class="fas fa-edit"></i>
        </a>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: "document",
  props: ["document"],
  computed: {
    date: function() {
      let timestamp = this.document._id.toString().substring(0,8);
      return new Date(parseInt( timestamp, 16 ) * 1000 ).toUTCString();
    }
  },
  methods: {
    editDocument(id) {
      this.$emit("editDocument", id);
    }
  }
}
</script>

<style scoped lang="scss">
</style>
