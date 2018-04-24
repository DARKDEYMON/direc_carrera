Template.listmathab.onCreated(function(){
    this.materiashab = new ReactiveVar([]);
    this.gestion = new ReactiveVar(new Date().getFullYear());
    self = this;
    self.autorun(function(){
        user = Meteor.user();
        if(!user){
            return;
        }
        Meteor.call('getMateriasHabAux', user.profile.carrera, self.gestion.get(),(error, result)=>{
            return self.materiashab.set(result.rows);
        });
    });
});

Template.listmathab.helpers({
    materiashab: function() {
        return Template.instance().materiashab.get();
    },
    indexre: function(re){
        return re + 1;
    },
    gestion: function(){
        return Template.instance().gestion.get();
    }
});

Template.listmathab.events({ 
    'change .gest': function(event, template) { 
        var gestion = Number(document.getElementById("gestion").value);
        Template.instance().gestion.set(gestion);
        return;
    } 
});