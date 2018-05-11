layui.use(['form','layer','laydate'],function(){
    var form = layui.form
        layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        $ = layui.jquery;

    form.on("submit(addMoBill)", function (data) {
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});
        // 实际使用时的提交信息
        $.ajax({
            type: 'post',
            url: Url + "mohu",
            headers: {token: storage.getItem("token")},
            data: {
                type: $("#type").val(),  //期限
                bank: $("#bank").val(),  //银行名
                billPrice: $("#billPrice").val(),
                count: $("#count").val(),  //数量
                price: $("#price").val(),    //价格
                endTime: $("#endTime").val(),    //到期日
                nickName: $("#nickName").val(),    //发布人
                company: $("#company").val(),    //公司名
                mobile: $("#mobile").val(),    //手机号
                content: $("#content").val(),    //备注
                id: $("#id").val()
            },
            success: function (res) {
                layer.msg("添加成功");
            }

        });
        setTimeout(function () {
            top.layer.close(index);
            top.layer.msg("信息添加成功！");
            layer.closeAll("iframe");
            //刷新父页面
            parent.location.reload();
        }, 500);
        return false;
    })
})