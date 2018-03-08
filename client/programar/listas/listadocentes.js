

Template.listdocentes.onCreated(function(){
    var self = this;
    self.autorun(function() { 
        self.subscribe('docentes'); 
    });
});

Template.listdocentes.helpers({
    docenteIndex: () => docenteIndex,
    atrrSearch : function(){
        return {class:"form-control", placeholder:"Buscar..."};
    }
});