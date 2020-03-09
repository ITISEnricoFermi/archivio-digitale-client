<template>
  <router-link
    :to="{name: 'Files', params: { id: project._id }}"
    class="module module--padded project"
    target="_blank"
  >
    <div class="row">
      <div class="col-1-of-1">
        <p class="project-name">{{ project.name }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <p class="project-description">{{ project.description }}</p>
      </div>
    </div>
    <div class="row project__details">
      <div class="col-1-of-1">
        <img
          class="author-img"
          sizes="5rem"
          :srcset="'/static/pics/' + project.author._id + '/xs 100w, /static/pics/' + project.author._id + '/sm 300w, /static/pics/' + project.author._id + '/md 500w, /static/pics/' + project.author._id + '/lg 800w, /static/pics/' + project.author._id + '/xlg 1200w'"
          :alt="project.author.firstname + ' ' + project.author.lastname"
        >
        <div>
          <p class="author-name">{{ project.author.firstname }} {{ project.author.lastname }}</p>
          <p class="project-date">{{ date }}</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'project',
  props: ['project'],
  computed: {
    date () {
      const timestamp = this.project._id.toString().substring(0, 8)
      const date = new Date(parseInt(timestamp, 16) * 1000)

      return new Intl.DateTimeFormat('it-IT', {
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date)
    }
  }
}
</script>

<style scoped lang="scss">
.project {
  margin-bottom: 0 !important;
  transition: all 0.1s ease-in-out;
  display: block;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0.25rem 1rem rgba(black, 0.2);
  }

  .project-name {
    text-align: left;
    color: var(--color-text-secondary);
    @include ellipsis($font-default-1, $line-height-default, 1);
  }

  .project-description {
    text-align: justify;
    color: var(--color-text-tertiary);
    @include ellipsis($font-default-3, $line-height-default, $lines-to-show);
  }

  &__details {
    text-align: left;

    .col-1-of-1 {
      display: table;

      .author-img {
        border-radius: 0.25rem;
        box-shadow: 0 0.25rem 0.75rem rgba(black, 0.05);
        height: 5rem;
        vertical-align: middle;
        display: inline-block;
      }

      div {
        margin-left: 1.5rem;
        display: inline-block;
        vertical-align: middle;
        text-align: left;

        .author-name {
          display: block;
          font-size: $font-default-2;
          color: var(--color-text-secondary);
          margin-bottom: 0.5rem;
        }

        .project-date {
          display: block;
          font-size: $font-default-3;
          color: var(--color-text-secondary);
        }
      }
    }
  }
}
</style>
