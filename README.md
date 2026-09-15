# **OandaV20**

![npm](https://img.shields.io/npm/v/oandav20)
![license](https://img.shields.io/badge/license-MIT-green)

## OandaV20 is a wrapper class utilizing the [Oanda V20 API](https://developer.oanda.com/rest-live-v20/introduction/)

<br/>

`npm i oandav20`

<br/>

```
const OandaV20=require('oandav20.js');

import OandaV20 from 'oandav20.mjs';

<script src="oandav20.js"></script>
window.OandaV20
```

<br/>

`const oanda=new OandaV20(api,datetime,host);`

<br/>

To generate an `api` token, log in to the Account Management Portal and select Manage Api Access:
- Canada
    - [Account Management Portal](https://fxtrade.oanda.ca/account/login)
    - [Manage API Access](https://www.oanda.ca/account/tpa/personal_token)
- United States
    - [Account Management Portal](https://fxtrade.oanda.com/account/login)
    - [Manage API Access](https://www.oanda.com/account/tpa/personal_token)

</br>

By default the host is set for live accounts, `'api-fxtrade.oanda.com'`, and can be omitted</br>
For practice accounts, input `'api-fxpractice.oanda.com'` as the host.</br>

Datime can either be `'RFC3339'` or `'UNIX'`; by default the datetime is set as `'RFC3339'`.</br>
Please see the Oanda reference: [AcceptDatetimeFormat](https://developer.oanda.com/rest-live-v20/primitives-df/#AcceptDatetimeFormat).

---

<h3>Version 0.6.x</h3>

- The request backend now uses `fetch`, requiring Node.js version 0.18+
- All methods are now dual purpose callback & async, and reference the same result:
	```
	(async()=>{
		let resultCB;
		let resultAsync=await oanda.getAccounts((result)=>{resultCB=result;});
		console.log(resultCB===resultAsync); //true
	})();
	```
<span id="class_result"></span>
- The returned `result` for both modes is a class object:
	```
	const result=new OandaV20.result();
	/*
		result {
			error:undefined
			,data:undefined
		};
	*/
	```
- Exposed the writable defaults instance object `oanda.defaults`
- Exposed the defaults class `OandaV20.DEFAULTS`
- Exposed api, datetime, host as writable properties of the instance
	- `oanda.api`
	- `oanda.datetime`
	- `oanda.host`
- Relaxed type restrictions on passed values

</br>

---

<h3>Method arguments</h3>

`oanda.'method'(arg1,arg2,arg3,callback,arg4)`

Any arguments before the `callback` argument are required:
```
oanda.'method'(arg1,arg2,callback,options) //arg1, arg2 required

oanda.'method'(arg1,arg2,arg3,callback,body) //arg1, arg2, arg3 required
```

Any arguments `options` or `body`, while optional, if passed are required to be objects `{}`:
- If not passed, then values copied from the defaults found in `oanda.defaults`
- These will be stringified before sending the request.

</br>

---

<h3>Accounts</h3>

- [getAccounts](#instance_getaccounts)
- [getAccount](#instance_getaccount)
- [getAccountSummary](#instance_getaccountsummary)
- [getAccountInstruments](#instance_getaccountinstruments)
- [getAccountChangesSinceTransaction](#instance_getaccountchangessincetransaction)
- [setAccountConfiguration](#instance_setaccountconfiguration)

<h3>Instrument</h3>

- [getInstrument](#instance_getinstrument)
- [getOrderBook](#instance_getorderbook)
- [getPositionBook](#instance_getpositionbook)

<h3>Positions</h3>

- [getPositions](#instance_getpositions)
- [getPosition](#instance_getposition)
- [getOpenPositions](#instance_getopenpositions)
- [closePosition](#instance_closeposition)

<h3>Transactions</h3>

- [getTransactions](#instance_gettransactions)
- [getTransaction](#instance_gettransaction)
- [getTransactionsByIdRange](#instance_gettransactionsbyidrange)
- [getTransactionsSinceId](#instance_gettransactionssinceid)

<h3>Pricing</h3>

- [getInstrumentsPricing](#instance_getinstrumentspricing)

<h3>Trades</h3>

- [getTrades](#instance_gettrades)
- [getOpenTrades](#instance_getopentrades)
- [getClosedTrades](#instance_getclosedtrades)
- [getCloseWhenTradeableTrades](#instance_getclosewhentradeabletrades)
- [getAllTrades](#instance_getalltrades)
- [getAllOpenTrades](#instance_getallopentrades)
- [getTrade](#instance_gettrade)
- [closeTrade](#instance_closetrade)
- [setTradeClientExtensions](#instance_settradeclientextensions)
- [setTradeOrders](#instance_settradeorders)

<h3>Orders</h3>

- [getOrders](#instance_getorders)
- [getPendingOrders](#instance_getpendingorders)
- [getFilledOrders](#instance_getfilledorders)
- [getTriggeredOrders](#instance_gettriggeredorders)
- [getCancelledOrders](#instance_getcancelledorders)
- [getAllPendingOrders](#instance_getallpendingorders)
- [getAllOrders](#instance_getallorders)
- [getOrder](#instance_getorder)
- [cancelOrder](#instance_cancelorder)
- [setOrderClientExtensions](#instance_setorderclientextensions)
- [createMarketOrder](#instance_createmarketorder)
- [createLimitOrder](#instance_createlimitorder)
- [createStopOrder](#instance_createstoporder)
- [createMarketIfTouchedOrder](#instance_createmarketiftouchedorder)
- [createTakeProfitOrder](#instance_createtakeprofitorder)
- [createStopLossOrder](#instance_createstoplossorder)
- [createGuaranteedStopLossOrder](#instance_createguaranteedstoplossorder)
- [createTrailingStopLossOrder](#instance_createtrailingstoplossorder)
- [replaceWithMarketOrder](#instance_replacewithmarketorder)
- [replaceWithLimitOrder](#instance_replacewithlimitorder)
- [replaceWithStopOrder](#instance_replacewithstoporder)
- [replaceWithMarketIfTouchedOrder](#instance_replacewithmarketiftouchedorder)
- [replaceWithTakeProfitOrder](#instance_replacewithtakeprofitorder)
- [replaceWithStopLossOrder](#instance_replacewithstoplossorder)
- [replaceWithGuaranteedStopLossOrder](#instance_replacewithguaranteedstoplossorder)
- [replaceWithTrailingStopLossOrder](#instance_replacewithtrailingstoplossorder)

</br>

<h3>Defaults</h3>

- [defaults](#defaults_defaults)
- [CALLBACK](#defaults_callback)
- [ACCOUNT_INSTRUMENTS](#defaults_account_instruments)
- [CONFIG](#defaults_config)
- [TIME](#defaults_time)
- [TYPE](#defaults_type)
- [UNITS](#defaults_units)
- [INSTRUMENT](#defaults_instrument)
- [ORDERS](#defaults_orders)
- [TRADES](#defaults_trades)
- [TRANSACTIONS](#defaults_transactions)
- [INSTRUMENTS_PRICING](#defaults_instruments_pricing)
- [CLOSE_POSITION](#defaults_close_position)
- [CLIENT_EXTENSIONS](#defaults_client_extensions)
- [ORDER_EXTENSIONS](#defaults_order_extensions)
- [TRADE_ORDERS](#defaults_trade_orders)
- [TAKE_PROFIT](#defaults_take_profit)
- [STOP_LOSS](#defaults_stop_loss)
- [GUARANTEED_STOP_LOSS](#defaults_guaranteed_stop_loss)
- [TRAILING_STOP_LOSS](#defaults_trailing_stop_loss)
- [ORDER_CREATE](#defaults_order_create)
	- [MARKET](#defaults_order_create_market)
	- [LIMIT](#defaults_order_create_limit)
	- [STOP](#defaults_order_create_stop)
	- [MARKET_IF_TOUCHED](#defaults_order_create_market_if_touched)
	- [TAKE_PROFIT](#defaults_order_create_take_profit)
	- [STOP_LOSS](#defaults_order_create_stop_loss)
	- [GUARANTEED_STOP_LOSS](#defaults_order_create_guaranteed_stop_loss)
	- [TRAILING_STOP_LOSS](#defaults_order_create_trailing_stop_loss)

</br>

---

<h3>Accounts</h3>

Oanda reference: [Account Endpoints](https://developer.oanda.com/rest-live-v20/account-ep/)

<h3 id="instance_getaccounts">.getAccounts</h3>

- Get list of accounts
- `getAccounts(callback)`
- `result.data` : `[]` array

<h3 id="instance_getaccount">.getAccount</h3>

- Get full details of a single account
- `getAccount(account,callback)`
- `result.data` : `{}` object

<h3 id="instance_getaccountsummary">.getAccountSummary</h3>

- Get summary details of a single account
- `getAccountSummary(account,callback)`
- `result.data` : `{}` object

<h3 id="instance_getaccountinstruments">.getAccountInstruments</h3>

- Get a list of tradeable instruments
- `getAccountInstruments(account,callback,options)`
- options = [ACCOUNT_INSTRUMENTS](#defaults_account_instruments)
- `result.data` : `[]` array

<h3 id="instance_getaccountchangessincetransaction">.getAccountChangesSinceTransaction</h3>

- Get changes to account since a specific transaction id
- `getAccountChangesSinceTransaction(account,transactionID,callback)`
- `result.data` : `{}` object

<h3 id="instance_setaccountconfiguration">.setAccountConfiguration</h3>

- Set the client-configurable portions on an account
- `setAccountConfiguration(account,callback,body)`
- body = [CONFIG](#defaults_config)
- `result.data` : `{}` object

</br>

---

<h3>Instrument</h3>

Oanda reference: [Instrument Endpoints](https://developer.oanda.com/rest-live-v20/instrument-ep/)

(Documentation is now 404, however, the REST API is still functioning. Caution future changes) 

<h3 id="instance_getinstrument">.getInstrument</h3>

- Get candlestick data for an instrument
- `getInstrument(instrument,callback,options)`
- options = [INSTRUMENT](#defaults_instrument)
- `result.data` : `[]` array

<h3 id="instance_getorderbook">.getOrderBook</h3>

- Get order book data for an instrument
- `getOrderBook(instrument,callback,options)`
- options = [TIME](#defaults_time)
- `result.data` : `{}` object

<h3 id="instance_getpositionbook">.getPositionBook</h3>

- Get position book data for an instrument
- `getPositionBook(instrument,callback,options)`
- options = [TIME](#defaults_time)
- `result.data` : `{}` object

</br>

---

<h3>Positions</h3>

Oanda reference: [Position Endpoints](https://developer.oanda.com/rest-live-v20/position-ep/)

<h3 id="instance_getpositions">.getPositions</h3>

- List positions for the lifetime of an account
- `getPositions(account,callback)`
- `result.data` : `[]` array

<h3 id="instance_getposition">.getPosition</h3>

- Get details of an instrument position
- `getPosition(account,instrument,callback)`
- `result.data` : `{}` object

<h3 id="instance_getopenpositions">.getOpenPositions</h3>

- List positions with open trades
- `getOpenPositions(account,callback)`
- `result.data` : `[]` array

<h3 id="instance_closeposition">.closePosition</h3>

- Fully or partially close an open position
- `closePosition(account,instrument,callback,body)`
- body = [CLOSE_POSITION](#defaults_close_position)
- `result.data` : `{}` object

</br>

---

<h3>Transactions</h3>

Oanda reference: [Transaction Endpoints](https://developer.oanda.com/rest-live-v20/transaction-ep/)

<h3 id="instance_gettransactions">.getTransactions</h3>

- Get a list of transaction pages
- `getTransactions(account,callback,options)`
- options = [TRANSACTIONS](#defaults_transactions)
- `result.data` : `{}` object

<h3 id="instance_gettransaction">.getTransaction</h3>

- Get details of a single transaction
- `getTransaction(account,transactionID,callback)`
- `result.data` : `{}` object

<h3 id="instance_gettransactionsbyidrange">.getTransactionsByIdRange</h3>

- Get a list of transactions by transaction id range
- `getTransactionsByIdRange(account,from,to,callback,options)`
- options = [TYPE](#defaults_type)
- `result.data` : `[]` array

<h3 id="instance_gettransactionssinceid">.getTransactionsSinceId</h3>

- Get a list of transactions starting after a specified transaction id
- `getTransactionsSinceId(account,id,callback,options)`
- options = [TYPE](#defaults_type)
- `result.data` : `[]` array

</br>

---

<h3>Pricing</h3>

Oanda reference: [Pricing Endpoints](https://developer.oanda.com/rest-live-v20/pricing-ep/)

<h3 id="instance_getinstrumentspricing">.getInstrumentsPricing</h3>

- Get pricing details for a list of instruments
- `getInstrumentsPricing(account,instruments,callback,options)`
- options = [INSTRUMENTS_PRICING](#defaults_instruments_pricing)
- `result.data` : `[]` array

</br>

---

<h3>Trades</h3>

Oanda reference: [Trade Endpoints](https://developer.oanda.com/rest-live-v20/trade-ep/)

<h3 id="instance_gettrades">.getTrades</h3>

- Get a list of trades by account
- `getTrades(account,callback,options)`
- options = [TRADES](#defaults_trades)
- `result.data` : `[]` array

<h3 id="instance_getopentrades">.getOpenTrades</h3>

- Get a list of open trades by account
- `getOpenTrades(account,callback,options)`
- options = [TRADES](#defaults_trades)
- `result.data` : `[]` array

<h3 id="instance_getclosedtrades">.getClosedTrades</h3>

- Get a list of closed trades by account
- `getClosedTrades(account,callback,options)`
- options = [TRADES](#defaults_trades)
- `result.data` : `[]` array

<h3 id="instance_getclosewhentradeabletrades">.getCloseWhenTradeableTrades</h3>

- Get a list of Close-when-tradeable trades by account
- `getCloseWhenTradeableTrades(account,callback,options)`
- options = [TRADES](#defaults_trades)
- `result.data` : `[]` array

<h3 id="instance_getalltrades">.getAllTrades</h3>

- Get a list of all trades by account
- `getAllTrades(account,callback,options)`
- options = [TRADES](#defaults_trades)
- `result.data` : `[]` array

<h3 id="instance_getallopentrades">.getAllOpenTrades</h3>

- Get a list of all open trades by account
- `getAllOpenTrades(account,callback)`
- `result.data` : `[]` array

<h3 id="instance_gettrade">.getTrade</h3>

- Get details of a single trade
- `getTrade(account,tradeSpecifier,callback)`
- `result.data` : `{}` object

<h3 id="instance_closetrade">.closeTrade</h3>

- Fully or partially close an open trade
- `closeTrade(account,tradeSpecifier,callback,body)`
- body = [UNITS](#defaults_units)
- `result.data` : `{}` object

<h3 id="instance_settradeclientextensions">.setTradeClientExtensions</h3>

- Set the client extensions for a trade
- `setTradeClientExtensions(account,tradeSpecifier,callback,body)`
- body = [CLIENT_EXTENSIONS](#defaults_client_extensions)
- `result.data` : `{}` object
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference:
    - [Client Extensions](https://developer.oanda.com/rest-live-v20/transaction-df/#ClientExtensions)

<h3 id="instance_settradeorders">.setTradeOrders</h3>

- Create, replace and cancel the orders for a trade
- `setTradeOrders(account,tradeSpecifier,callback,body)`
- body = [TRADE_ORDERS](#defaults_trade_orders)
- `result.data` : `{}` object
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: 
    - [Take Profit Details](https://developer.oanda.com/rest-live-v20/transaction-df/#TakeProfitDetails)
    - [Stop Loss Details](https://developer.oanda.com/rest-live-v20/transaction-df/#StopLossDetails)
    - [Guaranteed Stop Loss Details](https://developer.oanda.com/rest-live-v20/transaction-df/#GuaranteedStopLossDetails)
    - [Trailing Stop Loss Details](https://developer.oanda.com/rest-live-v20/transaction-df/#TrailingStopLossDetails)

</br>

---

<h3>Orders</h3>

Oanda reference: [Order Endpoints](https://developer.oanda.com/rest-live-v20/order-ep/)

<h3 id="instance_getorders">.getOrders</h3>

- Get a list of orders
- `getOrders(account,callback,options)`
- options = [ORDERS](#defaults_orders)
- `result.data` : `[]` array

<h3 id="instance_getpendingorders">.getPendingOrders</h3>

- Get a list of pending orders
- `getPendingOrders(account,callback,options)`
- options = [ORDERS](#defaults_orders)
- `result.data` : `[]` array

<h3 id="instance_getfilledorders">.getFilledOrders</h3>

- Get a list of filled orders
- `getFilledOrders(account,callback,options)`
- options = [ORDERS](#defaults_orders)
- `result.data` : `[]` array

<h3 id="instance_gettriggeredorders">.getTriggeredOrders</h3>

- Get a list of triggered orders
- `getTriggeredOrders(account,callback,options)`
- options = [ORDERS](#defaults_orders)
- `result.data` : `[]` array

<h3 id="instance_getcancelledorders">.getCancelledOrders</h3>

- Get a list of cancelled orders
- `getCancelledOrders(account,callback,options)`
- options = [ORDERS](#defaults_orders)
- `result.data` : `[]` array

<h3 id="instance_getallpendingorders">.getAllPendingOrders</h3>

- Get a list of all pending orders
- `getAllPendingOrders(account,callback)`
- `result.data` : `[]` array

<h3 id="instance_getallorders">.getAllOrders</h3>

- Get a list of all orders
- `getAllOrders(account,callback,options)`
- options = [ORDERS](#defaults_orders)
- `result.data` : `[]` array

<h3 id="instance_getorder">.getOrder</h3>

- Get details of a single order
- `getOrder(account,orderSpecifier,callback)`
- `result.data` : `{}` object

<h3 id="instance_cancelorder">.cancelOrder</h3>

- Cancel a pending order
- `cancelOrder(account,orderSpecifier,callback)`
- `result.data` : `{}` object

<h3 id="instance_setorderclientextensions">.setOrderClientExtensions</h3>

- Set the client extensions for an order
- Set the client extensions for a trade when the order is filled
- `setOrderClientExtensions(account,orderSpecifier,callback,body)`
- body = [ORDER_EXTENSIONS](#defaults_order_extensions)
- `result.data` : `{}` object
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Client Extensions](https://developer.oanda.com/rest-live-v20/transaction-df/#ClientExtensions)

<h3 id="instance_createmarketorder">.createMarketOrder</h3>

- Create a market order
- `createMarketOrder(account,callback,body)`
- body = [MARKET](#defaults_order_create_market)
- `result.data` : `{}` object
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market Order Request](https://developer.oanda.com/rest-live-v20/order-df/#MarketOrderRequest)

<h3 id="instance_createlimitorder">.createLimitOrder</h3>

- Create a limit order
- `createLimitOrder(account,callback,body)`
- body = [LIMIT](#defaults_order_create_limit)
- `result.data` : `{}` object
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Limit Order Request](https://developer.oanda.com/rest-live-v20/order-df/#LimitOrderRequest)

<h3 id="instance_createstoporder">.createStopOrder</h3>

- Create a stop order
- `createStopOrder(account,callback,body)`
- body = [STOP](#defaults_order_create_stop)
- `result.data` : `{}` object
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Stop Order Request](https://developer.oanda.com/rest-live-v20/order-df/#StopOrderRequest)

<h3 id="instance_createmarketiftouchedorder">.createMarketIfTouchedOrder</h3>

- Create a market-if-touched order
- `createMarketIfTouchedOrder(account,callback,body)`
- body = [MARKET_IF_TOUCHED](#defaults_order_create_market_if_touched)
- `result.data` : `{}` object
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market If Touched Order Request](https://developer.oanda.com/rest-live-v20/order-df/#MarketIfTouchedOrderRequest)

<h3 id="instance_createtakeprofitorder">.createTakeProfitOrder</h3>

- Create a take profit order
- `createTakeProfitOrder(account,callback,body)`
- body = [TAKE_PROFIT](#defaults_order_create_take_profit)
- `result.data` : `{}` object
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Take Profit Order Request](https://developer.oanda.com/rest-live-v20/order-df/#TakeProfitOrderRequest)

<h3 id="instance_createstoplossorder">.createStopLossOrder</h3>

- Create a stop loss order
- `createStopLossOrder(account,callback,body)`
- body = [STOP_LOSS](#defaults_order_create_stop_loss)
- `result.data` : `{}` object
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Stop Loss Order Request](https://developer.oanda.com/rest-live-v20/order-df/#StopLossOrderRequest)

<h3 id="instance_createguaranteedstoplossorder">.createGuaranteedStopLossOrder</h3>

- Create a guaranteed stop loss order
- `createGuaranteedStopLossOrder(account,callback,body)`
- body = [GUARANTEED_STOP_LOSS](#defaults_order_create_guaranteed_stop_loss)
- `result.data` : `{}` object
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Guaranteed Stop Loss Order Request](https://developer.oanda.com/rest-live-v20/order-df/#GuaranteedStopLossOrderRequest)

<h3 id="instance_createtrailingstoplossorder">.createTrailingStopLossOrder</h3>

- Create a trailing stop loss order
- `createTrailingStopLossOrder(account,callback,body)`
- body = [TRAILING_STOP_LOSS](#defaults_order_create_trailing_stop_loss)
- `result.data` : `{}` object
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Trailing Stop Loss Order Request](https://developer.oanda.com/rest-live-v20/order-df/#TrailingStopLossOrderRequest)


<h3 id="instance_replacewithmarketorder">.replaceWithMarketOrder</h3>

- Cancel an order and replace with a market order
- `replaceWithMarketOrder(account,orderSpecifier,callback,body)`
- body = [MARKET](#defaults_order_create_market)
- `result.data` : `{}` object
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market Order Request](https://developer.oanda.com/rest-live-v20/order-df/#MarketOrderRequest)

<h3 id="instance_replacewithlimitorder">.replaceWithLimitOrder</h3>

- Cancel an order and replace with a limit order
- `replaceWithLimitOrder(account,orderSpecifier,callback,body)`
- body = [LIMIT](#defaults_order_create_limit)
- `result.data` : `{}` object
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market Order Request](https://developer.oanda.com/rest-live-v20/order-df/#LimitOrderRequest)

<h3 id="instance_replacewithstoporder">.replaceWithStopOrder</h3>

- Cancel an order and replace with a stop order
- `replaceWithStopOrder(account,orderSpecifier,callback,body)`
- body = [STOP](#defaults_order_create_stop)
- `result.data` : `{}` object
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market Order Request](https://developer.oanda.com/rest-live-v20/order-df/#StopOrderRequest)

<h3 id="instance_replacewithmarketiftouchedorder">.replaceWithMarketIfTouchedOrder</h3>

- Cancel an order and replace with a market-if-touched order
- `replaceWithMarketIfTouchedOrder(account,orderSpecifier,callback,body)`
- body = [MARKET_IF_TOUCHED](#defaults_order_create_market_if_touched)
- `result.data` : `{}` object
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market Order Request](https://developer.oanda.com/rest-live-v20/order-df/#MarketIfTouchedOrderRequest)

<h3 id="instance_replacewithtakeprofitorder">.replaceWithTakeProfitOrder</h3>

- Cancel an order and replace with a take profit order
- `replaceWithTakeProfitOrder(account,orderSpecifier,callback,body)`
- body = [TAKE_PROFIT](#defaults_order_create_take_profit)
- `result.data` : `{}` object
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market Order Request](https://developer.oanda.com/rest-live-v20/order-df/#TakeProfitOrderRequest)

<h3 id="instance_replacewithstoplossorder">.replaceWithStopLossOrder</h3>

- Cancel an order and replace with a stop loss order
- `replaceWithStopLossOrder(account,orderSpecifier,callback,body)`
- body = [STOP_LOSS](#defaults_order_create_stop_loss)
- `result.data` : `{}` object
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market Order Request](https://developer.oanda.com/rest-live-v20/order-df/#StopLossOrderRequest)

<h3 id="instance_replacewithguaranteedstoplossorder">.replaceWithGuaranteedStopLossOrder</h3>

- Cancel an order and replace with a guaranteed stop loss order
- `replaceWithGuaranteedStopLossOrder(account,orderSpecifier,callback,body)`
- body = [GUARANTEED_STOP_LOSS](#defaults_order_create_guaranteed_stop_loss)
- `result.data` : `{}` object
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market Order Request](https://developer.oanda.com/rest-live-v20/order-df/#GuaranteedStopLossOrderRequest)

<h3 id="instance_replacewithtrailingstoplossorder">.replaceWithTrailingStopLossOrder</h3>

- Cancel an order and replace with a trailing stop loss order
- `replaceWithTrailingStopLossOrder(account,orderSpecifier,callback,body)`
- body = [TRAILING_STOP_LOSS](#defaults_order_create_trailing_stop_loss)
- `result.data` : `{}` object
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market Order Request](https://developer.oanda.com/rest-live-v20/order-df/#TrailingStopLossOrderRequest)

</br>

---

<h3>Defaults</h3>

- [defaults](#defaults_defaults)
- [CALLBACK](#defaults_callback)
- [ACCOUNT_INSTRUMENTS](#defaults_account_instruments)
- [CONFIG](#defaults_config)
- [TIME](#defaults_time)
- [TYPE](#defaults_type)
- [UNITS](#defaults_units)
- [INSTRUMENT](#defaults_instrument)
- [ORDERS](#defaults_orders)
- [TRADES](#defaults_trades)
- [TRANSACTIONS](#defaults_transactions)
- [INSTRUMENTS_PRICING](#defaults_instruments_pricing)
- [CLOSE_POSITION](#defaults_close_position)
- [CLIENT_EXTENSIONS](#defaults_client_extensions)
- [ORDER_EXTENSIONS](#defaults_order_extensions)
- [TRADE_ORDERS](#defaults_trade_orders)
- [TAKE_PROFIT](#defaults_take_profit)
- [STOP_LOSS](#defaults_stop_loss)
- [GUARANTEED_STOP_LOSS](#defaults_guaranteed_stop_loss)
- [TRAILING_STOP_LOSS](#defaults_trailing_stop_loss)
- [ORDER_CREATE](#defaults_order_create_market)
	- [MARKET](#defaults_order_create_market)
	- [LIMIT](#defaults_order_create_limit)
	- [STOP](#defaults_order_create_stop)
	- [MARKET_IF_TOUCHED](#defaults_order_create_market_if_touched)
	- [TAKE_PROFIT](#defaults_order_create_take_profit)
	- [STOP_LOSS](#defaults_order_create_stop_loss)
	- [GUARANTEED_STOP_LOSS](#defaults_order_create_guaranteed_stop_loss)
	- [TRAILING_STOP_LOSS](#defaults_order_create_trailing_stop_loss)

</br>

---

<h3 id="defaults_defaults">.defaults</h3>

`oanda.defaults`

The location for default shapes & values per instance</br>
- Freely edit primitive values, applied to all relevant method calls per instance
- The existing <u>PROPERTY_NAMES</u> and <u>NESTED.STRUCTURE</u> in the defaults object should <u>NOT</u> be changed


<h3 id="defaults_callback">.defaults.CALLBACK</h3>

```
(result)=>{}
```
- [result class](#class_result)

<h3 id="defaults_account_instruments">.defaults.ACCOUNT_INSTRUMENTS</h3>

```
ACCOUNT_INSTRUMENTS={
	instruments:''
};
```

<h3 id="defaults_config">.defaults.CONFIG</h3>

```
CONFIG={
	alias:''
	,marginRate:''
};
```

<h3 id="defaults_time">.defaults.TIME</h3>

```
TIME={
	time:''
};
```

<h3 id="defaults_type">.defaults.TYPE</h3>

```
TYPE={
	type:''
};
```

<h3 id="defaults_units">.defaults.UNITS</h3>

```
UNITS={
	units:''
};
```

<h3 id="defaults_instrument">.defaults.INSTRUMENT</h3>

```
INSTRUMENT={
	price:''
	,count:''
	,smooth:''
	,granularity:''
	,dailyAlignment:''
	,alignmentTimezone:''
	,weeklyAlignment:''
	,from:''
	,includeFirst:''
	,to:''
};
```

<h3 id="defaults_orders">.defaults.ORDERS</h3>

```
ORDERS={
	state:''
	,instrument:''
	,count:''
	,beforeID:''
	,ids:''
};
```

<h3 id="defaults_trades">.defaults.TRADES</h3>

```
TRADES={
	count:''
	,state:''
	,beforeID:''
	,instrument:''
	,ids:''
};
```

<h3 id="defaults_transactions">.defaults.TRANSACTIONS</h3>

```
TRANSACTIONS={
	from:''
	,to:''
	,pageSize:''
	,type:''
};
```

<h3 id="defaults_instruments_pricing">.defaults.INSTRUMENTS_PRICING</h3>

```
INSTRUMENTS_PRICING={
	since:''
	,includeHomeConversions:''
};
```

<h3 id="defaults_close_position">.defaults.CLOSE_POSITION</h3>

```
CLOSE_POSITION={
	longClientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
	,shortClientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
	,longUnits:''
	,shortUnits:''
};
```
- [CLIENT_EXTENSIONS](#defaults_client_extensions)

<h3 id="defaults_client_extensions">.defaults.CLIENT_EXTENSIONS</h3>

```
CLIENT_EXTENSIONS=new OandaV20.DEFAULTS.CLIENT_EXTENSIONS();
```

<h3 id="defaults_order_extensions">.defaults.ORDER_EXTENSIONS</h3>

```
ORDER_EXTENSIONS={
	clientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
	,tradeClientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
};
```
- [CLIENT_EXTENSIONS](#defaults_client_extensions)

<h3 id="defaults_take_profit">.defaults.TAKE_PROFIT</h3>

```
TAKE_PROFIT=new OandaV20.DEFAULTS.TAKE_PROFIT();
```

<h3 id="defaults_stop_loss">.defaults.STOP_LOSS</h3>

```
STOP_LOSS=new OandaV20.DEFAULTS.STOP_LOSS();
```

<h3 id="defaults_guaranteed_stop_loss">.defaults.GUARANTEED_STOP_LOSS</h3>

```
GUARANTEED_STOP_LOSS=new OandaV20.DEFAULTS.GUARANTEED_STOP_LOSS();
```

<h3 id="defaults_trailing_stop_loss">.defaults.TRAILING_STOP_LOSS</h3>

```
TRAILING_STOP_LOSS=new OandaV20.DEFAULTS.TRAILING_STOP_LOSS();
```

<h3 id="defaults_trade_orders">.defaults.TRADE_ORDERS</h3>

```
TRADE_ORDERS={
	takeProfit:new OandaV20.DEFAULTS.TAKE_PROFIT()
	,stopLoss:new OandaV20.DEFAULTS.STOP_LOSS()
	,guaranteedStopLoss:new OandaV20.DEFAULTS.GUARANTEED_STOP_LOSS()
	,trailingStopLoss:new OandaV20.DEFAULTS.TRAILING_STOP_LOSS()
}
```
- [TAKE_PROFIT](#defaults_take_profit)
- [STOP_LOSS](#defaults_stop_loss)
- [GUARANTEED_STOP_LOSS](#defaults_guaranteed_stop_loss)
- [TRAILING_STOP_LOSS](#defaults_trailing_stop_loss)

<h3 id="defaults_order_create_market">.defaults.ORDER_CREATE.MARKET</h3>

```
ORDER_CREATE.MARKET={
	type:'MARKET'
	,instrument:''
	,units:''
	,timeInForce:''
	,priceBound:''
	,positionFill:''
	,clientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
	,takeProfitOnFill:new OandaV20.DEFAULTS.TAKE_PROFIT()
	,stopLossOnFill:new OandaV20.DEFAULTS.STOP_LOSS()
	,guaranteedStopLossOnFill:new OandaV20.DEFAULTS.GUARANTEED_STOP_LOSS()
	,trailingStopLossOnFill:new OandaV20.DEFAULTS.TRAILING_STOP_LOSS()
	,tradeClientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
};
```
- [TAKE_PROFIT](#defaults_take_profit)
- [STOP_LOSS](#defaults_stop_loss)
- [GUARANTEED_STOP_LOSS](#defaults_guaranteed_stop_loss)
- [TRAILING_STOP_LOSS](#defaults_trailing_stop_loss)
- [CLIENT_EXTENSIONS](#defaults_client_extensions)

<h3 id="defaults_order_create_limit">.defaults.ORDER_CREATE.LIMIT</h3>

```
ORDER_CREATE.LIMIT={
	type:'LIMIT'
	,instrument:''
	,units:''
	,price:''
	,timeInForce:''
	,gtdTime:''
	,positionFill:''
	,triggerCondition:''
	,clientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
	,takeProfitOnFill:new OandaV20.DEFAULTS.TAKE_PROFIT()
	,stopLossOnFill:new OandaV20.DEFAULTS.STOP_LOSS()
	,guaranteedStopLossOnFill:new OandaV20.DEFAULTS.GUARANTEED_STOP_LOSS()
	,trailingStopLossOnFill:new OandaV20.DEFAULTS.TRAILING_STOP_LOSS()
	,tradeClientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
};
```
- [TAKE_PROFIT](#defaults_take_profit)
- [STOP_LOSS](#defaults_stop_loss)
- [GUARANTEED_STOP_LOSS](#defaults_guaranteed_stop_loss)
- [TRAILING_STOP_LOSS](#defaults_trailing_stop_loss)
- [CLIENT_EXTENSIONS](#defaults_client_extensions)

<h3 id="defaults_order_create_stop">.defaults.ORDER_CREATE.STOP</h3>

```
ORDER_CREATE.STOP={
	type:'STOP'
	,instrument:''
	,units:''
	,price:''
	,priceBound:''
	,timeInForce:''
	,gtdTime:''
	,positionFill:''
	,triggerCondition:''
	,clientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
	,takeProfitOnFill:new OandaV20.DEFAULTS.TAKE_PROFIT()
	,stopLossOnFill:new OandaV20.DEFAULTS.STOP_LOSS()
	,guaranteedStopLossOnFill:new OandaV20.DEFAULTS.GUARANTEED_STOP_LOSS()
	,trailingStopLossOnFill:new OandaV20.DEFAULTS.TRAILING_STOP_LOSS()
	,tradeClientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
};
```
- [TAKE_PROFIT](#defaults_take_profit)
- [STOP_LOSS](#defaults_stop_loss)
- [GUARANTEED_STOP_LOSS](#defaults_guaranteed_stop_loss)
- [TRAILING_STOP_LOSS](#defaults_trailing_stop_loss)
- [CLIENT_EXTENSIONS](#defaults_client_extensions)

<h3 id="defaults_order_create_market_if_touched">.defaults.ORDER_CREATE.MARKET_IF_TOUCHED</h3>

```
ORDER_CREATE.MARKET_IF_TOUCHED={
	type:'MARKET_IF_TOUCHED'
	,instrument:''
	,units:''
	,price:''
	,priceBound:''
	,timeInForce:''
	,gtdTime:''
	,positionFill:''
	,triggerCondition:''
	,clientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
	,takeProfitOnFill:new OandaV20.DEFAULTS.TAKE_PROFIT()
	,stopLossOnFill:new OandaV20.DEFAULTS.STOP_LOSS()
	,guaranteedStopLossOnFill:new OandaV20.DEFAULTS.GUARANTEED_STOP_LOSS()
	,trailingStopLossOnFill:new OandaV20.DEFAULTS.TRAILING_STOP_LOSS()
	,tradeClientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
};
```
- [TAKE_PROFIT](#defaults_take_profit)
- [STOP_LOSS](#defaults_stop_loss)
- [GUARANTEED_STOP_LOSS](#defaults_guaranteed_stop_loss)
- [TRAILING_STOP_LOSS](#defaults_trailing_stop_loss)
- [CLIENT_EXTENSIONS](#defaults_client_extensions)

<h3 id="defaults_order_create_take_profit">.defaults.ORDER_CREATE.TAKE_PROFIT</h3>

```
ORDER_CREATE.TAKE_PROFIT={
	type:'TAKE_PROFIT'
	,tradeID:''
	,clientTradeID:''
	,price:''
	,timeInForce:''
	,gtdTime:''
	,triggerCondition:''
	,clientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
};
```
- [CLIENT_EXTENSIONS](#defaults_client_extensions)

<h3 id="defaults_order_create_stop_loss">.defaults.ORDER_CREATE.STOP_LOSS</h3>

```
ORDER_CREATE.STOP_LOSS={
	type:'STOP_LOSS'
	,tradeID:''
	,clientTradeID:''
	,price:''
	,distance:''
	,timeInForce:''
	,gtdTime:''
	,triggerCondition:''
	,clientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
};
```
- [CLIENT_EXTENSIONS](#defaults_client_extensions)

<h3 id="defaults_order_create_guaranteed_stop_loss">.defaults.ORDER_CREATE.GUARANTEED_STOP_LOSS</h3>

```
ORDER_CREATE.GUARANTEED_STOP_LOSS={
	type:'GUARANTEED_STOP_LOSS'
	,tradeID:''
	,clientTradeID:''
	,price:''
	,distance:''
	,timeInForce:''
	,gtdTime:''
	,triggerCondition:''
	,clientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
};
```
- [CLIENT_EXTENSIONS](#defaults_client_extensions)

<h3 id="defaults_order_create_trailing_stop_loss">.defaults.ORDER_CREATE.TRAILING_STOP_LOSS</h3>

```
ORDER_CREATE.TRAILING_STOP_LOSS={
	type:'TRAILING_STOP_LOSS'
	,tradeID:''
	,clientTradeID:''
	,distance:''
	,timeInForce:''
	,gtdTime:''
	,triggerCondition:''
	,clientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
};
```
- [CLIENT_EXTENSIONS](#defaults_client_extensions)

</br>

---