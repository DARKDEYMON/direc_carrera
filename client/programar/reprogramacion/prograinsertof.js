
Template.programarof.onCreated(function(){
    this.resMateria = new ReactiveVar([]);
    this.gestionb = new ReactiveVar(false);
    this.gestion = new ReactiveVar('2018');
    this.periodo = new ReactiveVar('1');

    id = FlowRouter.getParam('id');
    var self = this;
    self.autorun(function() { 
        Meteor.call('getMateriasProgra',id,self.gestion.get() ,self.periodo.get() ,(error, result)=>{
            //console.log(result.rows);
            return self.resMateria.set(result.rows);
        });
    });
});

Template.programarof.helpers({

    idAlumno: function(){
        return FlowRouter.getParam('id');
    },
    getOptions: function() {
        cursor = Template.instance().resMateria.get();
        //console.log(cursor);
        return cursor.map(function(doc){
            //console.log(doc)
            return {label: doc.r_materia, value: doc.r_id_materia};
        });
        
    },
    gestionb : function(){
        return Template.instance().gestionb.get();
    }
});


Template.programarof.events({ 
    'submit .gest' : function(event, template){
        event.preventDefault();

        gestion = event.target.gestion.value.trim();
        Template.instance().gestion.set(gestion);
        //console.log(gestion);
        
        periodo = event.target.periodo.value.trim();
        Template.instance().periodo.set(periodo);
        //console.log(periodo);

        Template.instance().gestionb.set(true);
    }
});