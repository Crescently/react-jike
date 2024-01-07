const path = require("path");

//配置根目录别名
module.exports = {
    webpack: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
};