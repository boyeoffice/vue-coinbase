<template lang="html">
  <div class="TableCell">
    <div class="value">
      <span v-if="spotPrice" class="large-font">
        {{spotPrice.amount | currency}}
      </span>
      <span v-if="priceDifference" class="large-font">
        {{priceDifference | currency }}
      </span>
      <span v-if="percentageDifference" class="large-font">{{percentageDifference | currency('', 2)}}</span><span v-if="percentageDifference" class="small-font">%</span>
    </div>
    <div v-if="spotPrice" class="label">{{cryptocurrencyLabel}} Price</div>
    <div v-if="CURRENCY" class="label">{{selectedDurationData.humanize}} ({{CURRENCY[1].key}})</div>
    <div v-if="selectedDurationData1" class="label">{{selectedDurationData1.humanize}} (%)</div>
  </div>
</template>

<script>
export default {
  props: {
    spotPrice: {
      type: Object
    },
    cryptocurrencyLabel: {
      type: String
    },
    priceDifference: {
      type: Number
    },
    selectedDurationData: {
      type: Object
    },
    CURRENCY: {
      type: Array
    },
    percentageDifference: {
      type: Number
    },
    selectedDurationData1: {
      type: Object
    }
  }
}
</script>

<style lang="css" scoped>
</style>
