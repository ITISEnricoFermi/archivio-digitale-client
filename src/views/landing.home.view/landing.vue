<template>
<main>
  <section class="sections top">
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

export default {
  name: 'home',
  data: () => {
    return {
      projects: []
    }
  },
  components: {
    appSearch: Search,
    appProject: Project,
    appFilters: Filters
  }
}
</script>

<style scoped lang="scss">

main {

    .sections {
        position: relative;
        width: 100%;
    }

    .top {
        // background-color: $color-fourth;
        // background-image: url('/layout/bg.jpg');
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
