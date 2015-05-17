describe('Project module', function(){

    var Project = app.db.Project
    ,   Dao     = new app.dao.project();

    describe('DAO level', function(){

        before(function(done){ Project.collection.remove(done) });

        it('creates a project', function(){

            return Dao.create({
                title: "My awesome project",
                description: "Incididunt ullamco aute ea minim commodo qui ipsum ut incididunt nisi magna ipsum commodo.",
                place: {
                    type: "Point",
                    coordinates: [ 4.568123, -74.240021 ]
                }
            });

        });

    });

});
