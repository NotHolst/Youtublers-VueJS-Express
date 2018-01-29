<template>
  <div>
    <video class="flex xs12" :src="videoURL" autoplay controls/>
    <v-card class="mt-2">
      <v-card-title primary-title>
          <div>
            <h4 class="display-1">{{video.title}}</h4>
            <p>{{video.description}}</p>
          </div>
      </v-card-title>

    </v-card>
  </div>
</template>

<script>
import Api from '../Api'
export default {
  name: 'VideoPlayer',
  data () {
    return {
      video: {},
    }
  },
  props: ['videoid'],
  mounted() {
    Api().get('video?v='+this.videoid).then((res) => {
      console.log()
      this.video = res.data
    })
  },
  computed: {
    videoURL() {
      return 'http://localhost:8081/videos/' + this.video.id + '.mp4'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
