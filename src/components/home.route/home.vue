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
      <div class="projects-list">
        <transition name="scale" v-for="(project, index) in projects" :key="index">
          <app-project :project="project"></app-project>
        </transition>
      </div>
    </div>
  </section>
  <section class="footer">
    <div class="content">
      <div class="footer-info">
        <p class="powered">Powered By <a href="https://www.riccardosangiorgio.com">Riccardo Sangiorgio</a></p>
      </div>
      <div class="footer-menu">
        <ul>
          <li><a href="#">ITIS Enrico Fermi</a></li>
          <li><a href="#">Login</a></li>
          <li><a href="#">Registrati</a></li>
        </ul>
      </div>
    </div>
  </section>
</main>
</template>

<script>
import Header from './header'
import Search from './search'
import Project from './project'
import Filters from './filters'

export default {
  name: 'home',
  data: () => {
    return {
      projects: undefined
    }
  },
  components: {
    appHeader: Header,
    appSearch: Search,
    appProject: Project,
    appFilters: Filters
  }
}
</script>

<style lang="scss">
.main__home {
    width: 100vw;
    box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.05);

    .sections {
        position: relative;
        width: 100%;
    }

    .top {
        background-color: $color-fourth;
        // background-image: url('/static/layout/bg.jpg');
        // background-size: cover;
        // background-repeat: no-repeat;
        // background-position: center;

        .content {
            height: 40vh;
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
                // padding: 3vh;
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

                .project:last-child {
                    @include respond(tab-lan) {
                        display: none;
                    }
                }
            }
        }

    }

    .footer {
        background-color: $color-white-4;
        width: 100%;

        .content {
            width: 80%;
            height: 10rem;
            margin: 0 10%;
            padding: 6vh;

            @include respond(tab-por) {
                width: 100%;
                margin: 0;
                display: table;

                .footer-info,
                .footer-menu {
                    float: none;
                    text-align: center;
                    display: table-row;
                    vertical-align: middle;
                    width: 100%;

                    &:first-child {
                        padding-bottom: 3vh;
                    }
                }

            }

            .footer-info {
                float: left;

                .powered {
                    font-size: $font-default-3;
                    color: $color-grey-2;

                    a {
                        font-size: $font-default-3;
                        color: $color-tertiary;
                        text-decoration: none;
                    }
                }

            }

            .footer-menu {
                float: right;

                ul {
                    padding: 0;

                    li {
                        display: inline-block;
                        text-transform: uppercase;
                        margin-left: 2rem;

                        a {
                            font-size: $font-default-3;
                            color: $color-tertiary;
                            text-decoration: none;
                        }
                    }
                }

            }
            .row {
                display: table-cell;
                vertical-align: middle;
                width: 80%!important;

                .col-1-of-2 {
                    font-size: $font-default-3;
                    color: $color-grey-2;

                    &:first-child {
                        text-align: left;
                    }

                    &:last-child {
                        text-align: right;
                    }

                }
            }

        }
    }

}
</style>
