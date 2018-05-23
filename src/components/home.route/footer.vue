<template>
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
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">

.footer {
    background-color: $color-white-4;
    width: 100%;
    position: absolute;
    bottom: 0;

    @include respond(tab-por) {
      position: relative;
      bottom: 0;
    }

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
</style>
