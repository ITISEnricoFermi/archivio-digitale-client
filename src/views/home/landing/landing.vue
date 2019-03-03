<template>
<main>
  <app-header></app-header>
  <section class="sections top">
    <div class="content">
      <div class="heading">
        <p class="title">Archivio Digitale</p>
        <app-search></app-search>
      </div>
      <app-screen url="/layout/screen.png"></app-screen>
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
        <transition name="scale" v-for="(project, index) in projects" :key="index">
          <app-project :project="project"></app-project>
        </transition>
      </div>
      <div class="no-projects" mode="out-in" v-else>
        <div class="module module--padded project">
          <p>Nessun documento presente nella categoria selezionata.</p>
        </div>
      </div>
    </div>
  </section>
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
  data: () => {
    return {
      projects: []
    }
  },
  created () {
    window.addEventListener('scroll', () => {
      // const scale = 1
      const height = window.innerHeight
      const scroll = window.window.scrollY
      const header = document.querySelectorAll('.header')[0]
      const menu = 100 // 100px height

      if (scroll >= menu && scroll <= height) {
        header.style.top = '-10rem'

        // const percentage = scroll * scale / height
        //
        // header.style.opacity = percentage < scale ? percentage : scale
      } else if (scroll > height) {
        header.style.position = 'fixed'
        header.style.top = '0rem'
        header.style.backgroundImage = 'linear-gradient(45deg, #1A8D4C 1%, #22B863 64%, #66BA6B 97%)'
      } else if (scroll < menu) {
        header.style.top = '0rem'
        header.style.position = 'absolute'
        header.style.backgroundImage = ''
      }

      // const percentage = scroll * 100 / height

      const [heading] = document.querySelectorAll('.heading')
      const [screen] = document.querySelectorAll('.screen')
      // const [top] = document.querySelectorAll('.top')
      heading.style.top = `calc(${scroll / 7}rem + 35vh)`
      screen.style.top = `calc(${scroll / 9}rem + 60vh)`
      // top.style.clipPath = `circle(${-percentage + 100}%)`

      // heading.style.right = `-${scroll / 5}rem`
      // screen.style.left = `-${scroll / 7}rem`
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

    & > .header {
        position: absolute;
        top: 0;
    }

    .sections {
        position: relative;
        width: 100%;
    }

    .top {
        background-image: linear-gradient(45deg, #1A8D4C 1%, lighten(#1A8D4C, 10%) 64%, #66BA6B 97%);
        max-height: 100vh;
        overflow: hidden;

        .content {
            height: 100vh;
            width: 100%;
            position: relative;
            overflow: hidden;

            .heading {
                text-align: center;
                width: 100%;
                height: 20rem;
                position: absolute;
                top: 35vh;

                .title {
                    color: $color-white;
                    font-weight: 400;
                    font-family: 'Bitter';
                    font-weight: bold;
                    font-size: 5rem;
                    text-shadow: 0 0 1rem rgba($color-black, 0.2);

                    @include respond(big-desktop) {
                        margin-top: -1rem;
                    }

                    @include respond(phone) {
                      font-size: 3rem;
                    }

                }

            }

            .search {
              position: absolute;
              @include absCenter;

              @include respond(tab-por) {
                top: 50%!important;
                width: 70%;
              }

              @include respond(phone) {
                  top: 38%!important;
              }
            }

            .screen {
                position: absolute;
                margin-left: 15%;
                top: 60vh;
                width: 70%;
                box-shadow: 0 1.5rem 4rem rgba($color-black, 0.2);

                @include respond(tab-por) {
                    width: 80%;
                    margin-left: 10%;
                }

                @include respond(phone) {
                    width: 233%;
                }
            }
        }

    }

    .projects {
        padding: 0;
        background-color: $color-white-2;

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
