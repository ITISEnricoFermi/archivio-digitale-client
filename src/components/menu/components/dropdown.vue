<template>
<router-link :to="to" class="section">
  <div class="content">
    <p class="text">
      <span class="text--icon">
        <i :class="icon"></i>
      </span>
      <span class="text--crop">{{ text }}</span>
    </p>
  </div>
</router-link>
</template>

<script>
export default {
  props: ['to', 'icon', 'text']
}
</script>

<style lang="scss" scoped>
.section {
    text-decoration: none;
    display: block;
    cursor: pointer;

    &:hover {
        background-color: #09090f;
    }

    &:hover * {
      color: var(--color-accent)!important;
    }

    .content {
        padding: 1rem;
        height: 6rem;
        display: flex;
        align-items: center;

        @include respond(tab-por) {
          justify-content: center;
        }

        p {
            white-space: nowrap;
        }
    }

    .text {
        color: white;

        &--icon {
            margin: 0.5rem;
        }

        &--crop {
            margin: 0.5rem;
            @include respond(tab-por) {
                display: none;
            }
        }
    }

    &:hover .dropdown {
        display: block;
    }
}
</style>
