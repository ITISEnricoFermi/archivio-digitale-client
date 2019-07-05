<template>
<main>
  <div class="module module--padded">
    <div class="selector module">
      <div class="selector__header">
        <p class="title">
          <span class="icon">
            <i class="fas fa-key"></i>
          </span>
          <span class="crop">Authenticator</span>
        </p>
      </div>
      <div class="selector__content">
        <ul>
          <li class="option" v-for="(key, index) in keys" :key="index">
            <span class="icon">
              <i class="fas fa-key"></i>
            </span>
            <span class="name">
              {{ key.name }}
            </span>
            <span class="key">
              {{ key.publicKey }}
            </span>
          </li>
        </ul>
      </div>
      <div class="selector__footer">
        <input type="text" class="textfield" placeholder="Nome dispositivo" v-model="keyname">
        <button class="button button--green" @click="register">
          <span class="icon">
            <i class="fas fa-file-signature"></i>
          </span>
          <span class="crop">
            Registra
          </span>
        </button>
      </div>
    </div>
  </div>
</main>
</template>

<script>
import eventBus from '@/utils/eventBus'
import v1 from '@/utils/v1'

import {
  solveRegistrationChallenge
} from '@webauthn/client'

export default {
  props: ['user'],
  data () {
    return {
      keys: [],
      keyname: ''
    }
  },
  async mounted () {
    await this.getKeys()
  },
  methods: {
    async getKeys () {
      const id = localStorage.getItem('id')
      const response = await v1.get(`/users/${id}/keys`)
      this.keys = response.data
    },
    async register () {
      if (!this.keyname) {
        return eventBus.notification({
          title: 'È necessario associare un nome al dispositivo.',
          temporary: true
        })
      }

      const response = await v1.post('/auth/request-register', {
        id: 'uuid',
        email: 'test@test'
      })

      const challenge = response.data

      const credentials = await solveRegistrationChallenge(challenge)

      try {
        await v1.post('/auth/register', {
          credentials,
          name: this.keyname
        })

        await this.getKeys()
        return eventBus.notification({
          title: 'Registrazione avvenuta con successo.',
          temporary: true
        })
      } catch (e) {
        return eventBus.notification({
          title: 'Si è verificato un problema con la registrazione.',
          temporary: true
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
    }

    &__content {

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

                &:not(:last-child) {
                    border-bottom: 1px solid $color-white-5;
                }

                &:hover {
                    background-color: $color-white-1;
                }

                span.icon {
                    margin: 0 0.5rem;
                    color: $color-palette-green;

                    @include respond(tab-por) {
                        margin: 0.5rem;
                    }
                }

                span.name {
                  font-weight: bold;
                  padding: 0.45rem;
                  background-color: $color-white-2;
                  border: 1px solid darken($color-white-5, 5%);
                  border-radius: 0.3rem;
                  margin: 0 0.5rem;
                }

                span.key {
                  margin: 0 0.5rem;
                }
            }

        }
    }

    &__footer {
        padding: 1rem;
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: auto 12rem;
        background-color: $color-white-1;
        border-top: 1px solid $color-white-5;
    }
}
</style>
