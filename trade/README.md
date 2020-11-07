# **Trade** 

![Oanda](https://img.shields.io/badge/oanda%20api-v20-blue)

<br/>

- Get a list of open trades or an individual trade
- Close trade(s), modify extensions, and modify orders like takeprofit and stoploss
- The instance object sends an https request to Oanda's V20 trades endpoint on a set `interval`
- Trade(config) defaults are from the writable `Trade.defaults` property
- Oanda trade request options can be found at [Trade Endpoints](https://developer.oanda.com/rest-live-v20/trade-ep/)

<br/>

`Trade=require('./oanda')(apikey,host).Trade`<br/>
`Trade=require('./trade/trade')(apikey,host)`

<br/>

---

config object 
-

`new Trade(config{})`<br/>

Config options with `Trade.defaults` values:<br/>

```
{
 account: ''
 id: ''
 interval: 1000
}
```

Config options can only be set at instantiation: `new Trade(config{})`<br/>
`account` value (required) is a V20 account, ex: `'xxx-xxx-xxxxxx-xxx'`<br/>
`id` is an individual trade id, ex: `'1234'`, or a client extension id with an `'@'` prefix, ex: `'@my_trade_id'`<br/>
`interval` value is in milliseconds and is the https request interval<br/>

<br/>

---

common properties
-

```
trade=new Trade({})

trade.httpsTime - a UNIX timestamp of https.get() call (read-only)
trade.httpsStatus - response code of recent https request (read-only)
trade.count - trade count (read-only)
trade.config - instance config values (read-only)
trade.resume() - Resume the https request interval
trade.pause() - Pause the https request interval
trade.close() - close trade(s)
trade.extensions() - modify trade(s) client extensions
trade.orders() - modify trade(s) orders
```
```
trade.close(options{defaults},callback(data))

trade.close.defaults (writable)
{
 tradeID: ''
 datetime: 'RFC3339'
 units: 'ALL'
}
```
```
trade.extensions(options{defaults},callback(data))

trade.extensions.defaults (writable)
{
 tradeID: ''
 datetime: 'RFC3339'
 id: ''
 tag: ''
 comment: ''
}
```
```
trade.orders(options{defaults},callback(data))

trade.orders.defaults (writable)
{
 tradeID: ''
 datetime: 'RFC3339'
 takeprofit:{
    price: ''
    timeInForce: 'GTC'
    gtdTime: ''
    clientExtensions:{id:'',tag:'',comment:''}
 }
 stoploss:{
    price: ''
    distance: ''
    timeInForce: 'GTC'
    gtdTime: ''
    clientExtensions:{id:'',tag:'',comment:''}
 }
 trailing:{
    distance: ''
    timeInForce: 'GTC'
    gtdTime: ''
    clientExtensions:{id:'',tag:'',comment:''}
 }
 guaranteed:{
    price: ''
    distance: ''
    timeInForce: 'GTC'
    gtdTime: ''
    clientExtensions:{id:'',tag:'',comment:''}
 }
}
```

`tradeID` value can be in the form of a comma separated list without whitespaces</br>
*Do not modify client extensions for MT4 accounts:*</br>

<br/>

---

'trades' properties (read-only)
-

```
trades=new Trade({account:'xxx-xxx-xxxxxx-xxx'})

trades[index].id
trades[index].instrument
trades[index].price
trades[index].openTime
trades[index].initialUnits
trades[index].initialMarginRequired
trades[index].state
trades[index].currentUnits
trades[index].realizedPL
trades[index].financing
trades[index].dividendAdjustment
trades[index].unrealizedPL
trades[index].marginUsed
```

<br/>

---

'trade' properties (read-only)
-

```
trade=new Trade({account:'xxx-xxx-xxxxxx-xxx',id:'xxxx'||'@xxx'})

trade.id
trade.instrument
trade.price
trade.openTime
trade.initialUnits
trade.initialMarginRequired
trade.state
trade.currentUnits
trade.realizedPL
trade.financing
trade.dividendAdjustment
trade.unrealizedPL
trade.marginUsed
```

<br/>


---