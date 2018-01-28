<template>
  <div>
    <video-player></video-player>
  </div>
</template>

<script>
import VideoPlayer from './VideoPlayer'
export default {
    components: {
        VideoPlayer
    },
    name: 'Watch',
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
