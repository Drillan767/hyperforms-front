<template>
  <div class="container login">
    <div class="login-form">
      <div class="main-div">
        <div class="error" v-if="denied">
          <p>You need to login before proceeding.</p>
        </div>
        <div class="panel">
          <h1>Login</h1>
        </div>
        <form @submit.prevent="signin">
          <div class="form-group">
            <input type="email" class="form-control" v-model="email" placeholder="Email Address">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" v-model="password" placeholder="Password">
          </div>
          <div class="forgot text-center">
            <router-link to="/reset">Forgot password?</router-link>
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VueCookie from '../extra/VueCookie'
export default {
  name: 'Login',
  data () {
    return {
      denied: false,
      email: '',
      password: '',
      error: ''
    }
  },

  mounted () {
    if (window.location.search.substr(1).includes('denied')) {
      this.denied = true
    }
  },

  methods: {
    signin () {
      this.$axios.post('/user/login', { email: this.email, password: this.password })
        .then(response => {
          VueCookie.set('token', response.data.token)
          VueCookie.set('refresh_token', response.data.refreshToken)
          this.$router.replace('/admin?login=1')
        })
        .catch(e => {
          VueCookie.delete('refresh_token')
          VueCookie.delete('token')
          this.error = e.response.data.error
        })
    }
  }
}
</script>
