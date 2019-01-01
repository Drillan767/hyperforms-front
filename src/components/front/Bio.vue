<template>
  <div class="bio" :style="{backgroundImage: 'url(' + $parent.settings.bio_bg + ')'}">
    <h1>Bio</h1>
    <router-link to="/">LANDING</router-link><br/>
    <router-link to="/contact">CONTACT</router-link>
  </div>
</template>

<script>
export default {

}
</script>
