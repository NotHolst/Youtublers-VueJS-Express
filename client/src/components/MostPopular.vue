<template>
  <div>
    <h4 class="display-1">Most popular</h4>
    <v-layout row wrap>
      <v-flex pr-3 pl-3 pt-3 pb-3 xs6 v-for="video in videos" v-bind:key="video.id">
      <v-card >
        <v-card-media v-bind:src="video.thumbnail" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{video.title}}</h3>
            <div>{{video.description}}</div>
          </div>
        </v-card-title>
      </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Api from '../Api'
export default {
  name: 'MostPopular',
  data () {
    return {
      videos: []
    }
  },
  mounted () {
    Api().get('videos/popular').then((videos) => {
      this.videos = videos.data
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
