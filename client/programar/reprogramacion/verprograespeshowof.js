
Template.showprograesp.onCreated(function(){
    this.gestiont = new ReactiveVar();
    this.periodot = new ReactiveVar();
    self = this;
    id = FlowRouter.getParam('ru');

    /* arreder a instancia superior */
    //this.superior = this.view.parentView.parentView.templateInstance();
    this.gestiont.set(Template.currentData().gestion.toString());
    this.periodot.set(Template.currentData().periodo.toString());

    self.autorun(function(){
        self.subscribe('progra');
    });
});

Template.showprograesp.helpers({
    dateFormat : function(date) {
        return moment(date).format('MM-DD-YYYY');
    },
    /* materiasd q tiene programadas */
    materiasProgra : function() {
        //vista = Template.parentData();
        var id = FlowRouter.getParam('ru').toString();
        var ges = Number(Template.instance().gestiont.get());
        var per = Number(Template.instance().periodot.get());
        console.log(id+" "+ges+" "+per);
        
        res = progra.find({alumno_id:id, gestion_id:ges, periodo_id:per, metodo_programacion:"ESPECIAL"});

        //res = progra.find({alumno_id: id ,dateInsert: {$gte: new Date(ges, 1, 1), $lt: new Date(ges, 12, 31)} });
        return res;
    }
});
