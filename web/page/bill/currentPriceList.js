layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        table = layui.table;

    layui.use('laydate', function () {
        //执行一个laydate实例
        laydate.render({
            elem: '#end' //指定元素
        });
        laydate.render({
            elem: '#begin' //指定元素
        });
    });

    //列表
    var tableIns = table.render({
        elem: '#billList',
        url: Url + "/current",
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 15,
        limits: [10, 15, 20, 25],
        id: "billListTable",
        headers: {token: storage.getItem("token")},
        cols: [[
            {field: 'id', title: 'ID', width: 80, align: "center"},
            {field: 'billPrice', title: '票面价格（万元）', width: 180, align: 'center', templet: function (d) {
                    return d.billPrice + "万"
                }
            },
            {field: 'price', title: '参考价格(元)', width: 180, align: 'center', templet: function (d) {
                    return d.price + "元"
                }
            },
            {
                field: 'buildTime', title: '日期', align: 'center', width: 110, templet: function (d) {
                    if (d.buildTime.length >= 10) {
                        return d.buildTime.substring(0, 10);
                    } else {
                        return d.buildTime;
                    }
                }
            },
            {
                field: 'bankType', title: '时间', align: 'center', width: 160, templet: function (d) {
                    if (d.bankType == "1") {
                        return "国股";
                    } else if (d.bankType == "2") {
                        return "城商";
                    } else if (d.bankType == "3") {
                        return "三农";
                    }
                }
            }
        ]],
        request: {
            //每页数据量的参数名，默认：limit
            limitName: 'size'
        },
        response: {
            statusCode: 200 //成功的状态码，默认：0
            , msgName: 'message' //状态信息的字段名称，默认：msg
        }

    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function () {
        table.reload("billListTable", {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: {
                begin: $("#begin").val(),
                end: $("#end").val()
            }
        })
    });

});