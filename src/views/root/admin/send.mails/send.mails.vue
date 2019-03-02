<template>
<main class="panel">
  <div class="module module--padded">
    <div class="row">
      <input type="text" class="textfield" placeholder="Oggetto" v-model="email.subject">
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <app-multiple-select placeholder="Aggiungi un destinatario" :selected.sync="email.recipients" :dbElements="['firstname', 'lastname']" :url="'/users/search/partial/'" @update:selected="email.recipients = $event"></app-multiple-select>
      </div>
    </div>
    <div class="row" v-if="email.recipients.length">
      <div class="col-1-of-1">
        <app-multiple-select-results :selected.sync="email.recipients" :dbElements="['firstname', 'lastname']" @update:selected="email.recipients = $event"></app-multiple-select-results>
      </div>
    </div>
    <div class="row">
      <textarea class="textarea" placeholder="Messaggio" v-model="email.message"></textarea>
    </div>
    <div class="row" v-if="email.message">
      <div class="markdown" v-html="html"></div>
    </div>
    <button class="button button--green">
      <span class="icon">
        <i class="fas fa-paper-plane"></i>
      </span>
      <span class="crop">Invia mail</span>
    </button>
  </div>
</main>
</template>

<script>

import MultipleSelect from '@/components/multipleSelect/multipleSelect'
import MultipleSelectResults from '@/components/multipleSelect/multipleSelectResults'

import marked from 'marked'

marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

export default {
  data () {
    return {
      email: {
        message: '',
        subject: '',
        recipients: []
      }
    }
  },
  computed: {
    html () {
      return marked(this.email.message)
    }
  },
  components: {
    appMultipleSelect: MultipleSelect,
    appMultipleSelectResults: MultipleSelectResults
  }
}
</script>

<style lang="scss" scoped>
.panel {
    padding: 3vh;

    .markdown {
        border-radius: 0.25rem;
        background: $color-white-1;
        border: 1px solid darken($color-white-5, 5%);
        font-size: $font-default-2;
        cursor: pointer;
        text-align: left;
        color: $color-tertiary;
        display: block;
        text-decoration: none;
        padding: 0.9rem 0.8rem;
        list-style-position: inside;
        line-height: 3rem;

    }
}
</style>
