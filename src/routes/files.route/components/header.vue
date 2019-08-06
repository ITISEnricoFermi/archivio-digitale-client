<template>
<div class="header">
  <div class="header__logo">
    <a href="/home/" class="content">
      <div class="fermi">
        <div class="logo"></div>
      </div>
      <span class="archivio">
        <div class="separator"></div>
        <p class="text">Archivio Digitale</p>
      </span>
    </a>
  </div>
  <router-link v-if="document" tag="div" class="profile" :to="'/user/' + document.author._id" active-class="profile--active">
    <img class="pic" :srcset="'/static/pics/' + document.author._id + '/xs 100w, /static/pics/' + document.author._id + '/sm 300w, /static/pics/' + document.author._id + '/md 500w, /static/pics/' + document.author._id + '/lg 800w, /static/pics/' + document.author._id + '/xlg 1200w'"
      :alt="document.author.firstname + ' ' + document.author.lastname">
    <div class="info">
      <p class="info__name">
        <span class="info__name--firstname">{{ document.author.firstname }}</span>
        <span class="info__name--lastname"> {{ document.author.lastname }}</span>
      </p>
      <p class="subtitle heading-fifth">View profile</p>
    </div>

  </router-link>
  <div class="buttons">
    <div class="content">
      <button class="back" @click="back">
        <span class="icon">
          <i class="fas fa-chevron-left"></i>
        </span>
        <span class="crop">Torna indietro</span>
      </button>
      <button class="download" @click="download">
        <span class="icon">
          <i class="fas fa-download"></i>
        </span>
        <span class="crop">
          Scarica
        </span>
      </button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['document'],
  methods: {
    back () {
      window.close()
    },
    download () {
      const id = this.document._id
      let a = document.createElement('A')
      a.href = `/static/documents/${id}`
      a.download = this.document.name
      a.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
    background-color: var(--color-primary);
    @include clearfix;
    width: 100vw;

    &__logo {
        display: table-cell;
        vertical-align: middle;
        float: left;

        .content {
            text-align: left;
            display: table-cell;
            vertical-align: middle;
            text-decoration: none;

            * {
                display: inline-block;
                vertical-align: middle;
            }

            .fermi {
                height: 6rem;
                width: 6rem;
                position: relative;
                // background-color: #2F3D45;

                .logo {
                    position: absolute;
                    @include absCenter;
                    height: 4rem;
                    width: 4rem;
                    background-color: $color-white-6;
                    mask-image: url("/logo/solo.svg");
                    mask-size: cover;
                    transition: all 0.2s ease-in-out;
                    cursor: pointer;

                    &:hover {
                        background-color: var(--color-accent);
                    }
                }
            }

            .archivio {
                padding: 0 1rem;
                .separator {
                    height: 3rem;
                    width: 0.05rem;
                    background-color: white;
                    margin-right: 1rem;
                    display: none;

                    @include respond(phone) {
                        display: none;
                    }
                }

                .text {
                    font-size: 2rem;
                    color: white;
                    font-family: 'Bitter';

                    @include respond(phone) {
                        display: none;
                    }
                }
            }

        }

    }

    .buttons {
        float: right;
        height: 100%;
        height: 6rem;
        display: table;
        padding: 0 1rem;

        .content {
            display: table-cell;
            vertical-align: middle;

            button {
                text-decoration: none;
                font-size: 1.4rem;
                outline: none;
                cursor: pointer;
                display: inline-block;
                transition: all 0.2s ease-in-out;

                &:not(:last-child) {
                    margin-right: 1.5rem;
                }

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
        }

        .back {
            padding: 1.2rem 1.5rem;
            font-weight: bold;
            color: white;
            border-radius: 0.3rem;
            border: 1px solid rgba(white, 0.2);
            background: none;

            &:hover {
                background-color: rgba(white, 0.2);
            }
        }

        .download {
            border: none;
            padding: 1.2rem 1.5rem;
            font-weight: bold;
            color: white;
            border-radius: 0.3rem;
            background-image: $linear-gradient-primary--light;

            &:active {
                box-shadow: 0 0.5rem 1rem rgba(black, 0.2) inset;
            }

        }
    }

}

.profile {
    padding: 1rem;
    float: right;
    grid-template-columns: 4rem auto;
    grid-gap: 1rem;
    cursor: pointer;
    display: grid;
    position: relative;

    @include respond(phone) {
        grid-template-columns: 1fr;
    }
    &--active,
    &:hover {
        background-color: #09090f;
    }
    .pic {
        width: 4rem;
        border-radius: 0.25rem;
    }
    .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        @include respond(phone) {
            display: none;
        }
        .info__name {
            color: $color-white-6;
            margin-bottom: 0.4rem;
        }
        .subtitle {
            color: var(--color-text-tertiary);
        }
    }

    .dropdown {
        position: absolute;
        background-color: var(--color-primary);
        z-index: 2000000;
        top: 6rem;
        left: 0;
        width: 100%;
        display: none;

        .section {
            width: 100%;
        }
    }

    &:hover .dropdown {
        display: block;
    }

}
</style>
