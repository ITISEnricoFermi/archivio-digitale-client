<template>
<div class="video">
  <video-player class="player" ref="videoPlayer"
  :options="playerOptions"
  :playsinline="true"
  customEventName="customstatechangedeventname"
  @play="onPlayerPlay($event)"
  @pause="onPlayerPause($event)"
  @ended="onPlayerEnded($event)"
  @waiting="onPlayerWaiting($event)"
  @playing="onPlayerPlaying($event)"
  @loadeddata="onPlayerLoadeddata($event)"
  @timeupdate="onPlayerTimeupdate($event)"
  @canplay="onPlayerCanplay($event)"
  @canplaythrough="onPlayerCanplaythrough($event)"
  @statechanged="playerStateChanged($event)"
  @ready="playerReadied">
  </video-player>
</div>
</template>

<script>
import {
  eventBus
} from '@/main'

import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
//
// import axios from 'axios'

export default {
  props: ['entity'],
  data () {
    return {
      playerOptions: {
        muted: false,
        language: 'it',
        width: 0,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        aspectRatio: '16:9',
        sources: [{
          type: 'video/mp4',
          src: undefined
        }]
        // poster: '/static/images/author.jpg'
      }
    }
  },
  async created () {
    this.playerOptions.sources[0].src = 'public/documents/' + this.entity.directory
    // try {
    //   let {directory} = (await axios.get('/documents/info/' + this.entity._id)).data
    //   this.playerOptions.sources[0].src = 'public/documents/' + directory
    // } catch (e) {
    //   eventBus.notification({
    //     title: e.response.data,
    //     temporary: true
    //   })
    // }
  },
  mounted () {
    // console.log('This is current player instance object', this.player)
    this.playerOptions.width = document.querySelectorAll('.video')[0].clientWidth
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    closePopUp () {
      eventBus.closePopUp()
    },
    // listen event
    onPlayerPlay (player) {
      // console.log('player play!', player)
    },
    onPlayerPause (player) {
      // console.log('player pause!', player)
    },

    onPlayerEnded (player) {},
    onPlayerWaiting (player) {},
    onPlayerPlaying (player) {},
    onPlayerLoadeddata (player) {},
    onPlayerTimeupdate (player) {},
    onPlayerCanplay (player) {},
    onPlayerCanplaythrough (player) {},

    // or listen state event
    playerStateChanged (playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied (player) {
      // console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    }
  },
  components: {
    videoPlayer
  }
}
</script>

<style lang="scss">

.video:parent {
    padding: 0vh!important;
    display: none;
}

.player {
    width: 100%;
    .vjs-big-play-button {
      position: absolute;
      @include absCenter;
    }
}
</style>
