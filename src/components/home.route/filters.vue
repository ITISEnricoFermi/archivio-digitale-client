<template>
  <ul class="filters">
    <li class="selected u-noselect" @click.stop="getRecentProjects('appunti')">
        <i class="far fa-file-alt"></i>
        <span>Appunti</span>
    </li>
    <li class="u-noselect" @click.stop="getRecentProjects('videoLezione')">
        <i class="fas fa-film"></i>
        <span>Video</span>
    </li>
    <li class="u-noselect" @click.stop="getRecentProjects('audioLezione')">
        <i class="fas fa-headphones"></i>
        <span>Audio</span>
    </li>
    <li class="u-noselect" @click.stop="getRecentProjects('progettiStudenti')">
        <i class="fas fa-archive"></i>
        <span>Progetti</span>
    </li>
  </ul>
</template>

<script>

import axios from 'axios'

export default {
  name: 'filters',
  created () {
    this.getRecentProjects('progettiStudenti')
  },
  methods: {
    async getRecentProjects (type) {
      if (event && event.type === 'click') {
        document.getElementsByClassName('selected')[0].classList.remove('selected')

        if (event.srcElement.tagName === 'LI') {
          event.target.classList.add('selected')
        } else {
          event.srcElement.parentNode.classList.add('selected')
        }
      }

      try {
        let response = await axios.get('/public/recent/' + type)
        this.$emit('filter', response.data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.filters {
    padding: 0;
    margin: 0 auto;
    display: inline-block;
    text-align: center;

    li {
        display: inline-block;
        padding: 0.7rem 1.2rem;
        border-radius: 1.5rem;
        margin: 0 0.7rem;
        transition: all 0.2 ease-in-out;
        color: $color-grey-2;
        font-size: $font-default-3;
        cursor: pointer;

        &.selected, &:hover {
          background-color: $color-white-4;
        }

    }
}
</style>
