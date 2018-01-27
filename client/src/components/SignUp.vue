<template>
  <div>
    <v-form v-model="valid" ref="form" lazy-validation autocomplete="off">
        <h4 class="display-1">Sign Up</h4>
        <v-divider class="mt-2 mb-2"/>

        <v-alert color="error" icon="warning" :value="errorText != null">
          {{errorText}}
        </v-alert>
        <v-text-field label="Username" v-model="username"
        :rules="[(v) => !!v || 'Username is required']" required ></v-text-field>

        <v-text-field label="Password" v-model="password" :type="'password'" 
        :rules="[(v) => !!v || 'Password is required',]" required ></v-text-field>

        <v-text-field label="Repeat password" v-model="password2" :type="'password'" 
        :rules="[(v) => v === password || 'Passwords do not match',]" required ></v-text-field>


        <v-btn @click="submit" :disabled="!valid">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
  </v-form>
  </div>
</template>

<script>
import Api from '../Api'
export default {
  name: 'SignUp',
  data: () => ({
      valid: true,
      username: null,
      password: null,
      password2: null,
      errorText: null
  }),
  methods: {
      submit () {
        if (this.$refs.form.validate()) {
          Api().post('/signup', {
            username: this.username,
            password: this.password,
          }).then((res) => {
            this.$store.dispatch('setUser', res.data.user)
            this.$store.dispatch('setToken', res.data.token)
            this.$router.push({
              name: 'MostPopular', 
              params: {flashMessage: 'You account has been created, you are now logged in' }
              })
          }).catch((e) => {
              switch(e.response.data.error.name){
                case 'SequelizeUniqueConstraintError':{
                  this.errorText = 'Username already taken, please pick another one'
                }
                default:{

                }
              }
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

</style>
