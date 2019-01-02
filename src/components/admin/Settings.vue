<template>
  <div class="settings">
    <form @submit.prevent="submit">
      <div class="row">
        <div class="ok" v-if="success">
          <p>Settings saved successfully.</p>
        </div>
        <div class="error" v-if="errors.length > 0">
          <ul>
            <li v-for="(error, index) in errors" :key="index">
              {{ error.message }}
            </li>
          </ul>
        </div>
        <div class="col-md-6 form-group">
          <label for="soundcloud">Soundcloud</label>
          <input type="text" class="form-control" id="soundcloud" v-model="settings.soundcloud" placeholder="URL for Soundcloud">
        </div>
        <div class="col-md-6 form-group">
          <label for="youtube">Youtube</label>
          <input type="text" class="form-control" id="youtube" v-model="settings.youtube" placeholder="URL for Youtube">
        </div>
        <div class="col-md-6 form-group">
          <label for="spotify">Spotify</label>
          <input type="text" class="form-control" id="spotify" v-model="settings.spotify" placeholder="URL for Spotify">
        </div>
        <div class="col-md-6 form-group">
          <label for="songkick">Songkick</label>
          <input type="text" class="form-control" id="songkick" v-model="settings.songkick" placeholder="URL for Songkick">
        </div>
        <div class="col-md-6 form-group">
          <div class="preview" v-if="landing_bg || settings.landing_bg">
            <img :src="landing_bg || settings.landing_bg">
            <br />
            <button class="btn btn-outline-danger" @click.prevent="removeImage('landing_bg')">Remove image</button>
          </div>
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="landing_bg" aria-describedby="landing_bg" @change="upload('landing_bg', $event)">
            <label class="custom-file-label" for="landing_bg">Landing's background</label>
          </div>
        </div>
        <div class="col-md-6 form-group">
          <div class="preview" v-if="bio_bg || settings.bio_bg">
            <img :src="bio_bg || settings.bio_bg">
            <br />
            <button class="btn btn-outline-danger" @click.prevent="removeImage('bio_bg')">Remove image</button>
          </div>
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="bio_bg" aria-describedby="bio_bg" @change="upload('bio_bg', $event)">
            <label class="custom-file-label" for="bio_bg">Biography's background</label>
          </div>
        </div>
        <div class="col-md-6 form-group">
          <div class="preview" v-if="shop_bg || settings.shop_bg">
            <img :src="shop_bg || settings.shop_bg">
            <br />
            <button class="btn btn-outline-danger" @click.prevent="removeImage('shop_bg')">Remove image</button>
          </div>
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="shop_bg" aria-describedby="shop_bg" @change="upload('shop_bg', $event)">
            <label class="custom-file-label" for="shop_bg">Shop's background</label>
          </div>
        </div>
        <div class="col-md-6 form-group">
          <div class="preview" v-if="contact_bg || settings.contact_bg">
            <img :src="contact_bg || settings.contact_bg">
            <br />
            <button class="btn btn-outline-danger" @click.prevent="removeImage('contact_bg')">Remove image</button>
          </div>
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="contact_bg" aria-describedby="contact_bg" @change="upload('contact_bg', $event)">
            <label class="custom-file-label" for="contact_bg">Contact's background</label>
          </div>
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
export default {
  name: 'Settings',
  props: ['settings'],
  data () {
    return {
      landing_bg: '',
      shop_bg: '',
      bio_bg: '',
      contact_bg: '',
      success: false,
      errors: []
    }
  },

  methods: {
    upload (field, e) {
      let file = e.target.files[0]
      let reader = new FileReader()
      let vm = this
      reader.onload = (e) => {
        vm[field] = e.target.result
      }
      reader.readAsDataURL(file)
    },

    removeImage (field) {
      this[field] = ''
    },

    submit () {
      let formData = new FormData()
      formData.append('soundcloud', this.settings.soundcloud)
      formData.append('youtube', this.settings.youtube)
      formData.append('spotify', this.settings.spotify)
      formData.append('songkick', this.settings.songkick)
      formData.append('landing_bg', document.getElementById('landing_bg').files[0])
      formData.append('bio_bg', document.getElementById('bio_bg').files[0])
      formData.append('shop_bg', document.getElementById('shop_bg').files[0])
      formData.append('contact_bg', document.getElementById('contact_bg').files[0])

      this.$axios.post('/settings', formData, {
        headers: {
          'Authorization': `Bearer ${VueCookie.get('token')}`
        }
      })
        .then(() => {
          this.success = true
        })
        .catch(e => {
          console.log(e.response.data)
        })
    }
  }
}
</script>
