

Template.inserAsigDct.helpers({
    getMaterias: function() {
        var cursor = materias.find({});
        //console.log(cursor);
        return cursor.map(function(doc){
            return {label: doc.sigla, value: doc._id};
        });
    },
    idDocente: function(){
        return FlowRouter.getParam('id');
    },
});