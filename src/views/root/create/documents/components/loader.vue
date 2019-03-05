<template>
<div class="loader">
  <div class="content" @click.prevent="select" @drop.prevent="drop($event)" @dragover.prevent="dragover($event)" @dragleave.prevent="dragleave($event)">
    <p class="text">
      <span class="text--icon">
        <i class="fas fa-file"></i>
      </span>
      <span class="text--crop">
        {{ message }}
      </span>
    </p>
  </div>
</div>
</template>

<script>
export default {
  props: ['file'],
  data () {
    return {
      over: false
    }
  },
  computed: {
    text () {
      if (this.over) {
        return 'Rilascia il file per caricarlo'
      } else {
        return 'Trascina un file per caricarlo'
      }
    },
    message () {
      if (this.file === undefined) {
        return this.text
      } else {
        return this.file.name
      }
    }
  },
  methods: {
    dragover (ev) {
      this.over = true
      // ev.target.parentNode.classList.add('loader--drag')

      // Prevent default behavior (Prevent file from being opened)
      // ev.preventDefault()
    },
    dragleave (ev) {
      this.over = false
      // ev.target.parentNode.classList.remove('loader--drag')
    },
    drop (ev) {
      const file = ev.dataTransfer.items ? ev.dataTransfer.items[0].getAsFile() : ev.dataTransfer.files[0].getAsFile()
      this.$emit('file', file)
    },
    select () {
      const input = document.createElement('input')
      input.type = 'file'

      input.addEventListener('change', ({ target }) => {
        this.$emit('file', target.files[0])
      })

      return input.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
    background-color: $color-white-1;
    border: 1px solid $color-white-4;
    width: 100%;
    height: 10rem;
    border-radius: 0.3rem;
    padding: 1rem;
    transition: all 0.2s ease-in-out;

    &, & > * {
      cursor: pointer;
    }

    // &--drag {
    //   padding: 1.5rem;
    // }

    .content {
        background-color: $color-white-1;
        border: 0.5rem dashed $color-white-4;
        width: 100%;
        height: 100%;
        border-radius: 0.3rem;
        padding: 1rem;
        position: relative;

        .text {
            position: absolute;
            @include absCenter;
            color: $color-white-6;
            width: 100%;

            &--icon {
                font-size: 2rem;
                vertical-align: middle;
                padding-right: 0.5rem;

                @include respond(phone) {
                  display: none;
                }
            }

            &--text {
                vertical-align: middle;
            }
        }
    }
}
</style>
