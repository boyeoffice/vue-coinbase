<template lang="html">
  <div class="Tabs" role="tabpanel">
    <div class="Tabs-item"
          v-for="(data, index) in itemData"
          :aria-labelledby="data.codename"
          tabindex="-1"
          @click="$emit('triggerDuration', index, data)"
          :class="(index === selectedDurationIndex) && 'selected'">
      <span>{{ data.codename }}</span>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemData: {
      type: Array
    },
      selectedDurationIndex: {
        type: Number,
        default: 2
      }
  },
  data() {
    return {

    }
  }
}
</script>
