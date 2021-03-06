

Template.inserAsigDct.onCreated(function(){
    var self = this;
    self.autorun(function() { 
        self.subscribe('materias'); 
    });
});


Template.inserAsigDct.helpers({
    getMaterias: function() {
        var cursor = materias.find({});
        return cursor.map(function(doc){
            return {label: doc.sigla, value: doc._id};
        });
    },
    idDocente: function(){
        return FlowRouter.getParam('id');
    },
});