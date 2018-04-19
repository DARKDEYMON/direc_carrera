Template.listapos.onCreated(function(){
    this.listapos = new ReactiveVar([]);
    this.gestion = new ReactiveVar(new Date().getFullYear());
    self = this;
    self.autorun(function(){
        user = Meteor.user();
        if(!user){
            return
        }
        Meteor.call('getPostulantes', user.profile.carrera, self.gestion.get(), (error, result)=>{
            return self.listapos.set(result.rows);
        });
    });
});

Template.listapos.helpers({
    listapos: function() {
        return Template.instance().listapos.get();
    },
    gestion: function(){
        return Template.instance().gestion.get();
    },
    indexre: function(re){
        return re + 1;
    }
});

