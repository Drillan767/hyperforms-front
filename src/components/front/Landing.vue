<template>
  <div class="landing" :style="{backgroundImage: 'url(' + $parent.settings.landing_bg + ')'}">
    <h1>Landing</h1>
    <router-link to="/shop">SHOP</router-link><br/>
    <router-link to="/bio">BIOGRAPHY</router-link><br/>
    <router-link to="/contact">CONTACT</router-link>
  </div>
</template>

<script>
export default {

}
</script>
