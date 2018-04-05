
Template.programarespecial.onCreated(function(){
    this.resMallaId = new ReactiveVar(2016);
    this.resMateriaProgra = new ReactiveVar([]);
    this.gestionb = new ReactiveVar(false);

    this.gestion = new ReactiveVar('2018');
    this.periodo = new ReactiveVar('1');

    var self = this;
    this.id = FlowRouter.getParam('id');
    self.autorun(function() { 
        self.subscribe('materias');
        self.subscribe('progra');
        Meteor.call('getMateriasFaltantes',self.resMallaId.get() ,self.id ,(error, result)=>{
            //console.log(result.rows);
            return self.resMateriaProgra.set(result.rows);
        });
    });
});

Template.programarespecial.helpers({

    idAlumno: function(){
        return FlowRouter.getParam('id');
    },
    getOptions: function() {
        var cursor = Template.instance().resMateriaProgra.get();
        //console.log(cursor);

        return cursor.map(function(doc){
            return {label: doc.r_materia, value: doc.r_id_materia};
        });
    },
    getOptionGroups: function(){
        dat = [{val:1},{val:2},{val:3},{val:4},{val:5},{val:6},{val:7},{val:8}]

        return _.map(dat,function(dat){
            return { label: dat.val , value: dat.val };
        });
    },
    getInitYear : function(){
        return new Date().getFullYear();
    },
    gestionChange : function(){
        return Template.instance().gestionb.get();
    }
});

Template.programarespecial.events({
    'submit .gest': function(event, template){
        event.preventDefault();
        event.stopPropagation();

        gestion = event.target.gestion.value.trim();
        Template.instance().gestion.set(gestion);
        //console.log(gestion);
        
        periodo = event.target.periodo.value.trim();
        Template.instance().periodo.set(periodo);

        var id = FlowRouter.getParam('id');
        console.log(id);
        Template.instance().gestionb.set(true);
    },
    'change .gest':function(event, template){
        Template.instance().gestionb.set(false);
    }
});