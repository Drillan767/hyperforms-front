<template>
  <div class="admin-layout container-fluid">
    <h1>Administration</h1>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link :to="{name: 'profile'}" class="nav-link">Profile</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'settings'}" class="nav-link">Settings</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'newsletter'}" class="nav-link">Newsletter</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'musics'}" class="nav-link">Musics</router-link>
      </li>
    </ul>
    <transition :name="transitionName">
      <router-view :settings="settings" :user="user" :musics="musics"></router-view>
    </transition>
    <hr />
  </div>
</template>

<script>
import VueCookie from '../extra/VueCookie'
export default {
  name: 'Admin',
  data () {
    return {
      settings: {
        soundcloud: '',
        youtube: '',
        spotify: '',
        songkick: '',
        landing_bg: '',
        shop_bg: '',
        contact_bg: '',
        bio_bg: ''
      },
      musics: {
        // ...
      },
      user: {
        email: '',
        biography: '',
        picture: '',
        facebook: '',
        twitter: '',
        instagram: ''
      },
      transitionName: ''
    }
  },

  beforeCreate () {
    const refreshToken = VueCookie.get('refresh_token')
    this.$axios.post('/user/refresh', { refreshToken: refreshToken })
      .then(response => {
        VueCookie.set('token', response.data.token)
        VueCookie.set('refresh_token', response.data.refreshToken)
      })
      .catch(() => {
        VueCookie.delete('refresh_token')
        VueCookie.delete('token')
        this.$router.replace('/login?denied=1')
      })
  },

  mounted () {
    this.$axios.get('/user')
      .then(response => {
        this.user = response.data
      })
      .catch(e => {
        console.log(e.response)
      })
    this.$axios.get('/settings')
      .then(response => {
        this.settings = response.data
      })
      .catch(e => {
        console.log(e.response)
      })
  },

  watch: {
    $route (to, from) {
      if (to.meta.order > from.meta.order) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    }
  }
}
</script>
