
//version 0.5.1 to 0.6.0
/*
There are no type checks here, you can pass bad arguments.
Example: new OandaV20(undefined,false,null); This will return an instance that every request will fail.
*/

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
        if(opts[i]==''||opts[i]=={})continue;
        if(typeof(opts[i])==='object'){
            let temp=MakeBody(opts[i]);
            if(temp!={})body[i]=temp;
        }
        else body[i]=''+opts[i];
    }
    return body;
};
const CheckProperties=(opts,std)=>{
	if(typeof(opts)!=='object'||Array.isArray(opts)===true)return std;
	if(opts===std)return opts;
    for(const name in std){
		const optsType=typeof(opts[name]);
		const stdVal=std[name];
		switch(optsType){
			//if prop name does not exist on opts
			case 'undefined':{
				opts[name]=stdVal;
				continue;
			}
			//prop name exists on both
			//if primitive, all good
			case 'string':case 'number':case 'boolean':{continue;}
			default:{break;}
		}
		//prop name exists on both
		//if std prop is object, recurse it
		if(typeof(stdVal)==='object'){
			opts[name]=CheckProperties(opts[name],stdVal);
			continue;
		}
		//is some type not used
		opts[name]=stdVal;
	}
    return opts;
};

class OandaV20{

	static DEFAULTS=class DEFAULTS{
		static CLIENT_EXTENSIONS=class {
			id='';
			tag='';
			comment='';
		};
		static TAKE_PROFIT=class {
			price='';
			timeInForce='';
			gtdTime='';
			clientExtensions=new OandaV20.DEFAULTS.CLIENT_EXTENSIONS();
		};
		static STOP_LOSS=class {
			price='';
			distance='';
			timeInForce='';
			gtdTime='';
			clientExtensions=new OandaV20.DEFAULTS.CLIENT_EXTENSIONS();
		};
		static GUARANTEED_STOP_LOSS=class {
			price='';
			distance='';
			timeInForce='';
			gtdTime='';
			clientExtensions=new OandaV20.DEFAULTS.CLIENT_EXTENSIONS();
		};
		static TRAILING_STOP_LOSS=class {
			distance='';
			timeInForce='';
			gtdTime='';
			clientExtensions=new OandaV20.DEFAULTS.CLIENT_EXTENSIONS();
		};

		CALLBACK (result){};

		TIME={
			time:''
		};
		TYPE={
			type:''
		};
		UNITS={
			units:''
		};
		ACCOUNT_INSTRUMENTS={
			instruments:''
		};
		CONFIG={
			alias:''
			,marginRate:''
		};
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
		ORDERS={
			state:''
			,instrument:''
			,count:''
			,beforeID:''
			,ids:''
		};
		TRADES={
			count:''
			,state:''
			,beforeID:''
			,instrument:''
			,ids:''
		};
		TRANSACTIONS={
			from:''
			,to:''
			,pageSize:''
			,type:''
		};
		INSTRUMENTS_PRICING={
			since:''
			,includeHomeConversions:''
		};
		CLOSE_POSITION={
			longClientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
			,shortClientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
			,longUnits:''
			,shortUnits:''
		};
		CLIENT_EXTENSIONS=new OandaV20.DEFAULTS.CLIENT_EXTENSIONS();
		ORDER_EXTENSIONS={
			clientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
			,tradeClientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
		};
		TAKE_PROFIT=new OandaV20.DEFAULTS.TAKE_PROFIT();
		STOP_LOSS=new OandaV20.DEFAULTS.STOP_LOSS();
		GUARANTEED_STOP_LOSS=new OandaV20.DEFAULTS.GUARANTEED_STOP_LOSS();
		TRAILING_STOP_LOSS=new OandaV20.DEFAULTS.TRAILING_STOP_LOSS();
		TRADE_ORDERS={
			takeProfit:new OandaV20.DEFAULTS.TAKE_PROFIT()
			,stopLoss:new OandaV20.DEFAULTS.STOP_LOSS()
			,guaranteedStopLoss:new OandaV20.DEFAULTS.GUARANTEED_STOP_LOSS()
			,trailingStopLoss:new OandaV20.DEFAULTS.TRAILING_STOP_LOSS()
		}
		ORDER_CREATE={
			MARKET:{
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
				,clientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
				,takeProfitOnFill:new OandaV20.DEFAULTS.TAKE_PROFIT()
				,stopLossOnFill:new OandaV20.DEFAULTS.STOP_LOSS()
				,guaranteedStopLossOnFill:new OandaV20.DEFAULTS.GUARANTEED_STOP_LOSS()
				,trailingStopLossOnFill:new OandaV20.DEFAULTS.TRAILING_STOP_LOSS()
				,tradeClientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
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
				,clientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
				,takeProfitOnFill:new OandaV20.DEFAULTS.TAKE_PROFIT()
				,stopLossOnFill:new OandaV20.DEFAULTS.STOP_LOSS()
				,guaranteedStopLossOnFill:new OandaV20.DEFAULTS.GUARANTEED_STOP_LOSS()
				,trailingStopLossOnFill:new OandaV20.DEFAULTS.TRAILING_STOP_LOSS()
				,tradeClientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
			}
			,MARKET_IF_TOUCHED:{
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
			}
			,TAKE_PROFIT:{
				type:'TAKE_PROFIT'
				,tradeID:''
				,clientTradeID:''
				,price:''
				,timeInForce:''
				,gtdTime:''
				,triggerCondition:''
				,clientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
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
				,clientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
			}
			,GUARANTEED_STOP_LOSS:{
				type:'GUARANTEED_STOP_LOSS'
				,tradeID:''
				,clientTradeID:''
				,price:''
				,distance:''
				,timeInForce:''
				,gtdTime:''
				,triggerCondition:''
				,clientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
			}
			,TRAILING_STOP_LOSS:{
				type:'TRAILING_STOP_LOSS'
				,tradeID:''
				,clientTradeID:''
				,distance:''
				,timeInForce:''
				,gtdTime:''
				,triggerCondition:''
				,clientExtensions:new OandaV20.DEFAULTS.CLIENT_EXTENSIONS()
			}
		}
	};

