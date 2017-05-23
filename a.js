'use strict'
var xlsx = require('node-xlsx');
var fs = require('fs');



const excel = xlsx.parse('./performance/lib/20170522.xlsx');

//表名
// const sheetName = excel.SheetNames;
//excel内容
// let sheet = (sub) => {
//     return excel.Sheets[sheetName[sub]]
// }

// console.log(excel[0]);

//设置时间
const counts = 2 / 0.5;
//配置信息
let mapInfo = {
    driver: {
        title: '积分FromCache',
        key: 'onload_performance_cache_driverScoreStore_appIndex',
        obj: 　{}
    },
    driverRequest: {
        title: '积分FromRequest',
        key: 'onload_performance_request_driverScoreStore_appIndex',
        obj: {}
    },
    consignorInsuranceCache: {
        title: '保险FromCache',
        key: 'onload_performance_cache_consignorInsurance_insuranceIndex',
        obj: {}
    },
    consignorInsuranceRequest: {
        title: '保险FromRequest',
        key: 'onload_performance_request_consignorInsurance_insuranceIndex',
        obj: {}
    }
}



let data = [];
excel.map((item, index) => {
    item.data.map((e, i) => {
        if (e[1] == mapInfo.driver.key) {
            //时间计算个数
            if (!mapInfo.driver.obj[e[2]]) {
                mapInfo.driver.obj[e[2]] = [];
            };
            let arr = mapInfo.driver.obj[e[2]];
            e.map((m, n) => {
                if (n > 2) {
                    if (arr[n - 3] || arr[n - 3] == 0) {
                        arr[n - 3] += parseInt(m);
                    } else {
                        m && arr.push(parseInt(m));
                    }
                }
            })

        }
    })
})


class Computed {
    constructor(data, counts) {
        this.initData = data;
        this.counts = counts;
        this.result = {
            duration: []
        };
    }
    addArr(arr, a) {
        var d = 0
        for (var i = (a * this.counts), ii = (a + 1) * this.counts; i < ii; i++) {
            arr[i] && (d += arr[i])
        }
        return d;
    }
    renderHeader() {
        var txt = '';
        var length = this.initData.onloadnative.length;
        for (var i = 0, ii = (length / this.counts > 1 ? length / this.counts + 1 : length / this.counts); i < ii; i++) {
            txt = (i * this.counts) + 's~' + ((i + 1) * this.counts) + 's';
            this.result.duration.push(txt)
        }
    }
    renderBody() {
        var data = this.initData;
        for (var key in data) {
            this.result[key] = []
            for (var i = 0, ii = (data[key].length / this.counts > 1 ? data[key].length / this.counts + 1 : data[key].length / this.counts); i < ii; i++) {
                this.result[key].push(this.addArr(data[key], i));
            }
        }
        console.log(this.result);
    }
    getResult() {
        this.renderHeader();
        this.renderBody();
    }
}
var a = new Computed(mapInfo.driver.obj, counts);
a.getResult();




// // 构建 workbook 对象
// var wb = {
//     SheetNames: ['mySheet'],
//     Sheets: {
//         'mySheet': excel.Sheets[sheetName[0]]
//     }
// };

// 导出 Excel
// xlsx.writeFile(wb, 'output.xlsx');

// var buffer = xlsx.build([{ name: "mySheetName", data: data }]);
fs.writeFileSync('eq.json', JSON.stringify(mapInfo), 'binary');
console.log('export successfully!');