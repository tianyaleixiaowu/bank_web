
layui.use(['layer'], function () {
    //Url = 'http://localhost:8888/';
     Url = 'http://dp.tianyalei.com/bank/';
    storage = window.localStorage;

    var $ = layui.jquery;
    $(function () {
        // 设置jQuery Ajax全局的参数
        $.ajaxSetup({
            complete: function (jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case(500):
                        layer.msg("服务器系统内部错误");
                        break;
                    case(401):
                        layer.msg("未登录");
                        window.top.location.href = "/page/login/login.html";
                        break;
                    case(403):
                        layer.msg("无权限执行此操作");
                        break;
                    case(408):
                        layer.msg("请求超时");
                        break;
                    case(0):
                        break;
                    case(200):
                        break;
                    default:
                        layer.msg("未知错误，code是" + jqXHR.status);
                }
            }
        });
    });
});
