# **Quote class** 

![Oanda](https://img.shields.io/badge/Oanda%20API-V20-blue)

<br/>

- Create candles, order books, or position books
- The instance object sends an https request to Oanda's V20 instrument endpoint on a set interval
- Individual candles and buckets can be accessed using array notation on the object
- Quote(config) defaults are from the writable `Quote.defaults` property
- Oanda instrument request options can be found at [Instrument Endpoints](https://developer.oanda.com/rest-live-v20/instrument-ep/)

<br/>

`const Quote=require('./oanda').Quote`<br/>
`const{Quote}=require('./oanda')`<br/>
`const Quote=require('./quote/quote')`

<br/>

---

Quote config object 
-

`new Quote(config{})`<br/>

Config options with `Quote.defaults` values:<br/>

```
{
 instrument : 'EUR_USD'
 endpoint : 'candles'
 datetime : 'RFC3339'
 price : 'M'
 granularity : 'S5'
 count : 500
 from : ''
 to : ''
 time : ''
 smooth : false
 includeFirst : true
 dailyAlignment : 17
 alignmentTimezone : 'America/New_York'
 weeklyAlignment : 'Friday'
 interval : 1000
 newBar : function noop(){}
}
```

Instance config options can only be set at instantiation `new Quote(config{})`<br/>
The `instrument` value can be lowercase and without an underscore, ex: `'eurusd'`<br/>
The `granularity` value can be lowercase, ex: `'m15'`<br/>
The `price` value can be lowercase, ex: `'mb'`<br/>

<br/>

---

Quote object common properties
-

```
quote=new Quote({})

quote.httpsTime - a UNIX timestamp of https.get() call (read-only)
quote.httpsStatus - response code of recent https request (read-only)
quote.count - candle or bucket count (read-only)
quote.config - instance config values (read-only)
quote.resume() - Resume the https request interval
quote.pause() - Pause the https request interval
```

<br/>

---

Quote object candle properties (read-only)
-

```
quote=new Quote({endpoint:'candles',granularity:'m15'}) //'candles' is the default for config.endpoint

quote.timeframe - same as config.granularity
quote[index] - candles in descending order by time, [0] = current
```

**if config.price includes `'M'` or `'m'`**
```
quote[index].close
quote[index].open
quote[index].high
quote[index].low
```

**if config.price includes `'A'` or `'a'`**
```
quote[index].closeAsk
quote[index].openAsk
quote[index].highAsk
quote[index].lowAsk
```

**if config.price includes `'B'` or `'b'`**
```
quote[index].closeBid
quote[index].openBid
quote[index].highBid
quote[index].lowBid
```

<br/>

---

Quote object book properties (read-only)
-

```
quote=new Quote({endpoint:'orderBook'})  //'positionBook'

quote.time - RFC3339 formatted time
quote.unix - UNIX formatted time
quote.price - bucket price
quote.width - buckets width
quote[index].price - bucket price
quote[index].long - long count percent
quote[index].short - short count percent
```

<br/>

---