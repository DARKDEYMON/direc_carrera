/* helpers glovales */
Template.registerHelper('idTipoProgramacion',function(){
  dir = FlowRouter.current().route.name;
        //console.log(dir);
        if(dir == "reprogramacion")
            return "REPROGRAMACION";
        if(dir == "programarof")
            return "REPROGRAMACION"
        if(dir =="programarespecial")
            return "ESPECIAL"
        return "DESCONOSIDO";
});
/* Metodo logout */
Template.cabecera.events({
    'click #salir': function(event, template) { 
        AccountsTemplates.logout();
    }
});