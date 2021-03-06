import { Template } from "meteor/templating";

Template.programar.onCreated(function(){
    var self = this;
    self.autorun(function() { 
        self.subscribe('materias'); 
    });
});

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
        
    },
    /*
    idTipoProgramacion: function(){
        dir = FlowRouter.current().route.name;
        //console.log(dir);
        if(dir == "reprogramacion")
            return "REPROGRAMACION";
        return "DESCONOSIDO";
    }
    */
});


Template.programar.events({ 
    'submit form': function(event, template) {
        var id = FlowRouter.getParam('id');
        //console.log(id);
    } 
});