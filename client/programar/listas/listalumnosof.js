Template.lisalumof.onCreated(function(){
    this.more = new ReactiveVar(10);
    this.search = new ReactiveVar('');
    this.searchres = new ReactiveVar('');
    self = this;
    self.autorun(function(){
        if(self.search.get()=='')
            Meteor.call('getAlumnosPgLimit',self.more.get(),(error,result)=>{
                self.searchres.set(result.rows);
            });
        else
            Meteor.call('getAlumnosPgLimitRu',self.search.get() ,self.more.get() ,(error, result)=>{
                self.searchres.set(result.rows);
            });
    });
});

Template.lisalumof.helpers({
    alum : function() {
        //b = Template.instance().searchres.get();
        return Template.instance().searchres.get();
    },

    /* esto es ejemplo para el array temp */
    options : function() {
        b = Template.instance().searchres.get();
        return b.map(function(doc){
            return {label:doc.nombres,  value: doc.id_alumno}
        });
    }
    /* temp */
});

Template.lisalumof.events({
    'click .dispmore' : function(event, template) {
        res = Template.instance().more.get();
        Template.instance().more.set(res+10);
    },
    'keyup .search' : function(event, template){
        search = event.target.value.trim();
        //console.log(search)
        Template.instance().search.set(search);
        Template.instance().more.set(10);
    },
    'click .action' : function(event, template){
        console.log(this);
    },
    /*
    'keyup .gest' : function(event, template){
        gestion="2017";
        periodo="1";
        if(event.target.name=='gestion'){
            gestion = event.target.value.trim();
            console.log(event.target.value.trim());
        }
        if(event.target.name=='periodo'){
            periodo = event.target.value.trim();
            console.log(event.target.value.trim());
        }
    },
    */
});