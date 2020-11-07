module.exports=function OandaV20(apikey='',host='api-fxtrade.oanda.com'){
    return{
        Account:require('./account/account')(apikey,host),
        Position:require('./position/position')(apikey,host),
        Quote:require('./quote/quote')(apikey,host),
        Trade:require('./trade/trade')(apikey,host)
    };
};

/*
v0.4.0:
 - Order class

v0.5.0:
 - Transaction class
 
*/