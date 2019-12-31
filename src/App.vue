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
        <div class="chart">
          <div class="topSection">
            <div class="VerticalChartAxis left">
              <div class="trick" v-for="(data, index) in verticalPrice" :key="index">
                ${{ data | formatAxisPrice }}
              </div>
            </div>
            <line-chart :priceHistory="priceHistory"
                        :verticalPrice="verticalPrice"
                        :selectedCryptocurrency="selectedCryptocurrency"/>
            <div class="VerticalChartAxis right">
              <div class="trick" v-for="(data, index) in verticalPrice" :key="index">
                ${{ data | formatAxisPrice }}
              </div>
            </div>
          </div>
          <div class="HorizontalChartAxis">
    				<div class="tick" v-for="tick in xAxesTime">{{tick}}</div>
    			</div>
        </div>
      </div>
      <div class="Footer">
		      <span>Powered By COINBASE</span>
	    </div>
    </div>
  </div>
</template>

<script>
import LeftTab from '@/components/LeftTab'
import RightTab from '@/components/RightTab'
import TableCell from '@/components/TableCell'
import LineChart from '@/components/LineChart'
//import currencyFormatter from 'currency-formatter'
import moment from 'moment'
import Vue from 'vue'
import { scan } from 'd3-array'
import { extent } from 'd3-array'
export default {
  components: {
    LeftTab,
    RightTab,
    TableCell,
    LineChart
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
      verticalPrice: [],
      sortTime: [],
		  sortPrice: [],
      url: 'https://api.coinbase.com/v2/prices/',
      ACTIVE_CURRENCY: 'usd',
      xAxesTime: []
    }
  },
  methods: {
    async getCurrency (index, data, spotPrices) {
      //console.log(data.name)
      this.selectedCryptocurrencyIndex = index
      this.cryptocurrencyLabel = data.name
			let TITLE = data.upper + ':' + ' ' + currencyFormatter.format(spotPrices[index].amount, { code: 'USD' })
			document.title = TITLE
      this.selectedCryptocurrencyData = data
      let response = await fetch(this.url + this.ACTIVE_CURRENCY + '/spot?')
      let  result = await response.json()
      //console.log(result)
      spotPrices = result.data
      let formattedSpotPrices = spotPrices
          .filter(e => ['BTC', 'BCH', 'ETH', 'LTC'].indexOf(e.base) >= 0)
    	          .map(e => ({ ...e, amount: +e.amount }));
    	          this.spotPrices = formattedSpotPrices
    	          this.spotPrice = spotPrices[index]
			this.historyData()
    },
    async historyData() {
      let response = await fetch(this.url + this.selectedCryptocurrencyData.key + '-' + 'usd' + '/historic?period=' + this.selectedDurationData.key)
      let { data } = await response.json()
      let priceHistory = data.prices
			let formattedPriceHistory = priceHistory
				 .sort((a, b) => new Date(a.time) - new Date(b.time))
		          .map(e => ({ price: +e.price, time: new Date(e.time) }));
		  this.priceHistory = formattedPriceHistory

      priceHistory = this.priceHistory
      let spotPrice = this.spotPrice.amount
      let lastIndex = scan(priceHistory, (a, b) => a.time - b.time)
      let oldPrice = priceHistory[lastIndex] && priceHistory[lastIndex].price
      this.priceDifference = spotPrice - oldPrice
      this.percentageDifference = ((spotPrice / oldPrice) - 1) * 100 || 0

      //Min and Max Price
      Vue.filter('formatAxisPrice', function(value,){
         return currencyFormatter.format(value, {
           precision: 0,
         })
      })
     let [minPrice, maxPrice] = extent(this.priceHistory, d => d.price)
     let arrayPrice = [maxPrice, minPrice]
     this.verticalPrice = arrayPrice

     let sortPrice = []
  	 let sortTime = []
  	 this.priceHistory.forEach((list) => {
  	 sortTime.push(moment(list.time).format('MMM DD'))
  		sortPrice.push(list.price)
     })
     this.sortTime = sortTime
     this.sortPrice = sortPrice
    },
    async getDuration(index, data) {
      //console.log(data)
      this.selectedDurationIndex = index
      this.selectedDurationData = data
      let response = await fetch(this.url + this.selectedCryptocurrencyData.key + '-' + 'usd' + '/historic?period=' + data.key)
      let result = await response.json()
      //console.log(result)
      let priceHistory = result.data.prices
			let formattedPriceHistory = priceHistory
				 .sort((a, b) => new Date(a.time) - new Date(b.time))
		          .map(e => ({ price: +e.price, time: new Date(e.time) }));
		  this.priceHistory = formattedPriceHistory

      priceHistory = this.priceHistory
      let spotPrice = this.spotPrice.amount
      let lastIndex = scan(priceHistory, (a, b) => a.time - b.time)
      let oldPrice = priceHistory[lastIndex] && priceHistory[lastIndex].price
      this.priceDifference = spotPrice - oldPrice
      this.percentageDifference = ((spotPrice / oldPrice) - 1) * 100 || 0

      //Min and Max Price
      Vue.filter('formatAxisPrice', function(value,){
       	return currencyFormatter.format(value, {
			    precision: 0,
			  })
           })
      let [minPrice, maxPrice] = extent(this.priceHistory, d => d.price)
		  let arrayPrice = [maxPrice, minPrice]
      this.verticalPrice = arrayPrice

      //Chartjs
      let tickCount = 7
     var [minTime, maxTime] = extent(this.priceHistory, d => d.time);
     var rangeStep = (maxTime - minTime) / (tickCount - 1);
     let  generatedTicks = [];
     for (var i = 0; i < tickCount; i += 1) {
       var time = new Date(minTime).valueOf();
       if(this.selectedDurationIndex === 0 || this.selectedDurationIndex === 1) {
         generatedTicks.push(moment(time + (i * rangeStep)).format('HH:MM A'));
       } else if (this.selectedDurationIndex === 2 || this.selectedDurationIndex === 3 || this.selectedDurationIndex === 4){
         generatedTicks.push(moment(time + (i * rangeStep)).format('MMM DD'));
       }else {
         generatedTicks.push(moment(time + (i * rangeStep)).format('MMM YYYY'));
       }
     }
     this.xAxesTime = generatedTicks

     var sortPrice = []
     var sortTime = []
     this.priceHistory.forEach((list) => {
       sortTime.push(moment(list.time).format('MMM DD'))
       sortPrice.push(list.price)
     })
     this.sortTime = sortTime
     this.sortPrice = sortPrice
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
      //console.log(data)
      let priceHistory = data.prices
      let formattedPriceHistory = priceHistory
				 .sort((a, b) => new Date(a.time) - new Date(b.time))
		          .map(e => ({ price: +e.price, time: new Date(e.time) }));
		  this.priceHistory = formattedPriceHistory

      priceHistory = this.priceHistory
      let spotPrice = this.spotPrice.amount
      let lastIndex = scan(priceHistory, (a, b) => a.time - b.time)
      let oldPrice = priceHistory[lastIndex] && priceHistory[lastIndex].price
      this.priceDifference = spotPrice - oldPrice
      this.percentageDifference = ((spotPrice / oldPrice) - 1) * 100 || 0

      //Min and Max Price
       Vue.filter('formatAxisPrice', function(value,){
       	return currencyFormatter.format(value, {
			    precision: 0,
			  })
      })
      let [minPrice, maxPrice] = extent(this.priceHistory, d => d.price)
		  let arrayPrice = [maxPrice, minPrice]
      this.verticalPrice = arrayPrice

      //Chartjs
		  let tickCount = 7
		  let [minTime, maxTime] = extent(this.priceHistory, d => d.time);
	    let rangeStep = (maxTime - minTime) / (tickCount - 1);
	    let generatedTicks = [];
	    for (var i = 0; i < tickCount; i += 1) {
	      var time = new Date(minTime).valueOf();
	      generatedTicks.push(moment(time + (i * rangeStep)).format('MMM DD'));
	    }
	    this.xAxesTime = generatedTicks

      var sortPrice = []
			var sortTime = []
		  this.priceHistory.forEach((list) => {
			sortTime.push(moment(list.time).format('MMM DD'))
			sortPrice.push(list.price)
	     	})
      this.sortPrice = sortPrice
      this.sortTime = sortTime

    }
  },
  created () {
    this.cryptocurrencyLabel = this.CRYPTOCURRENCY[0].name
	  this.durationLabel = this.DURATION[2].humanize
    this.fetchSpot()
  }
}
</script>
