<template>
  <div>
    <video class="flex xs12" :src="video.url" autoplay controls/>
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
export default {
  name: 'VideoPlayer',
  data () {
    return {
      video: {
          id: 'testID1',
          title: 'this is a cat video',
          description: 'may contain cats',
          thumbnail: 'https://i.ytimg.com/vi/Pxvmb2ykGTA/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDCGwdrklSj6MmIcU13frqifHgL8w',
          url: 'http://localhost:8081/videos/rklt5BcSM.mp4'
        },
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
