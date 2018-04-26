Template.listapostulantes.onCreated(function(){
    this.gestion = new ReactiveVar(2018);
    this.periodo = new ReactiveVar(1);
    this.idexam = new ReactiveVar('');
    this.postulantes = new ReactiveVar([]);
    this.modosadmin = new ReactiveVar([]);
    self=this;
    self.autorun(function(){
        user = Meteor.user();
        if(!user){
            return
        }
        Meteor.call('getAlumAdmincion', user.profile.carrera, self.gestion.get(), self.periodo.get(), self.idexam.get(), (error, result)=>{
            return self.postulantes.set(result.rows);
        });
        Meteor.call('getTiposAdmicion', user.profile.carrera, self.gestion.get(), self.periodo.get(), (error, result)=>{
            //aqui
            console.log(result.rows)
            return self.modosadmin.set(result.rows);
        });
    });
});

Template.listapostulantes.helpers({
    postulantes: function() {
        return Template.instance().postulantes.get();
    },
    modosadmin: function(){
        return Template.instance().modosadmin.get();
    },
    gestion: function(){
        return Template.instance().gestion.get();
    },
    periodo: function(){
        return Template.instance().periodo.get();
    },
    indexre: function(re){
        return re + 1;
    }
});

Template.listapostulantes.events({ 
    'change .gest': function(event, template) {
        var gestion = Number(document.getElementById("gestion").value);
        Template.instance().gestion.set(gestion);
        var periodo = Number(document.getElementById("periodo").value);
        Template.instance().periodo.set(periodo);
        return;
    },
});