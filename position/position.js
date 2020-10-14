module.exports=function(apikey='',host=''){
    return (()=>{
        let https=require('https');
        let defaults={
            account:'',
            instrument:'',
            interval:1000
        };
        let close_defaults={
            instrument:'',
            datetime:'RFC3339',
            long:0,
            short:0
        };
        let instrument_format=function(pair){
            pair=pair.replace(' ','').toUpperCase();
            if(pair.length===6)pair=pair[0]+pair[1]+pair[2]+'_'+pair[3]+pair[4]+pair[5];
            else if(pair[3]!=='_')pair=pair[0]+pair[1]+pair[2]+'_'+pair[4]+pair[5]+pair[6];
            return pair;
        };

        class Position{
            httpsTime;
            httpsStatus;
            count;
            resume;
            pause;
            close;
            #refresh;
            #format;
            #timeout;

            constructor(config=defaults){
                if(config===undefined||config.account===undefined)return 'Position.constructor -> object with account required, ex: new Position({account:xxx-xxx-xxxxxx-xxx});';
                if(config.instrument===undefined)config.instrument=defaults.instrument;
                else config.instrument=instrument_format(config.instrument);
                if(config.interval==null||!Number.isInteger(config.interval))config.interval=defaults.interval;

                Object.defineProperty(this,'config',{value:config,enumerable:false,writable:false,configurable:false});

                this.count=0;

                this.close=function close(options=close_defaults,callback=function callback(data){return data;}){
                    if(options===undefined||typeof options!=='object')return callback('Position.close -> options argument must be object');
                    if(typeof this[0]==='string')return callback('Position.close -> no positions to close');
                    if((options.long==null||options.long==0)&&(options.short==null||options.short==0))return callback('Position.close -> no units (long|short)');
                    options.body={};
                    if(options.long)options.body.longUnits=''+options.long;
                    if(options.short)options.body.shortUnits=''+options.short;
                    if(options.datetime==null)options.datetime='RFC3339';
                    if(options.instrument==null)options.instrument='';
                    let put=(_instrument,_datetime,_body,_cb)=>{
                        https.request({
                            host:host,method:'PUT',path:'/v3/accounts/'+config.account+'/positions/'+_instrument+'/close',
                            headers:{
                                'Authorization':'Bearer '+apikey
                                ,'Content-Type':'application/json; charset=UTF-8'
                                ,'Accept-Encoding':'utf-8'
                                ,'Accept-Datetime-Format':_datetime
                                }
                            },
                            (res)=>{
                                let data='';
                                res.on('data',(chunk)=>{data+=(''+chunk).replace(',,',',');});
                                res.on('end',()=>{_cb(JSON.parse(data));});
                            }//---res
                        ).end(JSON.stringify(_body));
                    }
                    if(config.instrument!=='')return put(config.instrument,options.datetime,options.body,callback);// this
                    else if(options.instrument!==''){// list
                        if(options.instrument.indexOf(',')>-1){
                            let arr=options.instrument.split(',');
                            let ret_all={},counter=0;
                            for(let i=0;i<arr.length;i++){
                                put(instrument_format(arr[i]),options.datetime,options.body,(data)=>{
                                    ret_all[i]=data;
                                    if(counter++>=arr.length-1)return callback(ret_all);
                                });
                            }
                        }
                        else return put(instrument_format(options.instrument),options.datetime,options.body,callback);
                    }
                    else{// all
                        let ret_all={},counter=0;
                        for(let i=0;i<this.count;i++){
                            put(this[i].instrument,options.datetime,options.body,(data)=>{
                                ret_all[i]=data;
                                if(counter++>=this.count-1)return callback(ret_all);
                            });
                        }
                    }
                };//---close

                Object.defineProperty(this.close,'defaults',{enumerable:false,writable:true,configurable:false,value:close_defaults});

                this.pause=function pause(){clearTimeout(this.#timeout);this.#timeout='no timeout';};
                this.resume=function resume(){this.#refresh();};
                
                this.#refresh=(init=false)=>{
                    this.httpsTime=Date.now();
                    https.get(
                        {
                            hostname:host,
                            path:'/v3/accounts/'+config.account+'/openPositions',
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
                                if(res.statusCode===200)this.#format(data.positions);
                                else this.error=data;
                            });//---res.end
                        }//---res
                    );//---https.get
                    this.#timeout=setTimeout(this.#refresh,config.interval);
                };
                
                this.#format=(obj)=>{ 
                    if(config.instrument!==''){//match instrument
                        if(this.count===1){
                            delete this.long;
                            delete this.short;
                            delete this.pl;
                            delete this.resettablePL;
                            delete this.unrealizedPL;
                            delete this.financing;
                            delete this.dividendAdjustment;
                            delete this.guaranteedExecutionFees;
                            this.count=0;
                        }                        
                        for(let i=0;i<obj.length;i++){
                            if(obj[i].instrument!==config.instrument)continue;
                            this.long=obj[i].long;
                            this.short=obj[i].short;
                            this.pl=obj[i].pl;
                            this.resettablePL=obj[i].resettablePL;
                            this.unrealizedPL=obj[i].unrealizedPL;
                            this.financing=obj[i].financing;
                            this.dividendAdjustment=obj[i].dividendAdjustment;
                            this.guaranteedExecutionFees=obj[i].guaranteedExecutionFees;
                            this.count=1;
                            break;
                        }
                        if(this.count==0)this.error='instrument not found || position not open';
                    }
                    else{
                        for(let i=this.count-1;i>=0;i--){delete this[i];}
                        this[0]='no positions';
                        for(let i=0;i<obj.length;i++){this[i]=obj[i];}
                        this.count=obj.length;
                    }
                };

                this.#refresh(true);
            }
        };

        Object.defineProperty(Position,'defaults',{enumerable:true,writable:true,configurable:false,value:defaults});

        return Position;
    })();
};




