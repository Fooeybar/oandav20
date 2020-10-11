module.exports=function(apikey='',host='api-fxtrade.oanda.com'){
    return (()=>{
        let https=require('https');
        let defaults={
            id:'',
            interval:1000
        };

        class Account{
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
                if(config.id==null)config.id=defaults.id;
                if(config.interval==null||!Number.isInteger(config.interval))config.interval=defaults.interval;

                Object.defineProperty(this,'config',{value:config,enumerable:false,writable:false,configurable:false});

                this.count=0;
                this.pause=function pause(){clearTimeout(this.#timeout);};
                this.resume=function resume(){this.#refresh();};

                this.#refresh=(init=false)=>{
                    this.httpsTime=Date.now();
                    https.get(
                        {
                            hostname:host,
                            path:'/v3/accounts'+((config.id==='')?'':'/'+config.id+'/summary'),
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
                                if(res.statusCode===200)this.#format(data);
                                else this.error=data;
                            });//---res.end
                        }//---res
                    );//---https.get
                    this.#timeout=setTimeout(this.#refresh,config.interval);
                };
                
                this.#format=(obj)=>{
                    if(obj.account){
                        this.name=obj.account.alias;
                        this.currency=obj.account.currency;
                        this.balance=obj.account.balance;
                        this.nav=obj.account.NAV;
                        this.pl=obj.account.pl;
                        this.resettablePL=obj.account.resettablePL;
                        this.unrealizedPL=obj.account.unrealizedPL;
                        this.withdrawalLimit=obj.account.withdrawalLimit;  
                        this.positionValue=obj.account.positionValue;
                        this.positions=obj.account.openPositionCount;
                        this.trades=obj.account.openTradeCount;
                        this.pending=obj.account.pendingOrderCount;      
                        this.marginRate=obj.account.marginRate;
                        this.marginUsed=obj.account.marginUsed;                          
                        this.marginAvail=obj.account.marginAvailable;
                        this.marginCloseoutUsed=obj.account.marginCloseoutMarginUsed;
                        this.marginCloseoutNAV=obj.account.marginCloseoutNAV;
                        this.marginCloseout=obj.account.marginCloseoutPercent;
                        this.marginCloseoutPositionValue=obj.account.marginCloseoutPositionValue;
                        this.marginCloseoutUnrealizedPL=obj.account.marginCloseoutUnrealizedPL;
                        this.lastTrans=obj.account.lastTransactionID;    
                    }
                    else if(obj.accounts){
                        for(let i=this.count-1;i>=0;i--){delete this[i];}
                        this.count=obj.accounts.length||0;
                        for(let i=0;i<obj.accounts.length;i++){this[i]=obj.accounts[i];}
                    }
                };
                
                this.#refresh(true);
            }
        };

        Object.defineProperty(Account,'defaults',{enumerable:true,writable:true,configurable:false,value:defaults});

        return Account;
    })();
};