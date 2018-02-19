

Template.listalumnos.helpers({
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
    alumnoIndex: () => alumnoIndex,
    atrrSearch : function(){
        return {class:"form-control", placeholder:"Buscar..."};
    }
});

Template.listalumnos.events({ 
    'keyup .nombre': function(event, template) { 
        this.datSearch = event.target.value.trim();
        
        //alumno.find({name:/^rey/i}).fetch()
        console.log(this.datSearch);
        //Meteor._reload.reload();
    } 
});