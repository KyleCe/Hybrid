﻿define([
    'BaseView',
    'text!PagePath/nativeui/tpl.layout.html',
    'text!StylePath/common.css'
], function (AbstractView,
             layoutHtml,
             commonStyle) {

    return _.inherit(AbstractView, {
        propertys: function ($super) {

            $super();
            var scope = this;

            this.template = layoutHtml;
            this.commonstyle = commonStyle;

            this.events = {
                'click .js-btn01': function () {

                    /*
                    关闭当前页面,回到native上一步操作
                     */
                    _.requestHybrid({
                        tagname: 'closeWindow'
                    });

                },
                'click .js-btn02': function () {

//唤起输入文字的软键盘
_.requestHybrid({
    tagname: 'showKeyboard',
    param: {
        //键盘按钮文案
        btnText: '确定',
        textMin: 20, //文字要求最少输入字符数
        textMax: 500 //文字要求最多输入字符数
    },
    //输入结束的回调或者说点击发送时候的回调
    callback: function (data) {
        var content = data.content;//文字内容
        scope.$('.js-val01').html(content);
    }
});

                },
                'click .js-btn03': function () {

/*
 获取网络状态
 */
_.requestHybrid({
    tagname: 'getNetworkType',
    callback: function(data) {
        //data.networkType 2g 3g 4g wifi
        scope.showToast(data.networkType);
    }
});

                },
                'click .js-btn04': function () {

//获取经纬度信息
_.requestHybrid({
    tagname: 'getLocation',
    callback: function(data) {
        var latitude = data.latitude; // 纬度，浮点数，范围为90 ~ -90
        var longitude = data.longitude; // 经度，浮点数，范围为180 ~ -180。
        var speed = data.speed; // 速度，以米/每秒计
        var accuracy = data.accuracy; // 位置精度

//根据经纬度等信息打开native地图
        _.requestHybrid({
            tagname: 'openLocation',
            params: {
                latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
                longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
                name: '你现在的位置', // 位置名
                address: '详细地址', // 地址详情说明
                scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: 'http://medlinker.com' // 在查看位置界面底部显示的超链接,可点击跳转
            }
        });

    }
});

                }
            };

        },

        initHeader: function () {
            var opts = {
                view: this,
                title: 'nativeUI Demo',
                back: function () {
                    this.back();
                }
            };
            this.header.set(opts);
        },

        initElement: function () {

        },

        addEvent: function ($super) {
            $super();

            this.on('onShow', function () {


            });
        }

    });

});
