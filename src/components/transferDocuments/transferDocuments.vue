<template>
<div class="edit">
  <div class="row section-title">
    <div class="col-1-of-1">
      <label for="to">A chi vuoi trasferire i documenti?</label>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-1">
      <app-multiple-select :placeholder="'Aggiungi un destinatario.'" :selected.sync="to" :dbElements="['firstname', 'lastname']" :url="'/users/search/partial/'" @update:selected="to = $event"></app-multiple-select>
    </div>
  </div>
  <div class="row" v-if="to.length">
    <div class="col-1-of-1">
      <app-multiple-select-results :selected.sync="to" :dbElements="['firstname', 'lastname']" @update:selected="to = $event"></app-multiple-select-results>
    </div>
  </div>
  <div class="row section-title">
    <div class="col-1-of-1">
      <label for="type">Quali documenti vuoi trasferire?</label>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-1">
      <select class="select" v-model="type" id="type">
        <option value="all" selected>Tutti i miei documenti</option>
        <option value="selected">I documenti selezionati</option>
      </select>
    </div>
  </div>
  <div class="row" v-if="type === 'selected'">
    <div class="col-1-of-1">
      <app-multiple-select :placeholder="'Aggiungi un documento da trasferire'" :selected.sync="documents" :dbElements="['name']" :url="'/documents/search/partial/'" @update:selected="documents = $event"></app-multiple-select>
    </div>
  </div>
  <div class="row" v-if="type === 'selected' && documents.length">
    <div class="col-1-of-1">
      <app-multiple-select-results :selected.sync="documents" :dbElements="['name']" @update:selected="documents = $event"></app-multiple-select-results>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-2">
      <button class="button button--yellow" @click="closePopUp">
          <span class="icon"><i class="fas fa-ban"></i></span>
          <span class="crop">Annulla</span>
        </button>
    </div>
    <div class="col-1-of-2">
      <button class="button button--green" @click="transfer">
        <span class="icon"><i class="fas fa-exchange-alt"></i></span>
        <span class="crop">Trasferisci documenti</span>
      </button>
    </div>
  </div>
</div>
</template>

<script>
import eventBus from '@/utils/eventBus'

import MultipleSelect from '@/components/multipleSelect/multipleSelect'
import MultipleSelectResults from '@/components/multipleSelect/multipleSelectResults'

export default {
  props: ['entity', 'types', 'faculties', 'visibilities', 'sections', 'grades'],
  data () {
    return {
      documents: [],
      to: [],
      type: 'all'
    }
  },
  methods: {
    closePopUp () {
      eventBus.closePopUp()
    },
    async transfer () {

    }
  },
  components: {
    appMultipleSelect: MultipleSelect,
    appMultipleSelectResults: MultipleSelectResults
  }
}
</script>

<style scoped lang="scss">
.section-title {
    font-size: $font-default-2;
    font-weight: bold;
    margin-bottom: $gutter-vertical-1!important;
}
</style>
