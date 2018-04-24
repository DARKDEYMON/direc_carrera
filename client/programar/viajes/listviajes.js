Template.listviajes.onCreated(function(){
    this.viajes = new ReactiveVar([]);
    this.gestion = new ReactiveVar(2016);
    this.periodo = new ReactiveVar(1);
    self = this;
    self.autorun(function(){
        user = Meteor.user();
        if(!user){
            return;
        }
        Meteor.call('getViajes', user.profile.carrera, self.gestion.get(), self.periodo.get(), (error, result)=>{
            return self.viajes.set(result.rows);
        });
    });
});

Template.listviajes.helpers({
    viajes: function() {
        return Template.instance().viajes.get();
    },
    gestion: function(){
        return Template.instance().gestion.get();
    },
    periodo: function(){
        return Template.instance().periodo.get();
    },
    formatoFecha: function(dat){
        return moment(dat).format('MMM D, YYYY');
    },
    check(dat){
        if(dat==='T'||dat==='A')
            return 'checked';
        return '';
    }   
});

Template.listviajes.events({
    'change .gest': function(event, template){
        var gestion = Number(document.getElementById("gestion").value);
        Template.instance().gestion.set(gestion);
        var periodo = Number(document.getElementById("periodo").value);
        Template.instance().periodo.set(periodo);
        return;
    },
    'change #emp': function(event, template) {
        var est = event.target.checked ? 'A':'R';
        Meteor.call('updViageEm', this.id_viaje, est, (error, result)=>{
            //console.log(result)
        });
    },
    'change #apro': function(event, template){
        var est = event.target.checked ? 'T' :'F';
        Meteor.call('updViageDr', this.id_viaje, est, (error, result)=>{
            //console.log(result)
        });
    }
});