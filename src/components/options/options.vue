<template>
  <div class="options module">
    <div class="options__header">
      <p class="option">
        <span class="icon">
          <i :class="title.icon" aria-hidden="true"></i>
        </span>
        <span class="crop">
          {{ title.crop }}
        </span>
      </p>
    </div>
    <div class="options__content">
      <ul>
        <router-link class="option" :to="option.link" tag="li" active-class="option--active" v-for="(option, index) in options" :key="index">
          <span class="icon">
            <i :class="option.icon"></i>
          </span>
          <span class="crop">
            {{ option.crop }}
          </span>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'options']
}
</script>

<style lang="scss" scoped>

.options {
    border-radius: 0.3rem;
    border: 1px solid var(--color-neutral-third);

    @include respond(tab-por) {
        border: none;
        border-top: 1px solid var(--color-neutral-third);
        border-radius: 0rem;
    }

    .option {
        transition: background-color 0.2s ease-in-out;
        cursor: pointer;
        padding: 1.5rem;
        text-align: left;
        list-style: none;
        color: var(--color-text-primary);

        &--active {
          border-left: 2px solid var(--color-accent);

          @include respond(tab-por) {
            border-left: none;
              border-bottom: 2px solid var(--color-accent)!important;
          }
        }

        &:first-child,
        &:not(:last-child) {
            border-bottom: 1px solid var(--color-neutral-third);

            @include respond(tab-por) {
                border-bottom: none;
                border-right: 1px solid var(--color-neutral-third);
            }

        }

        @include respond(tab-por) {
            flex: 1 1 100%;
            text-align: center;
        }

        &:hover {
            background-color: var(--color-surface-secondary);
        }

        span.icon {
            margin: 0 0.5rem;
            @include respond(tab-por) {
                margin: 0.5rem;
            }
        }

        span.crop {
            @include respond(tab-por) {
                display: none;
            }
        }
    }

    &__content,
    &__header {
        width: 100%;
    }

    &__header {

        p {
            background-color: var(--color-surface-secondary);
            color: var(--color-text-secondary);
            font-weight: bold;
        }

        @include respond(tab-por) {
            display: none;
        }

    }

    &__content {

        ul {
            padding: 0;

            @include respond(tab-por) {
                display: flex;
            }

        }
    }
}

</style>
