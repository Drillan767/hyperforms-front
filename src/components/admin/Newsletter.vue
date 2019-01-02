<template>
  <div class="newsletter">
    <div class="row">
      <div class="col-3">
        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <a
            class="nav-link active"
            id="v-pills-settings-tab"
            data-toggle="pill"
            href="#v-pills-settings"
            role="tab"
            aria-controls="v-pills-settings"
            aria-selected="true">
            Settings
          </a>
          <a
            class="nav-link"
            id="v-pills-newsletter-tab"
            data-toggle="pill"
            href="#v-pills-profile"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="false">
            Profile
          </a>
        </div>
      </div>
      <div class="col-7">
        <div class="tab-content" id="v-pills-tabContent">
          <div class="tab-pane fade show active" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
            <div class="ok" v-if="success">
              <p>Template successfully saved</p>
            </div>
            <div class="text-right">
              <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#newTemplate">
                <i class="fas fa-plus"></i>
                New template
              </button>
            </div>
          </div>
          <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="newTemplate" tabindex="-1" role="dialog" aria-labelledby="newTemplateLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="newTemplateLabel">New template</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="nl_submit">
            <div class="modal-body">
              <div class="row">
                <div class="form-group col-md-8 offset-md-2 row">
                  <label for="title" class="col-md-2">Title</label>
                  <div class="col-md-8">
                    <input class="form-control" id="title" type="text" v-model="nl_settings.title" required>
                  </div>
                </div>
                <div class="form-group col-md-8 offset-md-2 row">
                  <label for="template" class="col-md-2">Template</label>
                  <div class="col-md-8">
                    <textarea class="form-control" id="template" rows="6" v-model="nl_settings.template" required></textarea>
                  </div>
                </div>
                <div class="form-group col-md-8 offset-md-2 row">
                  <label for="bottom_text" class="col-md-2">Bottom text</label>
                  <div class="col-md-8">
                    <input class="form-control" id="bottom_text" type="text" v-model="nl_settings.bottom_text" required>
                  </div>
                </div>
                <div class="form-group col-md-8 offset-md-2 row">
                  <label for="unsubscribe" class="col-md-2">Unsubscribe</label>
                  <div class="col-md-8">
                    <input class="form-control" id="unsubscribe" type="text" v-model="nl_settings.unsubscribe" required>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCookie from '../extra/VueCookie'
import $ from 'jquery'
export default {
  name: 'Newsletter',
  props: ['user', 'settings'],
  data () {
    return {
      nl_settings: {
        title: '',
        template: '',
        bottom_text: '',
        unsubscribe: ''
      },
      newsletters: {
        content: '',
        status: false,
        nl_settings: 0
      },
      templates: [],
      errors: [],
      success: false
    }
  },

  mounted () {
    this.$axios.get('/newsletter/settings', {
      headers: {
        'Authorization': `Bearer ${VueCookie.get('token')}`
      }
    })
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        console.log(e.response)
      })
  },

  methods: {
    nl_submit () {
      this.errors = []
      let fields = ['title', 'template', 'bottom_text', 'unsubscribe']
      fields.map(field => {
        if (this.settings[field] === '') {
          this.errors.push({ message: `field ${field} is empty` })
        }
      })

      if (!this.settings.unsubscribe.includes('[unsub_link]')) {
        this.errors.push({ message: "The 'unsubscribe' message needs to contain '[unsub_link]'" })
      }

      if (this.errors.length === 0) {
        this.$axios.post('/newsletter/settings', this.settings, {
          headers: {
            'Authorization': `Bearer ${VueCookie.get('token')}`
          }
        })
          .then(response => {
            console.log(response.data)
            this.success = true
            $('#newTemplate').modal('hide')
          })
      }
    }
  }
}
</script>
