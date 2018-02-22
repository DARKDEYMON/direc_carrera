Template.asignacionDct.helpers({
    nombreSigla : function(id){
        return materias.findOne({_id:id}).sigla;
    },
    materiasAsig: function() {
        id = FlowRouter.getParam('id');
        return designacionDct.find({docente_id:id});
    }
});