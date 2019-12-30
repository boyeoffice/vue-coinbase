<template>
  <div id="root">
    <div class="App">
      <div class="dashboard">
        <div class="tabs">
          <left-tab :itemData="CRYPTOCURRENCY"
                    :spotPrices="spotPrices"
                    @triggerCurrency="getCurrency"
                    :selectedCryptocurrencyIndex="selectedCryptocurrencyIndex"/>
          <right-tab @triggerDuration="getDuration"
                      :itemData="DURATION"
                      :selectedDurationIndex="selectedDurationIndex"/>
        </div>
        <div class="table">
          <div class="PriceTable">
            <table-cell :spotPrice="spotPrice"
                  :cryptocurrencyLabel="cryptocurrencyLabel"/>
            <table-cell :priceDifference="priceDifference"
                  :selectedDurationData="selectedDurationData"
                  :CURRENCY="CURRENCY"/>
            <table-cell :percentageDifference="percentageDifference"
                  :selectedDurationData1="selectedDurationData"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftTab from './components/LeftTab'
import RightTab from './components/RightTab'
import TableCell from './components/TableCell'
import currencyFormatter from 'currency-formatter'
export default {
  components: {
    LeftTab,
    RightTab,
    TableCell
  },
  name: 'App',
  data(){
    return {
      CRYPTOCURRENCY: [
        {upper: 'BTC', key: 'btc', name: 'Bitcoin', fillColor: '#FFEBC5', strokeColor: '#FFB01E'},
  			{upper: 'BCH', key: 'bch', name: 'Bitcoin Cash', fillColor: '#e2f0d2', strokeColor: '#8DC451'},
  			{upper: 'ETH', key: 'eth',name: 'Ethereum', fillColor: '#F0F1F8', strokeColor: '#6E7CB9'},
  			{upper: 'LTC', key: 'ltc', name: 'Litecoin', fillColor: '#ECECEC', strokeColor: '#B5B5B5'}
      ],
      DURATION: [
			  { key: 'hour', codename: '1H', humanize: 'since an hour ago' },
			  { key: 'day', codename: '1D', humanize: 'since yesterday' },
			  { key: 'week', codename: '1W', humanize: 'since last week' },
			  { key: 'month', codename: '1M', humanize: 'since last month' },
			  { key: 'year', codename: '1Y', humanize: 'since last year' },
			  { key: 'all', codename: 'ALL', humanize: '' }
			],
      CURRENCY: [
			   { key: 'cad', name: 'Canadian Dollar' },
			   { key: 'usd', name: 'US Dollar' },
			],
      selectedDurationData: { key: 'week', codename: '1W', humanize: 'since last week' },
      selectedCryptocurrencyData: {upper: 'BTC', key: 'btc', name: 'Bitcoin'},
      spotPrices: [],
      spotPrice: {},
			priceHistory: [],
			selectedCryptocurrencyIndex: 0,
			selectedDurationIndex: 2,
			cryptocurrencyLabel: null,
			durationLabel: null,
      selectedCryptocurrency: {},
      priceDifference: null,
      percentageDifference: null,
      url: 'https://api.coinbase.com/v2/prices/',
      ACTIVE_CURRENCY: 'usd'
    }
  },
  methods: {
    getCurrency (index, data, spotPrices) {
      //console.log(data.name)
      this.selectedCryptocurrencyIndex = index
    },
    getDuration(index, data) {
      //console.log(data)
      this.selectedDurationIndex = index
    },
    async fetchSpot() {
      this.selectedCryptocurrency = this.CRYPTOCURRENCY[0]
      let response = await fetch(this.url + this.ACTIVE_CURRENCY + '/spot?')
      let { data } = await response.json()
      //console.log(data)
      let spotPrices = data
      let formattedSpotPrices = spotPrices
            .filter(e => ['BTC', 'BCH', 'ETH', 'LTC'].indexOf(e.base) >= 0)
              .map(e => ({ ...e, amount: +e.amount }))
      this.spotPrices = formattedSpotPrices
  	  this.spotPrice = this.spotPrices[0]
      let TITLE = this.CRYPTOCURRENCY[0].upper + ':' + ' ' + currencyFormatter.format(this.spotPrice.amount, { code: 'USD' })
      document.title = TITLE
      this.fetchPrice()
    },
    async fetchPrice() {
      let response = await fetch(this.url + '/btc-usd/historic?period=week')
      let { data } = await response.json()
      console.log(data)
    }
  },
  created () {
    this.cryptocurrencyLabel = this.CRYPTOCURRENCY[0].name
	  this.durationLabel = this.DURATION[2].humanize
    this.fetchSpot()
  }
}
</script>
