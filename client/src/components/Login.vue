<template>
  <div>
    <v-form v-model="valid" ref="form" lazy-validation autocomplete="off">
        <h4 class="display-1">Login</h4>
        <v-divider class="mt-2 mb-2"/>

        <v-alert color="error" icon="warning" :value="errorText != null">
          {{errorText}}
        </v-alert>
        <v-text-field label="Username" v-model="username"
        :rules="[(v) => !!v || 'Username is required']" required ></v-text-field>

        <v-text-field label="Password" v-model="password" :type="'password'" 
        :rules="[(v) => !!v || 'Password is required',]" required ></v-text-field>

        <v-btn absolute right @click="submit" :disabled="!valid">Login</v-btn>
  </v-form>
  </div>
</template>

<script>
import Api from '../Api'
export default {
  name: 'Login',
  data: () => ({
      valid: true,
      username: null,
      password: null,
      errorText: null
  }),
  methods: {
      submit () {
        if (this.$refs.form.validate()) {
          Api().post('/login', {
            username: this.username,
            password: this.password,
          }).then((res) => {
            this.$store.dispatch('setUser', res.data.user)
            this.$store.dispatch('setToken', res.data.token)
            this.$socket.emit('authenticate', {token: res.data.token})

            this.$router.push({
              name: 'MostPopular', 
              params: {flashMessage: 'You are now logged in' }
              })
          }).catch((e) => {
              this.errorText = e.response.data.error
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
