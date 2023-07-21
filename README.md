# **OandaV20**

![Oanda](https://img.shields.io/badge/oanda%20api-v20-blue)
![npm](https://img.shields.io/npm/v/oandav20)
![license](https://img.shields.io/badge/license-MIT-green)
Made with ![linux](https://img.shields.io/badge/Linux-FCC624?logo=linux&logoColor=black)

## OandaV20 is a wrapper factory utilizing the [Oanda V20 API](https://developer.oanda.com/rest-live-v20/introduction/)

<br/>

`npm i oandav20`

`oandav20=require('oandav20')`

`wrappers=oandav20(api,host,datetime)`

<br/>

To generate an `api` token, log in to the Account Management Portal and select Manage Api Access:
- CA
    - [Account Management Portal](https://fxtrade.oanda.ca/account/login)
    - [Manage API Access](https://www.oanda.ca/account/tpa/personal_token)
- US
    - [Account Management Portal](https://fxtrade.oanda.com/account/login)
    - [Manage API Access](https://www.oanda.com/account/tpa/personal_token)

</br>

By default the host is set for live accounts, `'api-fxtrade.oanda.com'`, and can be omitted</br>
For practice accounts, input `'api-fxpractice.oanda.com'` as the host.</br>

Datime can either be `'RFC3339'` or `'UNIX'`; by default the datetime is set as `'RFC3339'`.</br>
Please see the Oanda reference: [AcceptDatetimeFormat](https://developer.oanda.com/rest-live-v20/primitives-df/#AcceptDatetimeFormat).

</br>

---

- Accounts
    - [getAccounts](#getaccounts)
    - [getAccountsMeta](#getaccountsmeta)
    - [getAccount](#getaccount)
    - [getAccountSummary](#getaccountsummary)
    - [getAccountInstruments](#getAccountInstruments)
    - [getAccountChangesSinceTransaction](#getAccountChangesSinceTransaction)
    - [setAccountConfiguration](#setAccountConfiguration)
- Instrument
    - [getInstrument](#getInstrument)
    - [getOrderBook](#getOrderBook)
    - [getPositionBook](#getPositionBook)
- Positions
    - [getPositions](#getPositions)
    - [getPosition](#getPosition)
    - [getOpenPositions](#getOpenPositions)
    - [closePosition](#closePosition)
- Transactions
    - [getTransactions](#getTransactions)
    - [getTransaction](#getTransaction)
    - [getTransactionsByIdRange](#getTransactionsByIdRange)
    - [getTransactionsSinceId](#getTransactionsSinceId)
- Pricing
    - [getInstrumentsPricing](#getInstrumentsPricing)
- Trades
    - [getTrades](#getTrades)
    - [getOpenTrades](#getOpenTrades)
    - [getClosedTrades](#getClosedTrades)
    - [getCloseWhenTradeableTrades](#getCloseWhenTradeableTrades)
    - [getAllTrades](#getAllTrades)
    - [getAllOpenTrades](#getAllOpenTrades)
    - [getTrade](#getTrade)
    - [closeTrade](#closeTrade)
    - [setTradeClientExtensions](#setTradeClientExtensions)
    - [setTradeOrders](#setTradeOrders)
- Orders
    - [getOrders](#getOrders)
    - [getPendingOrders](#getPendingOrders)
    - [getFilledOrders](#getFilledOrders)
    - [getTriggeredOrders](#getTriggeredOrders)
    - [getCancelledOrders](#getCancelledOrders)
    - [getAllPendingOrders](#getAllPendingOrders)
    - [getAllOrders](#getAllOrders)
    - [getOrder](#getOrder)
    - [cancelOrder](#cancelOrder)
    - [setOrderClientExtensions](#setOrderClientExtensions)
    - [createMarketOrder](#createMarketOrder)
    - [createLimitOrder](#createLimitOrder)
    - [createStopOrder](#createStopOrder)
    - [createMarketIfTouchedOrder](#createMarketIfTouchedOrder)
    - [createTakeProfitOrder](#createTakeProfitOrder)
    - [createStopLossOrder](#createStopLossOrder)
    - [createGuaranteedStopLossOrder](#createGuaranteedStopLossOrder)
    - [createTrailingStopLossOrder](#createTrailingStopLossOrder)
    - [replaceWithMarketOrder](#replaceWithMarketOrder)
    - [replaceWithLimitOrder](#replaceWithLimitOrder)
    - [replaceWithStopOrder](#replaceWithStopOrder)
    - [replaceWithMarketIfTouchedOrder](#replaceWithMarketIfTouchedOrder)
    - [replaceWithTakeProfitOrder](#replaceWithTakeProfitOrder)
    - [replaceWithStopLossOrder](#replaceWithStopLossOrder)
    - [replaceWithGuaranteedStopLossOrder](#replaceWithGuaranteedStopLossOrder)
    - [replaceWithTrailingStopLossOrder](#replaceWithTrailingStopLossOrder)

</br>

---

## Accounts

Oanda reference: [Account Endpoints](https://developer.oanda.com/rest-live-v20/account-ep/)

### <u>getAccounts</u>

- Get list of accounts
- `getAccounts(callback)`
- Callback data: array `[]`

### <u>getAccountsMeta</u>

- Get summary details of a list of accounts
- `getAccountsMeta(callback)`
- Callback data: array `[]`

### <u>getAccount</u>

- Get full details of a single account
- `getAccount(account,callback)`
- Callback data: object `{}`

### <u>getAccountSummary</u>

- Get summary details of a single account
- `getAccountSummary(account,callback)`
- Callback data: object `{}`

### <u>getAccountInstruments</u>

- Get a list of tradeable instruments
- `getAccountInstruments(account,callback,options)`
- Callback data: array `[]`

### <u>getAccountChangesSinceTransaction</u>

- Get changes to account since a specific transaction id
- `getAccountChangesSinceTransaction(account,transactionID,callback)`
- Callback data: object `{}`

### <u>setAccountConfiguration</u>

- Set the client-configurable portions on an account
- `setAccountConfiguration(account,callback,options)`
- Callback data: object `{}`

</br>

---

## Instrument

Oanda reference: [Instrument Endpoints](https://developer.oanda.com/rest-live-v20/instrument-ep/)

### <u>getInstrument</u> 

- Get candlestick data for an instrument
- `getInstrument(instrument,callback,options)`
- Callback data: array `[]`

### <u>getOrderBook</u>

- Get order book data for an instrument
- `getOrderBook(instrument,callback,options)`
- Callback data: object `{}`

### <u>getPositionBook</u>

- Get position book data for an instrument
- `getPositionBook(instrument,callback,options)`
- Callback data: object `{}`

</br>

---

## Positions

Oanda reference: [Position Endpoints](https://developer.oanda.com/rest-live-v20/position-ep/)

### <u>getPositions</u>

- List positions for the lifetime of an account
- `getPositions(account,callback)`
- Callback data: array `[]`

### <u>getPosition</u>

- Get details of an instrument position
- `getPosition(account,instrument,callback)`
- Callback data: object `{}`

### <u>getOpenPositions</u>

- List positions with open trades
- `getOpenPositions(account,callback)`
- Callback data: array `[]`

### <u>closePosition</u>

- Fully or partially close an open position
- `closePosition(account,instrument,callback,options)`
- Callback data: object `{}`

</br>

---

## Transactions

Oanda reference: [Transaction Endpoints](https://developer.oanda.com/rest-live-v20/transaction-ep/)

### <u>getTransactions</u>

- Get a list of transaction pages
- `getTransactions(account,callback,options)`
- Callback data: object `{}`

### <u>getTransaction</u>

- Get details of a single transaction
- `getTransaction(account,transactionID,callback)`
- Callback data: object `{}`

### <u>getTransactionsByIdRange</u>

- Get a list of transactions by transaction id range
- `getTransactionsByIdRange(account,from,to,callback,options)`
- Callback data: array `[]`

### <u>getTransactionsSinceId</u>

- Get a list of transactions starting after a specified transaction id
- `getTransactionsSinceId(account,id,callback,options)`
- Callback data: array `[]`

</br>

---

## Pricing

Oanda reference: [Pricing Endpoints](https://developer.oanda.com/rest-live-v20/pricing-ep/)

### <u>getInstrumentsPricing</u>

- Get pricing details for a list of instruments
- `getInstrumentsPricing(account,instruments,callback,options)`
- Callback data: array `[]`

</br>

---

## Trades

Oanda reference: [Trade Endpoints](https://developer.oanda.com/rest-live-v20/trade-ep/)

### <u>getTrades</u>

- Get a list of trades by account
- `getTrades(account,callback,options)`
- Callback data: array `[]`

### <u>getOpenTrades</u>

- Get a list of open trades by account
- `getOpenTrades(account,callback,options)`
- Callback data: array `[]`

### <u>getClosedTrades</u>

- Get a list of closed trades by account
- `getClosedTrades(account,callback,options)`
- Callback data: array `[]`

### <u>getCloseWhenTradeableTrades</u>

- Get a list of Close-when-tradeable trades by account
- `getCloseWhenTradeableTrades(account,callback,options)`
- Callback data: array `[]`

### <u>getAllTrades</u>

- Get a list of all trades by account
- `getAllTrades(account,callback,options)`
- Callback data: array `[]`

### <u>getAllOpenTrades</u>

- Get a list of all open trades by account
- `getAllOpenTrades(account,callback)`
- Callback data: array `[]`

### <u>getTrade</u>

- Get details of a single trade
- `getTrade(account,tradeSpecifier,callback)`
- Callback data: object `{}`

### <u>closeTrade</u>

- Fully or partially close an open trade
- `closeTrade(account,tradeSpecifier,callback,options)`
- Callback data: object `{}`

### <u>setTradeClientExtensions</u>

- Set the client extensions for a trade
- `setTradeClientExtensions(account,tradeSpecifier,callback,options)`
- Callback data: object `{}`
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference:
    - [Client Extensions](https://developer.oanda.com/rest-live-v20/transaction-df/#ClientExtensions)

### <u>setTradeOrders</u>

- Create, replace and cancel the orders for a trade
- `setTradeOrders(account,tradeSpecifier,callback,options)`
- Callback data: object `{}`
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: 
    - [Take Profit Details](https://developer.oanda.com/rest-live-v20/transaction-df/#TakeProfitDetails)
    - [Stop Loss Details](https://developer.oanda.com/rest-live-v20/transaction-df/#StopLossDetails)
    - [Guaranteed Stop Loss Details](https://developer.oanda.com/rest-live-v20/transaction-df/#GuaranteedStopLossDetails)
    - [Trailing Stop Loss Details](https://developer.oanda.com/rest-live-v20/transaction-df/#TrailingStopLossDetails)

</br>

---

## Orders

Oanda reference: [Order Endpoints](https://developer.oanda.com/rest-live-v20/order-ep/)

### <u>getOrders</u>

- Get a list of orders
- `getOrders(account,callback,options)`
- Callback data: array `[]`

### <u>getPendingOrders</u>

- Get a list of pending orders
- `getPendingOrders(account,callback,options)`
- Callback data: array `[]`

### <u>getFilledOrders</u>

- Get a list of filled orders
- `getFilledOrders(account,callback,options)`
- Callback data: array `[]`

### <u>getTriggeredOrders</u>

- Get a list of triggered orders
- `getTriggeredOrders(account,callback,options)`
- Callback data: array `[]`

### <u>getCancelledOrders</u>

- Get a list of cancelled orders
- `getCancelledOrders(account,callback,options)`
- Callback data: array `[]`

### <u>getAllPendingOrders</u>

- Get a list of all pending orders
- `getAllPendingOrders(account,callback)`
- Callback data: array `[]`

### <u>getAllOrders</u>

- Get a list of all orders
- `getAllOrders(account,callback,options)`
- Callback data: array `[]`

### <u>getOrder</u>

- Get details of a single order
- `getOrder(account,orderSpecifier,callback)`
- Callback data: object `{}`

### <u>cancelOrder</u>

- Cancel a pending order
- `cancelOrder(account,orderSpecifier,callback)`
- Callback data: object `{}`

### <u>setOrderClientExtensions</u>

- Set the client extensions for an order
- Set the client extensions for a trade when the order is filled
- `setOrderClientExtensions(account,orderSpecifier,callback,options)`
- Callback data: object `{}`
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Client Extensions](https://developer.oanda.com/rest-live-v20/transaction-df/#ClientExtensions)

### <u>createMarketOrder</u>

- Create a market order
- `createMarketOrder(account,callback,options)`
- Callback data: object `{}`
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market Order Request](https://developer.oanda.com/rest-live-v20/order-df/#MarketOrderRequest)

### <u>createLimitOrder</u>

- Create a limit order
- `createLimitOrder(account,callback,options)`
- Callback data: object `{}`
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Limit Order Request](https://developer.oanda.com/rest-live-v20/order-df/#LimitOrderRequest)

### <u>createStopOrder</u>

- Create a stop order
- `createStopOrder(account,callback,options)`
- Callback data: object `{}`
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Stop Order Request](https://developer.oanda.com/rest-live-v20/order-df/#StopOrderRequest)

### <u>createMarketIfTouchedOrder</u>

- Create a market-if-touched order
- `createMarketIfTouchedOrder(account,callback,options)`
- Callback data: object `{}`
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market If Touched Order Request](https://developer.oanda.com/rest-live-v20/order-df/#MarketIfTouchedOrderRequest)

### <u>createTakeProfitOrder</u>

- Create a take profit order
- `createTakeProfitOrder(account,callback,options)`
- Callback data: object `{}`
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Take Profit Order Request](https://developer.oanda.com/rest-live-v20/order-df/#TakeProfitOrderRequest)

### <u>createStopLossOrder</u>

- Create a stop loss order
- `createStopLossOrder(account,callback,options)`
- Callback data: object `{}`
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Stop Loss Order Request](https://developer.oanda.com/rest-live-v20/order-df/#StopLossOrderRequest)

### <u>createGuaranteedStopLossOrder</u>

- Create a guaranteed stop loss order
- `createGuaranteedStopLossOrder(account,callback,options)`
- Callback data: object `{}`
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Guaranteed Stop Loss Order Request](https://developer.oanda.com/rest-live-v20/order-df/#GuaranteedStopLossOrderRequest)

### <u>createTrailingStopLossOrder</u>

- Create a trailing stop loss order
- `createTrailingStopLossOrder(account,callback,options)`
- Callback data: object `{}`
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Trailing Stop Loss Order Request](https://developer.oanda.com/rest-live-v20/order-df/#TrailingStopLossOrderRequest)


### <u>replaceWithMarketOrder</u>

- Cancel an order and replace with a market order
- `replaceWithMarketOrder(account,orderSpecifier,callback,options)`
- Callback data: object `{}`
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market Order Request](https://developer.oanda.com/rest-live-v20/order-df/#MarketOrderRequest)

### <u>replaceWithLimitOrder</u>

- Cancel an order and replace with a limit order
- `replaceWithLimitOrder(account,orderSpecifier,callback,options)`
- Callback data: object `{}`
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market Order Request](https://developer.oanda.com/rest-live-v20/order-df/#LimitOrderRequest)

### <u>replaceWithStopOrder</u>

- Cancel an order and replace with a stop order
- `replaceWithStopOrder(account,orderSpecifier,callback,options)`
- Callback data: object `{}`
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market Order Request](https://developer.oanda.com/rest-live-v20/order-df/#StopOrderRequest)

### <u>replaceWithMarketIfTouchedOrder</u>

- Cancel an order and replace with a market-if-touched order
- `replaceWithMarketIfTouchedOrder(account,orderSpecifier,callback,options)`
- Callback data: object `{}`
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market Order Request](https://developer.oanda.com/rest-live-v20/order-df/#MarketIfTouchedOrderRequest)

### <u>replaceWithTakeProfitOrder</u>

- Cancel an order and replace with a take profit order
- `replaceWithTakeProfitOrder(account,orderSpecifier,callback,options)`
- Callback data: object `{}`
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market Order Request](https://developer.oanda.com/rest-live-v20/order-df/#TakeProfitOrderRequest)

### <u>replaceWithStopLossOrder</u>

- Cancel an order and replace with a stop loss order
- `replaceWithStopLossOrder(account,orderSpecifier,callback,options)`
- Callback data: object `{}`
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market Order Request](https://developer.oanda.com/rest-live-v20/order-df/#StopLossOrderRequest)

### <u>replaceWithGuaranteedStopLossOrder</u>

- Cancel an order and replace with a guaranteed stop loss order
- `replaceWithGuaranteedStopLossOrder(account,orderSpecifier,callback,options)`
- Callback data: object `{}`
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market Order Request](https://developer.oanda.com/rest-live-v20/order-df/#GuaranteedStopLossOrderRequest)

### <u>replaceWithTrailingStopLossOrder</u>

- Cancel an order and replace with a trailing stop loss order
- `replaceWithTrailingStopLossOrder(account,orderSpecifier,callback,options)`
- Callback data: object `{}`
- ***Do not set, modify, or delete client extensions if your account is associated with MT4***
- Oanda reference: [Market Order Request](https://developer.oanda.com/rest-live-v20/order-df/#TrailingStopLossOrderRequest)

---