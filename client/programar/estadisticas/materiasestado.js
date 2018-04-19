Template.materiasestado.onCreated(function(){
    this.estadoMateria = new ReactiveVar([]);
    this.gestion = new ReactiveVar(2017);
    this.periodo = new ReactiveVar(1);
    self = this;
    self.autorun(function(){
        const user = Meteor.user();
        if (!user) {
            return;
        }
        Meteor.call('getMateriasEstado', self.gestion.get(), self.periodo.get(), user.profile.carrera, (error, result)=>{
            console.log(result);
            return self.estadoMateria.set(result.rows);
        });
    });
});

Template.materiasestado.helpers({
    eatadoMateria: function() {
        return Template.instance().estadoMateria.get();
    },
    gestion: function(){
        return Template.instance().gestion.get();
    },
    periodo: function(){
        return Template.instance().periodo.get();
    },
    indexre: function(re){
        return re + 1;
    },
    estadoExamen(can){
        return can>0? "Si/"+can :"No";
    }
});