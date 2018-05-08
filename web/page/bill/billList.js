layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#billList',
        url: Url,
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 15,
        limits: [10, 15, 20, 25],
        id: "billListTable",
        cols: [[
            {type: "checkbox", fixed: "left", width: 50},
            {field: 'id', title: 'ID', width: 80, align: "center"},
            {field: 'type', title: '期限', width: 80},
            {field: 'bank', title: '银行',  width: 100, align: 'center'},
            {field: 'billPrice', title: '票面（万元）',  width: 120, align: 'center'},
            {
                field: 'endTime', title: '到期日', align: 'center', width: 110, templet: function (d) {
                    if (d.endTime.length>=10) {
                        return d.endTime.substring(0, 10);
                    } else {
                        return d.endTime;
                    }
                }
            },
            {field: 'count', title: '数量',  width: 60, align: 'center'},
            {field: 'price', title: '价格(元)',  width: 80, align: 'center'},
            {field: 'content', title: '备注',  minWidth: 200, align: 'center'},
            {field: 'mobile', title: '手机号',  minWidth: 200, align: 'center'},
            {field: 'company', title: '公司',  minWidth: 200, align: 'center'},
            {field: 'nickName', title: '联系人', minWidth: 200, align: 'center'},
            {title: '操作', width: 170, templet: '#newsListBar', fixed: "right", align: "center"}
        ]],
        request: {
            //每页数据量的参数名，默认：limit
            limitName: 'size'
        },
        where: {
            keywords: ""
        },
        response: {
            statusCode: 200 //成功的状态码，默认：0
            , msgName: 'message' //状态信息的字段名称，默认：msg
        }
    });

    table.on('edit(billList)', function (obj) { //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
        var field = obj.field;
        var value = obj.value;
        layer.msg(obj.data)
        if ('billPrice') 
        console.log(obj.value); //得到修改后的值
        console.log(obj.field); //当前编辑的字段名
        console.log(obj.data); //所在行的所有相关数据
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function () {
        table.reload("billListTable", {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: {
                //搜索的关键字
                keywords: $(".searchVal").val(),
                type: $(".type").val(),
                bankType: $(".bankType").val(),
                billPrice: $(".billPrice").val()
            }})
    });

    //添加信息
    function addNews(edit) {
        var index = layui.layer.open({
            title: "添加信息",
            type: 2,
            content: "billAdd.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (edit) {
                    if ("短期" == edit.type) {
                        body.find("#type").val("1");
                    } else if ("半年" == edit.type) {
                        body.find("#type").val("2");
                    } else if ("一年" == edit.type) {
                        body.find("#type").val("3");
                    } else if ("超期" == edit.type) {
                        body.find("#type").val("4");
                    }
                    body.find("#bank").val(edit.bank);
                    body.find("#billPrice").val(edit.billPrice);
                    body.find("#count").val(edit.count);
                    body.find("#price").val(edit.price);
                    if ("未知" == edit.endTime) {
                        body.find("#endTime").val("");
                    } else {
                        body.find("#endTime").val(edit.endTime);
                    }
                    body.find("#nickName").val(edit.nickName);
                    body.find("#company").val(edit.company);
                    body.find("#mobile").val(edit.mobile);
                    body.find("#content").val(edit.content);
                    body.find("#id").val(edit.id);
                    form.render();
                }
                setTimeout(function () {
                    layui.layer.tips('点击此处返回列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        })
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(index);
        })
    }

    //添加信息
    function addMoNews() {
        var index = layui.layer.open({
            title: "添加信息",
            type: 2,
            content: "billMoAdd.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                setTimeout(function () {
                    layui.layer.tips('点击此处返回列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        })
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(index);
        })
    }

    $(".addNews_btn").click(function () {
        addNews();
    })

    $(".addMohu_btn").click(function () {
        addMoNews();
    })

    //批量删除
    $(".delAll_btn").click(function () {
        var checkStatus = table.checkStatus('newsListTable'),
            data = checkStatus.data,
            newsId = [];
        if (data.length > 0) {
            for (var i in data) {
                newsId.push(data[i].newsId);
            }
            layer.confirm('确定删除选中的文章？', {icon: 3, title: '提示信息'}, function (index) {
                // $.get("删除文章接口",{
                //     newsId : newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                tableIns.reload();
                layer.close(index);
                // })
            })
        } else {
            layer.msg("请选择需要删除的文章");
        }
    })

    //列表操作
    table.on('tool(billList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            addNews(data);
        } else if (layEvent === 'del') { //删除

            layer.confirm('确定删除此记录？', {icon: 3, title: '提示信息'}, function (index) {
                layer.msg(data.id)
                 $.post(Url + data.id, {
                       //将需要删除的newsId作为参数传入
                 },function(data){
                    tableIns.reload();
                    layer.close(index);
                })
            });
        }
    });

})