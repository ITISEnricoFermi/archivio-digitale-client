<template>
  <div class="menu">
    <div class="menu__logo">
      <a href="/dashboard/" class="content">
        <div class="fermi">
          <div class="logo"></div>
        </div>
        <span class="archivio">
          <div class="separator"></div>
          <p class="text">Archivio Digitale</p>
        </span>
      </a>
    </div>
    <router-link tag="div" class="profile" :to="'/user/' + user._id" active-class="profile--active" v-if="user._id">
      <img class="pic" :srcset="'/static/pics/' + user._id + '/xs 100w, /static/pics/' + user._id + '/sm 300w, /static/pics/' + user._id + '/md 500w, /static/pics/' + user._id + '/lg 800w, /static/pics/' + user._id + '/xlg 1200w'" :alt="user.firstname + ' ' + user.lastname">
      <div class="info">
        <p class="info__name">
          <span class="info__name--firstname">{{ user.firstname }}</span>
          <span class="info__name--lastname"> {{ user.lastname }}</span>
        </p>
        <p class="subtitle heading-fifth">Visualizza profilo</p>
      </div>
      <div class="dropdown">
        <app-dropdown to="/settings/" icon="fas fa-cog" text="Impostazioni"></app-dropdown>
        <app-dropdown to="/docs/" icon="far fa-question-circle" text="Aiuto"></app-dropdown>
        <app-dropdown to="/logout/" icon="fas fa-sign-out-alt" text="Logout"></app-dropdown>
      </div>
    </router-link>
    <div class="menu__menu">
      <router-link tag="div" class="link" to="/dashboard/" active-class="link--active">
        <p class="link__text">
          <span class="link__text--icon">
            <i class="fas fa-tachometer-alt"></i>
          </span>
          <span class="link__text--crop">Dashboard</span>
        </p>
      </router-link>
      <router-link class="link" to="/documents/" tag="div" active-class="link--active">
        <p class="link__text">
          <span class="link__text--icon">
            <i class="fas fa-file-alt"></i>
          </span>
          <span class="link__text--crop">Documenti</span>
        </p>
      </router-link>
      <router-link class="link" to="/collections/" tag="div" active-class="link--active">
        <p class="link__text">
          <span class="link__text--icon">
            <i class="fas fa-folder" aria-hidden="true"></i>
          </span>
          <span class="link__text--crop">Collezioni</span>
        </p>
      </router-link>
      <router-link class="link" v-if="admin" to="/admin/" tag="div" active-class="link--active">
        <p class="link__text">
          <span class="link__text--icon">
            <i class="fa fa-user-secret" aria-hidden="true"></i>
          </span>
          <span class="link__text--crop">Admin</span>
        </p>
      </router-link>
    </div>
  </div>
</template>

<script>

import Dropdown from './components/dropdown'

export default {
  props: ['user'],
  computed: {
    admin () {
      if (this.user.privileges._id === 'admin') {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    appDropdown: Dropdown
  }
}
</script>

<style lang="scss" scoped>
.menu {
    background-color: #212121;
    @include clearfix;
    width: 100%;

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

    &__menu {
        float: right;
        .link {
            padding: 1rem;
            height: 6rem;
            display: inline-flex;
            align-items: center;
            cursor: pointer;
            position: relative;
            z-index: 2000000;

            &--active,
            &:hover {
                background-color: #09090f;
            }

            &:hover * {
              color: var(--color-accent)!important;
            }

            &__text {
                color: white;

                &--icon {
                    margin: 0.5rem;
                }
                &--crop {
                    margin: 0.5rem;
                    @include respond(tab-por) {
                        display: none;
                    }
                }
            }

            .dropdown {
              position: absolute;
              background-color: var(--color-primary);
              z-index: 2000000;
              top: 6rem;
              left: 0;
              display: none;
            }

            &:hover .dropdown,
            &:active .dropdown {
              display: block;
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
        cursor: pointer;

        @include respond(tab-por) {
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

            @include respond(tab-por) {
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

}
</style>
