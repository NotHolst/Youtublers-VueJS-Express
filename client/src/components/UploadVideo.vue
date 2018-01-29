<template>
  <div>
      <h4 class="display-1 mb-4">Upload video</h4>
    <v-form v-model="valid" ref="form" lazy-validation>

        <input type="file" id="video" name="video" v-on:change="setVideo"/>
        <label class="btnUpload" for="video">{{uploadText}}</label>
        <v-divider class="mt-2 mb-2"/>
        <v-text-field
        label="Title"
        v-model="title"
        :rules="[(v) => !!v || 'Title is required']"
        :counter="10"
        required
        ></v-text-field>
        <v-text-field multi-line
        label="Description"
        v-model="description"
        :rules="[
        (v) => !!v || 'Description is required',
        (v) => v.length <= 255 || 'Description cannot be more than 255 characters'
        ]"
        required
        ></v-text-field>

        <v-btn
        @click="submit"
        :disabled="!valid"
        >
        submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
  </v-form>
  </div>
</template>

<script>
import Api from '../Api';
export default {
  name: 'UploadVideo',
  data: () => ({
      valid: true,
      video: null,
      uploadText: 'Choose a video file',
      title: '',
      description: ''
    }),
    mounted () {
      if(this.$store.state.token == null){
        this.$router.push('/')
      }
    },
  methods: {
      setVideo (e){
          var files = e.target.files || e.dataTransfer.files;
          if(files.length != 1) return;
          this.video = files[0];
          this.uploadText = this.video.name;
      },
      submit () {
        if (this.$refs.form.validate()) {

          const formData = new FormData();
          formData.append('title', this.title)
          formData.append('description', this.description)
          formData.append('video', this.video)
          formData.append('token', this.$store.state.token)

          Api().post('/videos/upload', formData).then(() => {
            this.$router.push('/user/videos')
          }).catch(() => {
              this.uploadText = 'Server could not be reached'
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type=file] {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
.btnUpload{
    cursor: pointer;
    background: #03a9f4;
    padding: 1rem;
    font-weight: bold;
    color: white;
    border-radius: 3px;
    display: block;
    text-align: center;
}
</style>
