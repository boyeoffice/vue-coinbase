<template lang="html">
  <div class="Tabs" role="tabpanel">
    <div class="Tabs-item"
          v-for="(data, index) in itemData" :key="index"
          :class="(index === selectedCryptocurrencyIndex) && 'selected'">
      <span v-if="spotPrices[0]" class="cryptocurrency"
            @click="$emit('triggerCurrency', index, data, spotPrices)">
        <span>{{ data.name }}</span>
        <span>{{ spotPrices[index].amount | currency }}</span>
      </span>
      <span v-else class="cryptocurrency"> <span>{{ data.name }}</span></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemData: {
      type: Array
    },
    spotPrices: {
      type: Array
    },
    selectedCryptocurrencyIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {

    }
  }
}
</script>
