<template>
  <div class="heading">
    <p class="title">Archivio Digitale</p>
    <p class="subtitle">L’Archivio Digitale ha lo scopo di conservare, e quindi valorizzare, ogni tipologia di materiale didattico prodotto dagli studenti del nostro istituto nel corso degli anni.</p>
    <a href="https://itisenricofermi.github.io/archivio-digitale-docs/" class="readmore">
      <span class="crop">
        Scopri di più
      </span>
      <span class="icon">
        <i class="fas fa-arrow-right"></i>
      </span>
      <!-- <span class="crop">
        👉 Scopri di più
      </span> -->
    </a>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.heading {
    padding: 0 5rem;
    width: 100%;
    height: 20rem;
    position: absolute;
    top: 50%;
    left: 10rem;
    transform: translateY(-50%);
    z-index: 100000;
    color: white;

    @include respond(tab-por) {
        @include absCenter;
    }

    .title {
        font-weight: 400;
        font-family: 'Bitter', sans-serif;
        font-weight: bold;
        font-size: 5rem;
        text-shadow: 0 0 1rem rgba(black, 0.2);
    }

    .subtitle {
        font-weight: 500;
        width: 50rem;
        font-size: 1.8rem;
        margin-top: 2rem;

        @include respond(tab-por) {
            width: 40rem;
        }

        @include respond(phone) {
            width: 30rem;
        }
    }

    .readmore {
        padding: 1.2rem 1.5rem;
        font-weight: bold;
        color: white;
        border-radius: 0.3rem;
        background-color: var(--color-secondary);
        text-decoration: none;
        margin-top: 2rem;
        display: inline-block;

        span.icon {
            margin: 0 0.5rem;
        }

        &:hover {
            background-color: rgba(white, 0.2);
        }
    }

}
</style>
