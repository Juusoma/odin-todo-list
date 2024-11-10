function createPubSubBroker(){
    const subscribers = {};

    function subscribe(eventName, callback){
        if(eventName in subscribers){
            subscribers[eventName] = [...subscribers[eventName], callback];
        }
        else{
            subscribers[eventName] = [callback];
        }
    }

    function unsubscribe(eventName, callback){
        if(eventName in subscribers){
            subscribers[eventName] = subscribers[eventName].filter(x => x !== callback);
            if(subscribers[eventName].length === 0){
                delete subscribers[eventName];
            }
        }
    }

    function publish(eventName, data){
        if(eventName in subscribers){
            subscribers[eventName].forEach(callback => {
                callback(data);
            });
        }
    }

    return { subscribe, unsubscribe, publish };
}

export { createPubSubBroker }