<template>
<header class="header">
  <section class="header__top">
    <div class="logo">
      <img src="/static/logo/itisFermi_white.svg" class="logo__fermi">
      <div class="separator"></div>
      <p class="logo__archivio">Archivio Digitale</p>
    </div>
    <ul class="menu">
      <li><a href="http://www.itisfermi.it" target="_blank">Itis Enrico Fermi</a></li>
      <li><a href="/help">Serve aiuto?</a></li>
      <li><a href="https://www.riccardosangiorgio.com">Riccardo Sangiorgio</a></li>
    </ul>
    <ul class="buttons">
      <li><a href="/login">Login</a></li>
      <li><a href="/signup">Registrati</a></li>
    </ul>
  </section>
  <section class="header__bottom">
    <ul>
      <li>
        <a href="#">
          <i class="far fa-file-alt"></i>
          <span>Documenti</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i class="fas fa-film"></i>
          <span>Video</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i class="fas fa-headphones"></i>
          <span>Audio</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i class="fas fa-archive"></i>
          <span>Collezioni</span>
        </a>
      </li>
    </ul>
  </section>
</header>
</template>

<script>
export default {
  name: 'headerMenu'
}
</script>

<style scoped lang="scss">
.header {
    width: 100%;
    // background-image: linear-gradient(45deg, lighten($color-primary, 10%), lighten($color-primary, 12.5%));
    background-color: lighten($color-primary, 10%);
    // position: fixed;
    z-index: 10000;
    box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.05);

    &__top {
        width: 100%;
        text-align: center;
        display: table;
        border-bottom: 1px solid lighten($color-primary, 12%);

        &>* {
            display: table-cell;
            vertical-align: middle;
            width: calc(100% / 3);
        }

        .logo {
            text-align: left;

            * {
                display: inline-block;
                vertical-align: middle;
            }

            .separator {
                height: 3rem;
                width: 0.05rem;
                background-color: $color-white;
                margin: 0 1rem;
            }

            &__fermi {
                height: 4.5rem;
                margin: 0.75rem 0.75rem 0.75rem 3vh;
            }

            &__archivio {
                font-size: 2rem;
                color: $color-white;
            }
        }

        .menu {
            padding: 0;
            margin: 0 auto;
            text-align: center;

            li {
                display: inline-block;
                margin: 0 2rem;
                a {
                    color: $color-white;
                    font-size: $font-default-2;
                    text-decoration: none;
                }
            }
        }

        .buttons {
            text-align: right;
            padding: 0;

            li {
                display: inline-block;

                &:nth-child(1) {
                    a {
                        color: $color-white;
                    }
                }

                &:nth-child(2) {
                    a {
                        color: $color-black;
                        border-radius: 2rem;
                        background-color: $color-white;
                        margin: 0 3vh 0 1vh;
                    }
                }

                a {
                    text-transform: uppercase;
                    padding: 0.7rem;
                    display: block;
                    text-decoration: none;
                    font-size: 1.2rem;
                }
            }
        }

    }

    &__bottom {
        width: 100%;

        ul {
            padding: 0;
            width: 100%;
            text-align: center;

            li {
                display: inline-block;

                a {
                    display: block;
                    padding: 3vh;
                    color: $color-secondary;
                    text-decoration: none;

                    * {
                        display: inline-block;
                    }

                    i {
                        font-size: 5rem;
                    }

                    span {
                        font-size: 1.2rem;
                    }
                }
            }
        }
    }
}
</style>
