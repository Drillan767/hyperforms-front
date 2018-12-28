<template>
  <div class="profile">
    <form @submit.prevent="submit">
      <div class="row">
        <div class="ok" v-if="success">
          <p>Profile informations saved successfully.</p>
        </div>
        <div class="error" v-if="errors.length > 0">
          <ul>
            <li v-for="(error, index) in errors" :key="index">
              {{ error.message }}
            </li>
          </ul>
        </div>
        <div class="col-md-8 offset-md-2 form-group">
          <label for="email">Email address</label>
          <input type="text" class="form-control" id="email" v-model="user.email" placeholder="Email address">
        </div>
        <div class="input-group col-md-8 offset-md-2">
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="picture" aria-describedby="picture" @change="upload">
            <label class="custom-file-label" for="picture">Choose file</label>
          </div>
        </div>
        <div class="preview col-md-8 offset-md-2" v-if="preview || user.picture">
          <img :src="preview || user.picture" />
          <br />
          <button class="btn btn-outline-danger" @click.prevent="removeImage">Remove image</button>
        </div>
        <div class="form-group col-md-8 offset-md-2">
          <label for="biography">Biography</label>
          <textarea class="form-control" id="biography" rows="3" v-model="user.biography" @input="update" placeholder="Biography (min: 30)"></textarea>
          <small class="form-text text-muted">
            **<b>bold text</b>**<br />
            *<i>Italic text</i>*<br />
            * Unordered list<br />
            1. Ordered list<br />
          </small>
        </div>
        <div class="col-md-8 offset-md-2 form-group">
          <label for="twitter">Twitter</label>
          <input type="text" class="form-control" id="twitter" v-model="user.twitter" placeholder="URL to the Twitter account">
        </div>
        <div class="col-md-8 offset-md-2 form-group">
          <label for="facebook">Facebook</label>
          <input type="text" class="form-control" id="facebook" v-model="user.facebook" placeholder="URL to the Facebook account">
        </div>
        <div class="col-md-8 offset-md-2 form-group">
          <label for="instagram">Instagram</label>
          <input type="text" class="form-control" id="instagram" v-model="user.instagram" placeholder="URL to the Instagram account">
        </div>
        <hr class="col-sm-12" />
        <div class="col-md-8 offset-md-2 form-group">
          <label for="n_pwd">New password</label>
          <input type="password" class="form-control" id="n_pwd" v-model="n_pwd" placeholder="New password (8 characters minimum)">
        </div>
        <div class="col-md-8 offset-md-2 form-group">
          <label for="r_pwd">Repeat password</label>
          <input type="password" class="form-control" id="r_pwd" v-model="r_pwd" placeholder="Repeat password">
        </div>
        <div class="col-md-12 text-center">
          <button class="btn btn-secondary" type="submit">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import VueCookie from '../extra/VueCookie'
import _ from 'underscore'
export default {
  name: 'profile',
  props: ['user'],
  data () {
    return {
      success: false,
      preview: '',
      n_pwd: '',
      r_pwd: '',
      errors: []
    }
  },

  methods: {
    upload (e) {
      let file = e.target.files[0]
      let reader = new FileReader()
      let vm = this

      reader.onload = (e) => {
        vm.preview = e.target.result
      }
      reader.readAsDataURL(file)
    },

    removeImage () {
      this.preview = ''
    },

    update () {
      _.debounce(e => {
        this.user.biography = e.target.value
      })
    },

    submit () {
      this.errors = []

      if (this.n_pwd.length > 0) {
        if (this.n_pwd.length < 8) {
          this.errors.push({ message: 'The new password is too small' })
        }
        if (this.r_pwd === '') {
          this.errors.push({ message: 'Please confirm your password' })
        }
        if (this.r_pwd !== this.n_pwd) {
          this.errors.push({ message: 'Passwords are not matching' })
        }
      }

      if (this.errors.length === 0) {
        let formData = new FormData()
        formData.append('email', this.user.email)
        formData.append('picture', document.getElementById('picture').files[0])
        formData.append('biography', this.user.biography)
        formData.append('twitter', this.user.twitter)
        formData.append('facebook', this.user.facebook)
        formData.append('instagram', this.user.instagram)
        formData.append('password', this.n_pwd)

        this.$axios.post('/user/update', formData, {
          headers: {
            'Authorization': `Bearer ${VueCookie.get('token')}`
          }
        })
          .then(() => {
            this.success = true
          })
          .catch(e => {
            console.log(e.response)
            this.errors = e.response.data
          })
      }
    }
  }
}
</script>
