# Postman接口文档生成工具

```
postman-collection.json -> // NodeJS
api-document.md -> // Pandoc
api-document.html -> // Pandoc
api-document.docx
```

## Postman Collection文件结构
![postman](http://static.whohow.cc/images/postman-to-docx-document/postman.png)
```javascript
{
  "id" : "", // 集合（文档）ID
  "name" : "", // 集合（文档）名称
  "description" : "", // 集合（文档）描述，Markdown格式
  "folders" : [
    {
      "id" : "", // 目录（模块）ID
      "name" : "", // 目录（模块）名称
      "description" : "",  // 目录（模块）描述
      "order" : [
        "", // 接口ID
        ""
      ]
    }
  ],
  "requests" : [
    {
      "id" : "", // 接口ID
      "headers" : "", // HTTP Headers
      "url" : "", // HTTP URL
      "method" : "", // HTTP Method
      "data" : "", // 示例数据
      "name" : "", // 接口名称
      "description" : "" // 接口描述
    }
  ]
}
```
![a.json](http://static.whohow.cc/images/postman-to-docx-document/a-json.png)

## 解析Collection，生成Markdown文档
接口文档布局，分三级：
```markdown
# Collection Name(文档名称)
Collection Description(文档描述)
## Folder Name(模块名称)
Folder Description(模块描述)
### Request Name(接口名称)
"Request Method" "Request Url"
"Request Headers"
Request Description(接口描述)
```

使用NodeJS完成解析并生成文档
```shell
$ node postman2md.js
```
![a.md](http://static.whohow.cc/images/postman-to-docx-document/a-md.png)

## 将Markdown文档转为Word文档

将Markdown文档转换为Word文档使用的是[Pandoc](http://pandoc.org/)。直接转换样式上有些问题，所以先转为HTML，再转为docx。

```shell
$ pandoc -f markdown_github -t html a.md | pandoc -f html -t docx -o a.docx
```
![a.docx](http://static.whohow.cc/images/postman-to-docx-document/a-docx.png)