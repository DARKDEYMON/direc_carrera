

/* helpers glovales */
Template.registerHelper('idTipoProgramacion',function(){
  dir = FlowRouter.current().route.name;
        //console.log(dir);
        if(dir == "reprogramacion")
            return "REPROGRAMACION";
        if(dir == "programarof")
            return "REPROGRAMACION"
        return "DESCONOSIDO";
});