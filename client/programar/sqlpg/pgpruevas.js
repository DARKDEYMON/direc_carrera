Template.pgpruebas.onCreated(function(){
    this.listAlum = new ReactiveVar([]);
    Meteor.call('getAlumnosPg', (error, result) => {
        console.log(result.rows);
        this.listAlum.set(result.rows);
    });
});

Template.pgpruebas.helpers({
    alumPg() {
        return Template.instance().listAlum.get();
    },
});