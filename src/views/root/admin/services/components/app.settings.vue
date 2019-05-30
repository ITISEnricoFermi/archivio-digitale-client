<template>
<div class="module module--padded">
  <p v-if="updates.client.tag === undefined && updates.server.tag === undefined">L'Archivio Digitale è aggiornato.</p>
  <div class="update client" v-if="updates.client.tag !== undefined">
    <button class="button button--yellow">
      <span class="icon">
        <i class="fas fa-sync"></i>
      </span>
      <span class="crop">Aggiorna</span>
    </button>
    <p class="message">È possibile scaricare la nuova versione del client: {{ updates.client.tag }}.</p>
  </div>
  <div class="update server">
  <!-- <div class="update server" v-if="updates.server.tag !== undefined"> -->
    <button class="button button--yellow" @click="updateBackend">
      <span class="icon">
        <i class="fas fa-sync"></i>
      </span>
      <span class="crop">Aggiorna</span>
    </button>
    <p class="message">È possibile scaricare la nuova versione del server: {{ updates.server.tag }}.</p>
  </div>
</div>
</template>

<script>
import axios from 'axios'

import service from '@/utils/service'
import v1 from '@/utils/v1'

export default {
  data () {
    return {
      versions: {
        client: '0.0.0',
        server: '0.0.0'
      },
      updates: {
        client: {
          tag: undefined,
          url: undefined
        },
        server: {
          tag: undefined,
          url: undefined
        }
      },
      url: 'https://api.github.com',
      username: 'Richard1984',
      repos: {
        client: 'archivio-fermi-client',
        server: 'archivio-fermi-server'
      }
    }
  },
  async created () {
    this.versions.server = await this.getCurrentVersions()

    const serverLastVersion = await this.getServerLastVersion()

    if (serverLastVersion.name !== `v${this.versions.server.version}`) {
      this.updates.server.tag = serverLastVersion.name
      this.updates.server.url = serverLastVersion.zipball_url
    }

    const clientLastVersion = await this.getClientLastVersion()

    if (clientLastVersion.name !== `v${this.versions.client.version}`) {
      this.updates.client.tag = clientLastVersion.name
      this.updates.client.url = clientLastVersion.zipball_url
    }
  },
  methods: {
    async getCurrentVersions () {
      const response = await service.get('/')
      return response.data
    },
    async getServerLastVersion () {
      const response = await axios.get(`${this.url}/repos/${this.username}/${this.repos.server}/tags`)
      return response.data[0]
    },
    async getClientLastVersion () {
      const response = await axios.get(`${this.url}/repos/${this.username}/${this.repos.client}/tags`)
      return response.data[0]
    },
    async updateBackend (tag = 'latest') {
      await v1.post('/admin/update', {
        service: 'backend',
        tag
      })
      console.log('Backend agiornato con successo.')
      window.location.reload()
    },
    async updateFrontend (tag = 'latest') {
      await v1.post('/admin/update', {
        service: 'frontend',
        tag
      })
      console.log('Frontend agiornato con successo.')
      window.location.reload()
    }
  }
}
</script>

<style scoped lang="scss">
.update {
    text-align: left;
    display: flex;
    align-items: center;

    &:not(:last-child) {
        margin-bottom: 1rem;
    }

    .button {
        width: auto;
    }

    .message {
        margin: 0 1rem;
    }
}
</style>
