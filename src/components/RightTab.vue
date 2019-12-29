<template lang="html">
  <div class="Tabs" role="tabpanel">
    <div class="Tabs-item"
          v-for="(data, index) in itemData">

    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemData: {
      type: Array
    }
  }
}
</script>
