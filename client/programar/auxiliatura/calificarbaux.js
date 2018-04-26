Template.calificarbaux.onCreated(function(){
    this.gestion = new ReactiveVar(FlowRouter.getParam('ges'));
    this.periodo = new ReactiveVar(FlowRouter.getParam('peri'))
    this.materia = new ReactiveVar(FlowRouter.getParam('mat'));
    this.ru = new ReactiveVar(FlowRouter.getParam('ru'));
    this.postulante = new ReactiveVar({});
    self=this;
    self.autorun(function(){
        user = Meteor.user();
        if(!user){
            return
        }
        Meteor.subscribe('postulantebaux', self.gestion.get(), self.materia.get(), self.ru.get(), self.periodo.get());
        Meteor.call('getPostulanteAux',user.profile.carrera ,self.gestion.get() ,self.materia.get() ,self.ru.get() ,(error, result)=>{
            return self.postulante.set(result.rows[0]);
        });
    });
});

Template.calificarbaux.helpers({
    gestion: function() {
        return Template.instance().gestion.get();
    },
    periodo: function(){
        return Template.instance().periodo.get();
    },
    materia: function() {
        return Template.instance().materia.get();
    },
    ru: function() {
        return Template.instance().ru.get();
    },
    existeMongo: function(){
        if(postulantesaux.find({}).count()>0)
            return true
        else
            return false
    },
    docMongo(){
        return postulantesaux.findOne();
    }
});

AutoForm.hooks({
    postaux:{
        onSuccess: function(formType, result){
            FlowRouter.go('listmathab');
        }
    }
});