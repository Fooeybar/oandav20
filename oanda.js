const _REQUEST=require('https').request;
const _GET=require('https').get;
const _CREATE_GUNZIP=require('zlib').createGunzip;
const CLIENT_EXT={
    id:''
    ,tag:''
    ,comment:''
};
const TAKE_PROFIT={
    price:''
    ,timeInForce:''
    ,gtdTime:''
    ,clientExtensions:CLIENT_EXT
};
const STOP_LOSS={
    price:''
    ,distance:''
    ,timeInForce:''
    ,gtdTime:''
    ,clientExtensions:CLIENT_EXT
};
const G_STOP_LOSS={
    price:''
    ,distance:''
    ,timeInForce:''
    ,gtdTime:''
    ,clientExtensions:CLIENT_EXT
};
const T_STOP_LOSS={
    distance:''
    ,timeInForce:''
    ,gtdTime:''
    ,clientExtensions:CLIENT_EXT
};
const STD={
    TIME:{time:''}
    ,TYPE:{type:''}
    ,UNITS:{units:''}
    ,ACCT_INSTRUMENTS:{instruments:''}
    ,CONFIG:{alias:'',marginRate:''}
    ,INSTRUMENT:{
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
    }
    ,ORDERS:{
        state:''
        ,instrument:''
        ,count:''
        ,beforeID:''
        ,ids:''
    }
    ,TRADES:{
        count:''
        ,state:''
        ,beforeID:''
        ,instrument:''
        ,ids:''
    }
    ,TRANSACTIONS:{
        from:''
        ,to:''
        ,pageSize:''
        ,type:''
    }
    ,INS_PRICING:{
        since:''
        ,includeHomeConversions:''
    }
    ,CLIENT_EXT:CLIENT_EXT
    ,CLOSE_POS:{
        longClientExtensions:CLIENT_EXT
        ,shortClientExtensions:CLIENT_EXT
        ,longUnits:''
        ,shortUnits:''
    }
    ,ORDER_EXT:{
        clientExtensions:CLIENT_EXT
        ,tradeClientExtensions:CLIENT_EXT
    }
    ,TAKE_PROFIT:TAKE_PROFIT
    ,STOP_LOSS:STOP_LOSS
    ,G_STOP_LOSS:G_STOP_LOSS
    ,T_STOP_LOSS:T_STOP_LOSS
    ,TRADE_ORDERS:{
        takeProfit:TAKE_PROFIT
        ,stopLoss:STOP_LOSS
        ,guaranteedStopLoss:G_STOP_LOSS
        ,trailingStopLoss:T_STOP_LOSS
    }
    ,ORDER_CREATE:{
        MARKET:{
            type:'MARKET'
            ,instrument:''
            ,units:''
            ,timeInForce:''
            ,priceBound:''
            ,positionFill:''
            ,clientExtensions:CLIENT_EXT
            ,takeProfitOnFill:TAKE_PROFIT
            ,stopLossOnFill:STOP_LOSS
            ,guaranteedStopLossOnFill:G_STOP_LOSS
            ,trailingStopLossOnFill:T_STOP_LOSS
            ,tradeClientExtensions:CLIENT_EXT
        }
        ,LIMIT:{
            type:'LIMIT'
            ,instrument:''
            ,units:''
            ,price:''
            ,timeInForce:''
            ,gtdTime:''
            ,positionFill:''
            ,triggerCondition:''
            ,clientExtensions:CLIENT_EXT
            ,takeProfitOnFill:TAKE_PROFIT
            ,stopLossOnFill:STOP_LOSS
            ,guaranteedStopLossOnFill:G_STOP_LOSS
            ,trailingStopLossOnFill:T_STOP_LOSS
            ,tradeClientExtensions:CLIENT_EXT
        }
        ,STOP:{
            type:'STOP'
            ,instrument:''
            ,units:''
            ,price:''
            ,priceBound:''
            ,timeInForce:''
            ,gtdTime:''
            ,positionFill:''
            ,triggerCondition:''
            ,clientExtensions:CLIENT_EXT
            ,takeProfitOnFill:TAKE_PROFIT
            ,stopLossOnFill:STOP_LOSS
            ,guaranteedStopLossOnFill:G_STOP_LOSS
            ,trailingStopLossOnFill:T_STOP_LOSS
            ,tradeClientExtensions:CLIENT_EXT
        }
        ,MARKET_IF:{
            type:'MARKET_IF_TOUCHED'
            ,instrument:''
            ,units:''
            ,price:''
            ,priceBound:''
            ,timeInForce:''
            ,gtdTime:''
            ,positionFill:''
            ,triggerCondition:''
            ,clientExtensions:CLIENT_EXT
            ,takeProfitOnFill:TAKE_PROFIT
            ,stopLossOnFill:STOP_LOSS
            ,guaranteedStopLossOnFill:G_STOP_LOSS
            ,trailingStopLossOnFill:T_STOP_LOSS
            ,tradeClientExtensions:CLIENT_EXT
        }
        ,TAKE_PROFIT:{
            type:'TAKE_PROFIT'
            ,tradeID:''
            ,clientTradeID:''
            ,price:''
            ,timeInForce:''
            ,gtdTime:''
            ,triggerCondition:''
            ,clientExtensions:CLIENT_EXT
        }
        ,STOP_LOSS:{
            type:'STOP_LOSS'
            ,tradeID:''
            ,clientTradeID:''
            ,price:''
            ,distance:''
            ,timeInForce:''
            ,gtdTime:''
            ,triggerCondition:''
            ,clientExtensions:CLIENT_EXT
        }
        ,G_STOP_LOSS:{
            type:'GUARANTEED_STOP_LOSS'
            ,tradeID:''
            ,clientTradeID:''
            ,price:''
            ,distance:''
            ,timeInForce:''
            ,gtdTime:''
            ,triggerCondition:''
            ,clientExtensions:CLIENT_EXT
        }
        ,T_STOP_LOSS:{
            type:'TRAILING_STOP_LOSS'
            ,tradeID:''
            ,clientTradeID:''
            ,distance:''
            ,timeInForce:''
            ,gtdTime:''
            ,triggerCondition:''
            ,clientExtensions:CLIENT_EXT
        }
    }
};
const CALLBACK=(err,data)=>{};
const MAKE_QUERY=(opts)=>{
    let query='';
    for(let i in opts){
        if(opts[i]=='')continue;
        query+=(query.length>0)?`&`:`?`;
        query+=`${i}=${opts[i]}`;
    }
    return query;
};
const MAKE_BODY=(opts)=>{
    let body={};
    for(let i in opts){
        if(opts[i]==''||opts[i]==={})continue;
        if(typeof(opts[i])==='object'){
            let temp=MAKE_BODY(opts[i]);
            if(temp!=={})body[i]=temp;
        }
        else body[i]=''+opts[i];
    }
    return body;
};
const CHECK_QUERY=(opts,std)=>{
    if(opts!==std)for(let i in std)if(opts[i]===undefined)opts[i]=std[i];
    return opts;
};
const END=(err=undefined,data='',prop='',callback=CALLBACK)=>{
    if(err!==undefined)return callback(err,data);
    data=JSON.parse(data);
    if(prop&&prop.length>0&&data[prop]!==undefined)data=data[prop];
    return callback(err,data);
};
module.exports=(api='',host='api-fxtrade.oanda.com',datetime='RFC3339')=>{
    const REQUEST=(method='',path='',prop='',callback=CALLBACK,body=undefined)=>{
        let head={
            hostname:host
            ,headers:{
                'Authorization':`Bearer ${api}`
                ,'Content-Type':'application/json; charset=UTF-8'
                ,'Accept-Encoding':'gzip,deflate,utf-8'
                ,'Accept-Datetime-Format':datetime
            }
            ,method:method
            ,path:path
        };
        let func=(res)=>{
            let data='';
            if(res.headers['content-encoding']===undefined||res.headers['content-encoding']==='utf-8'){
                res.on('data',(chunk)=>{data+=(''+chunk).replace(',,',',');});
                res.on('error',(err)=>END(err,data,prop,callback));
                res.on('end',()=>END(undefined,data,prop,callback));            
            }
            else if(res.headers['content-encoding']==='gzip'){
                let gzip=_CREATE_GUNZIP();
                gzip.on('data',(chunk)=>{data+=chunk;});
                gzip.on('error',(err)=>END(err,data,prop,callback));
                gzip.on('end',()=>END(undefined,data,prop,callback));
                res.pipe(gzip);
            }
        };
        return (method==='GET')?_GET(head,func)
                :(body===undefined)?_REQUEST(head,func)
                                :_REQUEST(head,func).end(JSON.stringify(body));

    };
    return {
        //account
        getAccounts:(callback=CALLBACK)=>{
            return REQUEST(
                'GET'
                ,'/v3/accounts'
                ,'accounts'
                ,callback
            );
        }
        ,getAccount:(account='',callback=CALLBACK)=>{
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}`
                ,'account'
                ,callback
            );
        }
        ,getAccountSummary:(account='',callback=CALLBACK)=>{
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/summary`
                ,'account'
                ,callback
            );
        }
        ,getAccountInstruments:(account='',callback=CALLBACK,query=STD.ACCT_INSTRUMENTS)=>{
            query=CHECK_QUERY(query,STD.ACCT_INSTRUMENTS);
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/instruments${MAKE_QUERY(query)}`
                ,'instruments'
                ,callback
            );
        }
        ,getAccountChangesSinceTransaction:(account='',transactionID='',callback=CALLBACK)=>{
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/changes?sinceTransactionID=${transactionID}`
                ,'changes'
                ,callback
            );
        }
        ,setAccountConfiguration:(account='',callback=CALLBACK,body=STD.CONFIG)=>{
            body=CHECK_QUERY(body,STD.CONFIG);
            return REQUEST(
                'PATCH'
                ,`/v3/accounts/${account}/configuration`
                ,'clientConfigureTransaction'
                ,callback
                ,MAKE_BODY(body)
            );
        }
        //rates
        ,getInstrument:(instrument='',callback=CALLBACK,query=STD.INSTRUMENT)=>{
            query=CHECK_QUERY(query,STD.INSTRUMENT);
            return REQUEST(
                'GET'
                ,`/v3/instruments/${instrument}/candles${MAKE_QUERY(query)}`
                ,'candles'
                ,callback
            );
        }
        ,getOrderBook:(instrument='',callback=CALLBACK,query=STD.TIME)=>{
            query=CHECK_QUERY(query,STD.TIME);
            return REQUEST(
                'GET'
                ,`/v3/instruments/${instrument}/orderBook${MAKE_QUERY(query)}`
                ,'orderBook'
                ,callback
            );
        }
        ,getPositionBook:(instrument='',callback=CALLBACK,query=STD.TIME)=>{
            query=CHECK_QUERY(query,STD.TIME);
            return REQUEST(
                'GET'
                ,`/v3/instruments/${instrument}/positionBook${MAKE_QUERY(query)}`
                ,'positionBook'
                ,callback
            );
        }
        //position
        ,getPositions:(account='',callback=CALLBACK)=>{
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/positions`
                ,'positions'
                ,callback
            );
        }
        ,getPosition:(account='',instrument='',callback=CALLBACK)=>{
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/positions/${instrument}`
                ,'position'
                ,callback
            );
        }
        ,getOpenPositions:(account='',callback=CALLBACK)=>{
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/openPositions`
                ,'positions'
                ,callback
            );
        }
        ,closePosition:(account='',instrument='',callback=CALLBACK,body=STD.CLOSE_POS)=>{
            body=CHECK_QUERY(body,STD.CLOSE_POS);
            return REQUEST(
                'PUT'
                ,`/v3/accounts/${account}/positions/${instrument}/close`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        //transaction
        ,getTransactions:(account='',callback=CALLBACK,query=STD.TRANSACTIONS)=>{
            query=CHECK_QUERY(query,STD.TRANSACTIONS);
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/transactions${MAKE_QUERY(query)}`
                ,''
                ,callback
            );
        }
        ,getTransaction:(account='',transactionID='',callback=CALLBACK)=>{
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/transactions/${transactionID}`
                ,'transaction'
                ,callback
            );
        }
        ,getTransactionsByIdRange:(account='',from='',to='',callback=CALLBACK,query=STD.TYPE)=>{
            query=CHECK_QUERY(query,STD.TYPE);
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/transactions/idrange${MAKE_QUERY({to:to,from:from,type:query.type})}`
                ,'transactions'
                ,callback
            );
        }
        ,getTransactionsSinceId:(account='',id='',callback=CALLBACK,query=STD.TYPE)=>{
            query=CHECK_QUERY(query,STD.TYPE);
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/transactions/sinceid${MAKE_QUERY({id:id,type:query.type})}`
                ,'transactions'
                ,callback
            );
        }
        //rate pricing
        ,getInstrumentsPricing:(account='',instruments='',callback=CALLBACK,query=STD.INS_PRICING)=>{
            query=CHECK_QUERY(query,STD.INS_PRICING);
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/pricing`+MAKE_QUERY({
                                                    instruments:instruments
                                                    ,since:query.since
                                                    ,includeHomeConversions:query.includeHomeConversions
                                                })
                ,'prices'
                ,callback
            );
        }
        //trades
        ,getTrades:(account='',callback=CALLBACK,query=STD.TRADES)=>{
            query=CHECK_QUERY(query,STD.TRADES);
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/trades${MAKE_QUERY(query)}`
                ,'trades'
                ,callback
            );
        }
        ,getOpenTrades:(account='',callback=CALLBACK,query=STD.TRADES)=>{
            query=CHECK_QUERY(query,STD.TRADES);
            query.state='OPEN';
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/trades${MAKE_QUERY(query)}`
                ,'trades'
                ,callback
            );
        }
        ,getClosedTrades:(account='',callback=CALLBACK,query=STD.TRADES)=>{
            query=CHECK_QUERY(query,STD.TRADES);
            query.state='CLOSED';
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/trades${MAKE_QUERY(query)}`
                ,'trades'
                ,callback
            );
        }
        ,getCloseWhenTradeableTrades:(account='',callback=CALLBACK,query=STD.TRADES)=>{
            query=CHECK_QUERY(query,STD.TRADES);
            query.state='CLOSE_WHEN_TRADEABLE';
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/trades${MAKE_QUERY(query)}`
                ,'trades'
                ,callback
            );
        }
        ,getAllTrades:(account='',callback=CALLBACK,query=STD.TRADES)=>{
            query=CHECK_QUERY(query,STD.TRADES);
            query.state='ALL';
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/trades${MAKE_QUERY(query)}`
                ,'trades'
                ,callback
            );
        }
        ,getAllOpenTrades:(account='',callback=CALLBACK)=>{
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/openTrades`
                ,'trades'
                ,callback
            );
        }
        ,getTrade:(account='',tradeSpecifier='',callback=CALLBACK)=>{
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/trades/${tradeSpecifier}`
                ,'trade'
                ,callback
            );
        }
        ,closeTrade:(account='',tradeSpecifier='',callback=CALLBACK,body=STD.UNITS)=>{
            body=CHECK_QUERY(body,STD.UNITS);
            return REQUEST(
                'PUT'
                ,`/v3/accounts/${account}/trades/${tradeSpecifier}/close`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        ,setTradeClientExtensions:(account='',tradeSpecifier='',callback=CALLBACK,body=STD.CLIENT_EXT)=>{
            body=CHECK_QUERY(body,STD.CLIENT_EXT);
            return REQUEST(
                'PUT'
                ,`/v3/accounts/${account}/trades/${tradeSpecifier}/clientExtensions`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        ,setTradeOrders:(account='',tradeSpecifier='',callback=CALLBACK,body=STD.TRADE_ORDERS)=>{
            body=CHECK_QUERY(body,STD.TRADE_ORDERS);
            return REQUEST(
                'PUT'
                ,`/v3/accounts/${account}/trades/${tradeSpecifier}/orders`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        //orders
        ,getOrders:(account='',callback=CALLBACK,query=STD.ORDERS)=>{
            query=CHECK_QUERY(query,STD.ORDERS);
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/orders${MAKE_QUERY(query)}`
                ,'orders'
                ,callback
            );
        }
        ,getPendingOrders:(account='',callback=CALLBACK,query=STD.ORDERS)=>{
            query=CHECK_QUERY(query,STD.ORDERS);
            query.state='PENDING';
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/orders${MAKE_QUERY(query)}`
                ,'orders'
                ,callback
            );
        }
        ,getFilledOrders:(account='',callback=CALLBACK,query=STD.ORDERS)=>{
            query=CHECK_QUERY(query,STD.ORDERS);
            query.state='FILLED';
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/orders${MAKE_QUERY(query)}`
                ,'orders'
                ,callback
            );
        }
        ,getTriggeredOrders:(account='',callback=CALLBACK,query=STD.ORDERS)=>{
            query=CHECK_QUERY(query,STD.ORDERS);
            query.state='TRIGGERED';
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/orders${MAKE_QUERY(query)}`
                ,'orders'
                ,callback
            );
        }
        ,getCancelledOrders:(account='',callback=CALLBACK,query=STD.ORDERS)=>{
            query=CHECK_QUERY(query,STD.ORDERS);
            query.state='CANCELLED';
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/orders${MAKE_QUERY(query)}`
                ,'orders'
                ,callback
            );
        }
        ,getAllPendingOrders:(account='',callback=CALLBACK)=>{
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/pendingOrders`
                ,'orders'
                ,callback
            );
        }
        ,getAllOrders:(account='',callback=CALLBACK,query=STD.ORDERS)=>{
            query=CHECK_QUERY(query,STD.ORDERS);
            query.state='ALL';
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/orders${MAKE_QUERY(query)}`
                ,'orders'
                ,callback
            );
        }
        ,getOrder:(account='',orderSpecifier='',callback=CALLBACK)=>{
            return REQUEST(
                'GET'
                ,`/v3/accounts/${account}/orders/${orderSpecifier}`
                ,'order'
                ,callback
            );
        }
        ,cancelOrder:(account='',orderSpecifier='',callback=CALLBACK)=>{
            return REQUEST(
                'PUT'
                ,`/v3/accounts/${account}/orders/${orderSpecifier}/cancel`
                ,''
                ,callback
            );
        }
        ,setOrderClientExtensions:(account='',orderSpecifier='',callback=CALLBACK,body=STD.ORDER_EXT)=>{
            body=CHECK_QUERY(body,STD.ORDER_EXT);
            return REQUEST(
                'PUT'
                ,`/v3/accounts/${account}/orders/${orderSpecifier}/clientExtensions`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        ,createMarketOrder:(account='',callback=CALLBACK,body=STD.ORDER_CREATE.MARKET)=>{
            body=CHECK_QUERY(body,STD.ORDER_CREATE.MARKET);
            body.type='MARKET';
            return REQUEST(
                'POST'
                ,`/v3/accounts/${account}/orders`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        ,createLimitOrder:(account='',callback=CALLBACK,body=STD.ORDER_CREATE.LIMIT)=>{
            body=CHECK_QUERY(body,STD.ORDER_CREATE.LIMIT);
            body.type='LIMIT';
            return REQUEST(
                'POST'
                ,`/v3/accounts/${account}/orders`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        ,createStopOrder:(account='',callback=CALLBACK,body=STD.ORDER_CREATE.STOP)=>{
            body=CHECK_QUERY(body,STD.ORDER_CREATE.STOP);
            body.type='STOP';
            return REQUEST(
                'POST'
                ,`/v3/accounts/${account}/orders`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        ,createMarketIfTouchedOrder:(account='',callback=CALLBACK,body=STD.ORDER_CREATE.MARKET_IF)=>{
            body=CHECK_QUERY(body,STD.ORDER_CREATE.MARKET_IF);
            body.type='MARKET_IF_TOUCHED';
            return REQUEST(
                'POST'
                ,`/v3/accounts/${account}/orders`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        ,createTakeProfitOrder:(account='',callback=CALLBACK,body=STD.ORDER_CREATE.TAKE_PROFIT)=>{
            body=CHECK_QUERY(body,STD.ORDER_CREATE.TAKE_PROFIT);
            body.type='TAKE_PROFIT';
            return REQUEST(
                'POST'
                ,`/v3/accounts/${account}/orders`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        ,createStopLossOrder:(account='',callback=CALLBACK,body=STD.ORDER_CREATE.STOP_LOSS)=>{
            body=CHECK_QUERY(body,STD.ORDER_CREATE.STOP_LOSS);
            body.type='STOP_LOSS';
            return REQUEST(
                'POST'
                ,`/v3/accounts/${account}/orders`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        ,createGuaranteedStopLossOrder:(account='',callback=CALLBACK,body=STD.ORDER_CREATE.G_STOP_LOSS)=>{
            body=CHECK_QUERY(body,STD.ORDER_CREATE.G_STOP_LOSS);
            body.type='GUARANTEED_STOP_LOSS';
            return REQUEST(
                'POST'
                ,`/v3/accounts/${account}/orders`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        ,createTrailingStopLossOrder:(account='',callback=CALLBACK,body=STD.ORDER_CREATE.T_STOP_LOSS)=>{
            body=CHECK_QUERY(body,STD.ORDER_CREATE.T_STOP_LOSS);
            body.type='TRAILING_STOP_LOSS';
            return REQUEST(
                'POST'
                ,`/v3/accounts/${account}/orders`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        ,replaceWithMarketOrder:(account='',orderSpecifier='',callback=CALLBACK,body=STD.ORDER_CREATE.MARKET)=>{
            body=CHECK_QUERY(body,STD.ORDER_CREATE.MARKET);
            body.type='MARKET';
            return REQUEST(
                'PUT'
                ,`/v3/accounts/${account}/orders/${orderSpecifier}`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        ,replaceWithLimitOrder:(account='',orderSpecifier='',callback=CALLBACK,body=STD.ORDER_CREATE.LIMIT)=>{
            body=CHECK_QUERY(body,STD.ORDER_CREATE.LIMIT);
            body.type='LIMIT';
            return REQUEST(
                'PUT'
                ,`/v3/accounts/${account}/orders/${orderSpecifier}`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        ,replaceWithStopOrder:(account='',orderSpecifier='',callback=CALLBACK,body=STD.ORDER_CREATE.STOP)=>{
            body=CHECK_QUERY(body,STD.ORDER_CREATE.STOP);
            body.type='STOP';
            return REQUEST(
                'PUT'
                ,`/v3/accounts/${account}/orders/${orderSpecifier}`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        ,replaceWithMarketIfTouchedOrder:(account='',orderSpecifier='',callback=CALLBACK,body=STD.ORDER_CREATE.MARKET_IF)=>{
            body=CHECK_QUERY(body,STD.ORDER_CREATE.MARKET_IF);
            body.type='MARKET_IF_TOUCHED';
            return REQUEST(
                'PUT'
                ,`/v3/accounts/${account}/orders/${orderSpecifier}`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        ,replaceWithTakeProfitOrder:(account='',orderSpecifier='',callback=CALLBACK,body=STD.ORDER_CREATE.TAKE_PROFIT)=>{
            body=CHECK_QUERY(body,STD.ORDER_CREATE.TAKE_PROFIT);
            body.type='TAKE_PROFIT';
            return REQUEST(
                'PUT'
                ,`/v3/accounts/${account}/orders/${orderSpecifier}`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        ,replaceWithStopLossOrder:(account='',orderSpecifier='',callback=CALLBACK,body=STD.ORDER_CREATE.STOP_LOSS)=>{
            body=CHECK_QUERY(body,STD.ORDER_CREATE.STOP_LOSS);
            body.type='STOP_LOSS';
            return REQUEST(
                'PUT'
                ,`/v3/accounts/${account}/orders/${orderSpecifier}`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        ,replaceWithGuaranteedStopLossOrder:(account='',orderSpecifier='',callback=CALLBACK,body=STD.ORDER_CREATE.G_STOP_LOSS)=>{
            body=CHECK_QUERY(body,STD.ORDER_CREATE.G_STOP_LOSS);
            body.type='GUARANTEED_STOP_LOSS';
            return REQUEST(
                'PUT'
                ,`/v3/accounts/${account}/orders/${orderSpecifier}`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
        ,replaceWithTrailingStopLossOrder:(account='',orderSpecifier='',callback=CALLBACK,body=STD.ORDER_CREATE.T_STOP_LOSS)=>{
            body=CHECK_QUERY(body,STD.ORDER_CREATE.T_STOP_LOSS);
            body.type='TRAILING_STOP_LOSS';
            return REQUEST(
                'PUT'
                ,`/v3/accounts/${account}/orders/${orderSpecifier}`
                ,''
                ,callback
                ,MAKE_BODY(body)
            );
        }
    };
};