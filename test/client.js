describe("Client module", function(){

    var Client  = app.db.Client
    ,   Dao     = new app.dao.client();

    before(function(done){ Client.collection.remove(done); });

    it("list an empty collection", function(){
        return expect(Dao.list()).to.eventually.have.length(0);
    });

    it("creates a client", function(){
        return Dao.create({
            id: "Mambo",
            name: "Mambo Client",
            description: "A dancer Client"
        });
    });

    it("list only a client, and should be the newly created", function(){
        return Dao.list().then(function(clients){
            return clients[0];
        }).then(function(client){
            return Q.all([
                client,
                Dao.find(client._id),
                Dao.find(client.id, client.secret)
            ]);
        }).spread(function(clientA, clientB, clientC){
            expect(clientA._id).to.eql(clientB._id);
            expect(clientA._id).to.eql(clientC._id);
            return;
        });
    });

    it("updates a client's field", function(){
        return Dao.list().then(function(clients){
            return Dao.update(clients[0]._id, {
                description: "Mambo is No. 5"
            });
        }).then(function(client){
            return expect(client.description).to.eql("Mambo is No. 5");
        });
    });

});
