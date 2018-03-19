
FlowRouter.route('/',{
    name:'home',
    action(){
        BlazeLayout.render("main")
    }
});
/* pruebas y demas */
FlowRouter.route('/insertar/:id',{
    name:'progra',
    action(){
        BlazeLayout.render("programar")
    }
});

/* --solo uno */
FlowRouter.route('/update/:id',{
    name:'prograupdate',
    action(){
        BlazeLayout.render("updateProgra")
    }
});

/* pdf */
FlowRouter.route('/pdfs',{
    name:'pdfgene',
    action(){
        BlazeLayout.render("pdfTemplate")
    }
});

FlowRouter.route('/kardexpdf/:id',{
    name:'kardexPdf',
    action(){
        BlazeLayout.render("kardexPdf")
    }
});

FlowRouter.route('/isertasig/:id',{
    name:'isertasig',
    action(){
        BlazeLayout.render("inserAsigDct")
    }
});
/* pgpruebas */
FlowRouter.route('/pgpruebas/',{
    name:'pgpruebas',
    action(){
        BlazeLayout.render("pgpruebas")
    }
});

FlowRouter.route('/pgpruebasdocen/',{
    name:'pgpruebasdocen',
    action(){
        BlazeLayout.render("pgpruebasdocen")
    }
});

FlowRouter.route('/lisdatuatf/',{
    name:'lisdatuatf',
    action(){
        BlazeLayout.render("lisdatuatf")
    }
});
FlowRouter.route('/listmore/',{
    name:'listmore',
    action(){
        BlazeLayout.render("main",{body:"alummore"})
    }
});
FlowRouter.route('/kardex/:ru',{
    name:'kardex',
    action(){
        BlazeLayout.render("main",{body:"kardex"})
    }
});

/* real funcional */
FlowRouter.route('/reprogramacion/:id',{
    name:'reprogramacion',
    action(){
        BlazeLayout.render("main",{body:"reprogramar"})
    }
});

FlowRouter.route('/alumnos/',{
    name:'listalum',
    action(){
        BlazeLayout.render("main",{body:"listalumnos"})
    }
});

FlowRouter.route('/docentesasig/:id',{
    name:'docentesasig',
    action(){
        BlazeLayout.render("main",{body:"asignacionDct"})
    }
});

FlowRouter.route('/docentes/',{
    name:'listdocentes',
    action(){
        BlazeLayout.render("main",{body:"listdocentes"})
    }
});

/* funsional re */
FlowRouter.route('/lisalumof/',{
    name:'lisalumof',
    action(){
        BlazeLayout.render("main",{body:"lisalumof"})
    }
});

FlowRouter.route('/programarof/:id',{
    name:'programarof',
    action(){
        BlazeLayout.render("main",{body:"programarof"})
    }
});