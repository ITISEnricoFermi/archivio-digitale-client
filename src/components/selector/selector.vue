<template>
<main>
  <div class="selector module">
    <div class="selector__header">
      <p class="title">
        <span class="icon">
          <i class="fas fa-search" aria-hidden="true" />
        </span>
        <span class="crop">Ricerca</span>
      </p>
      <input type="text" v-model="query" @keyup="search" class="textfield" placeholder="Cerca">
    </div>
    <div class="selector__selected" v-if="selected.length">
      <div class="list">
        <div class="list__element" v-for="(entity, index) in selected" :key="index" @click="remove(entity)">
          <span class="number">
            {{ index + 1 + '. ' }}
          </span>
          <span class="crop" v-for="(element, index) in dbElements" :key="index">
            {{ entity[element] }}
          </span>
          <span class="icon">
            <i class="fas fa-times-circle"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="selector__content">
      <ul>
        <!-- <transition-group name="fade" mode="out-in"> -->
        <li class="option" v-for="(entity, index) in entities" :key="index" :class="{ 'option--selected': isSelected(entity) }" @click="add(entity)">
          <span class="icon">
            {{ page * perPage - perPage + index + 1 + '.' }}
          </span>
          <span class="crop" v-for="(element, index) in dbElements" :key="index">
            {{ entity[element] }}
          </span>
        </li>
        <!-- </transition-group> -->
      </ul>
    </div>
    <div class="selector__footer">
      <div class="pages">
        <div class="pages__arrow u-noselect" @click="prec" :class="{ 'pages__arrow--disabled': page === 1 }">
          <p>
            <i class="fas fa-chevron-left" />
          </p>
        </div>
        <div v-for="(step, index) in pages" :key="index" class="pages__step u-noselect" :class="{ 'pages__step--active': step === page }" @click="move(step)">
          <p>{{ step }}</p>
        </div>
        <div class="pages__arrow u-noselect" @click="next" :class="{ 'pages__arrow--disabled': page === pages }">
          <p>
            <i class="fas fa-chevron-right" />
          </p>
        </div>
      </div>
      <div class="counter">
        <p>{{ counter }}</p>
      </div>
    </div>
  </div>
</main>
</template>

<script>
import v1 from '@/utils/v1'

export default {
  props: {
    endpoint: {
      type: String,
      default: ''
    },
    current: {
      type: Array,
      default () {
        return []
      }
    },
    dbElements: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      steps: 10,
      counter: 0,
      query: '',
      entities: [],
      selected: [],
      page: 1,
      pages: 1,
      perPage: 5
    }
  },
  watch: {
    selected () {
      this.$emit('selected', this.selected)
    }
  },
  async created () {
    await this.search()
    this.selected = this.current
  },
  methods: {
    add (entity) {
      if (this.selected.findIndex(el => el._id === entity._id) === -1) {
        this.selected.push(entity)
      }
    },
    remove (entity) {
      const index = this.selected.indexOf(entity)
      if (index !== -1) {
        this.selected.splice(index, 1)
      }
    },
    isSelected (entity) {
      if (this.selected.findIndex(el => el._id === entity._id) === -1) {
        return false
      }

      return true
    },
    async search () {
      const {
        data: {
          documents,
          page,
          pages,
          total
        }
      } = await v1.get(this.endpoint, {
        params: {
          fulltext: this.query,
          page: 1,
          perPage: this.perPage
        }
      })

      this.entities = documents
      this.page = page
      this.pages = pages
      this.counter = total
    },
    async move (step) {
      const {
        data: {
          documents,
          page,
          pages,
          total
        }
      } = await v1.get(this.endpoint, {
        params: {
          fulltext: this.query,
          page: step,
          perPage: this.perPage
        }
      })

      this.entities = documents
      this.page = page
      this.pages = pages
      this.counter = total
    },
    async next () {
      if (this.page === this.pages) {
        return
      }

      this.page++
      await this.move(this.page)
    },
    async prec () {
      if (this.page === 1) {
        return
      }

      this.page--
      await this.move(this.page)
    }
  }
}
</script>

<style scoped lang="scss">
.selector {
    border-radius: 0.3rem;
    border: 1px solid $color-white-5;

    &__header {
        display: grid;
        grid-template-columns: auto auto;
        justify-content: space-between;
        padding: 1.5rem;
        text-align: left;
        list-style: none;
        background-color: $color-white-1;
        align-items: center;
        border-bottom: 1px solid $color-white-5;

        p {
            color: $color-grey-1;
            font-weight: bold;

            span.icon {
                margin: 0 0.5rem;
                @include respond(tab-por) {
                    margin: 0.5rem;
                }
            }

            span.crop {
                @include respond(tab-por) {
                    display: none;
                }
            }

        }

        input {
            width: 20rem;
        }
    }

    &__selected {
        padding: 1rem;
        border-bottom: 1px solid $color-white-5;
    }

    &__content {
        min-height: 23.4rem;

        ul {
            padding: 0;

            .option {
                transition: background-color 0.2s ease-in-out;
                cursor: pointer;
                padding: 1.5rem;
                text-align: left;
                list-style: none;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                &--selected {
                    background: $color-white-2;

                    &:hover {
                        background: $color-white-2!important;
                    }
                }

                &:first-child,
                &:not(:nth-child(5)) {
                    border-bottom: 1px solid $color-white-5;
                }

                &:hover {
                    background-color: $color-white-1;
                }

                span.icon {
                    margin: 0 0.5rem;
                    @include respond(tab-por) {
                        margin: 0.5rem;
                    }
                }
            }

        }
    }

    &__footer {
        padding: 1rem;
        background-color: $color-white-1;
        display: grid;
        text-align: left;
        grid-template-columns: auto min-content;
        justify-content: space-between;
        border-top: 1px solid $color-white-5;

        .pages {
            width: 100%;
            display: block;

            & > *:not(:last-child) {
                margin-right: 0.5rem;
            }

            &__step {
                width: 3rem;
                height: 3rem;
                background-color: $color-white-2;
                border-radius: 0.3rem;
                position: relative;
                border: 1px solid $color-white-5;
                color: $color-grey-1;
                display: inline-block;
                cursor: pointer;

                &--active,
                &:hover {
                    background-color: $color-white-3;

                    p {
                        text-decoration: underline;
                        font-weight: bold;
                    }

                }

                p {
                    position: absolute;
                    @include absCenter;
                }
            }

            &__arrow {
                width: 3rem;
                height: 3rem;
                background-color: $color-white-3;
                border-radius: 0.3rem;
                position: relative;
                border: 1px solid $color-white-5;
                color: $color-grey-1;
                display: inline-block;
                cursor: pointer;

                &--disabled {
                    color: $color-white-6;
                }

                p {
                    position: absolute;
                    @include absCenter;
                }
            }
        }

        .counter {
            width: 3rem;
            height: 3rem;
            background-color: $color-white-3;
            border-radius: 0.3rem;
            position: relative;
            border: 1px solid $color-white-5;
            color: $color-grey-1;
            display: inline-block;
            cursor: pointer;

            p {
                position: absolute;
                @include absCenter;
            }
        }
    }
}
</style>
