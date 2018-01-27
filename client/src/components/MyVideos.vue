<template>
  <div>
      <v-layout row>
        <h4 class="display-1">My Videos</h4>
        <v-btn absolute right color="primary" dark @click="$router.push('/user/videos/upload')">Upload Video</v-btn>
      </v-layout>
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
export default {
  name: 'MyVideos',
  data () {
    return {
      videos: [
        {
          id: 'testID1',
          title: 'test data',
          description: 'test data description',
          thumbnail: 'https://i.ytimg.com/vi/Pxvmb2ykGTA/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDCGwdrklSj6MmIcU13frqifHgL8w'
        },
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
