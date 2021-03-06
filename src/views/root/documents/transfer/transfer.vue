<template>
<main>
  <div class="module module--padded">
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
        <app-selector @selected="documents = $event" endpoint="/documents/search/partial/" :dbElements="['name']"></app-selector>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <button class="button button--green" @click="transfer">
          <span class="icon"><i class="fas fa-exchange-alt"></i></span>
          <span class="crop">Trasferisci documenti</span>
        </button>
      </div>
    </div>
  </div>
</main>
</template>

<script>
import v1 from '@/utils/v1'
import eventBus from '@/utils/eventBus'
import { mapGetters } from 'vuex'

import MultipleSelect from '@/components/multipleSelect/multipleSelect'
import MultipleSelectResults from '@/components/multipleSelect/multipleSelectResults'
import Selector from '@/components/selector/selector'

export default {
  props: ['entity'],
  data () {
    return {
      documents: [],
      to: [],
      type: 'all'
    }
  },
  computed: {
    ...mapGetters({
      types: 'getTypes',
      faculties: 'getFaculties',
      visibilities: 'getVisibilities',
      sections: 'getSections',
      grades: 'getGrades'
    })
  },
  methods: {
    async transfer () {
      try {
        const response = await v1.post('/documents/transfer', {
          documents: this.documents,
          to: this.to,
          type: this.type
        })
        this.documents = []
        this.to = []
        this.type = 'all'
        eventBus.notification({
          title: response.data.messages[0],
          temporary: true
        })
      } catch (e) {
        eventBus.notification({
          title: e,
          temporary: true
        })
      }
    }
  },
  components: {
    appSelector: Selector,
    appMultipleSelect: MultipleSelect,
    appMultipleSelectResults: MultipleSelectResults
  }
}
</script>

<style scoped lang="scss">
.section-title {
    font-size: $font-default-2;
    font-weight: bold;
    text-align: left;
    margin-bottom: $gutter-vertical-1!important;
    color: var(--color-text-primary);
}
</style>
