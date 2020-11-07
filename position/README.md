# **Position** 

![Oanda](https://img.shields.io/badge/oanda%20api-v20-blue)

<br/>

- Get a list of open positions or an open instrument position
- Close one or more positions
- The instance object sends an https request to Oanda's V20 openPositions endpoint on a set `interval`
- Position(config) defaults are from the writable `Position.defaults` property
- Oanda position request options can be found at [Position Endpoints](https://developer.oanda.com/rest-live-v20/position-ep/)

<br/>

`Position=require('./oanda')(apikey,host).Position`<br/>
`Position=require('./position/position')(apikey,host)`

<br/>

---

config object 
-

```
new Position(config{defaults})

Position.defaults (writable)
{
 account: ''
 instrument: ''
 interval: 1000
}
```

Config options can only be set at instantiation: `new Position(config{})`<br/>
`account` value (required) is a V20 account id, ex: `'xxx-xxx-xxxxxx-xxx'`<br/>
`instrument` value can be lowercase and without an underscore, ex: `'eurusd'`<br/>
`interval` value is in milliseconds and is the https request interval<br/>

<br/>

---

common properties
-

```
position=new Position({})

position.httpsTime - a UNIX timestamp of https.get() call (read-only)
position.httpsStatus - response code of recent https request (read-only)
position.count - position count (read-only)
position.config - instance config values (read-only)
position.resume() - Resume the https request interval
position.pause() - Pause the https request interval
position.close() - close one or more positions
```
```
position.close(options{defaults},callback(data))

position.close.defaults (writable)
{
 instrument: ''
 datetime: 'RFC3339'
 longClientExt: {}
 shortClientExt: {}
 long: 0
 short: 0
}
```
`instrument` value can be in the form of a comma separated list without whitespaces</br>
*Do not modify client extensions for MT4 accounts:*</br>

<br/>

---

'positions' properties (read-only)
-

```
positions=new Position({account:'xxx-xxx-xxxxxx-xxx'})

positions[index].instrument
positions[index].pl
positions[index].resettablePL
positions[index].unrealizedPL
positions[index].long 
                .long.pl
                .long.units
                .long.averagePrice
                .long.tradeIDs
                .long.resettablePL
                .long.unrealizedPL
positions[index].short
                .short.pl
                .short.units
                .short.averagePrice
                .short.tradeIDs
                .short.resettablePL
                .short.unrealizedPL
```

<br/>

---

'position' properties (read-only)
-

```
position=new Position({instrument:'EUR_USD',account:'xxx-xxx-xxxxxx-xxx'})

position.pl
position.financing
position.resettablePL
position.unrealizedPL
position.dividendAdjustment
position.guaranteedExecutionFees
position.long
        .long.pl
        .long.units
        .long.averagePrice
        .long.tradeIDs
        .long.resettablePL
        .long.unrealizedPL
position.short
        .short.pl
        .short.units
        .short.averagePrice
        .short.tradeIDs
        .short.resettablePL
        .short.unrealizedPL
```

<br/>


---