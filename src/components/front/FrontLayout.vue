<template>
  <div class="front-layout">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Front',
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
      user: {
        email: '',
        biography: '',
        picture: '',
        facebook: '',
        twitter: '',
        instagram: ''
      },
      contact: {
        prevUrl: '',
        prevName: ''
      },
      transitionName: ''
    }
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
      const result = `${from.name}-${to.name}`
      switch (result) {
        case 'landing-shop':
        case 'bio-landing':
          this.transitionName = 'slide-left'
          break
        case 'shop-landing':
        case 'landing-bio':
          this.transitionName = 'slide-right'
          break
        case 'landing-contact':
        case 'shop-contact':
        case 'bio-contact':
          this.transitionName = 'slide-down'
          break
        case 'contact-landing':
        case 'contact-shop':
        case 'contact-bio':
          this.transitionName = 'slide-up'
          break
      }
      if (to.name === 'contact') {
        this.contact.prevName = from.name
        this.contact.prevUrl = from.path
      }
    }
  }
}
</script>
