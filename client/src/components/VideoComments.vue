<template>
  <div>
      <v-layout column>
          <v-flex xs12 v-for="comment in comments" v-bind:key="comment.id">
            <v-card class="mt-2" >
            <v-card-title primary-title>
                <div>
                    <h4>{{comment.User.username}}</h4>
                    <p>{{comment.message}}</p>
                </div>
            </v-card-title>
            </v-card>
          </v-flex>
            <v-flex xs12>
            <v-card class="mt-2" >
            <v-card-title primary-title>
                <div style="width:100%;">
                    <h4 v-if="comments != null && comments.length == 0">No comments on this video yet</h4>
                    <v-form v-model="valid" ref="form" lazy-validation autocomplete="off" v-if="$store.state.user != null">
                            <v-divider class="mt-2 mb-2"/>
                            <v-text-field label="Write new comment" v-model="message" multi-line
                            :rules="[(v) => !!v || 'Message is required']" required >
                            </v-text-field>

                            <v-btn @click="submit" :disabled="!valid">Add Comment</v-btn>
                    </v-form>
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
  name: 'VideoComments',
  data () {
    return {
      comments: null,
      message: '',
      valid: true
    }
  },
  props: ['videoid'],
  mounted() {
    this.fetch()
  },
  methods: {
      submit() {
          Api().post('/comment', {token: this.$store.state.token, message: this.message, VideoId: this.videoid}).then((c) => {
              this.fetch()
              this.message = ''
          })
      },
      fetch() {
          Api().get('videocomments?v='+this.videoid).then((res) => {
              console.log(res)
            this.comments = res.data
            })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
