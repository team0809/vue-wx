## confirm 用法说明 ##

    ```
    this.$confirm(
        {
            title: '标题标题标题', // 标题
            contant: '啥玩意' // 内容可图片或者自定义内容
        }
    ).then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
    ```
## 参数 ##

    | 参数名字 | 类型 | 值 |
    | ------  | ------ | ------ |
    | title | 标题内容 | |
    | contant   | 展示内容 | 可自定义配置 可加入html|
