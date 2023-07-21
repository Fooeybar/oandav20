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

const INSTRUMENT={
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

const ORDERS={
    state:''
    ,instrument:''
    ,count:''
    ,beforeID:''
    ,ids:''
};

const TRADES={
    count:''
    ,state:''
    ,beforeID:''
    ,instrument:''
    ,ids:''
};

const TRANSACTIONS={
    from:''
    ,to:''
    ,pageSize:''
    ,type:''
};

const INS_PRICING={
    since:''
    ,includeHomeConversions:''
};

const CLOSE_POS={
    longClientExtensions:CLIENT_EXT
    ,shortClientExtensions:CLIENT_EXT
    ,longUnits:''
    ,shortUnits:''
};

const ORDER_EXT={
    clientExtensions:CLIENT_EXT
    ,tradeClientExtensions:CLIENT_EXT
};

const TRADE_ORDERS={
    takeProfit:TAKE_PROFIT
    ,stopLoss:STOP_LOSS
    ,guaranteedStopLoss:G_STOP_LOSS
    ,trailingStopLoss:T_STOP_LOSS
};

const ORDER_CREATE={
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
};

const ACCT_INSTRUMENTS={instruments:''};
const CONFIG={alias:'',marginRate:''};
const TIME={time:''};
const TYPE={type:''};
const UNITS={units:''};
const CALLBACK=(err,data)=>console.log((err)?err:data);

const REQUEST=require('https').request;
const GET=require('https').get;
const GUNZIP=require('zlib').createGunzip;

const ParseArr=(arr=[],out=[])=>{
    for(let a=0;a<arr.length;a++){
        let value=arr[a];
        let type=typeof(value);
        if(type==='number'||type==='boolean'||type==='undefined')out.push(value);
        else if(type==='string'){
            let index=value.indexOf('-',1);
            if(index>-1)out.push(value);
            else{
                let val=parseFloat(value);
                out.push((val===val)?val:value);                
            }
        }
        else if(Array.isArray(value))out.push(ParseArr(value));
        else if(type==='object')out.push(ParseObj(value));
    }
    return out;
};

const ParseObj=(props={},out={})=>{
    if(out===undefined)out=props;
    for(let key in props){
        let value=props[key];
        let type=typeof(value);
        if(type==='number'||type==='boolean'||type==='undefined')out[key]=value;
        else if(type==='string'){
            let index=value.indexOf('-',1);
            if(index>-1)out[key]=value;
            else{
                let val=parseFloat(value);
                out[key]=(val===val)?val:value;
            }
        }
        else if(Array.isArray(value))out[key]=ParseArr(value,out[key]);
        else if(type==='object')out[key]=ParseObj(value,out[key]);
    }
    return out;
};

const NewCounter=(length=0,Callback=()=>{})=>{
    let count=0;
    return (err,data)=>{
        count++;
        if(count>=length)Callback(err,data);
    };
};

const MakeQuery=(opts)=>{
    let query='';
    for(let i in opts){
        if(opts[i]=='')continue;
        query+=(query.length>0)?`&`:`?`;
        query+=`${i}=${opts[i]}`;
    }
    return query;
};

const MakeBody=(opts)=>{
    let body={};
    for(let i in opts){
        if(opts[i]==''||opts[i]==={})continue;
        if(typeof(opts[i])==='object'){
            let temp=MakeBody(opts[i]);
            if(temp!=={})body[i]=temp;
        }
        else body[i]=''+opts[i];
    }
    return body;
};

const CheckQuery=(opts,std)=>{
    if(opts!==std)for(let i in std)if(opts[i]===undefined)opts[i]=std[i];
    return opts;
};

const EndReq=(err=undefined,data='',prop='',Callback=()=>{})=>{
    if(err!==undefined)return Callback(err,undefined);
    data=ParseObj(JSON.parse(data),undefined);
    if(prop&&prop.length>0&&data[prop]!==undefined)data=data[prop];
    if(data.errorMessage)err=data.errorMessage;
    return Callback(err,data);
};

module.exports=(api='',host='api-fxtrade.oanda.com',datetime='RFC3339')=>{
    const Request=(method='',path='',Callback=CALLBACK,prop='',body=undefined)=>{
        method=method.toUpperCase();
        if(prop===undefined)prop='';
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
        let Func=(res)=>{
            let data='';
            if(res.headers['content-encoding']===undefined||res.headers['content-encoding']==='utf-8'){
                res.on('data',(chunk)=>{data+=(''+chunk).replace(',,',',');});
                res.on('error',(err)=>EndReq(err,data,prop,Callback));
                res.on('end',()=>EndReq(undefined,data,prop,Callback));            
            }
            else if(res.headers['content-encoding']==='gzip'){
                let gzip=GUNZIP();
                gzip.on('data',(chunk)=>{data+=chunk;});
                gzip.on('error',(err)=>EndReq(err,data,prop,Callback));
                gzip.on('end',()=>EndReq(undefined,data,prop,Callback));
                res.pipe(gzip);
            }
        };
    
        (method==='GET')?GET(head,Func)
        :(body===undefined)?REQUEST(head,Func)
        :REQUEST(head,Func).end(JSON.stringify(body));
    };

    const GetAccounts=(Callback=CALLBACK)=>{
        Request('GET','/v3/accounts',(err,accounts=[])=>{
            if(err!==undefined)return Callback(err,accounts);
            let End=NewCounter(accounts.length,Callback);
            for(let a=0;a<accounts.length;a++)
                GetAccount(accounts[a].id,(err2,acct)=>{
                    if(err2!==undefined)accounts[a]=err2;
                    else accounts[a]=acct;
                    End(err,accounts);
                });
        },'accounts');
    };

    const GetAccount=(account='',Callback=CALLBACK)=>{
        Request('GET',`/v3/accounts/${account}`,Callback,'account');
    };

    return {
        Request
        //accounts
        ,GetAccounts
        ,GetAccount
        ,GetAccountsMeta:(Callback=CALLBACK)=>{
            Request('GET','/v3/accounts',Callback,'accounts');
        }
        ,GetAccountSummary:(account='',Callback=CALLBACK)=>{
            Request('GET',`/v3/accounts/${account}/summary`,Callback,'account');
        }
        ,GetAccountInstruments:(account='',Callback=CALLBACK,query=ACCT_INSTRUMENTS)=>{
            query=CheckQuery(query,ACCT_INSTRUMENTS);
            Request('GET',`/v3/accounts/${account}/instruments${MakeQuery(query)}`,Callback,'instruments');
        }
        ,GetAccountChangesSinceTransaction:(account='',transactionID='',Callback=CALLBACK)=>{
            Request('GET',`/v3/accounts/${account}/changes?sinceTransactionID=${transactionID}`,Callback,'changes');
        }
        ,SetAccountConfiguration:(account='',Callback=CALLBACK,body=CONFIG)=>{
            body=CheckQuery(body,CONFIG);
            Request('PATCH',`/v3/accounts/${account}/configuration`,Callback,MakeBody(body),'clientConfigureTransaction');
        }
        //rates
        ,GetInstrument:(instrument='',Callback=CALLBACK,query=INSTRUMENT)=>{
            query=CheckQuery(query,INSTRUMENT);
            Request('GET',`/v3/instruments/${instrument}/candles${MakeQuery(query)}`,Callback,'candles');
        }
        ,GetOrderBook:(instrument='',Callback=CALLBACK,query=TIME)=>{
            query=CheckQuery(query,TIME);
            Request('GET',`/v3/instruments/${instrument}/orderBook${MakeQuery(query)}`,Callback,'orderBook');
        }
        ,GetPositionBook:(instrument='',Callback=CALLBACK,query=TIME)=>{
            query=CheckQuery(query,TIME);
            Request('GET',`/v3/instruments/${instrument}/positionBook${MakeQuery(query)}`,Callback,'positionBook');
        }
        ,GetInstrumentsPricing:(account='',instruments='',Callback=CALLBACK,query=INS_PRICING)=>{
            query=CheckQuery(query,INS_PRICING);
            Request('GET',`/v3/accounts/${account}/pricing`+MakeQuery({instruments:instruments,since:query.since
                                                                        ,includeHomeConversions:query.includeHomeConversions})
                ,Callback,'prices');
        }
        //positions
        ,GetPositions:(account='',Callback=CALLBACK)=>{
            Request('GET',`/v3/accounts/${account}/positions`,Callback,'positions');
        }
        ,GetPosition:(account='',instrument='',Callback=CALLBACK)=>{
            Request('GET',`/v3/accounts/${account}/positions/${instrument}`,Callback,'position');
        }
        ,GetOpenPositions:(account='',Callback=CALLBACK)=>{
            Request('GET',`/v3/accounts/${account}/openPositions`,Callback,'positions');
        }
        ,ClosePosition:(account='',instrument='',Callback=CALLBACK,body=CLOSE_POS)=>{
            body=CheckQuery(body,CLOSE_POS);
            Request('PUT',`/v3/accounts/${account}/positions/${instrument}/close`,Callback,'',MakeBody(body));
        }
        //transactions
        ,GetTransactions:(account='',Callback=CALLBACK,query=TRANSACTIONS)=>{
            query=CheckQuery(query,TRANSACTIONS);
            Request('GET',`/v3/accounts/${account}/transactions${MakeQuery(query)}`,Callback);
        }
        ,GetTransaction:(account='',transactionID='',Callback=CALLBACK)=>{
            Request('GET',`/v3/accounts/${account}/transactions/${transactionID}`,Callback,'transaction');
        }
        ,GetTransactionsByIdRange:(account='',from='',to='',Callback=CALLBACK,query=TYPE)=>{
            query=CheckQuery(query,TYPE);
            Request('GET',`/v3/accounts/${account}/transactions/idrange${MakeQuery({to:to,from:from,type:query.type})}`,Callback,'transactions');
        }
        ,GetTransactionsSinceId:(account='',id='',Callback=CALLBACK,query=TYPE)=>{
            query=CheckQuery(query,TYPE);
            Request('GET',`/v3/accounts/${account}/transactions/sinceid${MakeQuery({id:id,type:query.type})}`,Callback,'transactions');
        }
        //trades
        ,GetTrades:(account='',Callback=CALLBACK,query=TRADES)=>{
            query=CheckQuery(query,TRADES);
            Request('GET',`/v3/accounts/${account}/trades${MakeQuery(query)}`,Callback,'trades');
        }
        ,GetOpenTrades:(account='',Callback=CALLBACK,query=TRADES)=>{
            query=CheckQuery(query,TRADES);
            query.state='OPEN';
            Request('GET',`/v3/accounts/${account}/trades${MakeQuery(query)}`,Callback,'trades');
        }
        ,GetClosedTrades:(account='',Callback=CALLBACK,query=TRADES)=>{
            query=CheckQuery(query,TRADES);
            query.state='CLOSED';
            Request('GET',`/v3/accounts/${account}/trades${MakeQuery(query)}`,Callback,'trades');
        }
        ,GetCloseWhenTradeableTrades:(account='',Callback=CALLBACK,query=TRADES)=>{
            query=CheckQuery(query,TRADES);
            query.state='CLOSE_WHEN_TRADEABLE';
            Request('GET',`/v3/accounts/${account}/trades${MakeQuery(query)}`,Callback,'trades');
        }
        ,GetAllTrades:(account='',Callback=CALLBACK,query=TRADES)=>{
            query=CheckQuery(query,TRADES);
            query.state='ALL';
            Request('GET',`/v3/accounts/${account}/trades${MakeQuery(query)}`,Callback,'trades');
        }
        ,GetAllOpenTrades:(account='',Callback=CALLBACK)=>{
            Request('GET',`/v3/accounts/${account}/openTrades`,Callback,'trades');
        }
        ,GetTrade:(account='',tradeSpecifier='',Callback=CALLBACK)=>{
            Request('GET',`/v3/accounts/${account}/trades/${tradeSpecifier}`,Callback,'trade');
        }
        ,CloseTrade:(account='',tradeSpecifier='',Callback=CALLBACK,body=UNITS)=>{
            body=CheckQuery(body,UNITS);
            Request('PUT',`/v3/accounts/${account}/trades/${tradeSpecifier}/close`,Callback,'',MakeBody(body));
        }
        ,SetTradeClientExtensions:(account='',tradeSpecifier='',Callback=CALLBACK,body=CLIENT_EXT)=>{
            body=CheckQuery(body,CLIENT_EXT);
            Request('PUT',`/v3/accounts/${account}/trades/${tradeSpecifier}/clientExtensions`,Callback,'',MakeBody(body));
        }
        ,SetTradeOrders:(account='',tradeSpecifier='',Callback=CALLBACK,body=TRADE_ORDERS)=>{
            body=CheckQuery(body,TRADE_ORDERS);
            Request('PUT',`/v3/accounts/${account}/trades/${tradeSpecifier}/orders`,Callback,'',MakeBody(body));
        }
        //orders
        ,GetOrders:(account='',Callback=CALLBACK,query=ORDERS)=>{
            query=CheckQuery(query,ORDERS);
            Request('GET',`/v3/accounts/${account}/orders${MakeQuery(query)}`,Callback,'orders');
        }
        ,GetPendingOrders:(account='',Callback=CALLBACK,query=ORDERS)=>{
            query=CheckQuery(query,ORDERS);
            query.state='PENDING';
            Request('GET',`/v3/accounts/${account}/orders${MakeQuery(query)}`,Callback,'orders');
        }
        ,GetFilledOrders:(account='',Callback=CALLBACK,query=ORDERS)=>{
            query=CheckQuery(query,ORDERS);
            query.state='FILLED';
            Request('GET',`/v3/accounts/${account}/orders${MakeQuery(query)}`,Callback,'orders');
        }
        ,GetTriggeredOrders:(account='',Callback=CALLBACK,query=ORDERS)=>{
            query=CheckQuery(query,ORDERS);
            query.state='TRIGGERED';
            Request('GET',`/v3/accounts/${account}/orders${MakeQuery(query)}`,Callback,'orders');
        }
        ,GetCancelledOrders:(account='',Callback=CALLBACK,query=ORDERS)=>{
            query=CheckQuery(query,ORDERS);
            query.state='CANCELLED';
            Request('GET',`/v3/accounts/${account}/orders${MakeQuery(query)}`,Callback,'orders');
        }
        ,GetAllPendingOrders:(account='',Callback=CALLBACK)=>{
            Request('GET',`/v3/accounts/${account}/pendingOrders`,Callback,'orders');
        }
        ,GetAllOrders:(account='',Callback=CALLBACK,query=ORDERS)=>{
            query=CheckQuery(query,ORDERS);
            query.state='ALL';
            Request('GET',`/v3/accounts/${account}/orders${MakeQuery(query)}`,Callback,'orders');
        }
        ,GetOrder:(account='',orderSpecifier='',Callback=CALLBACK)=>{
            Request('GET',`/v3/accounts/${account}/orders/${orderSpecifier}`,Callback,'order');
        }
        ,CancelOrder:(account='',orderSpecifier='',Callback=CALLBACK)=>{
            Request('PUT',`/v3/accounts/${account}/orders/${orderSpecifier}/cancel`,Callback);
        }
        ,SetOrderClientExtensions:(account='',orderSpecifier='',Callback=CALLBACK,body=ORDER_EXT)=>{
            body=CheckQuery(body,ORDER_EXT);
            Request('PUT',`/v3/accounts/${account}/orders/${orderSpecifier}/clientExtensions`,Callback,'',MakeBody(body));
        }
        ,CreateMarketOrder:(account='',Callback=CALLBACK,body=ORDER_CREATE.MARKET)=>{
            body=CheckQuery(body,ORDER_CREATE.MARKET);
            body.type='MARKET';
            Request('POST',`/v3/accounts/${account}/orders`,Callback,'',MakeBody(body));
        }
        ,CreateLimitOrder:(account='',Callback=CALLBACK,body=ORDER_CREATE.LIMIT)=>{
            body=CheckQuery(body,ORDER_CREATE.LIMIT);
            body.type='LIMIT';
            Request('POST',`/v3/accounts/${account}/orders`,Callback,'',MakeBody(body));
        }
        ,CreateStopOrder:(account='',Callback=CALLBACK,body=ORDER_CREATE.STOP)=>{
            body=CheckQuery(body,ORDER_CREATE.STOP);
            body.type='STOP';
            Request('POST',`/v3/accounts/${account}/orders`,Callback,'',MakeBody(body));
        }
        ,CreateMarketIfTouchedOrder:(account='',Callback=CALLBACK,body=ORDER_CREATE.MARKET_IF)=>{
            body=CheckQuery(body,ORDER_CREATE.MARKET_IF);
            body.type='MARKET_IF_TOUCHED';
            Request('POST',`/v3/accounts/${account}/orders`,Callback,'',MakeBody(body));
        }
        ,CreateTakeProfitOrder:(account='',Callback=CALLBACK,body=ORDER_CREATE.TAKE_PROFIT)=>{
            body=CheckQuery(body,ORDER_CREATE.TAKE_PROFIT);
            body.type='TAKE_PROFIT';
            Request('POST',`/v3/accounts/${account}/orders`,Callback,'',MakeBody(body));
        }
        ,CreateStopLossOrder:(account='',Callback=CALLBACK,body=ORDER_CREATE.STOP_LOSS)=>{
            body=CheckQuery(body,ORDER_CREATE.STOP_LOSS);
            body.type='STOP_LOSS';
            Request('POST',`/v3/accounts/${account}/orders`,Callback,'',MakeBody(body));
        }
        ,CreateGuaranteedStopLossOrder:(account='',Callback=CALLBACK,body=ORDER_CREATE.G_STOP_LOSS)=>{
            body=CheckQuery(body,ORDER_CREATE.G_STOP_LOSS);
            body.type='GUARANTEED_STOP_LOSS';
            Request('POST',`/v3/accounts/${account}/orders`,Callback,'',MakeBody(body));
        }
        ,CreateTrailingStopLossOrder:(account='',Callback=CALLBACK,body=ORDER_CREATE.T_STOP_LOSS)=>{
            body=CheckQuery(body,ORDER_CREATE.T_STOP_LOSS);
            body.type='TRAILING_STOP_LOSS';
            Request('POST',`/v3/accounts/${account}/orders`,Callback,'',MakeBody(body));
        }
        ,ReplaceWithMarketOrder:(account='',orderSpecifier='',Callback=CALLBACK,body=ORDER_CREATE.MARKET)=>{
            body=CheckQuery(body,ORDER_CREATE.MARKET);
            body.type='MARKET';
            Request('PUT',`/v3/accounts/${account}/orders/${orderSpecifier}`,Callback,'',MakeBody(body));
        }
        ,ReplaceWithLimitOrder:(account='',orderSpecifier='',Callback=CALLBACK,body=ORDER_CREATE.LIMIT)=>{
            body=CheckQuery(body,ORDER_CREATE.LIMIT);
            body.type='LIMIT';
            Request('PUT',`/v3/accounts/${account}/orders/${orderSpecifier}`,Callback,'',MakeBody(body));
        }
        ,ReplaceWithStopOrder:(account='',orderSpecifier='',Callback=CALLBACK,body=ORDER_CREATE.STOP)=>{
            body=CheckQuery(body,ORDER_CREATE.STOP);
            body.type='STOP';
            Request('PUT',`/v3/accounts/${account}/orders/${orderSpecifier}`,Callback,'',MakeBody(body));
        }
        ,ReplaceWithMarketIfTouchedOrder:(account='',orderSpecifier='',Callback=CALLBACK,body=ORDER_CREATE.MARKET_IF)=>{
            body=CheckQuery(body,ORDER_CREATE.MARKET_IF);
            body.type='MARKET_IF_TOUCHED';
            Request('PUT',`/v3/accounts/${account}/orders/${orderSpecifier}`,Callback,'',MakeBody(body));
        }
        ,ReplaceWithTakeProfitOrder:(account='',orderSpecifier='',Callback=CALLBACK,body=ORDER_CREATE.TAKE_PROFIT)=>{
            body=CheckQuery(body,ORDER_CREATE.TAKE_PROFIT);
            body.type='TAKE_PROFIT';
            Request('PUT',`/v3/accounts/${account}/orders/${orderSpecifier}`,Callback,'',MakeBody(body));
        }
        ,ReplaceWithStopLossOrder:(account='',orderSpecifier='',Callback=CALLBACK,body=ORDER_CREATE.STOP_LOSS)=>{
            body=CheckQuery(body,ORDER_CREATE.STOP_LOSS);
            body.type='STOP_LOSS';
            Request('PUT',`/v3/accounts/${account}/orders/${orderSpecifier}`,Callback,'',MakeBody(body));
        }
        ,ReplaceWithGuaranteedStopLossOrder:(account='',orderSpecifier='',Callback=CALLBACK,body=ORDER_CREATE.G_STOP_LOSS)=>{
            body=CheckQuery(body,ORDER_CREATE.G_STOP_LOSS);
            body.type='GUARANTEED_STOP_LOSS';
            Request('PUT',`/v3/accounts/${account}/orders/${orderSpecifier}`,Callback,'',MakeBody(body));
        }
        ,ReplaceWithTrailingStopLossOrder:(account='',orderSpecifier='',Callback=CALLBACK,body=ORDER_CREATE.T_STOP_LOSS)=>{
            body=CheckQuery(body,ORDER_CREATE.T_STOP_LOSS);
            body.type='TRAILING_STOP_LOSS';
            Request('PUT',`/v3/accounts/${account}/orders/${orderSpecifier}`,Callback,'',MakeBody(body));
        }
    };
};