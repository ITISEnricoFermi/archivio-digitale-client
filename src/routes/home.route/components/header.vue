<template>
<header class="header">
    <a href="/home/" class="logo"></a>
  <app-search></app-search>
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
import Search from './search.vue'

export default {
  components: {
    appSearch: Search
  }
}
</script>

<style scoped lang="scss">
.header {
    width: 100%;
    z-index: 10000;
    padding: 1.5rem;
    background-color: #282828;
    display: grid;
    transition: all 0.2s ease-in-out;
    grid-template-columns: 8rem auto max-content;
    grid-gap: 1.5rem;
    align-items: center;

    @include respond(phone) {
        padding: 3vh;
    }

    .logo {
        height: 4.5rem;
        background-color: $color-white-6;
        mask-image: url("/logo/itisFermi_white.svg");
        mask-size: cover;
        transition: all 0.2s ease-in-out;
        cursor: pointer;

        &:hover {
            background-color: var(--color-secondary);
        }

    }

    .search {
        width: 100%;
    }

    .menu {

        .buttons {
            text-align: right;
            padding: 0;

            li {
                display: inline-block;

                &:not(:last-child) {
                    margin-right: 1.5rem;
                }

                a,
                a:link,
                a:visited {
                    display: block;
                    text-decoration: none;
                    font-size: 1.4rem;
                }

                .login {
                    padding: 1.2rem 1.5rem;
                    font-weight: bold;
                    color: white;
                    border-radius: 0.3rem;
                    background-color: var(--color-secondary);

                    &:hover {
                        background-color: rgba(white, 0.2);
                    }
                }

                .signup {

                    padding: 1.2rem 1.5rem;
                    font-weight: bold;
                    color: white;
                    border-radius: 0.3rem;
                    background-color: lighten(#2d303a, 5%);

                    &:hover {
                        background-color: var(--color-secondary);
                    }

                }

            }
        }

    }

}
</style>
