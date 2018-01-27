<template>
  <v-app
    id="inspire"
  >
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.width > 1264"
      v-model="drawer"
      app
    >
      <v-list dense>
        <img src="./assets/youtublers_logo.svg"/>
        <v-list-tile v-for="item in items" :key="item.text" @click="$router.push(item.route)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider class="mt-2 mb-2"/>
        <div class="text-xs-center">
          <v-chip color="red" text-color="white">Utility & Testing</v-chip>
        </div>
        <v-list-tile v-for="item in testItems" :key="item.text" @click="$router.push(item.route)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="light-blue" dark dense fixed clipped-left app>
      <v-toolbar-title
        :style="$vuetify.breakpoint.width > 1264 && 'width: 300px'"
        class="ml-0 pl-3"
        :class="$vuetify.breakpoint.width <= 1264 && 'pr-3'"
      >
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        Youtublers
      </v-toolbar-title>
      <v-layout row align-center style="max-width: 650px">
        <v-text-field
          placeholder="Search..."
          single-line
          append-icon="search"
          :append-icon-cb="() => {}"
          class="white--text"
          hide-details
        ></v-text-field>
      </v-layout>
      <v-btn v-if="!$store.state.user" class="ml-4" @click="$router.push('signup')">Sign Up</v-btn>
      <v-btn v-if="!$store.state.user" @click="$router.push('login')">Login</v-btn>
      <v-btn v-if="$store.state.user" class="ml-4" @click="$router.push('user')">{{$store.state.user.username}}</v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-alert color="success" icon="checkmark" :value="$route.params.flashMessage != null">
          {{$route.params.flashMessage}}
        </v-alert>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      items: [
        { 
          icon: 'trending_up', 
          text: 'Most Popular', 
          route: '/' 
          },
        { 
          icon: 'subscriptions', 
          text: 'Subscriptions', 
          route: '/subscribtions' 
          },
        { 
          icon: 'video_library', 
          text: 'My Videos', 
          route: '/user/videos' 
          },
      ],
      testItems: [
        { 
          icon: 'notifications_active', 
          text: 'Notification Tester', 
          route: '/test/notifications' 
          },
      ]
    }),
    props: {
    }
  }
</script>

<style>

</style>
