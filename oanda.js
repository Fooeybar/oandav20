const {request,get}=require('https'),{createGunzip}=require('zlib');
const defaults=()=>{return{
    datetime:'RFC3339'
    ,repeat:-1
    ,debug:false
    ,account:''
}};
const mquery=(opts)=>{
    let query='';
    let no=defaults();
    for(let i in opts)if(no[i]===undefined){
        if(typeof(opts[i])==='string'){
            if(opts[i].indexOf(',')>-1){
                let str='';for(let c=0;c<opts[i].length;c++)str+=(opts[i][c]===',')?'%2C':opts[i][c];
                opts[i]=str;
            }
            if(opts[i].length>0)query+=((query.length>0)?`&`:`?`)+`${i}=${opts[i]}`;
        }
        else query+=((query.length>0)?`&`:`?`)+`${i}=${opts[i]}`;
    }
    return query;
};
const mbody=(opts)=>{
    let body={};
    let no=defaults();
    let loop=(obj={})=>{
        let out;
        for(let i in obj){
            if(out===undefined)out={};
            if(typeof(obj[i])==='object'){
                for(let o in obj[i]){
                    if(out[i]===undefined)out[i]={};
                    out[i][o]=(typeof(obj[i][o])==='object')?loop(obj[i][o]):`${obj[i][o]}`;
                }
            }
            else out[i]=''+obj[i];
        }
        return out;
    };
    for(let i in opts)if(no[i]===undefined)body[i]=(typeof(opts[i])==='object')?loop(opts[i]):`${opts[i]}`;
    return body;
};
const toqueue=(()=>{
    let limit=100,count=0,gets={},time=0,queue=[];
    let check=(int=0)=>{
        let now=Date.now();
        if(time+1000<now){
            time=now;
            cnt=0;
        }
        else if(cnt+int>-1)cnt+=int;
        if(cnt<limit)empty();
    };
    let empty=()=>{
        for(let i=0;count<limit&&i<queue.length;i++){
            let {head,func,body}=queue.shift();
            if(head.method[0]==='G')delete gets[head.path];
            count++;
            send(head,(res)=>{check(-1);func(res);},body);
        }
    };
    let send=(head,func,body)=>{
        if(head.method===undefined||head.method==='GET')get(head,func);
        else if(body)request(head,func).end(JSON.stringify(body));
        else request(head,func);
    };
    return function(head,func,body){
        check();
        if(count<limit){
            count++;
            send(head,(res)=>{check(-1);func(res);},body);
        }
        else if(head.method[0]==='P')queue[queue.length]={head:head,func:func,body:body};
        else if(gets[head.path]===undefined){
            gets[head.path]=null;
            queue[queue.length]={head:head,func:func,body:body};
        }
    }
})();
const reqme=(obj,cb,opts)=>{
    let head={
        hostname:reqme.host
        ,headers:{
            'Authorization':`Bearer ${reqme.api}`
            ,'Content-Type':'application/json; charset=UTF-8'
            ,'Accept-Encoding':'gzip,deflate,utf-8'
            ,'Accept-Datetime-Format':opts.datetime||'RFC3339'
        }
        ,method:obj.method||'GET'
        ,path:(obj.altpath)?obj.altpath:(obj.path)?'/v3/accounts/'+obj.path:'/v3/accounts/'
    };
    if(obj.query)head.path+=mquery(opts);
    let body;
    if(obj.body)body=mbody(opts);
    let timeout,data='',repeat={repeat:opts.repeat,end:()=>clearTimeout(timeout)};;
    let retfunc=(res)=>{
        let end=()=>{
            data=JSON.parse(data);
            if(res.statusCode===200){
                let last;
                if(data.lastTransactionID)last=data.lastTransactionID;
                if(obj.data)data=data[obj.data];
                if(last)data.lastTransactionID=last;
            }
            data.httpCode=res.statusCode;
            cb(data);
            if(repeat.repeat>-1)timeout=setTimeout(()=>{data='';toqueue(head,retfunc,body);},repeat.repeat);
        };
        if(res.headers['content-encoding']===undefined||res.headers['content-encoding']==='utf-8'){
            res.on('data',(chunk)=>{data+=(''+chunk).replace(',,',',');});
            res.on('error',(err)=>console.log(err));
            res.on('end',end);            
        }
        else if(res.headers['content-encoding']==='gzip'){
            let gzip=createGunzip();
            gzip.on('data',(chunk)=>{data+=chunk;});
            gzip.on('error',(err)=>console.log(err));
            gzip.on('end',end);
            res.pipe(gzip);
        }
    };
    if(opts.debug===true){
        console.log('Head:',head);
        if(body)console.log('Body:',body);       
    }
    else toqueue(head,retfunc,body);
    return repeat;
};
const checkfunc=(required=[],args={})=>{
    let check,req={};
    for(let i=0;i<required.length;i++){
        if(args[required[i]]===undefined){
            if(check===undefined)check=[];
            check[check.length]={errorMessage:`No \'args.${required[i]}\' specified`};
        }
        else{
            req[required[i]]=args[required[i]];
            delete args[required[i]];
        }
    }
    return {check:check,req:req,opts:args};
};
const checkarguments=(args,callback,defaults)=>{
    if(typeof(args)==='function'){callback=args;args=defaults;}
    else{
        if(args===undefined)args=defaults;
        else if(typeof(args)!=='object')args={};
        if(typeof(callback)!=='function')callback=(data)=>console.log(data);
    }
    return {cargs:args,ccallback:callback};
};
const addfunc=function(func=()=>{},required=[],options={}){
    for(let i=0;i<required.length;i++)options[required[i]]='';
    let defs=defaults();for(let i in defs)options[i]=defs[i];
    let out=function(args=options,callback=(data)=>console.log(data)){
        let {cargs,ccallback}=checkarguments(args,callback,options);
        let {check,req,opts}=checkfunc(required,cargs);
        return (check!==undefined)?ccallback(check):reqme(func(req,opts),ccallback,opts);
    }
    out.defaults=(opts={})=>{
        if(typeof(opts)==='object')for(let i in opts)options[i]=opts[i];
        return options;
    };
    return out;
};
module.exports=(api='',host='api-fxtrade.oanda.com')=>{
    return{
        api:(()=>{
            reqme.api=api;
            return (api)=>{
                if(api)reqme.api=api;
                return reqme.api;
            };
        })()
        ,host:(()=>{
            reqme.host=host;
            return (host)=>{
                if(host)reqme.host=host;
                return reqme.host;
            };
        })()
        ,getAccounts:addfunc(()=>{return{};})
        ,getAccount:addfunc(
            (req)=>{return{
                path:`${req.account}`
                ,data:'account'
            };}
            ,['account']
        )
        ,getAccountChangesSinceTransaction:addfunc(
            (req)=>{return{
                path:`${req.account}/changes?sinceTransactionID=${req.transaction}`
                ,data:'changes'
            };}
            ,['account','transaction']
        )
        ,getAccountInstruments:addfunc(
            (req)=>{return{
                path:`${req.account}/instruments`
                ,query:true
                ,data:'instruments'
            };}
            ,['account']
            ,{instruments:''}
        )
        ,setAccountConfiguration:addfunc(
            (req)=>{return{
                method:'PATCH'
                ,path:`${req.account}/configuration`
                ,body:true
                ,data:'clientConfigureTransaction'
            };}
            ,['account']
            ,{alias:'',marginRate:''}
        )
        ,getInstrument:addfunc(
            (req)=>{return{
                altpath:`/v3/instruments/${req.instrument}/candles`
                ,data:'candles'
                ,query:true
            };}
            ,['instrument']
            ,{
                price:'M'
                ,count:500
                ,smooth:false
                ,granularity:'S5'
                ,dailyAlignment:17
                ,alignmentTimezone:'America/New_York'
                ,weeklyAlignment:'Friday'
                ,from:''
                ,includeFirst:''
                ,to:''
            }
        )
        ,getOrderBook:addfunc(
            (req)=>{return{
                altpath:`/v3/instruments/${req.instrument}/orderBook`
                ,data:'orderBook'
                ,query:true
            };}
            ,['instrument']
            ,{time:''}
        )
        ,getPositionBook:addfunc(
            (req)=>{return{
                altpath:`/v3/instruments/${req.instrument}/positionBook`
                ,data:'positionBook'
                ,query:true
            };}
            ,['instrument']
            ,{time:''}
        )
        ,getOrders:addfunc(
            (req)=>{return{
                path:`${req.account}/orders`
                ,data:'orders'
                ,query:true
            };}
            ,['account']
            ,{
                state:''
                ,instrument:''
                ,count:''
                ,beforeID:''
                ,ids:''
            }
        )
        ,getOrder:addfunc(
            (req)=>{return{
                path:`${req.account}/orders/${req.id}`
                ,data:'order'
            };}
            ,['account','id']
        )
        ,getPendingOrders:addfunc(
            (req)=>{return{
                path:`${req.account}/pendingOrders`
                ,data:'orders'
            };}
            ,['account']
        )
        ,createOrder:addfunc(
            (req)=>{return{
                    method:'POST'
                    ,path:`${req.account}/orders`
                    ,body:true
                };}
            ,['account']
            ,{order:{}}
        )
        ,replaceOrder:addfunc(
            (req)=>{return{
                method:'PUT'
                ,path:`${req.account}/orders/${req.id}`
                ,body:true
            };}
            ,['account','id']
            ,{order:{}}
        )
        ,cancelOrder:addfunc(
            (req)=>{return{
                method:'PUT'
                ,path:`${req.account}/orders/${req.id}/cancel`
                ,body:true
            };}
            ,['account','id']
        )
        ,setOrderClientExtensions:addfunc(
            (req)=>{return{
                method:'PUT'
                ,path:`${req.account}/orders/${req.id}/clientExtensions`
                ,body:true
            };}
            ,['account','id']
            ,{
                clientExtensions:{}
                ,tradeClientExtensions:{}
            }
        )
        ,getPositions:addfunc(
            (req)=>{return{
                path:`${req.account}/positions`
                ,data:'positions'
            };}
            ,['account']
        )
        ,getPosition:addfunc(
            (req)=>{return{
                path:`${req.account}/positions/${req.instrument}`
                ,data:'position'
            };}
            ,['account','instrument']
        )
        ,getOpenPositions:addfunc(
            (req)=>{return{
                path:`${req.account}/openPositions`
                ,data:'positions'
            };}
            ,['account']
        )
        ,closePosition:addfunc(
            (req)=>{return{
                method:'PUT'
                ,path:`${req.account}/positions/${req.instrument}/close`
                ,body:true
            };}
            ,['account','instrument']
            ,{
                longClientExtensions:{}
                ,shortClientExtensions:{}
                ,longUnits:''
                ,shortUnits:''
            }
        )
        ,getInstrumentsPricing:addfunc(
            (req)=>{return{
                path:`${req.account}/pricing`
                ,data:'prices'
                ,query:true
            };}
            ,['account']
            ,{instruments:'',since:'',includeHomeConversions:false}
        )
        ,getTrades:addfunc(
            (req)=>{return{
                path:`${req.account}/trades`
                ,data:'trades'
                ,query:true
            };}
            ,['account']
            ,{
                count:50
                ,state:'CLOSED'
                ,beforeID:''
                ,instrument:''
                ,ids:''
            }
        )
        ,getTrade:addfunc(
            (req)=>{return{
                path:`${req.account}/trades/${req.id}`
                ,data:'trade'
            };}
            ,['account','id']
        )
        ,getOpenTrades:addfunc(
            (req)=>{return{
                path:`${req.account}/openTrades`
                ,data:'trades'
            };}
            ,['account']
        )
        ,closeTrade:addfunc(
            (req)=>{return{
                method:'PUT'
                ,path:`${req.account}/trades/${req.id}/close`
                ,body:true
            };}
            ,['account','id']
            ,{units:''}
        )
        ,setTradeClientExtensions:addfunc(
            (req)=>{return{
                method:'PUT'
                ,path:`${req.account}/trades/${req.id}/clientExtensions`
                ,body:true
            };}
            ,['account','id']
            ,{clientExtensions:{}}
        )
        ,setTradeOrders:addfunc(
            (req)=>{return{
                method:'PUT'
                ,path:`${req.account}/trades/${req.id}/orders`
                ,body:true
            };}
            ,['account','id']
            ,{
                takeProfit:{}
                ,stopLoss:{}
                ,trailingStopLoss:{}
                ,guaranteedStopLoss:{}
            }
        )
        ,getTransactions:addfunc(
            (req)=>{return{
                path:`${req.account}/transactions`
                ,query:true
            };}
            ,['account']
            ,{
                from:''
                ,to:''
                ,pageSize:100
                ,type:''
            }
        )
        ,getTransaction:addfunc(
            (req)=>{return{
                path:`${req.account}/transactions/${req.id}`
                ,data:'transaction'
            };}
            ,['account','id']
        )
        ,getTransactionsByIdRange:addfunc(
            (req)=>{return{
                path:`${req.account}/transactions/idrange?from=${req.from}&to=${req.to}`
                ,data:'transactions'
                ,query:true
            };}
            ,['account','from','to']
            ,{type:''}
        )
        ,getTransactionsSinceId:addfunc(
            (req)=>{return{
                path:`${req.account}/transactions/sinceid?id=${req.id}`
                ,data:'transactions'
                ,query:true
            };}
            ,['account','id']
            ,{type:''}
        )
    };
};
