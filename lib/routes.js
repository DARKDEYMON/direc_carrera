
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

FlowRouter.route('/pdfs',{
    name:'pdfgene',
    action(){
        BlazeLayout.render("pdfTemplate")
    }
});

FlowRouter.route('/isertasig/:id',{
    name:'isertasig',
    action(){
        BlazeLayout.render("inserAsigDct")
    }
});

/* real funcional */
FlowRouter.route('/reprogramacion/:id',{
    name:'reprogramacion',
    action(){
        BlazeLayout.render("reprogramar")
    }
});

FlowRouter.route('/alumnos/',{
    name:'listalum',
    action(){
        BlazeLayout.render("listalumnos")
    }
});

FlowRouter.route('/docentesasig/:id',{
    name:'docentesasig',
    action(){
        BlazeLayout.render("asignacionDct")
    }
});