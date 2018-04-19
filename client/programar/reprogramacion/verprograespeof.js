Template.verprograespecial.onCreated(function(){
    this.gestionb = new ReactiveVar(false);

    this.gestion = new ReactiveVar('2018');
    this.periodo = new ReactiveVar('1');

    var self = this;
    this.id = FlowRouter.getParam('ru');
    console.log(this.id);
    self.autorun(function() {
        self.subscribe('progra');
    });
});

Template.verprograespecial.helpers({
    gestion:  function(){
        return Template.instance().gestion.get();
    },
    periodo: function(){
        return Template.instance().periodo.get();
    },
    idAlumno: function(){
        return FlowRouter.getParam('id');
    },

    getInitYear : function(){
        return new Date().getFullYear();
    },
    gestionChange : function(){
        return Template.instance().gestionb.get();
    }
});

Template.verprograespecial.events({
    'submit .gest': function(event, template){
        event.preventDefault();
        event.stopPropagation();

        gestion = event.target.gestion.value.trim();
        Template.instance().gestion.set(gestion);
        
        periodo = event.target.periodo.value.trim();
        Template.instance().periodo.set(periodo);

        var id = FlowRouter.getParam('id');

        Template.instance().gestionb.set(true);
    },
    'change .gest':function(event, template){
        Template.instance().gestionb.set(false);
    }
});