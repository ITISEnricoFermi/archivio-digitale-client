<template>
<div class="module">
  <div class="row">
    <div class="col-1-of-1">
      <div class="progress">
        <div class="bar" :class="{ 'bar--stripped': isStripped, 'bar--animated': isAnimated }" :style="'width: ' + value + '%;'"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'progressBar',
  props: ['value', 'isStripped', 'isAnimated']
}
</script>

<style scoped lang="scss">
.progress {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 1rem;
    overflow: hidden;
    font-size: 0.75rem;
    background-color: #e9ecef;
    border-radius: 0.25rem;
    height: 2rem;
    // box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.5) inset;

    .bar {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        color: $color-white;
        text-align: center;
        background-color: #007bff;
        transition: width 0.6s ease;
        // box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.5);
        &--stripped {
            background-image: linear-gradient(45deg, rgba($color-white, .15) 25%, transparent 25%, transparent 50%, rgba($color-white, .15) 50%, rgba($color-white, .15) 75%, transparent 75%, transparent);
            background-size: 2rem 2rem;
        }

        &--animated {
            -webkit-animation: progressBarStripes 1s linear infinite;
            animation: progressBarStripes 1s linear infinite;
        }
    }
}
</style>
