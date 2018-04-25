Template.listhabaux.onCreated(function(){
    this.gestion = new ReactiveVar(FlowRouter.getParam('ges'));
    this.materiaid = new ReactiveVar(FlowRouter.getParam('matid'));
    this.postulantes = new ReactiveVar([]);
    self = this;
    self.autorun(function(){
        user = Meteor.user();
        if(!user){
            return
        }
        Meteor.call('getPostulantesAux', user.profile.carrera, self.gestion.get(), self.materiaid.get(), (error, result)=>{
            return self.postulantes.set(result.rows);
        });
    });
});

Template.listhabaux.helpers({
    postulantes: function(){
        return Template.instance().postulantes.get();
    },
    indexre: function(re){
        return re + 1;
    },
    estado: function(re){
        if(re==='A')
            return 'REGISTRADO'
        else
            return 'RECHAZADO'
    },
    gestion: function(){
        return Template.instance().gestion.get();
    },
});