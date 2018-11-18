<template>
<header class="header">
  <div class="logo">
    <a href="/home/" class="logo__content">
      <img src="/logo/itisFermi_white.svg" class="fermi" alt="ITIS Enrico Fermi">
      <div class="separator"></div>
      <p class="archivio">Archivio Digitale</p>
    </a>
  </div>
  <div class="menu">
    <ul class="buttons">
      <li>
        <router-link to="/login" tag="a" class="login">Login</router-link>
      </li>
      <li>
        <router-link to="/signup" tag="a" class="signup">Registrati</router-link>
      </li>
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
    // background-image: linear-gradient($color-fourth, $color-primary);
    // background-color: $color-primary;
    display: table;
    transition: all 0.2s ease-in-out;

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
            text-decoration: none;

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

                &:not(:last-child) {
                  margin-right: 1.5rem;
                }

                a,
                a:link,
                a:visited {
                    // text-transform: uppercase;
                    // padding: 0.7rem;
                    display: block;
                    text-decoration: none;
                    font-size: 1.4rem;
                }

                .login {

                    padding: 1.2rem 1.5rem;
                    font-weight: bold;
                    color: $color-white;
                    border-radius: 0.3rem;
                    border: 1px solid rgba($color-white, 0.2);

                    &:hover {
                        background-color: rgba($color-white, 0.2);
                    }
                }

                .signup {

                    padding: 1.2rem 1.5rem;
                    font-weight: bold;
                    color: $color-white;
                    border-radius: 0.3rem;
                    background-color: $color-primary;

                    &:hover {
                        background-color: lighten(#1A8D4C, 2%);
                    }

                    // &,
                    // &:link,
                    // &:visited {
                    //
                    //     color: $color-fourth;
                    //     border-radius: 2rem;
                    //     background-color: $color-white;
                    //     transition: all 0.2s;
                    //     position: relative;
                    //     border: none;
                    //     cursor: pointer;
                    // }
                    //
                    // &:hover {
                    //     transform: translateY(-0.2rem);
                    //     box-shadow: 0 1rem 2rem rgba($color-black, 0.2);
                    //
                    //     &::after {
                    //         transform: scaleX(1.4) scaleY(1.6);
                    //         opacity: 0;
                    //     }
                    //
                    // }
                    //
                    // &:active,
                    // &:focus {
                    //     outline: none;
                    //     transform: translateY(-0.1rem);
                    //     box-shadow: 0 0.5rem 1rem rgba($color-black, 0.2);
                    // }
                    //
                    // &::after {
                    //     content: "";
                    //     display: inline-block;
                    //     height: 100%;
                    //     width: 100%;
                    //     border-radius: 10rem;
                    //     position: absolute;
                    //     top: 0;
                    //     left: 0;
                    //     z-index: -1;
                    //     transition: all 0.4s;
                    //     background-color: $color-white;
                    //     color: $color-black;
                    // }

                }

            }
        }

    }

}
</style>
