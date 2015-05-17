describe("Client module", function(){

    var Client  = app.db.Client
    ,   Dao     = new app.dao.client();

    before(function(done){
        Client.collection.remove(done);
    });

    it("list an empty collection", function(done){
        Dao.list().then(function(clients){
            expect(clients).to.have.length(0);
            done();
        }).catch(done);
    });

    it("creates a client", function(done){
        Dao.create({
            id: "Mambo",
            name: "Mambo Client",
            description: "A dancer Client"
        }).then(function(client){
            done();
        }).catch(done);
    });

    it("list only a client, and should be the newly created", function(done){
        Dao.list().then(function(clients){
            var client = clients[0];
            return client;
        }).then(function(client){
            return Q.all([
                client,
                Dao.find(client._id),
                Dao.find(client.id, client.secret)
            ]);
        }).spread(function(clientA, clientB, clientC){
            expect(clientA._id).to.eql(clientB._id);
            expect(clientA._id).to.eql(clientC._id);
            done();
        }).catch(done);
    });

    it("updates a client's field", function(done){
        Dao.list().then(function(clients){
            return Dao.update(clients[0]._id, {
                description: "Mambo is No. 5"
            });
        }).then(function(client){
            expect(client.description).to.eql("Mambo is No. 5");
            done();
        }).catch(done);
    });

});
