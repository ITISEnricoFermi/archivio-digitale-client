<template>
  <div class="screen">
    <div class="menu">
      <div class="options">
        <div class="option option__red"></div>
        <div class="option option__yellow"></div>
        <div class="option option__green"></div>
      </div>
      <div class="textfield"></div>
      <div class="buttons">
        <p class="more u-noselect">
          <i class="fas fa-bars"></i>
        </p>
      </div>
    </div>
    <div class="content">
      <img :src="url" alt="Application" class="img" v-if="url">
    </div>
  </div>
</template>

<script>
export default {
  props: ['url'],
  created () {
    window.addEventListener('scroll', () => {
      const scale = 1
      const height = window.innerHeight
      const width = window.innerWidth
      const scroll = window.window.scrollY
      const screen = document.querySelectorAll('.screen')[0]
      const offset = width / 100 * 50
      const percentage = (-scroll + offset) * scale / height
      //
      // if (scroll >= (height / 100 * 20)) {
      //   console.log(getComputedStyle(screen).top.split('p')[0] - 100)
      //   screen.style.top = getComputedStyle(screen).top.split('p')[0] - 100
      // } else {
      // screen.style.transform = `scale(${percentage})`
      // }

      // if (scroll >= menu && scroll <= height) {
      //   header.style.top = '-10rem'
      //
      //   // const percentage = (scroll * scale) / height
      //   //
      //   // header.style.opacity = percentage < scale ? percentage : scale
      // } else if (scroll > height) {
      //   header.style.position = 'fixed'
      //   header.style.top = '0rem'
      //   header.style.backgroundImage = 'linear-gradient(45deg, #1A8D4C 1%, #22B863 64%, #66BA6B 97%)'
      // } else if (scroll < menu) {
      //   header.style.top = '0rem'
      //   header.style.position = 'absolute'
      //   header.style.backgroundImage = ''
      // }
    })
  }
}
</script>

<style scoped lang="scss">
.screen {
  background-color: #39444D;
  // background-color: $color-white-3;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content auto;
  grid-gap: 1rem;
  border-radius: 0.6rem;

  .menu {
    display: flex;

    .options {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      margin-right: 1rem;

      .option {
        height: 0.8rem;
        width: 0.8rem;
        border-radius: 0.8rem;

        &:not(:last-child) {
          margin-right: 0.4rem;
        }

          &__red {
            background-color: #D74645;
          }

          &__yellow {
            background-color: #D7C045
          }

          &__green {
            background-color: #43AB9B;
          }
      }
    }

    .textfield {
      background-color: #2D363D;
      // background-color: $color-white-5;
      height: 2rem;
      border: none;
      margin-right: 1rem;
    }

    .buttons {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;

        .more {
          display: block;
          color: #2D363D;
        }
    }

  }

  .content {
    background-color: #2D363D;
    height: 100%;
    width: 100%;
    border-radius: 0.6rem;
    overflow: hidden;

    .img {
        width: 100%;
        display: block;
    }

  }

}
</style>
