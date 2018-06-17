<template>
<main id="app" class="main__home">
  <link href="https://fonts.googleapis.com/css?family=Bitter:400,700" rel="stylesheet">
  <section class="sections top">
    <app-header></app-header>
    <div class="content">
      <app-search></app-search>
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
        <div class="module project">
            <p>Nessun documento presente nella categoria selezionata.</p>
        </div>
      </div>
    </div>
  </section>
  <app-footer></app-footer>
</main>
</template>

<script>
import Header from './header'
import Search from './search'
import Project from './project'
import Filters from './filters'
import Footer from './footer'

export default {
  name: 'home',
  data: () => {
    return {
      projects: []
    }
  },
  components: {
    appHeader: Header,
    appSearch: Search,
    appProject: Project,
    appFilters: Filters,
    appFooter: Footer
  }
}
</script>

<style lang="scss">

body {
    min-height: 100vh!important;
    height: auto!important;
}

.main__home {
    width: 100vw;
    min-height: 100vh;
    height: auto;
    box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.05);

    .sections {
        position: relative;
        width: 100%;
    }

    .top {
        // background-color: $color-fourth;
        // background-image: url('/static/layout/bg.jpg');
        // background-size: cover;
        // background-repeat: no-repeat;
        // background-position: center;

        .content {
            height: 20vh;
            width: 100%;
            position: relative;
        }

    }

    .projects {

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
