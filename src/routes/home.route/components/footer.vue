<template>
<footer class="footer">
  <section class="top">
    <div class="legal">
      <p class="copyright">Copyright © 2019 <a href="https://itisfermi.edu.it">ITIS Enrico Fermi</a></p>
      <p class="powered">Powered by <a href="https://riccardosangiorgio.com">Riccardo Sangiorgio</a></p>
    </div>
    <div class="social">
      <ul>
        <li>
          <a href="https://itisfermi.edu.it">
            <i class="fas fa-graduation-cap"></i>
          </a>
        </li>
        <li>
          <a href="https://github.com/ITISEnricoFermi">
            <i class="fab fa-github"></i>
          </a>
        </li>
        <li>
          <a href="https://t.me/itisfermi">
            <!-- <i class="fab fa-telegram"></i> -->
            <i class="fab fa-telegram-plane"></i>
          </a>
        </li>
      </ul>
    </div>
  </section>
  <section class="bottom">
    <div class="section">
      <div class="section__header">
        <p class="title">Archivio</p>
      </div>
      <div class="section__body">
        <ul>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/login">Registrati</a>
          </li>
          <li>
            <a href="https://itisenricofermi.github.io/archivio-digitale-docs/">Documentazione</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="section">
      <div class="section__header">
        <p class="title">Link Utili</p>
      </div>
      <div class="section__body">
        <ul>
          <li>
            <a href="https://itisfermi.edu.it">ITIS Enrico Fermi</a>
          </li>
          <li>
            <a href="https://itisfermi.edu.it/biblioteca">Biblioteca Enrico Fermi</a>
          </li>
          <li>
            <a href="https://moodle.itisfermi.edu.it">Fermi Forma Online</a>
          </li>
          <li>
            <a href="https://itisfermi.edu.it/fermipress">FermiPress</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="section">
      <div class="section__header">
        <p class="title">Contatti</p>
      </div>
      <div class="section__body">
        <ul>
          <li>
            <a href="https://goo.gl/maps/d46pUThYwRS5R2d67">
              <span class="icon">
                <i class="fas fa-map-marker-alt"></i>
              </span>
              <span class="crop">
                Via Trionfale 8737 - 00135 Roma (RM)
              </span>
            </a>
          </li>
          <li>
            <a href="mailto:admin@archivio.itisfermi.edu.it">
              <span class="icon">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="crop">
                admin@archivio.itisfermi.edu.it
              </span>
            </a>
          </li>
          <li>
            <a href="https://github.com/ITISEnricoFermi">
              <span class="icon">
                <i class="fab fa-github"></i>
              </span>
              <span class="crop">
                @ITISEnricoFermi
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</footer>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.footer {
    width: 100%;

    .bottom,
    .top {
        padding-left: 15rem;
        padding-right: 15rem;

        @include respond(tab-lan) {
            padding-left: 10rem;
            padding-right: 10rem;
        }

        @include respond(tab-por) {
            padding-left: 5rem;
            padding-right: 5rem;
        }

    }

    .top {
        background-color: #1b1b1b;
        padding-top: 2rem;
        padding-bottom: 2rem;
        font-size: 1.4rem;
        display: grid;
        justify-content: space-between;
        grid-template-columns: auto auto;
        align-items: center;

        // @include respond(phone) {
        //     grid-template-columns: auto;
        //     grid-gap: 1rem;
        // }

        .legal {

            .copyright {
                color: $color-white-5;
                margin-bottom: 0.5rem;

                a {
                    color: inherit;
                    text-decoration: none;
                }
            }

            .powered {
                color: $color-grey-2;

                a {
                    color: $color-white-5;
                    text-decoration: none;
                }
            }

        }

        .social {

            ul {
                padding: 0;

                li {
                    display: inline-block;
                    font-size: 1.6rem;

                    a {
                        padding: 0 1rem;
                        color: $color-white-5;
                        text-decoration: none;
                        transition: all 0.2s ease-in-out;

                        &:hover {
                            color: $color-white;
                        }
                    }
                }
            }

        }

    }

    .bottom {
        padding-top: 5rem;
        padding-bottom: 5rem;
        background-color: #212121;
        color: $color-white-5;
        font-size: 1.4rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;

        @include respond(tab-por) {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            grid-gap: 5rem;
        }

        .section {

            @include respond(tab-por) {
                text-align: center;
            }

            &__header {
                margin-bottom: 3rem;

                @include respond(tab-por) {
                    margin-bottom: 2rem;
                }

                .title {
                    text-transform: uppercase;
                    font-weight: bold;

                    display: inline-block;
                    padding-bottom: 1rem;
                    border-bottom: 0.3rem solid $color-palette-green;
                }

            }

            &__body {

                ul {
                    padding: 0;

                    li {
                        list-style: none;

                        &:not(:last-child) {
                            margin-bottom: 1.5rem;
                        }

                        a {
                            color: $color-white-5;
                            text-decoration: none;

                            span.icon {
                                margin: 0 0.5rem;
                            }
                        }

                    }

                }
            }
        }

    }
}
</style>
