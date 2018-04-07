<template>
<header class="header">
  <div class="logo">
    <div class="logo__content">
      <img src="/static/logo/itisFermi_white.svg" class="fermi">
      <div class="separator"></div>
      <p class="archivio">Archivio Digitale</p>
    </div>
  </div>
  <div class="menu">
    <ul class="buttons">
      <li><a href="/login">Login</a></li>
      <li><a href="/signup">Registrati</a></li>
    </ul>
  </div>
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
    text-align: center;
    width: 100%;
    z-index: 10000;
    height: 10rem;
    padding: 4vh 6vh;
    background-color: $color-primary;
    display: table;

    @include respond(phone) {
      padding: 3vh;
    }

    .logo {
        display: table-cell;
        vertical-align: middle;

        &__content {
            text-align: left;
            height: 4.5rem;
            display: table-cell;
            vertical-align: middle;

            * {
                display: inline-block;
                vertical-align: middle;
            }

            .fermi {
                height: 4.5rem;
                // margin: 0.75rem 0.75rem 0.75rem 3vh;
            }

            .separator {
                height: 3rem;
                width: 0.05rem;
                background-color: $color-white;
                margin: 0 1rem;

                @include respond(phone) {
                    display: none;
                }
            }

            .archivio {
                font-size: 2rem;
                color: $color-white;
                font-family: 'Bitter';

                @include respond(phone) {
                    display: none;
                }
            }

        }

    }

    .menu {
        display: table-cell;
        vertical-align: middle;

        .buttons {
            text-align: right;
            padding: 0;
            float: right;

            li {
                display: inline-block;

                a,
                a:link,
                a:visited {
                    text-transform: uppercase;
                    padding: 0.7rem;
                    display: block;
                    text-decoration: none;
                    font-size: 1.2rem;
                }

                &:nth-child(1) {
                    a {
                        color: $color-white;
                    }
                }

                &:nth-child(2) {
                    a {

                        &,
                        &:link,
                        &:visited {

                            color: $color-fourth;
                            border-radius: 2rem;
                            background-color: $color-white;
                            transition: all 0.2s;
                            position: relative;
                            border: none;
                            cursor: pointer;
                        }

                        &:hover {
                            transform: translateY(-0.2rem);
                            box-shadow: 0 1rem 2rem rgba($color-black, 0.2);

                            &::after {
                                transform: scaleX(1.4) scaleY(1.6);
                                opacity: 0;
                            }

                        }

                        &:active,
                        &:focus {
                            outline: none;
                            transform: translateY(-0.1rem);
                            box-shadow: 0 0.5rem 1rem rgba($color-black, 0.2);
                        }

                        &::after {
                            content: "";
                            display: inline-block;
                            height: 100%;
                            width: 100%;
                            border-radius: 10rem;
                            position: absolute;
                            top: 0;
                            left: 0;
                            z-index: -1;
                            transition: all 0.4s;
                            background-color: $color-white;
                            color: $color-black;
                        }

                    }
                }

            }
        }

    }

}
</style>
