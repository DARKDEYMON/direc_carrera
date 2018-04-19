
Template.reproprogramarespecialof.onCreated(function(){
    this.showform = new ReactiveVar(false);
    this.resultReProgra = new ReactiveVar([]);
    this.gestiont = new ReactiveVar();
    this.periodot = new ReactiveVar();
    self = this;
    id = FlowRouter.getParam('id');

    /* arreder a instancia superior */
    //this.superior = this.view.parentView.parentView.templateInstance();
    this.gestiont.set(Template.currentData().gestion.toString());
    this.periodot.set(Template.currentData().periodo.toString());

    self.autorun(function(){
        self.subscribe('materias');
        self.subscribe('progra');
        Meteor.call('getMateriasReprogramacion',id ,self.gestiont.get() ,self.periodot.get() ,(error, result)=>{
            self.resultReProgra.set(result.rows);
        });
    });
});

Template.reproprogramarespecialof.helpers({
    dateFormat : function(date) {
        return moment(date).format('MM-DD-YYYY');
    },
    /* cambio de nombre de foranes */
    nombreMateria : function(id){
        //console.log(id);
        return ReactiveMethod.call('getMateria',id).rows[0].materia;
    },
    nombreSigla : function(id){
        //console.log(id);
        return ReactiveMethod.call('getMateria',id).rows[0].sigla;
    },

    /* materiasd q tiene programadas */
    materiasProgra : function() {
        //vista = Template.parentData();
        var id = FlowRouter.getParam('id').toString();
        var ges = Number(Template.instance().gestiont.get());
        var per = Number(Template.instance().periodot.get());
        console.log(id+" "+ges+" "+per);
        
        res = progra.find({alumno_id:id, gestion_id:ges, periodo_id:per, metodo_programacion:"ESPECIAL"});
        //res = progra.find({alumno_id: id ,dateInsert: {$gte: new Date(ges, 1, 1), $lt: new Date(ges, 12, 31)} });
        //console.log(res);
        return res;
    },
    docUpdate : function(){
        //b = FlowRouter.getParam('id').toString();
        c = progra.findOne({_id:this._id});
        return c;
    },
    getOptions : function() {
        var cursor = Template.instance().resultReProgra.get();
        return cursor.map(function(doc){
            return {label: doc.r_materia, value: doc.r_id_materia};
        });
    },
    showform : function(){
        return Template.instance().showform.get('showform');
    },
});

Template.reproprogramarespecialof.events({
    'click .myButton' : function(event, template) {
        if(Template.instance().showform.get()){
            template.showform.set(false);
        }
        else{
            template.showform.set(true);
        }
    },
});