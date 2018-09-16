<template>
<footer>
  <ul>
    <li>
      <router-link to="/login" tag="a">Login</router-link>
    </li>
    <li>
      <router-link to="/signup" tag="a">Registrati</router-link>
    </li>
    <li><a href="https://www.riccardosangiorgio.com">Riccardo Sangiorgio</a></li>
  </ul>
</footer>
</template>

<script>
export default {
  name: 'footerLite'
}
</script>

<style lang="scss">
footer {
    text-align: center;
    position: absolute;
    bottom: 1rem;
    left: 0;
    width: 100%;
    padding: 3rem!important !important;
    z-index: 999;
    ul {
        li {
            display: inline-block;
            list-style: none;
            a {
                display: block;
                color: $color-grey-1;
                text-decoration: none;
                text-transform: uppercase;
                padding: 1rem 1.5rem;
                font-size: $font-default-2;
                font-weight: bold;
            }
        }
    }
}
</style>
