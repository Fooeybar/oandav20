module.exports=function(apikey='',host=''){
    return (()=>{
        let https=require('https');
        let defaults={
            account:'',
            id:'',
            interval:1000
        };

        class Trade{
            httpsTime;
            httpsStatus;
            count;
            resume;
            pause;
            close;
            #refresh;
            #format;
            #timeout;
            #put;

            constructor(config=defaults){
                if(config===undefined||config.account===undefined)return 'Trade.constructor -> object with account required, ex: new Trade({account:xxx-xxx-xxxxxx-xxx});';
                if(config.id===undefined)config.id=defaults.id;
                if(config.interval==null||!Number.isInteger(config.interval))config.interval=defaults.interval;

                Object.defineProperty(this,'config',{value:config,enumerable:false,writable:false,configurable:false});

                this.count=0;
                this.pause=function pause(){clearTimeout(this.#timeout);this.#timeout='no timeout';};
                this.resume=function resume(){this.#refresh();};
                
                this.#refresh=(init=false)=>{
                    this.httpsTime=Date.now();
                    https.get(
                        {
                            hostname:host,
                            path:'/v3/accounts/'+config.account+'/'+((config.id!=='')?'trades/'+config.id:'openTrades'),
                            headers:{
                                'Authorization':'Bearer '+apikey
                                ,'Content-Type':'application/json; charset=UTF-8'
                                ,'Accept-Encoding':'utf-8'
                            }
                        },
                        (res)=>{
                            this.httpsStatus=res.statusCode;
                            let data='';
                            res.on('data',(chunk)=>{data+=(''+chunk).replace(',,',',');});
                            res.on('end',()=>{
                                data=JSON.parse(data);
                                if(res.statusCode===200)this.#format(((config.id!=='')?data.trade:data.trades));
                                else this.error=data;
                            });//---res.end
                        }//---res
                    );//---https.get
                    this.#timeout=setTimeout(this.#refresh,config.interval);
                };
                
                this.#format=(obj)=>{
                    if(config.id!==''){//id specific
                        if(this.count===1){
                            delete this.id;
                            delete this.instrument;
                            delete this.price;
                            delete this.openTime;
                            delete this.initialUnits;
                            delete this.intialMarginRequired;
                            delete this.state;
                            delete this.currentUnits;
                            delete this.realizedPL;
                            delete this.financing;
                            delete this.dividendAdjustment;
                            delete this.unrealizedPL;
                            delete this.marginUsed;
                            delete this.clientExtensions;
                            this.count=0;
                        }                        
                        this.id=obj.id;
                        this.instrument=obj.instrument;
                        this.price=obj.price;
                        this.openTime=obj.openTime;
                        this.initialUnits=obj.initialUnits;
                        this.intialMarginRequired=obj.initialMarginRequired;
                        this.state=obj.state;
                        this.currentUnits=obj.currentUnits;
                        this.realizedPL=obj.realizedPL;
                        this.financing=obj.financing;
                        this.dividendAdjustment=obj.dividendAdjustment;
                        this.unrealizedPL=obj.unrealizedPL;
                        this.marginUsed=obj.marginUsed;
                        this.clientExtensions=obj.clientExtensions;
                        this.count=1;
                        if(this.state==='CLOSED')this.pause();
                    }
                    else{//list
                        for(let i=this.count-1;i>=0;i--){delete this[i];}
                        this[0]='no trades';
                        for(let i=0;i<obj.length;i++){this[i]=obj[i];}
                        this.count=obj.length;
                    }
                };

                this.#put=(endpoint,id,datetime,body,callback)=>{
                    let put=(_id,_cb)=>{
                        https.request({
                            host:host,method:'PUT',path:'/v3/accounts/'+config.account+'/trades/'+_id+'/'+endpoint,
                            headers:{
                                'Authorization':'Bearer '+apikey
                                ,'Content-Type':'application/json; charset=UTF-8'
                                ,'Accept-Encoding':'utf-8'
                                ,'Accept-Datetime-Format':datetime
                                }
                            },
                            (res)=>{
                                let data='';
                                res.on('data',(chunk)=>{data+=(''+chunk).replace(',,',',');});
                                res.on('end',()=>{_cb(JSON.parse(data));});
                            }//---res
                        ).end(JSON.stringify(body));
                    }
                    if(config.id!=='')return put(config.id,callback);// this
                    else if(id!==''){// list
                        if(id.indexOf(',')>-1){
                            let arr=id.split(',');
                            let ret_all={},counter=0;
                            for(let i=0;i<arr.length;i++){
                                put(arr[i],(data)=>{
                                    ret_all[i]=data;
                                    if(counter++>=arr.length-1)return callback(ret_all);
                                });
                            }
                        }
                        else return put(id,callback);
                    }
                    else{// all
                        let ret_all={},counter=0;
                        for(let i=0;i<this.count;i++){
                            put(this[i].id,(data)=>{
                                ret_all[i]=data;
                                if(counter++>=this.count-1)return callback(ret_all);
                            });
                        }
                    }
                };//---#put

                let close_defaults={tradeID:'',datetime:'RFC3339',units:'ALL'};
                this.close=function close(options=close_defaults,callback=function callback(data){return data;}){
                    if(options===undefined||typeof options!=='object')return callback('Trade.close -> options argument must be object');
                    if(config.id===''){if(typeof this[0]==='string')return callback('Trade.close -> no trades to close');}
                    else if(this.state==='CLOSED')return callback('Trade.close -> trade already closed');
                    if(options.tradeID==null)options.tradeID=close_defaults.tradeID;
                    if(options.datetime==null)options.datetime=close_defaults.datetime;
                    if(options.units==null)options.units=close_defaults.units;
                    return this.#put('close',options.tradeID,options.datetime,{units:options.units},callback);
                };
                Object.defineProperty(this.close,'defaults',{enumerable:false,writable:true,configurable:false,value:close_defaults});

                let exts_defaults={tradeID:'',datetime:'RFC3339',id:'',tag:'',comment:''};
                this.extensions=function extensions(options=exts_defaults,callback=function callback(data){return data;}){
                    if(options===undefined||typeof options!=='object')return callback('Trade.extensions -> options argument must be object');
                    if(config.id===''){if(typeof this[0]==='string')return callback('Trade.extensions -> no trades to modify');}
                    else if(this.state==='CLOSED')return callback('Trade.extensions -> trade already closed');
                    if(options.tradeID==null)options.tradeID=exts_defaults.tradeID;
                    if(options.datetime==null)options.datetime=exts_defaults.datetime;
                    if(options.id==null)options.id=exts_defaults.id;
                    if(options.tag==null)options.tag=exts_defaults.tag;
                    if(options.comment==null)options.comment=exts_defaults.comment;
                    return this.#put('clientExtensions',options.tradeID,options.datetime,{clientExtensions:{id:options.id,tag:options.tag,comment:options.comment}},callback);
                };
                Object.defineProperty(this.extensions,'defaults',{enumerable:false,writable:true,configurable:false,value:exts_defaults});

                let orders_defaults={tradeID:'',datetime:'RFC3339',
                    takeprofit:{price:'',timeInForce:'GTC',gtdTime:'',clientExtensions:{id:'',tag:'',comment:''}},
                    stoploss:{price:'',distance:'',timeInForce:'GTC',gtdTime:'',clientExtensions:{id:'',tag:'',comment:''}},
                    trailing:{distance:'',timeInForce:'GTC',gtdTime:'',clientExtensions:{id:'',tag:'',comment:''}},
                    guaranteed:{price:'',distance:'',timeInForce:'GTC',gtdTime:'',clientExtensions:{id:'',tag:'',comment:''}}
                };
                this.orders=function orders(options=orders_defaults,callback=function callback(data){return data;}){
                    if(options===undefined||typeof options!=='object')return callback('Trade.orders -> options argument must be object');
                    if(config.id===''){if(typeof this[0]==='string')return callback('Trade.orders -> no trades to modify');}
                    else if(this.state==='CLOSED')return callback('Trade.orders -> trade already closed');
                    if(options.tradeID==null)options.tradeID=orders_defaults.tradeID;
                    if(options.datetime==null)options.datetime=orders_defaults.datetime;
                    let body={};
                    if(options.takeprofit)body.takeProfit=options.takeprofit;
                    if(options.stoploss)body.stopLoss=options.stoploss;
                    if(options.trailing)body.trailingStopLoss=options.trailing;
                    if(options.guaranteed)body.guaranteedStopLoss=options.guaranteed;
                    if(body==={})return callback('Trade.orders -> no values given');
                    return this.#put('orders',options.tradeID,options.datetime,body,callback);
                };
                Object.defineProperty(this.orders,'defaults',{enumerable:false,writable:true,configurable:false,value:orders_defaults});

                this.#refresh(true);
            }
        };

        Object.defineProperty(Trade,'defaults',{enumerable:true,writable:true,configurable:false,value:defaults});

        return Trade;
    })();
};
