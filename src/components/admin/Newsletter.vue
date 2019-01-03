<template>
  <div class="newsletter">
    <div class="row">
      <div class="col-2">
        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <a
            class="nav-link active"
            id="v-pills-home-tab"
            data-toggle="pill"
            href="#v-pills-home"
            role="tab"
            aria-controls="v-pills-home"
            aria-selected="true">
            All newsletters
          </a>
          <a
            class="nav-link"
            id="v-pills-profile-tab"
            data-toggle="pill"
            href="#v-pills-profile"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="false">
            New newsletter
          </a>
          <a
            class="nav-link"
            id="v-pills-messages-tab"
            data-toggle="pill"
            href="#v-pills-messages"
            role="tab"
            aria-controls="v-pills-messages"
            aria-selected="false">
            Subscribers list <span class="badge badge-light">{{ subscribers.length }}</span>
          </a>
        </div>
      </div>
      <!--All newsletters-->
      <div class="col-8 offset-1">
        <div class="tab-content" id="v-pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Created at</th>
                  <th>Updated at</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr></tr>
              </tbody>
            </table>
          </div>
          <!--New Newsletter-->
          <div
            class="tab-pane fade"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab">
            <form @submit.prevent="new_nl" class="row">
              <div class="form-group col-md-8 offset-md-2">
                <label for="title">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="newsletter.title"
                  placeholder="Newsletter's title"
                  required>
              </div>
              <div class="form-group col-md-8 offset-md-2">
                <label>Content</label>
                <markdown-editor v-model="newsletter.content" ref="markdownEditor" />
                <label>Insert an image for the content</label>
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="nl_upload" @change="upload">
                  <label class="custom-file-label" for="nl_upload">Choose file</label>
                </div>

                <div class="uploaded">
                  <button
                    class="btn btn-secondary copy"
                    v-for="(image, index) in images"
                    :key="index"
                    :data-title="tooltip"
                    @click.prevent="copy(image)"
                  >
                    {{ image.split(/[\\/]/).pop() }}
                  </button>
                </div>
              </div>
              <div class="form-group text-center col-md-12">
                <button class="btn btn-secondary" type="submit">
                  <i class="fas fa-save"> Save</i>
                </button>
              </div>
            </form>
          </div>
          <div
            class="tab-pane fade"
            id="v-pills-messages"
            role="tabpanel"
            aria-labelledby="v-pills-messages-tab">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Email address</th>
                  <th>Status</th>
                  <th>Subscription date</th>
                  <th>Action</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCookie from '../extra/VueCookie'
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import 'simplemde/dist/simplemde.min.css'

export default {
  name: 'Newsletter',
  props: ['user', 'settings'],
  components: { markdownEditor },
  data () {
    return {
      newsletter: {
        title: '',
        content: '',
        status: false
      },
      tooltip: 'Click to copy',
      images: [],
      newsletters: [],
      subscribers: [],
      errors: [],
      success: false
    }
  },

  mounted () {
    this.$axios.get('/newsletters', {
      headers: {
        'Authorization': `Bearer ${VueCookie.get('token')}`
      }
    })
      .then(response => {
        this.newsletters = response.data
      })
      .catch(e => {
        console.log(e.response)
      })

    this.$axios.get('/subscribers', {
      headers: {
        'Authorization': `Bearer ${VueCookie.get('token')}`
      }
    })
      .then(response => {
        this.subscribers = response.data
      })
      .catch(e => {
        console.log(e.response)
      })
  },

  methods: {
    new_nl () {
      this.newsletter.images = this.images
      this.$axios.post('/newsletter/store', this.newsletter, {
        headers: {
          'Authorization': `Bearer ${VueCookie.get('token')}`
        }
      })
        .then(() => {
          this.success = true
        })
    },

    upload () {
      let formdata = new FormData()
      formdata.append('image', document.getElementById('nl_upload').files[0])
      this.$axios.post('/newsletter/upload', formdata, {
        headers: {
          'Authorization': `Bearer ${VueCookie.get('token')}`
        }
      })
        .then(response => {
          this.images.push(response.data)
        })
        .catch(e => {
          console.log(e.response)
        })
    },

    copy (image) {
      const basename = image.split(/[\\/]/).pop()
      navigator.clipboard.writeText(`![${basename}](${image.replace(/ /g, '%20')})`)
        .catch((e) => {
          console.log(e)
        })
      this.tooltip = 'Copied!'
    }
  }
}
</script>
