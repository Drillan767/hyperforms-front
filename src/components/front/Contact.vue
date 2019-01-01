<template>
  <div class="contact" :style="{backgroundImage: 'url(' + $parent.settings.contact_bg + ')'}">
    <h1>Contact</h1>

    <h4>Calculated route :</h4>
    <router-link :to="$parent.contact.prevUrl">{{ $parent.contact.prevName.toUpperCase() }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'Contact'
}
</script>
