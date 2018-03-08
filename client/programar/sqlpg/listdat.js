

Template.lisdatuatf.onCreated(function(){
    var self = this;
    self.autorun(function() { 
        self.subscribe('uatfdat'); 
    });
});

Template.lisdatuatf.helpers({
    /*
    alumnosQuery: function() {
        if(this.datSearch == undefined)
            return alumno.find({});
        else{
            regex = new RegExp( this.datSearch, 'i' );
            return alumno.find({name:regex});
        }
    },
    */
    uatfdatIndex: () => uatfdatIndex,
    atrrSearch : function(){
        return {class:"form-control", placeholder:"Buscar..."};
    }
});

Template.lisdatuatf.events({ 
    'keyup .nombre': function(event, template) { 
        this.datSearch = event.target.value.trim();
        
        //alumno.find({name:/^rey/i}).fetch()
        console.log(this.datSearch);
        //Meteor._reload.reload();
    } 
});