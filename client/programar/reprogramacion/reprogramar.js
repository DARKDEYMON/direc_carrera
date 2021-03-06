Template.reprogramar.onCreated(function(){
    var self = this;
    self.autorun(function(){ 
        self.subscribe('materias');
        self.subscribe('progra');
    });
    this.showform = new ReactiveVar( false );
});


Template.reprogramar.helpers({
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
    /*
    idTipoProgramacion: function(){
        dir = FlowRouter.current().route.name;
        //console.log(dir);
        if(dir == "reprogramacion")
            return "REPROGRAMACION";
        return "DESCONOSIDO";
    }
    */
});

Template.reprogramar.events({ 
    'click .myButton': function(event, template) {

        if(Template.instance().showform.get()){
            template.showform.set(false);
        }
        else{
            template.showform.set(true);
        }
        //console.log(Template.instance().showform.get());
        //Session.set('editMode',!Session.get('editMode'));
        //console.log(Session.get('editMode'));
    }
});