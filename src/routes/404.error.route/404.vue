<template>
<div>
  <app-header></app-header>
  <main class="main">
    <div class="content">
      <div class="box">
        <p class="heading-primary">Errore 404</p>
        <p class="heading-fourth">Pagina non trovata</p>
      </div>
    </div>
  </main>
</div>
</template>

<script>
import Header from '@/routes/home.route/components/header'

export default {
  name: 'ErrorPageNotFound',
  components: {
    appHeader: Header
  }
}
</script>

<style scoped lang="scss">
.header {
    position: fixed;
}
</style>

<style lang="scss">

.main {
    height: 100vh;
    width: 100%;
    .content {
        height: 100%;
        width: 100%;
        .box {
            position: absolute;
            top: 50%;
            left: 50%;
            text-align: center;
            @include absCenter;

            p {
              margin: 1rem;
            }
        }
    }
}
</style>
