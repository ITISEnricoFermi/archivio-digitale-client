<template>
<header class="header">
  <div class="logo">
    <a href="/home/" class="logo__content">
      <img src="/logo/itisFermi_white.svg" class="fermi" alt="ITIS Enrico Fermi">
      <div class="separator"></div>
      <p class="archivio">Archivio Digitale</p>
    </a>
  </div>
  <div class="menu">
    <ul class="buttons">
      <li>
        <button class="back" @click="back">
          <span class="icon">
            <i class="fas fa-chevron-left"></i>
          </span>
          <span class="crop">Torna indietro</span>
        </button>
      </li>
      <li>
        <button class="download" @click="download">
          <span class="icon">
            <i class="fas fa-download"></i>
          </span>
          <span class="crop">
            Scarica
          </span>
        </button>
      </li>
    </ul>
  </div>
</header>
</template>

<script>

export default {
  props: ['document'],
  methods: {
    back () {
      this.$router.push('/dashboard')
    },
    download () {
      const path = this.document.directory
      let a = document.createElement('A')
      a.href = `/public/documents/${path}`
      a.download = this.document.name
      a.click()
    }
  }
}
</script>

<style scoped lang="scss">
.header {
    width: 100%;
    text-align: center;
    width: 100%;
    z-index: 10000;
    height: 10rem;
    padding: 4vh 6vh;
    background-image: linear-gradient(45deg, #1A8D4C 1%, #22B863 64%, #66BA6B 97%);
    display: table;
    transition: all 0.2s ease-in-out;

    @include respond(phone) {
        padding: 3vh;
    }

    .logo {
        display: table-cell;
        vertical-align: middle;

        &__content {
            text-align: left;
            height: 4.5rem;
            display: table-cell;
            vertical-align: middle;
            text-decoration: none;

            * {
                display: inline-block;
                vertical-align: middle;
            }

            .fermi {
                height: 4.5rem;
                // margin: 0.75rem 0.75rem 0.75rem 3vh;
            }

            .separator {
                height: 3rem;
                width: 0.05rem;
                background-color: $color-white;
                margin: 0 1rem;

                @include respond(phone) {
                    display: none;
                }
            }

            .archivio {
                font-size: 2rem;
                color: $color-white;
                font-family: 'Bitter';

                @include respond(phone) {
                    display: none;
                }
            }

        }

    }

    .menu {
        display: table-cell;
        vertical-align: middle;

        .buttons {
            text-align: right;
            padding: 0;
            float: right;

            li {
                display: inline-block;

                &:not(:last-child) {
                    margin-right: 1.5rem;
                }

                button{
                    // text-transform: uppercase;
                    // padding: 0.7rem;
                    display: block;
                    text-decoration: none;
                    font-size: 1.4rem;
                    outline: none;
                    cursor: pointer;

                    span.icon {
                      margin-right: 0.75rem;
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

                .back {
                    padding: 1.2rem 1.5rem;
                    font-weight: bold;
                    color: $color-white;
                    border-radius: 0.3rem;
                    border: 1px solid rgba($color-white, 0.2);
                    background: none;

                    &:hover {
                        background-color: rgba($color-white, 0.2);
                    }
                }

                .download {
                    border: none;
                    padding: 1.2rem 1.5rem;
                    font-weight: bold;
                    color: $color-white;
                    border-radius: 0.3rem;
                    background-color: $color-primary;

                    &:hover {
                        background-color: lighten(#1A8D4C, 2%);
                    }

                }

            }
        }

    }

}
</style>
