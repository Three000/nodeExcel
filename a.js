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
let counts = 2 / 0.5;
//配置信息
let mapInfo = {
    driver: {
        title: '积分',
        key: 'onload_performance_cache_driverScoreStore_appIndex',
        obj: 　{}
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
            console.log(arr);
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


class computed {
    constructor(data) {
        this.initData = data;
    }
}




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