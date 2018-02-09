
Template.updateProgra.helpers({
    updateProgra: function() {
        console.log("aqui");
        return FlowRouter.getParam('id');
    },
    docUpdate : function(){
        b = FlowRouter.getParam('id').toString();
        c = progra.findOne({_id:b});
        return c;
    },
    getOptions: function() {
        var cursor = materias.find();
        //console.log(cursor);
        return cursor.map(function(doc){
            return {label: doc.sigla, value: doc._id};
        });
    }
});