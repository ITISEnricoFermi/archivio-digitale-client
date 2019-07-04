<template>
<main>
  <app-header></app-header>
  <section class="sections top">
    <div class="content">
      <div class="heading">
        <p class="title">Archivio Digitale</p>
        <p class="subtitle">L’Archivio Digitale ha lo scopo di conservare, e quindi valorizzare, ogni tipologia di materiale didattico prodotto dagli studenti del nostro istituto nel corso degli anni.</p>
        <a href="https://github.com/ITISEnricoFermi/archivio-digitale-server" class="readmore">
          <span class="crop">
            Scopri di più
          </span>
          <span class="icon">
            <i class="fas fa-arrow-right"></i>
          </span>
          <!-- <span class="crop">
            👉 Scopri di più
          </span> -->
        </a>
      </div>
      <div class="posts">
        <div class="post first"></div>
        <div class="post second"></div>
        <div class="post third"></div>
        <div class="post fourth"></div>
        <div class="post fifth"></div>
        <div class="post sixth"></div>
      </div>
      <app-screen url="/layout/screen.png"></app-screen>
    </div>
  </section>
  <!-- <section class="sections feautures">
    <div class="content">
      <div class="feautures-list">
        <div class="feauture">
          <div class="feauture__logo">
            <i class="fas fa-upload"></i>
          </div>
          <p class="feauture__title">
            Caricamento di documenti
          </p>
          <p class="feauture__description">
            L'Archivio Digitale è un raccoglitore di materiale multimediale con fini didattici, suddiviso in numerose categorie.
          </p>
        </div>
        <div class="feauture">
          <div class="feauture__logo">
            <i class="fas fa-folder-open"></i>
          </div>
          <p class="feauture__title">
            Raccolta in collezioni
          </p>
          <p class="feauture__description">
            I documenti caricati possono essere raggruppati in una o più collezioni che possono identificare aree tematiche comuni o progetti.
          </p>
        </div>
        <div class="feauture">
          <div class="feauture__logo">
            <i class="fas fa-search"></i>
          </div>
          <p class="feauture__title">
            Ricerca dei documenti
          </p>
          <p class="feauture__description">
            I documenti possono essere trovati con velocità grazie alla ricerca fulltext e se necessario con una ricerca avanzata.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="sections projects">
    <div class="content">
      <div class="header">
        <p class="header__title">Ultimi documenti</p>
        <app-filters @filter="projects = $event"></app-filters>
      </div>
      <app-filters @filter="projects = $event"></app-filters>
      <div class="projects-list" v-if="projects.length">
        <transition name="panel" mode="out-in" v-for="(project, index) in projects" :key="index">
          <app-project :project="project"></app-project>
        </transition>
      </div>
      <div class="no-projects" mode="out-in" v-else>
        <div class="module module--padded project">
          <p>Nessun documento presente nella categoria selezionata.</p>
        </div>
      </div>
    </div>
  </section> -->
</main>
</template>

<script>
import Search from './components/search'
import Project from './components/project'
import Filters from './components/filters'
import Header from '@/routes/home.route/components/header'

import Screen from './components/pc.screen/pc'

export default {
  name: 'home',
  data () {
    return {
      projects: []
    }
  },
  created () {
    window.addEventListener('scroll', () => {
      const height = window.innerHeight
      const scroll = window.window.scrollY
      const header = document.querySelectorAll('.header')[0]
      const menu = 100 // 100px height
      if (scroll >= menu && scroll <= height) {
        header.style.top = '-10rem'
      } else if (scroll > height) {
        header.style.position = 'fixed'
        header.style.top = '0rem'
      } else if (scroll < menu) {
        header.style.top = '0rem'
        header.style.position = 'absolute'
        header.style.backgroundImage = ''
      }
    })
  },
  components: {
    appSearch: Search,
    appProject: Project,
    appFilters: Filters,
    appScreen: Screen,
    appHeader: Header
  }
}
</script>

