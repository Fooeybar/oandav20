# **Account** 

![Oanda](https://img.shields.io/badge/oanda%20api-v20-blue)

<br/>

- Get a list of accounts or individual account information
- The instance object sends an https request to Oanda's V20 account endpoint on a set `interval`
- Account(config) defaults are from the writable `Account.defaults` property
- Oanda account request options can be found at [Account Endpoints](https://developer.oanda.com/rest-live-v20/account-ep/)

<br/>

`Account=require('./oanda')(apikey,host).Account`<br/>

<br/>

---

config object 
-

`new Account(config{})`<br/>

Config options with `Account.defaults` values:<br/>

```
{
 id:''
 interval : 1000
}
```

Config options can only be set at instantiation: `new Account(config{})`<br/>
`id` value (required) is a V20 account id, ex: `'xxx-xxx-xxxxxx-xxx'`<br/>
`interval` value is in milliseconds and is the https request interval<br/>

<br/>

---

common properties
-

```
account=new Account({})

account.httpsTime - a UNIX timestamp of https.get() call (read-only)
account.httpsStatus - response code of recent https request (read-only)
account.count - account count
account.config - instance config values (read-only)
account.resume() - Resume the https request interval
account.pause() - Pause the https request interval
```

<br/>

---

'accounts' properties (read-only)
-

```
accounts=new Account({})

accounts[index].id
accounts[index].tags[]
```

<br/>


---

'account' properties (read-only)
-

```
account=new Account({id:'xxx-xxx-xxxxxx-xxx'})

account.name
account.currency
account.balance
account.nav
account.pl
account.resettablePL
account.unrealizedPL
account.withdrawalLimit
account.positionValue
account.positions
account.trades
account.pending
account.marginRate
account.marginUsed                
account.marginAvail
account.marginCloseoutUsed
account.marginCloseoutNAV
account.marginCloseout
account.marginCloseoutPositionValue
account.marginCloseoutUnrealizedPL
account.lastTrans
```

`marginCloseout` is a percent value<br/>
`lastTrans` is the id of the last transaction<br/>

<br/>


---