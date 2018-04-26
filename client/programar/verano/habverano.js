Template.habverano.onCreated(function(){
    this.gestion = new ReactiveVar(2017);
    this.materiasv = new ReactiveVar([]); 
    this.prograactual = new ReactiveVar(0);
    self=this;
    self.autorun(function(){
        user = Meteor.user()
        if(!user){
            return
        }
        Meteor.call('getProgramaActual', user.profile.carrera, (error, result)=>{
            return self.prograactual.set(Number(result.rows[0].id_plan));
        });
        Meteor.call('getMateriasVerano', user.profile.carrera, self.prograactual.get(), self.gestion.get(), (error, result)=>{
            return self.materiasv.set(result.rows);
        });
    });
});

Template.habverano.helpers({
    materiasv: function(){
        return Template.instance().materiasv.get();
    },
    docentes: function(){
        return Template.instance().docentes.get();
    },
    indexre: function(re){
        return re + 1;
    },
    gestion: function(){
        return Template.instance().gestion.get();
    }
});