<style scoped lang="scss">
main {
    overflow: hidden;
    & > .header {
        position: absolute;
        top: 0;
    }

    .sections {
        position: relative;
        width: 100%;
    }

    .top {
        height: 100vh;
        overflow: hidden;
        background-color: #282828;
        position: relative;

        @keyframes slide {
            0% {
                transform: translate3d(0, 0, 0);
            }
            100% {
                transform: translate3d(calc(-4000px/3), 0, 0);
            }
        }

        @keyframes slideInverted {
            0% {
                transform: translate3d(0, 0, 0);
            }
            100% {
                transform: translate3d(calc(4000px/3), 0, 0);
            }
        }

        .posts {
            overflow: hidden;
            position: absolute;
            display: grid;
            grid-template-rows: repeat(4, 1fr);
            grid-gap: 2rem;
            left: 50%;
            transform: translateX(-50%);
            top: 8rem;

            .post {
                height: 15rem;
                background-repeat: repeat-x;
                background-size: contain;
                width: 400rem;
                background-image: url("/layout/post.svg");
            }

            .first,
            .third,
            .fifth {
                animation: slide 60s linear infinite;
            }

            .second,
            .fourth,
            .sixth {
                animation: slideInverted 60s linear infinite;
            }
        }

        .content {
            height: 100vh;
            width: 100%;
            position: relative;

            .heading {
                padding: 0 5rem;
                width: 100%;
                height: 20rem;
                position: absolute;
                top: 50%;
                left: 10rem;
                transform: translateY(-50%);
                z-index: 100000;
                color: $color-white;

                @include respond(tab-por) {
                    @include absCenter;
                }

                .title {
                    font-weight: 400;
                    font-family: 'Bitter', sans-serif;
                    font-weight: bold;
                    font-size: 5rem;
                    text-shadow: 0 0 1rem rgba($color-black, 0.2);
                }

                .subtitle {
                    font-weight: 500;
                    width: 50rem;
                    font-size: 1.8rem;
                    margin-top: 2rem;

                    @include respond(tab-por) {
                        width: 40rem;
                    }

                    @include respond(phone) {
                        width: 30rem;
                    }
                }

                .readmore {
                    padding: 1.2rem 1.5rem;
                    font-weight: bold;
                    color: $color-white;
                    border-radius: 0.3rem;
                    background-color: $color-palette-green;
                    text-decoration: none;
                    margin-top: 2rem;
                    display: inline-block;

                    span.icon {
                        margin: 0 0.5rem;
                    }

                    &:hover {
                        background-color: rgba($color-white, 0.2);
                    }
                }

            }

            .screen {
                position: absolute;
                right: 5rem;
                top: 25vh;
                z-index: 1000000;
                width: 70rem;
                box-shadow: 0 1.5rem 4rem rgba($color-black, 0.2);
                display: none;

                @include respond(tab-lan) {
                    display: none;
                }
            }

        }

    }

    .feautures {
        background-color: $color-fourth;
        overflow: hidden;
        padding: 5vh 3vh;
        // top: -30rem;
        // clip-path: polygon(0 0, 100% 50%, 100% 100%, 0% 100%);

        @include respond(phone) {
            min-height: 100vh;
        }

        .content {
            width: 100%;

            .feautures-list {
                display: flex;

                @include respond(tab-por) {
                    display: block;
                }

                *:not(:last-child) {
                    margin-bottom: 1rem;
                }

                .feauture {
                    text-align: center;
                    color: $color-white;
                    flex: 1 1 100%;
                    padding: 2rem 4rem;

                    &__logo {
                        display: block;
                        font-size: 5rem;
                        display: block;
                    }

                    &__title {
                        font-weight: 500;
                        font-size: 2rem;
                    }

                    &__description {
                        font-size: 1.6rem;
                        text-align: center;
                        margin: 0 auto;

                        @include respond(tab-por) {
                            width: 50%;
                        }

                        @include respond(phone) {
                            width: 100%;
                        }
                    }
                }
            }
        }

    }

    .projects {
        padding: 0;
        background-color: $color-white-2;
        min-height: 100vh;

        @include respond(tab-por) {
            padding: 0;
        }

        .content {
            margin: 0 auto;
            width: 80%;
            padding: 6vh;

            @include respond(tab-por) {
                width: 100%;
                padding: 3vh;
            }

            .menu {
                right: 10%;
                top: 5%;
            }

            .header {
                width: 100%;
                margin-bottom: 4rem;

                @include respond(tab-por) {
                    margin-bottom: 3rem;
                }

                &__title {
                    color: $color-grey-2;
                    font-size: 2rem;
                    display: inline-block;

                    @include respond(tab-por) {
                        display: none;
                    }

                }

                .filters {
                    float: right;

                    @include respond(tab-por) {
                        display: none;
                    }

                }

            }

            & > .filters {
                margin-bottom: 3rem;
                display: none;

                @include respond(tab-por) {
                    display: block;
                }

            }

            .projects-list {
                display: grid;
                grid-template-rows: repeat(3, 1fr);
                grid-template-columns: repeat(3, 1fr);
                grid-column-gap: $gutter-horizontal + 2rem;
                grid-row-gap: $gutter-vertical + 2rem;

                @include respond(tab-lan) {
                    grid-template-columns: repeat(2, 1fr);
                }

                @include respond(tab-por) {
                    grid-template-columns: repeat(1, 1fr);
                }

                .project:nth-child(9) {
                    @include respond(tab-lan) {
                        display: none;
                    }

                    @include respond(tab-port) {
                        display: block;
                    }

                }
            }
        }

    }

}
</style>
