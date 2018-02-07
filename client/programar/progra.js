import { Template } from "meteor/templating";


Template.programar.helpers({
    
    getOptions: function() {
        var cursor = materias.find();
        //console.log(cursor);
        
        return cursor.map(function(doc){
            return {label: doc.sigla, value: doc._id};
        });
        
    }
});


Template.programar.events({ 
    'click submit': function(event, template) { 
         console.log("aqui");
    } 
});