Template.habveranodocente.onCreated(function(){
    this.docentes = new ReactiveVar([]);
    this.materia = new ReactiveVar(FlowRouter.getParam('mat'));
    this.gestion = new ReactiveVar(FlowRouter.getParam('ges'));
    self=this;
    self.autorun(function(){
        user = Meteor.user()
        if(!user){
            return
        }
        Meteor.call('getDocentesVerano', user.profile.carrera, (error, result)=>{
            return self.docentes.set(result.rows);
        });
    });
});

Template.habveranodocente.helpers({
    docentes: function() {
        return Template.instance().docentes.get().map(function(dat){
            return {label: dat.nombres+" "+dat.paterno+" "+dat.materno ,value: dat.id_docente };
        });
    },
    materia: function(){
        return Template.instance().materia.get();
    },
    gestion: function(){
        return Template.instance().gestion.get();
    }
});