Template.asignacionDct.helpers({
    materiasAsig: function() {
        id = FlowRouter.getParam('id');
        return designacionDct.find({docente_id:id});
    },
    nombreSigla : function(id){
        return materias.findOne({_id:id}).sigla;
    }
});