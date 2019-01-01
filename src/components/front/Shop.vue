<template>
  <div class="shop" :style="{backgroundImage: 'url(' + $parent.settings.shop_bg + ')'}">
    <h1>Shop</h1>
    <router-link to="/">LANDING</router-link><br/>
    <router-link to="/contact">CONTACT</router-link>
  </div>
</template>

<script>
export default {

}
</script>
