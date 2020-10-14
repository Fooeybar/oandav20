# **OandaV20**

![Oanda](https://img.shields.io/badge/oanda%20api-v20-blue)
![npm](https://img.shields.io/npm/v/oandav20)
![issues](https://img.shields.io/github/issues/fooeybar/oandav20)
![license](https://img.shields.io/badge/license-MIT-green)

## OandaV20 is a collection of classes using Oanda's V20 API

[Oanda Dev Guide](https://developer.oanda.com/rest-live-v20/development-guide/)
-

<br/>

```
npm install oandav20

Oanda=require('oandav20')(apikey,host)
```

To generate an api key, [log in](https://fxtrade.oanda.ca/account/login) to the Account Management Portal on fxTrade and select “Manage API Access” under “My Services”.<br/>

By default the host is set for live accounts, `'api-fxtrade.oanda.com'`, and can be omitted. For practice accounts, input `'api-fxpractice.oanda.com'` as the host.

<br/>

---

**v0.2.2**
- Fix issue: individual instrument positions not updating after internal/external close

<br/>

**v0.2.1**
- Added pricing-based properties to [Quote](https://github.com/Fooeybar/OandaV20/tree/master/quote) class
- `Position.close()` now accepts comma separated instrument list
- `Position.close()` client extensions removed in case account is flagged MT4
- all `config.id` are now `config.account`

<br/>

**v0.2.0**
- Added [Position](https://github.com/Fooeybar/OandaV20/tree/master/position) class
- Apikey and host are now passed once when calling `require()` on OandaV20 modules

<br/>

**v0.1.0**
- Added [Account](https://github.com/Fooeybar/OandaV20/tree/master/account) class
- Added account-based properties to [Quote](https://github.com/Fooeybar/OandaV20/tree/master/quote) class

<br/>

**v0.0.1**
- Added [Quote](https://github.com/Fooeybar/OandaV20/tree/master/quote) class

<br/>

---

