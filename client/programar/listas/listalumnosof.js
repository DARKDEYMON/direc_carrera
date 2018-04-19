Template.lisalumof.onCreated(function(){
    this.more = new ReactiveVar(10);
    this.search = new ReactiveVar('');
    this.searchres = new ReactiveVar('');
    //this.carrera = new ReactiveVar();// .profile.carrera;
    self = this;
    console.log(Meteor.user());
    self.autorun(function(){
        const user = Meteor.user();
        if (!user) {
            return;
        }
        if(self.search.get()=='')
            Meteor.call('getAlumnosPgLimit',self.more.get() ,user.profile.carrera, (error,result)=>{
                self.searchres.set(result.rows);
            });
        else
            Meteor.call('getAlumnosPgLimitRu',self.search.get() ,self.more.get() ,user.profile.carrera ,(error, result)=>{
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
        Template.instance().search.set(search);
        Template.instance().more.set(10);
    },
    'click .action' : function(event, template){
        console.log(this);
    },
    'click #kardex' : function(event, template){
        var valor = event.target.attributes.getNamedItem("value").value;
        window.open("http://10.10.165.134:8080/pentaho/api/repos/:public:Steel%20Wheels:notas2.prpt/generatedContent?Ru="+valor+"&output-target=pageable/pdf&userid=admin&password=password")
    },
    'click #pensun' : function(event, template){
        var valor = event.target.attributes.getNamedItem("value").value;
        window.open("http://10.10.165.134:8080/pentaho/api/repos/:public:Steel%20Wheels:pensun.prpt/generatedContent?Ru="+valor+"&output-target=pageable/pdf&userid=admin&password=password")
    }
});