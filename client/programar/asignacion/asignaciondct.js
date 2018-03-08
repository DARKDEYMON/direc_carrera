Template.asignacionDct.onCreated(function(){
    var self = this;
    self.autorun(function() { 
        self.subscribe('materias');
        self.subscribe('designacionDct');
    });
});

Template.asignacionDct.helpers({
    nombreSigla : function(id){
        return materias.findOne({_id:id}).sigla;
    },
    materiasAsig: function() {
        id = FlowRouter.getParam('id');
        return designacionDct.find({docente_id:id});
    }
});