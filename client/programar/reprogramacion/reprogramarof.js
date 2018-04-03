import { Promise } from 'meteor/promise';

Template.programarofof.onCreated(function(){
    this.showform = new ReactiveVar(false);
    this.resultReProgra = new ReactiveVar([]);
    this.gestiont = new ReactiveVar();
    this.periodot = new ReactiveVar();
    self = this;
    id = FlowRouter.getParam('id');

    /* arreder a instancia superior */
    superior = this.view.parentView.parentView.templateInstance();
    this.gestiont.set(superior.gestion.get())
    this.periodot.set(superior.periodo.get())
    //console.log(superior.gestion.get());

    self.autorun(function(){
        self.subscribe('materias');
        self.subscribe('progra');
        Meteor.call('getMateriasReprogramacion',id ,superior.gestion.get() ,superior.periodo.get() ,(error, result)=>{
            //console.log(result.rows);
            self.resultReProgra.set(result.rows);
        });
    });
});

Template.programarofof.helpers({
    dateFormat : function(date) {
        return moment(date).format('MM-DD-YYYY');
    },
    /* cambio de nombre de foranes */
    nombreMateria : function(id){

        res = ReactiveMethod.call('getMateria',id).rows[0].materia;
        //console.log(res);
        return res
        
        /*
        resu = await( new Promise((resolve, reject) => {
            Meteor.call('getMateria',id, (error, result) => {
              if (error) reject(error);
              resolve(result.rows[0].materia);
            });
          })
        )
        console.log(resu);
        return resu;
        */
        
    },
    nombreSigla : function(id){
        res = ReactiveMethod.call('getMateria',id).rows[0].sigla;
        //console.log(res);
        return res
    },

    /* materiasd q tiene programadas */
    materiasProgra : function() {
        var id = FlowRouter.getParam('id').toString();
        var ges = Number(Template.instance().gestiont.get());
        var per = Number(Template.instance().periodot.get());
        console.log(id+" "+ges+" "+per);
        
        res = progra.find({alumno_id:id, gestion_id:ges, periodo_id:per});
        //console.log(res)

        //res = progra.find({alumno_id: id ,dateInsert: {$gte: new Date(ges, 1, 1), $lt: new Date(ges, 12, 31)} });
        //console.log(res);
        return res;
    },
    docUpdate : function(){
        //b = FlowRouter.getParam('id').toString();
        c = progra.findOne({_id:this._id});
        //console.log(c);
        return c;
    },
    getOptions : function() {
        var cursor = Template.instance().resultReProgra.get();
        //console.log(cursor);
        return cursor.map(function(doc){
            return {label: doc.r_materia, value: doc.r_id_materia};
        });
    },
    showform : function(){
        //console.log(Template.instance().showform.get('showform')+"aqui");
        return Template.instance().showform.get('showform');
    },
});

Template.programarofof.events({ 
    'click .myButton' : function(event, template) {
        if(Template.instance().showform.get()){
            template.showform.set(false);
        }
        else{
            template.showform.set(true);
        }
    },
});