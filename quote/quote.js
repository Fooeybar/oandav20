module.exports=function(apikey='',host='api-fxtrade.oanda.com'){
    return(()=>{
        let https=require('https');
        let defaults={
            instrument:'EUR_USD',
            endpoint:'candles',
            datetime:'RFC3339',
            price:'M',
            granularity:'S5',
            count:500,
            from:'',
            to:'',
            time:'',
            smooth:false,
            includeFirst:true,
            dailyAlignment:17,
            alignmentTimezone:'America/New_York',
            weeklyAlignment:'Friday',
            account:'',
            interval:1000,
            newBar:function noop(){}
        };

        class Quote{
            httpsTime;
            httpsStatus;
            count;
            resume;
            pause;
            #refresh;
            #format;
            #timeout;

            constructor(config=defaults){
                if(typeof arguments[0]!=='object')return;
                if(config.instrument==null)config.instrument=defaults.instrument;
                else{
                    config.instrument=config.instrument.toUpperCase();
                    if(config.instrument.length===6)config.instrument=config.instrument[0]+config.instrument[1]+config.instrument[2]+'_'+config.instrument[3]+config.instrument[4]+config.instrument[5];
                    else if(config.instrument[3]!=='_')config.instrument=config.instrument[0]+config.instrument[1]+config.instrument[2]+'_'+config.instrument[4]+config.instrument[5]+config.instrument[6];
                }
                if(config.endpoint==null)config.endpoint=defaults.endpoint;
                if(config.datetime==null)config.datetime=defaults.datetime;
                if(config.price==null)config.price=defaults.price;
                else config.price=config.price.toUpperCase();
                if(config.granularity==null)config.granularity=defaults.granularity;
                else config.granularity=config.granularity.toUpperCase();
                if(config.from==null)config.from=defaults.from;
                if(config.to==null)config.to=defaults.to;
                if(config.count==null)config.count=defaults.count;
                if(config.time==null)config.time=defaults.time;
                if(config.smooth==null)config.smooth=defaults.smooth;
                if(config.includeFirst==null)config.includeFirst=defaults.includeFirst;
                if(config.dailyAlignment==null)config.dailyAlignment=defaults.dailyAlignment;
                if(config.alignmentTimezone==null)config.alignmentTimezone=defaults.alignmentTimezone;
                if(config.weeklyAlignment==null)config.weeklyAlignment=defaults.weeklyAlignment;
                if(config.account==null)config.account=defaults.account;
                if(config.interval==null||!Number.isInteger(config.interval))config.interval=defaults.interval;
                if(config.newBar==null||typeof config.newBar!=='function')config.newBar=defaults.newBar;

                Object.defineProperty(this,'config',{value:config,enumerable:false,writable:false,configurable:false});
                
                if(config.endpoint==='candles'){
                    this.timeframe=config.granularity;
                    this.count=config.count;
                }
                else{
                    this.time='';
                    this.unix=-1;
                    this.price=-1;
                    this.width=-1;
                    this.count=-1;
                }
                if(config.account!==''){
                    this.displayPrecision=-1;
                    this.marginRate=-1;
                    this.maxOrderUnits=-1;
                    this.maxPositionSize=-1;
                    this.maxTrailingStop=-1;
                    this.minTradeSize=-1;
                    this.minTrailingStop=-1;
                    this.pipLocation=-1;
                    this.tradeUnitsPrecision=-1;
                }

                this.pause=function pause(){clearTimeout(this.#timeout);};

                this.resume=function resume(){this.#refresh();};

                this.#refresh=(init=false)=>{
                    this.httpsTime=Date.now();
                    https.get(
                        {
                            hostname:host,
                            path:(()=>{
                                let ret='/v3/instruments/'+config.instrument+'/'+config.endpoint;
                                if(config.endpoint==='candles'){
                                    ret+='?'+'price='+config.price+
                                            '&granularity='+config.granularity+
                                            '&smooth='+config.smooth+
                                            '&dailyAlignment='+config.dailyAlignment+
                                            '&alignmentTimezone='+config.alignmentTimezone+
                                            '&weeklyAlignment='+config.weeklyAlignment;
                                            if(config.from!=='')ret+='&from='+config.from+'&includeFirst='+config.includeFirst;
                                            else if(config.to!=='')ret+='&to='+config.to;
                                            else ret+='&count='+((init)?config.count:2);
                                }
                                else if(config.time!=='')ret+'?time='+config.time;
                                return ret;
                            })(),
                            headers:{
                                'Authorization':'Bearer '+apikey
                                ,'Content-Type':'application/json; charset=UTF-8'
                                ,'Accept-Datetime-Format':config.datetime
                                ,'Accept-Encoding':'utf-8'
                            }
                        },
                        (res)=>{
                            this.httpsStatus=res.statusCode;
                            let data='';
                            if(config.endpoint==='candles'){
                                res.on('data',(chunk)=>{data+=(''+chunk).replace(',,',',');});
                                res.on('end',()=>{
                                    data=JSON.parse(data);
                                    if(res.statusCode===200){
                                        if(!init){//not init
                                            if(this[0].time<data.candles[1].time){//is newbar
                                                for(let i=config.count-1;i>0;i--){this[i]=this[i-1];}
                                                this[1]=this.#format(data.candles[0]);
                                                this[0]=this.#format(data.candles[1]);//update current
                                                config.newBar();
                                            }
                                            else this[0]=this.#format(data.candles[1]);//update current
                                        }
                                        else for(let i=0,ii=data.candles.length-1;i<data.candles.length;i++,ii--){this[i]=this.#format(data.candles[ii]);}//fill history
                                    }
                                    else this.error=data;
                                });//---res.end
                            }
                            else if(config.endpoint==='orderBook'||'positionBook'){
                                if(this.#refresh.zlib===undefined)this.#refresh.zlib=require('zlib');
                                let gzip=this.#refresh.zlib.createGunzip();
                                res.pipe(gzip);
                                gzip.on('data',(chunk)=>{data+=chunk;});
                                gzip.on('end',()=>{
                                    data=JSON.parse(data);
                                    let book=data.orderBook||data.positionBook;
                                    if(res.statusCode===200){
                                        this.time=book.time;
                                        this.unix=parseInt(book.unixTime);
                                        this.price=parseFloat(book.price);
                                        this.width=book.bucketWidth;
                                        if(this.count>book.buckets.length)for(let i=book.buckets.length-1;i<this.count;i++){delete this[i];}
                                        this.count=book.buckets.length;
                                        for(let i=0;i<book.buckets.length;i++)this[i]=this.#format(book.buckets[i]);
                                    }
                                    else this.error=data;
                                });//---res.end
                            }
                        }//---res
                    );//---https.get

                    if(config.account!==''){
                        https.get(
                            {
                                hostname:host,
                                path:'/v3/accounts/'+config.account+'/instruments?instruments='+config.instrument,
                                headers:{
                                    'Authorization':'Bearer '+apikey
                                    ,'Content-Type':'application/json; charset=UTF-8'
                                    ,'Accept-Encoding':'utf-8'
                                }
                            },
                            (res)=>{
                                let data='';
                                res.on('data',(chunk)=>{data+=chunk;});
                                res.on('end',()=>{
                                    data=JSON.parse(data);
                                    if(res.statusCode===200){
                                        this.displayPrecision=data.instruments[0].displayPrecision;
                                        this.marginRate=data.instruments[0].marginRate;
                                        this.maxOrderUnits=data.instruments[0].maximumOrderUnits;
                                        this.maxPositionSize=data.instruments[0].maximumPositionSize;
                                        this.maxTrailingStop=data.instruments[0].maximumTrailingStopDistance;
                                        this.minTradeSize=data.instruments[0].minimumTradeSize;
                                        this.minTrailingStop=data.instruments[0].minimumTrailingStopDistance;
                                        this.pipLocation=data.instruments[0].pipLocation;
                                        this.tradeUnitsPrecision=data.instruments[0].tradeUnitsPrecision;
                                    }
                                    else this.accountError=data;
                                });//---res.end
                            }//---res
                        );//---https.get
                    }//---account

                    this.#timeout=setTimeout(this.#refresh,config.interval);
                };
                
                this.#format=(obj)=>{
                    let ret={};
                    if(config.endpoint==='candles'){
                        ret.time=obj.time;
                        ret.volume=obj.volume;
                        if(config.price.indexOf('M')>-1){
                            ret.high=parseFloat(obj.mid.h);
                            ret.close=parseFloat(obj.mid.c);
                            ret.open=parseFloat(obj.mid.o);
                            ret.low=parseFloat(obj.mid.l);
                        }
                        if(config.price.indexOf('A')>-1){
                            ret.highAsk=parseFloat(obj.ask.h);
                            ret.closeAsk=parseFloat(obj.ask.c);
                            ret.openAsk=parseFloat(obj.ask.o);
                            ret.lowAsk=parseFloat(obj.ask.l);
                        }
                        if(config.price.indexOf('B')>-1){
                            ret.highBid=parseFloat(obj.bid.h);
                            ret.closeBid=parseFloat(obj.bid.c);
                            ret.openBid=parseFloat(obj.bid.o);
                            ret.lowBid=parseFloat(obj.bid.l);
                        }
                    }
                    else if(config.endpoint==='orderbook'||'positionbook'){
                        ret.price=parseFloat(obj.price);
                        ret.long=parseFloat(obj.longCountPercent);
                        ret.short=parseFloat(obj.shortCountPercent);
                    }
                    return ret;
                };
                this.#refresh(true);
            }
        };

        Object.defineProperty(Quote,'defaults',{enumerable:true,writable:true,configurable:false,value:defaults});

        return Quote;
    })();
};