<template>
<a :href="'/public/documents/' + project.directory" class="module project" target="_blank">
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
      <img :src="'/pics/' + project.author.img" class="author-img" :alt="project.author.firstname + ' ' + project.author.lastname">
      <div>
        <p class="author-name">{{ project.author.firstname }} {{ project.author.lastname }}</p>
        <p class="project-date">{{ date }}</p>
      </div>
    </div>
  </div>
</a>
</template>

<script>
export default {
  name: 'project',
  props: ['project'],
  data: () => {
    return {

    }
  },
  computed: {
    date: function () {
      let timestamp = this.project._id.toString().substring(0, 8)
      return new Date(parseInt(timestamp, 16) * 1000).toUTCString()
    }
  }
}
</script>

<style scoped lang="scss">
.project {
    margin-bottom: 0!important;
    transition: all 0.1s ease-in-out;
    display: block;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 0.25rem 1rem rgba($color-black, 0.20);
    }

    .project-name {
        text-align: left;
        color: $color-grey-1;
        @include ellipsis($font-default-1, $line-height-default,1);
    }

    .project-description {
        text-align: justify;
        color: $color-grey-2;
        @include ellipsis($font-default-3, $line-height-default, $lines-to-show);
    }

    &__details {
        text-align: left;

        .col-1-of-1 {
            display: table;

            .author-img {
                border-radius: 0.25rem;
                box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.05);
                height: 5rem;
                vertical-align: middle;
                display: inline-block;
            }

            div {
                margin-left: 1rem;
                display: inline-block;
                vertical-align: middle;
                text-align: left;

                .author-name {
                    display: block;
                    font-size: $font-default-2;
                    color: $color-grey-1;
                    margin-bottom: 0.5rem;
                }

                .project-date {
                    display: block;
                    font-size: $font-default-3;
                    color: $color-grey-1;
                }
            }

        }

    }
}
</style>
