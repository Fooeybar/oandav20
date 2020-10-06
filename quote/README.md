# **Quote class** 

![Oanda](https://img.shields.io/badge/Oanda%20API-V20-blue)

<br/>

- Create candles, order books, or position books
- The instance object sends an https request to Oanda's V20 instrument endpoint on a set interval
- Individual candles and buckets can be accessed using array notation on the object
- Quote(config) defaults are from the writable `Quote.defaults` property
- Oanda instrument request options can be found at [Instrument Endpoints](https://developer.oanda.com/rest-live-v20/instrument-ep/)

<br/>

`const Quote=require('./oanda').Quote;`<br/>
`const Quote=require('./quote/quote');`

<br/>

---

Quote config object 
-

`new Quote(config{})`<br/>

Options with `Quote.defaults` values:<br/>

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

All are optional <br/>
Instance config options can only be set at instantiation `new Quote(config{})`<br/>
The `instrument` value can be lowercase and without an underscore, ex: `'eurusd'`<br/>
The `granularity` value can be lowercase, ex: `'m15'`<br/>
The `price` value can be lowercase, ex: `'mb'`<br/>

<br/>

---

Quote object common properties
-

```
.httpsTime - a UNIX timestamp of https.get() call (read-only)<br/>
.httpsStatus - response code of recent https request (read-only)<br/>
.count - candle or bucket count (read-only)<br/>
.config - instance config values (read-only)<br/>
.start() - Resume the https request interval<br/>
.stop() - Pause the https request interval<br/>
```

<br/>

---

Quote object candle properties (read-only)
-

```
.timeframe - same as config.granularity
[index] - candles in descending order by time, [0] = current
```

**if config.price includes `'M'` or `'m'`**
```
[index].close
[index].open
[index].high
[index].low
```

**if config.price includes `'A'` or `'a'`**
```
[index].closeAsk
[index].openAsk
[index].highAsk
[index].lowAsk
```

**if config.price includes `'B'` or `'b'`**
```
[index].closeBid
[index].openBid
[index].highBid
[index].lowBid
```

<br/>

---

Quote object book properties (read-only)
-

```
.time - RFC3339 formatted time
.unix - UNIX formatted time
.price - bucket price
.width - buckets width
[index].price - bucket price
[index].long - long count percent
[index].short - short count percent
```

<br/>

---