"use strict";

module.exports = function(){

    var sockets = app.utils.sockets;
    sockets.setAuthorization(app.dao.sockets.authorization);

    for(var evtModule in app.events){

        var eventModule = app.events[evtModule];

        sockets.registerNamespace(
            evtModule,
            eventModule.connect,
            eventModule.disconnect
        );

        for(var evt in eventModule.events){
            var event = eventModule.events[evt];
            sockets.registerEvent(evtModule, event.tag, event.event);
        }

    }

};
