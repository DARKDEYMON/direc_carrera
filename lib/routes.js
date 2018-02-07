
FlowRouter.route('/',{
    name:'home',
    action(){
        BlazeLayout.render("main")
    }
});

FlowRouter.route('/insertar',{
    name:'progra',
    action(){
        BlazeLayout.render("programar")
    }
});