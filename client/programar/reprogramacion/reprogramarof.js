Template.programarofof.onCreated(function(){
    this.showform = new ReactiveVar(false);
    this.resultReProgra = new ReactiveVar([]);
    self = this;
    id = FlowRouter.getParam('id');

    /* arreder a instancia superior */
    superior = this.view.parentView.parentView.templateInstance();
    //console.log(superior.gestion.get());

    self.autorun(function(){
        Meteor.call('getMateriasReprogramacion',id ,superior.gestion.get() ,superior.periodo.get() ,(error, result)=>{
            console.log(result.rows);
            self.resultReProgra.set(result.rows);
        });
    });
});


Template.programarofof.helpers({
    /* cambio de nombre de foranes */
    nombreMateria : function(id){
        return materias.findOne({_id:id}).name;
    },
    nombreSigla : function(id){
        return materias.findOne({_id:id}).sigla;
    },
    /* materiasd q tiene programadas */
    materiasProgra : function() {
        var id = FlowRouter.getParam('id');
        res = progra.find({alumno_id:id}).fetch();
        //console.log(res);
        return res;
    },
    docUpdate : function(){
        //b = FlowRouter.getParam('id').toString();
        c = progra.findOne({_id:this._id});
        console.log(c);
        return c;
    },
    getOptions : function() {
        var cursor = materias.find({});
        //console.log(cursor);
        return cursor.map(function(doc){
            return {label: doc.sigla, value: doc._id};
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
    'submit .gest' : function(event, template) {
        console.log("aqui");
    }
});