	defaults=new OandaV20.DEFAULTS();
	api='';
	host='api-fxtrade.oanda.com';
	datetime='RFC3339';

	constructor(api='',datetime='RFC3339',host='api-fxtrade.oanda.com'){
		this.api=api;
		this.datetime=datetime;
		this.host=host;
	};

	static result=class result{error;data;};
	static #fetchOptions=class fetchOptions{
		method='GET';
		body;
		headers={
			'Authorization':'Bearer '
			,'Content-Type':'application/json; charset=UTF-8'
			,'Accept-Datetime-Format':''
		};
		constructor(api,datetime,method='GET',body=undefined){
			this.headers['Authorization']+=api;
			this.headers['Accept-Datetime-Format']+=datetime;
			this.method=method;
			if(body!==undefined)this.body=JSON.stringify(body);
		}
	};
	async #request(method='',path='',prop='',callback=this.defaults.CALLBACK,body=undefined){
		const result=new OandaV20.result();
		const options=new OandaV20.#fetchOptions(this.api,this.datetime,method,body);
		try{
			const data=(await (await fetch('https://'+this.host+path,options)).json());
			if(data.errorMessage!==undefined)result.error=data.errorMessage;
			else result.data=(typeof(prop)==='string'&&prop.length>0&&data[prop]!==undefined)?data[prop]:data;
		}
		catch(error){result.error=error;}
		if(typeof(callback)==='function')callback(result);	
		return result;
	};

	//account
	async getAccounts (callback=this.defaults.CALLBACK) {
		return this.#request(
			'GET'
			,'/v3/accounts'
			,'accounts'
			,callback
		);
	}
	async getAccount (account='',callback=this.defaults.CALLBACK) {
		return this.#request(
			'GET'
			,`/v3/accounts/${account}`
			,'account'
			,callback
		);
	}
	async getAccountSummary (account='',callback=this.defaults.CALLBACK) {
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/summary`
			,'account'
			,callback
		);
	}
	async getAccountInstruments (account='',callback=this.defaults.CALLBACK,query=this.defaults.ACCOUNT_INSTRUMENTS) {
		query=CheckProperties(query,this.defaults.ACCOUNT_INSTRUMENTS);
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/instruments${MakeQuery(query)}`
			,'instruments'
			,callback
		);
	}
	async getAccountChangesSinceTransaction (account='',transactionID='',callback=this.defaults.CALLBACK) {
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/changes?sinceTransactionID=${transactionID}`
			,'changes'
			,callback
		);
	}
	async setAccountConfiguration (account='',callback=this.defaults.CALLBACK,body=this.defaults.CONFIG) {
		body=CheckProperties(body,this.defaults.CONFIG);
		return this.#request(
			'PATCH'
			,`/v3/accounts/${account}/configuration`
			,'clientConfigureTransaction'
			,callback
			,MakeBody(body)
		);
	}

	//rates
	async getInstrument (instrument='',callback=this.defaults.CALLBACK,query=this.defaults.INSTRUMENT) {
		query=CheckProperties(query,this.defaults.INSTRUMENT);
		return this.#request(
			'GET'
			,`/v3/instruments/${instrument}/candles${MakeQuery(query)}`
			,'candles'
			,callback
		);
	}
	async getOrderBook (instrument='',callback=this.defaults.CALLBACK,query=this.defaults.TIME) {
		query=CheckProperties(query,this.defaults.TIME);
		return this.#request(
			'GET'
			,`/v3/instruments/${instrument}/orderBook${MakeQuery(query)}`
			,'orderBook'
			,callback
		);
	}
	async getPositionBook (instrument='',callback=this.defaults.CALLBACK,query=this.defaults.TIME) {
		query=CheckProperties(query,this.defaults.TIME);
		return this.#request(
			'GET'
			,`/v3/instruments/${instrument}/positionBook${MakeQuery(query)}`
			,'positionBook'
			,callback
		);
	}

	//position
	async getPositions (account='',callback=this.defaults.CALLBACK) {
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/positions`
			,'positions'
			,callback
		);
	}
	async getPosition (account='',instrument='',callback=this.defaults.CALLBACK) {
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/positions/${instrument}`
			,'position'
			,callback
		);
	}
	async getOpenPositions (account='',callback=this.defaults.CALLBACK) {
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/openPositions`
			,'positions'
			,callback
		);
	}
	async closePosition (account='',instrument='',callback=this.defaults.CALLBACK,body=this.defaults.CLOSE_POSITION) {
		body=CheckProperties(body,this.defaults.CLOSE_POSITION);
		return this.#request(
			'PUT'
			,`/v3/accounts/${account}/positions/${instrument}/close`
			,''
			,callback
			,MakeBody(body)
		);
	}

	//transaction
	async getTransactions (account='',callback=this.defaults.CALLBACK,query=this.defaults.TRANSACTIONS) {
		query=CheckProperties(query,this.defaults.TRANSACTIONS);
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/transactions${MakeQuery(query)}`
			,''
			,callback
		);
	}
	async getTransaction (account='',transactionID='',callback=this.defaults.CALLBACK) {
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/transactions/${transactionID}`
			,'transaction'
			,callback
		);
	}
	async getTransactionsByIdRange (account='',from='',to='',callback=this.defaults.CALLBACK,query=this.defaults.TYPE) {
		query=CheckProperties(query,this.defaults.TYPE);
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/transactions/idrange${MakeQuery({to:to,from:from,type:query.type})}`
			,'transactions'
			,callback
		);
	}
	async getTransactionsSinceId (account='',id='',callback=this.defaults.CALLBACK,query=this.defaults.TYPE) {
		query=CheckProperties(query,this.defaults.TYPE);
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/transactions/sinceid${MakeQuery({id:id,type:query.type})}`
			,'transactions'
			,callback
		);
	}

	//rate pricing
	async getInstrumentsPricing (account='',instruments='',callback=this.defaults.CALLBACK,query=this.defaults.INSTRUMENTS_PRICING) {
		query=CheckProperties(query,this.defaults.INSTRUMENTS_PRICING);
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/pricing`+MakeQuery({
												instruments:instruments
												,since:query.since
												,includeHomeConversions:query.includeHomeConversions
											})
			,'prices'
			,callback
		);
	}

	//trades
	async getTrades (account='',callback=this.defaults.CALLBACK,query=this.defaults.TRADES) {
		query=CheckProperties(query,this.defaults.TRADES);
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/trades${MakeQuery(query)}`
			,'trades'
			,callback
		);
	}
	async getOpenTrades (account='',callback=this.defaults.CALLBACK,query=this.defaults.TRADES) {
		query=CheckProperties(query,this.defaults.TRADES);
		query.state='OPEN';
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/trades${MakeQuery(query)}`
			,'trades'
			,callback
		);
	}
	async getClosedTrades (account='',callback=this.defaults.CALLBACK,query=this.defaults.TRADES) {
		query=CheckProperties(query,this.defaults.TRADES);
		query.state='CLOSED';
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/trades${MakeQuery(query)}`
			,'trades'
			,callback
		);
	}
	async getCloseWhenTradeableTrades (account='',callback=this.defaults.CALLBACK,query=this.defaults.TRADES) {
		query=CheckProperties(query,this.defaults.TRADES);
		query.state='CLOSE_WHEN_TRADEABLE';
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/trades${MakeQuery(query)}`
			,'trades'
			,callback
		);
	}
	async getAllTrades (account='',callback=this.defaults.CALLBACK,query=this.defaults.TRADES) {
		query=CheckProperties(query,this.defaults.TRADES);
		query.state='ALL';
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/trades${MakeQuery(query)}`
			,'trades'
			,callback
		);
	}
	async getAllOpenTrades (account='',callback=this.defaults.CALLBACK) {
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/openTrades`
			,'trades'
			,callback
		);
	}
	async getTrade (account='',tradeSpecifier='',callback=this.defaults.CALLBACK) {
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/trades/${tradeSpecifier}`
			,'trade'
			,callback
		);
	}
	async closeTrade (account='',tradeSpecifier='',callback=this.defaults.CALLBACK,body=this.defaults.UNITS) {
		body=CheckProperties(body,this.defaults.UNITS);
		return this.#request(
			'PUT'
			,`/v3/accounts/${account}/trades/${tradeSpecifier}/close`
			,''
			,callback
			,MakeBody(body)
		);
	}
	async setTradeClientExtensions (account='',tradeSpecifier='',callback=this.defaults.CALLBACK,body=this.defaults.CLIENT_EXTENSIONS) {
		body=CheckProperties(body,this.defaults.CLIENT_EXTENSIONS);
		return this.#request(
			'PUT'
			,`/v3/accounts/${account}/trades/${tradeSpecifier}/clientExtensions`
			,''
			,callback
			,MakeBody(body)
		);
	}
	async setTradeOrders (account='',tradeSpecifier='',callback=this.defaults.CALLBACK,body=this.defaults.TRADE_ORDERS) {
		body=CheckProperties(body,this.defaults.TRADE_ORDERS);
		return this.#request(
			'PUT'
			,`/v3/accounts/${account}/trades/${tradeSpecifier}/orders`
			,''
			,callback
			,MakeBody(body)
		);
	}

	//orders
	async getOrders (account='',callback=this.defaults.CALLBACK,query=this.defaults.ORDERS) {
		query=CheckProperties(query,this.defaults.ORDERS);
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/orders${MakeQuery(query)}`
			,'orders'
			,callback
		);
	}
	async getPendingOrders (account='',callback=this.defaults.CALLBACK,query=this.defaults.ORDERS) {
		query=CheckProperties(query,this.defaults.ORDERS);
		query.state='PENDING';
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/orders${MakeQuery(query)}`
			,'orders'
			,callback
		);
	}
	async getFilledOrders (account='',callback=this.defaults.CALLBACK,query=this.defaults.ORDERS) {
		query=CheckProperties(query,this.defaults.ORDERS);
		query.state='FILLED';
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/orders${MakeQuery(query)}`
			,'orders'
			,callback
		);
	}
	async getTriggeredOrders (account='',callback=this.defaults.CALLBACK,query=this.defaults.ORDERS) {
		query=CheckProperties(query,this.defaults.ORDERS);
		query.state='TRIGGERED';
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/orders${MakeQuery(query)}`
			,'orders'
			,callback
		);
	}
	async getCancelledOrders (account='',callback=this.defaults.CALLBACK,query=this.defaults.ORDERS) {
		query=CheckProperties(query,this.defaults.ORDERS);
		query.state='CANCELLED';
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/orders${MakeQuery(query)}`
			,'orders'
			,callback
		);
	}
	async getAllPendingOrders (account='',callback=this.defaults.CALLBACK) {
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/pendingOrders`
			,'orders'
			,callback
		);
	}
	async getAllOrders (account='',callback=this.defaults.CALLBACK,query=this.defaults.ORDERS) {
		query=CheckProperties(query,this.defaults.ORDERS);
		query.state='ALL';
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/orders${MakeQuery(query)}`
			,'orders'
			,callback
		);
	}
	async getOrder (account='',orderSpecifier='',callback=this.defaults.CALLBACK) {
		return this.#request(
			'GET'
			,`/v3/accounts/${account}/orders/${orderSpecifier}`
			,'order'
			,callback
		);
	}
	async cancelOrder (account='',orderSpecifier='',callback=this.defaults.CALLBACK) {
		return this.#request(
			'PUT'
			,`/v3/accounts/${account}/orders/${orderSpecifier}/cancel`
			,''
			,callback
		);
	}
	async setOrderClientExtensions (account='',orderSpecifier='',callback=this.defaults.CALLBACK,body=this.defaults.ORDER_EXTENSIONS) {
		body=CheckProperties(body,this.defaults.ORDER_EXTENSIONS);
		return this.#request(
			'PUT'
			,`/v3/accounts/${account}/orders/${orderSpecifier}/clientExtensions`
			,''
			,callback
			,MakeBody(body)
		);
	}
	async createMarketOrder (account='',callback=this.defaults.CALLBACK,body=this.defaults.ORDER_CREATE.MARKET) {
		body=CheckProperties(body,this.defaults.ORDER_CREATE.MARKET);
		body.type='MARKET';
		return this.#request(
			'POST'
			,`/v3/accounts/${account}/orders`
			,''
			,callback
			,MakeBody(body)
		);
	}
	async createLimitOrder (account='',callback=this.defaults.CALLBACK,body=this.defaults.ORDER_CREATE.LIMIT) {
		body=CheckProperties(body,this.defaults.ORDER_CREATE.LIMIT);
		body.type='LIMIT';
		return this.#request(
			'POST'
			,`/v3/accounts/${account}/orders`
			,''
			,callback
			,MakeBody(body)
		);
	}
	async createStopOrder (account='',callback=this.defaults.CALLBACK,body=this.defaults.ORDER_CREATE.STOP) {
		body=CheckProperties(body,this.defaults.ORDER_CREATE.STOP);
		body.type='STOP';
		return this.#request(
			'POST'
			,`/v3/accounts/${account}/orders`
			,''
			,callback
			,MakeBody(body)
		);
	}
	async createMarketIfTouchedOrder (account='',callback=this.defaults.CALLBACK,body=this.defaults.ORDER_CREATE.MARKET_IF_TOUCHED) {
		body=CheckProperties(body,this.defaults.ORDER_CREATE.MARKET_IF_TOUCHED);
		body.type='MARKET_IF_TOUCHED';
		return this.#request(
			'POST'
			,`/v3/accounts/${account}/orders`
			,''
			,callback
			,MakeBody(body)
		);
	}
	async createTakeProfitOrder (account='',callback=this.defaults.CALLBACK,body=this.defaults.ORDER_CREATE.TAKE_PROFIT) {
		body=CheckProperties(body,this.defaults.ORDER_CREATE.TAKE_PROFIT);
		body.type='TAKE_PROFIT';
		return this.#request(
			'POST'
			,`/v3/accounts/${account}/orders`
			,''
			,callback
			,MakeBody(body)
		);
	}
	async createStopLossOrder (account='',callback=this.defaults.CALLBACK,body=this.defaults.ORDER_CREATE.STOP_LOSS) {
		body=CheckProperties(body,this.defaults.ORDER_CREATE.STOP_LOSS);
		body.type='STOP_LOSS';
		return this.#request(
			'POST'
			,`/v3/accounts/${account}/orders`
			,''
			,callback
			,MakeBody(body)
		);
	}
	async createGuaranteedStopLossOrder (account='',callback=this.defaults.CALLBACK,body=this.defaults.ORDER_CREATE.GUARANTEED_STOP_LOSS) {
		body=CheckProperties(body,this.defaults.ORDER_CREATE.GUARANTEED_STOP_LOSS);
		body.type='GUARANTEED_STOP_LOSS';
		return this.#request(
			'POST'
			,`/v3/accounts/${account}/orders`
			,''
			,callback
			,MakeBody(body)
		);
	}
	async createTrailingStopLossOrder (account='',callback=this.defaults.CALLBACK,body=this.defaults.ORDER_CREATE.TRAILING_STOP_LOSS) {
		body=CheckProperties(body,this.defaults.ORDER_CREATE.TRAILING_STOP_LOSS);
		body.type='TRAILING_STOP_LOSS';
		return this.#request(
			'POST'
			,`/v3/accounts/${account}/orders`
			,''
			,callback
			,MakeBody(body)
		);
	}
	async replaceWithMarketOrder (account='',orderSpecifier='',callback=this.defaults.CALLBACK,body=this.defaults.ORDER_CREATE.MARKET) {
		body=CheckProperties(body,this.defaults.ORDER_CREATE.MARKET);
		body.type='MARKET';
		return this.#request(
			'PUT'
			,`/v3/accounts/${account}/orders/${orderSpecifier}`
			,''
			,callback
			,MakeBody(body)
		);
	}
	async replaceWithLimitOrder (account='',orderSpecifier='',callback=this.defaults.CALLBACK,body=this.defaults.ORDER_CREATE.LIMIT) {
		body=CheckProperties(body,this.defaults.ORDER_CREATE.LIMIT);
		body.type='LIMIT';
		return this.#request(
			'PUT'
			,`/v3/accounts/${account}/orders/${orderSpecifier}`
			,''
			,callback
			,MakeBody(body)
		);
	}
	async replaceWithStopOrder (account='',orderSpecifier='',callback=this.defaults.CALLBACK,body=this.defaults.ORDER_CREATE.STOP) {
		body=CheckProperties(body,this.defaults.ORDER_CREATE.STOP);
		body.type='STOP';
		return this.#request(
			'PUT'
			,`/v3/accounts/${account}/orders/${orderSpecifier}`
			,''
			,callback
			,MakeBody(body)
		);
	}
	async replaceWithMarketIfTouchedOrder (account='',orderSpecifier='',callback=this.defaults.CALLBACK,body=this.defaults.ORDER_CREATE.MARKET_IF_TOUCHED) {
		body=CheckProperties(body,this.defaults.ORDER_CREATE.MARKET_IF_TOUCHED);
		body.type='MARKET_IF_TOUCHED';
		return this.#request(
			'PUT'
			,`/v3/accounts/${account}/orders/${orderSpecifier}`
			,''
			,callback
			,MakeBody(body)
		);
	}
	async replaceWithTakeProfitOrder (account='',orderSpecifier='',callback=this.defaults.CALLBACK,body=this.defaults.ORDER_CREATE.TAKE_PROFIT) {
		body=CheckProperties(body,this.defaults.ORDER_CREATE.TAKE_PROFIT);
		body.type='TAKE_PROFIT';
		return this.#request(
			'PUT'
			,`/v3/accounts/${account}/orders/${orderSpecifier}`
			,''
			,callback
			,MakeBody(body)
		);
	}
	async replaceWithStopLossOrder (account='',orderSpecifier='',callback=this.defaults.CALLBACK,body=this.defaults.ORDER_CREATE.STOP_LOSS) {
		body=CheckProperties(body,this.defaults.ORDER_CREATE.STOP_LOSS);
		body.type='STOP_LOSS';
		return this.#request(
			'PUT'
			,`/v3/accounts/${account}/orders/${orderSpecifier}`
			,''
			,callback
			,MakeBody(body)
		);
	}
	async replaceWithGuaranteedStopLossOrder (account='',orderSpecifier='',callback=this.defaults.CALLBACK,body=this.defaults.ORDER_CREATE.GUARANTEED_STOP_LOSS) {
		body=CheckProperties(body,this.defaults.ORDER_CREATE.GUARANTEED_STOP_LOSS);
		body.type='GUARANTEED_STOP_LOSS';
		return this.#request(
			'PUT'
			,`/v3/accounts/${account}/orders/${orderSpecifier}`
			,''
			,callback
			,MakeBody(body)
		);
	}
	async replaceWithTrailingStopLossOrder (account='',orderSpecifier='',callback=this.defaults.CALLBACK,body=this.defaults.ORDER_CREATE.TRAILING_STOP_LOSS) {
		body=CheckProperties(body,this.defaults.ORDER_CREATE.TRAILING_STOP_LOSS);
		body.type='TRAILING_STOP_LOSS';
		return this.#request(
			'PUT'
			,`/v3/accounts/${account}/orders/${orderSpecifier}`
			,''
			,callback
			,MakeBody(body)
		);
	}
};

if(typeof(module)!=='undefined')module.exports=OandaV20;
if(typeof(window)!=='undefined')window.OandaV20=OandaV20;
