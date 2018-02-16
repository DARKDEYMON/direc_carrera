import { Template } from "meteor/templating";


Template.programar.helpers({

    idAlumno: function(){
        return FlowRouter.getParam('id');
    },
    getOptions: function() {
        var cursor = materias.find();
        //console.log(cursor);

        return cursor.map(function(doc){
            return {label: doc.sigla, value: doc._id};
        });
        
    }
});


Template.programar.events({ 
    'submit form': function(event, template) {
        var id = FlowRouter.getParam('id');
        //console.log(id);
    } 
});