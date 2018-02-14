
FlowRouter.route('/',{
    name:'home',
    action(){
        BlazeLayout.render("main")
    }
});

FlowRouter.route('/insertar/:id',{
    name:'progra',
    action(){
        BlazeLayout.render("programar")
    }
});

/* solo uno */
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

/* real */
FlowRouter.route('/reprogramacion/:id',{
    name:'reprogramacion',
    action(){
        BlazeLayout.render("reprogramar")
    }
});
/* aqui */