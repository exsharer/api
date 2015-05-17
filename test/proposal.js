describe('Proposal module', function(){

    var Proposal    = app.db.Proposal
    ,   Dao         = new app.dao.proposal();

    describe('DAO level', function(){

        before(function(done){ Proposal.collection.remove(done) });

        it('list an empty collection', function(){
            return expect(Dao.list()).to.eventually.have.length(0);
        });

        it('creates a proposal', function(){

            return Dao.create({
                description: "Incididunt ullamco aute ea minim commodo qui " +
                "ipsum ut incididunt nisi magna ipsum commodo."
            });

        });

    });

});
