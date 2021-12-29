# **OandaV20**

![Oanda](https://img.shields.io/badge/oanda%20api-v20-blue)
![npm](https://img.shields.io/npm/v/oandav20)
![license](https://img.shields.io/badge/license-MIT-green)
Made with ![linux](https://img.shields.io/badge/Linux-FCC624?logo=linux&logoColor=black)

## OandaV20 is a collection of functions utilizing the [Oanda V20 API](https://developer.oanda.com/rest-live-v20/introduction/)

<br/>

`npm i oandav20`

`Oanda=require('oandav20')(api,host)`

To generate an `api` token, log in to the Account Management Portal and select Manage Api Access:
- CA
    - [Account Management Portal](https://fxtrade.oanda.ca/account/login)
    - [Manage API Access](https://www.oanda.ca/account/tpa/personal_token)
- US
    - [Account Management Portal](https://fxtrade.oanda.com/account/login)
    - [Manage API Access](https://www.oanda.com/account/tpa/personal_token)

</br>

By default the host is set for live accounts, `'api-fxtrade.oanda.com'`, and can be omitted</br>
For practice accounts, input `'api-fxpractice.oanda.com'` as the host.

<br/>

---

## Common

- All functions use the calling format `func(arguments={},callback=function(data){})`</br>

- Omit arguments: `func(callback)`
    - If the arguments object is not provided, the functions will be supplied with the default arguments
    - Default arguments are attached to each function and may be accessed using `func.defaults()`
        - If an object is provided to `.defaults(obj={})`, the object properties will be added to the function defaults
        - Add any required properties: account, id, etc, to the defaults to fully omit the arguments object
        - Omitting the parameter has no effect
        - Returns the default object

</br>

- Omit callback: `func(arguments)`
    - If a callback is not provided, the function response will print to the console

</br>

- Datetime argument: `arguments.datetime = datetime`
    - All function arguments may include a datetime property to set the response datetime format
    - `.datetime = 'RFC3339' || 'UNIX'`

</br>

- Repeat argument: `arguments.repeat = number`
    - All function arguments may include a repeat property to cause the function to be repeatedly called with a given frequency
    - If the repeat argument is provided, the function will return an object `obj=func({repeat:1000})` with the properties:
        - `obj.repeat = [given repeat argument number] //modifiable repeat interval`
        - `obj.end = function() //end the repeatable interval`

</br>

- Debug argument: `arguments.debug = boolean`
    - All function arguments may include a debug property, equal to `true`, to instruct the function to print the https head and body if applicable
    - The https request will not be sent

</br>

- Requests limit & queue
    - Requests are limited to 100/second
    - Please see [Best Practices](https://developer.oanda.com/rest-live-v20/best-practices/)
    - If the request limit is reached:
        - `GET` requests with paths, including queries, matching queued requests will be discarded
        - All other requests will be queued
        - The queue will be emptied up to the request limit once a new second is calculated

</br>

---

## Functions

- api `oanda.api(key)`
    - Get & Set system api key
    - Omitting key has no effect
    - Returns: current key string

</br>

- host `oanda.host(hostname)`
    - Get & Set system host name
    - Omitting hostname has no effect
    - Returns: current host name string

</br>

- getAccounts `oanda.getAccounts(args,cb)`
    - Get list of accounts
    - Requires arguments: none
    - Callback data: array `[]`

</br>

- getAccount `oanda.getAccount(args,cb)`
    - Get details of a single account
    - Requires arguments: `account = string`
    - Callback data: object `{}`

</br>

- getAccountChangesSinceTransaction `oanda.getAccountChangesSinceTransaction(args,cb)`
    - Get changes to account since a specific transaction id
    - Requires arguments:
        - `account = string`
        - `transaction = string || number`
    - Callback data: object `{}`

</br>

- getAccountInstruments `oanda.getAccountInstruments(args,cb)`
    - Get list of tradeable instruments for an account
    - Requires arguments: `account = string`
    - Optional arguments: `instruments = csv string`
    - Callback data: array `[]`

</br>
        
 - setAccountConfiguration `oanda.setAccountConfiguration(args,cb)`
    - Set the client-configurable portions on an account
    - Requires arguments: `account = string`
    - Optional arguments:
        - `alias = string`
        - `marginRate = number`
    - Callback data: object `{}`

</br>       

 - getInstrument `oanda.getInstrument(args,cb)`
    - Get candlestick data for an instrument
    - Requires arguments: `instrument = string`
    - Optional arguments:
        - `price = string`
        - `count = number`
        - `smooth = boolean`
        - `granularity = string`
        - `dailyAlignment = number`
        - `alignmentTimezone = string`
        - `weeklyAlignment = string`
        - `from = datetime`
        - `includeFirst = boolean`
        - `to = datetime`
    - Callback data: array `[]`

</br>
        
 - getOrderBook `oanda.getOrderBook(args,cb)`
    - Get order book data for an instrument
    - Requires arguments: `instrument = string`
    - Optional arguments: `time = datetime`
    - Callback data: object `{}`

</br>
        
 - getPositionBook `oanda.getPositionBook(args,cb)`
    - Get position book data for an instrument
    - Requires arguments: `instrument = string`
    - Optional arguments: `time = datetime`
    - Callback data: object `{}`

</br>

 - getOrders `oanda.getOrders(args,cb)`
    - Get a list of orders for an account
    - Requires arguments: `account = string`
    - Optional arguments:
        - `state = string`
        - `count = number`
        - `instrument = string`
        - `beforeID = string || number`
        - `ids = csv string list`
    - Callback data: array `[]`

</br>
        
 - getOrder `oanda.getOrder(args,cb)`
    - Get details of a single order for an account
    - Requires arguments:
        - `account = string`
        - `id = number || string`
    - Callback data: object `{}`

</br>

 - getPendingOrders `oanda.getPendingOrders(args,cb)`
    - Get a list of pending orders for an account
    - Requires arguments: `account = string`
    - Callback data: array `[]`

</br>

 - createOrder `oanda.createOrder(args,cb)`
    - Create an order for an account
    - Requires arguments: `account = string`
    - Optional arguments:
        - `order = object`
        - ***Do not set, modify, or delete client extensions if your account is associated with MT4***
        -  Please see [Order Request](https://developer.oanda.com/rest-live-v20/order-df/#OrderRequest)
    - Callback data: object `{}`

</br>

 - replaceOrder `oanda.replaceOrder(args,cb)`
    - Replace an order by cancelling and creating a new order
    - Requires arguments:
        - `account = string`
        - `id = number || string`
    - Optional arguments:
        - `order = object`
        - ***Do not set, modify, or delete client extensions if your account is associated with MT4***
        -  Please see [Order Request](https://developer.oanda.com/rest-live-v20/order-df/#OrderRequest)
    - Callback data: object `{}`

</br>

 - cancelOrder `oanda.cancelOrder(args,cb)`
    - Cancel a pending order for an account
    - Requires arguments:
        - `account = string`
        - `id = number || string`
    - Callback data: object `{}`

</br>

 - setOrderClientExtensions `oanda.setOrderClientExtensions(args,cb)`
    - Set the client extensions for an order
    - Set the client extensions for a trade when the order is filled
    - Requires arguments:
        - `account = string`
        - `id = number || string`
    - Optional arguments:
        - `clientExtensions = object`
        - `tradeClientExtensions = object`
        - ***Do not set, modify, or delete client extensions if your account is associated with MT4***
        - Please see [Client Extensions](https://developer.oanda.com/rest-live-v20/transaction-df/#ClientExtensions)
    - Callback data: object `{}`

</br>

 - getPositions `oanda.getPositions(args,cb)`
    - List positions for the lifetime of an account
    - Requires arguments: `account = string`
    - Callback data: array `[]`

</br>

 - getPosition `oanda.getPosition(args,cb)`
    - Get details of a position taken during the lifetime of an account
    - Requires arguments:
        - `account = string`
        - `instrument = string`
    - Callback data: object `{}`

</br>

 - getOpenPositions `oanda.getOpenPositions(args,cb)`
    - List positions with open trades for an account
    - Requires arguments: `account = string`
    - Callback data: array `[]`

</br>

 - closePosition `oanda.closePosition(args,cb)`
    - Fully or partially close an open position for an account
    - Requires arguments:
        - `account = string`
        - `instrument = string`
    - Optional arguments:
        - `longUnits = number || string`
        - `shortUnits = number || string`
        - `longClientExtensions = object`
        - `shortClientExtensions = object`
        - ***Do not set, modify, or delete client extensions if your account is associated with MT4***
        - Please see [Client Extensions](https://developer.oanda.com/rest-live-v20/transaction-df/#ClientExtensions)
    - Callback data: object `{}`

</br>

 - getInstrumentsPricing `oanda.getInstrumentsPricing(args,cb)`
    - Get pricing details for a list of instruments
    - Requires arguments: `account = string`
    - Optional arguments:
        - `instruments =  csv string`
        - `since = datetime`
        - `includeHomeConversions = boolean`
    - Callback data: array `[]`

</br>

 - getTrades `oanda.getTrades(args,cb)`
    - Get a list of trades by account
    - Requires arguments: `account = string`
    - Optional arguments:
        - `count =  number`
        - `state = string`
        - `instrument = string`
        - `beforeID = number || string`
        - `ids = csv string`
    - Callback data: array `[]`

</br>

 - getTrade `oanda.getTrade(args,cb)`
    - Get details of a single trade for an account
    - Requires arguments:
        - `account = string`
        - `id = number || string`
    - Callback data: object `{}`

</br>

 - getOpenTrades `oanda.getOpenTrades(args,cb)`
    - Get a list of open trades by account
    - Requires arguments: `account = string`
    - Callback data: array `[]`

</br>

 - closeTrade `oanda.closeTrade(args,cb)`
    - Fully or partially close an open trade
    - Requires arguments:
        - `account = string`
        - `id = number || string`
    - Optional arguments: `units = number || string`
    - Callback data: object `{}`

</br>

 - setTradeClientExtensions `oanda.setTradeClientExtensions(args,cb)`
    - Set the client extensions for a trade
    - Requires arguments:
        - `account = string`
        - `id = number || string`
    - Optional arguments:
        - `clientExtensions = object`
        - ***Do not set, modify, or delete client extensions if your account is associated with MT4***
        - Please see [Client Extensions](https://developer.oanda.com/rest-live-v20/transaction-df/#ClientExtensions)
    - Callback data: object `{}`

</br>

 - setTradeOrders `oanda.setTradeOrders(args,cb)`
    - Create, replace and cancel the orders for a trade
    - Requires arguments:
        - `account = string`
        - `id = number || string`
    - Optional arguments:
        - ***Do not set, modify, or delete client extensions if your account is associated with MT4***
        - `takeProfit = object`
        - Please see [Take Profit Details](https://developer.oanda.com/rest-live-v20/transaction-df/#TakeProfitDetails)
        - `stopLoss = object`
        - Please see [Stop Loss Details](https://developer.oanda.com/rest-live-v20/transaction-df/#StopLossDetails)
        - `trailingStopLoss = object`
        - Please see [Trailing Stop Loss Details](https://developer.oanda.com/rest-live-v20/transaction-df/#TrailingStopLossDetails)
        - `guaranteedStopLoss = object`
        - Please see [Guaranteed Stop Loss Details](https://developer.oanda.com/rest-live-v20/transaction-df/#GuaranteedStopLossDetails)
    - Callback data: object `{}`

</br>

 - getTransactions `oanda.getTransactions(args,cb)`
    - Get a list of transaction pages
    - Requires arguments: `account = string`
    - Optional arguments:
        - `from = datetime`
        - `to  = datetime`
        - `pageSize = number`
        - `type = csv string`
    - Callback data: object `{}`

</br>

 - getTransaction `oanda.getTransaction(args,cb)`
    - Get details of a single transaction
    - Requires arguments:
        - `account = string`
        - `id = number`
    - Callback data: object `{}`

</br>

 - getTransactionsByIdRange `oanda.getTransactionsByIdRange(args,cb)`
    - Get a list of transactions by transaction id range
    - Requires arguments:
        - `account = string`
        - `from = number`
        - `to  = number`
    - Optional arguments: `type = csv string`
    - Callback data: array `[]`

</br>

 - getTransactionsSinceId `oanda.getTransactionsSinceId(args,cb)`
    - Get a list of transactions starting after a specified transaction id
    - Requires arguments:
        - `account = string`
        - `id = number`
    - Optional arguments: `type = csv string`
    - Callback data: array `[]`

</br>

---
