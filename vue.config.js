module.exports = {
    //打包配置
    publicPath: './',
    //全局样式
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                  @import "@/style/theme.scss";
                `
            }
        }
    }
}