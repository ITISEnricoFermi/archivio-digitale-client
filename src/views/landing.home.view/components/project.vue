<template>
<a :href="'/public/documents/' + project.directory" class="module module--padded project" target="_blank">
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
      <img class="author-img" sizes="5rem" :srcset="'/pics/' + project.author._id + '/xs.jpeg 100w, /pics/' + project.author._id + '/sm.jpeg 300w, /pics/' + project.author._id + '/md.jpeg 500w, /pics/' + project.author._id + '/lg.jpeg 800w, /pics/' + project.author._id + '/xlg.jpeg 1200w'"
        :alt="project.author.firstname + ' ' + project.author.lastname">
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
  computed: {
    date: function () {
      let timestamp = this.project._id.toString().substring(0, 8)
      let date = new Date(parseInt(timestamp, 16) * 1000)
      let getMonth = (date) => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return months[date.getMonth()]
      }
      return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ', ' + date.getDate() + ' ' + getMonth(date)
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
                margin-left: 1.5rem;
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
