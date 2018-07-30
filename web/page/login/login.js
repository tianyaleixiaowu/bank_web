layui.use(['form','layer','jquery'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;

    //登录按钮
    form.on("submit(login)",function(data){
        $(this).text("登录中...").attr("disabled","disabled").addClass("layui-disabled");

        $.ajax({
            type: 'POST',
            url: Url + "login",
            data: {
                'userName': $("#userName").val(),
                'password': $("#password").val()
            },
            dataType: 'json',
            success: function (data) {
                if (data.code == 200)  {
                    storage.setItem("token", data.token);
                    window.location.href = Prefix + "/index.html";
                }
                else {
                    $("#login").text("登录").attr("disabled", false).addClass("layui-btn");
                    layer.msg(data.message)
                }
            },
            error: function (xhr) {
                console.log(xhr);
            }
        });

        setTimeout(function(){

        },1000);
        return false;
    })

    

    //表单输入效果
    $(".loginBody .input-item").click(function(e){
        e.stopPropagation();
        $(this).addClass("layui-input-focus").find(".layui-input").focus();
    })
    $(".loginBody .layui-form-item .layui-input").focus(function(){
        $(this).parent().addClass("layui-input-focus");
    })
    $(".loginBody .layui-form-item .layui-input").blur(function(){
        $(this).parent().removeClass("layui-input-focus");
        if($(this).val() != ''){
            $(this).parent().addClass("layui-input-active");
        }else{
            $(this).parent().removeClass("layui-input-active");
        }
    })
})
