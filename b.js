var xlsx = require('node-xlsx');
var csv = require('csv');

var list = xlsx.parse('query_result1.xls');
// var workbook = xlsx.readFile()

var http = require('http');

var request = require('request');

var rp = require('request-promise');

var arr = [],
    obj = {},
    objIp = {},
    load = [],
    loadTime = 0,
    date = '',
    values = {};

//改变读取工作薄
var dataList = list[3].data;

var fs = require('fs');

var excelPort = require('excel-export');
// exports.write = function(req, res, next){
var datas = [];
var conf = {};
var filename = 'result'; //只支持字母和数字命名


var _date = function(d) {
    var _d = new Date(d);
    // return _d.getFullYear() + '-' + ( _d.getMonth() + 1 ) + '-';
    return (_d.getMonth() + 1) + '-' + _d.getDate();
}


var title = dataList[0][0].replace(/region_/g, '');
var arr = [];
var newArr = [];
var array = [];

var one = '0_2s';
var two = '2s_5s';
var three = '5s+';

var week = {};
week[one] = 0;
week[two] = 0;
week[three] = 0;

conf.cols = [
    { caption: '日期' },
    { caption: one },
    { caption: two },
    { caption: three }
];

var addArr = function(arr, a, b) {
    var d = 0;
    for (var i = a; i <= b; i++) {
        d += (arr[i] - 0)
    }
    return d;
}


for (var i = 1, ii = dataList.length; i < ii; i++) {

    arr = dataList[i];

    if (arr.length && arr[2].indexOf('onloadnative') == 0) {

        newArr = [];

        newArr.push(_date(arr[0])); //date

        newArr.push(addArr(arr, 3, 6)); //0-2
        newArr.push(addArr(arr, 7, 12)); //2-5
        newArr.push(addArr(arr, 13, 23)); //5+

        array.push(newArr);

        week[one] += (newArr[1] - 0);
        week[two] += parseInt(newArr[2]);
        week[three] += parseInt(newArr[3]);


        console.log(newArr.join(','))
    }
}

console.log(week)

// conf.rows = array;
// var result = excelPort.execute(conf);

// var filePath = filename + ".xls";

// fs.writeFile(filePath, result, 'binary',function(err){
//     if(err){
//         console.log(err);
//     }
// });

return;