<template>
  <div>
      <v-layout row>
        <h4 class="display-1">My Videos</h4>
        <v-btn absolute right color="primary" dark @click="$router.push('/user/videos/upload')">Upload Video</v-btn>
      </v-layout>
    <v-layout row wrap>
      <v-flex pr-3 pl-3 pt-3 pb-3 xs6 v-for="video in videos" v-bind:key="video.id">
      <v-card >
        <v-card-media v-bind:src="'http://localhost:8081/thumbnails/'+video.id+'.png'" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0"><a style="color:black" @click="$router.push('/watch?v='+video.id)">{{video.title}}</a></h3>
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
  name: 'MyVideos',
  data () {
    return {
      videos: []
    }
  },
  mounted() {
    if(this.$store.state.token == null){
        this.$router.push('/')
      }
    Api().post('/user/videos', {token: this.$store.state.token}).then((result) => {
      this.videos = result.data
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
