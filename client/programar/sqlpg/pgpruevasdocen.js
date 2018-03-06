
Template.pgpruebasdocen.onCreated(function(){
    this.showSearch = new ReactiveVar( false );
    this.listAlum = new ReactiveVar([]);
    //console.log(this.dataSearch);
    Meteor.call('getDocentes', (error, result) => {
            //console.log(result.rows);
         this.listAlum.set(result.rows);
         this.showSearch.set( false );
    });
});

Template.pgpruebasdocen.helpers({
    docenPg() {
        return Template.instance().listAlum.get();
    },
    showSearch : function(){
        return Template.instance().showSearch.get('showSearch');
    },
});

Template.pgpruebasdocen.events({ 
    'click .myButton': function(event, template) {
        console.log(this.id_alumno);
    },
    'keyup .buscar': function(event, template){
        dataSearch = event.target.value.trim();

        if ( dataSearch !== '' && event.keyCode === 13 ){
            template.showSearch.set(true);
            Meteor.call('getAlumnosPgAlum', dataSearch , (error, result) => {
                console.log(result.rows);
                template.listAlum.set(result.rows);
                template.showSearch.set(false);
            });
        }
        //console.log(dataSearch);
    }
});