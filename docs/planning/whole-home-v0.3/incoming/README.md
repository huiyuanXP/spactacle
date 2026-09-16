# 原始文档包上传位置

只需上传一个原始文件，不需要逐张传图。

目标绝对路径：

```text
/home/ubuntu/aws-hackthon/renovation-consultation/docs/planning/whole-home-v0.3/incoming/ROOMNOTE_WholeHome_Documents.zip
```

使用已有SSH/SFTP连接上传，保持文件名不变。不要把MCP域名当作SSH地址，不需要复制密钥到聊天、开放新端口或修改生产服务。此目录当前仅有本说明，没有ZIP。

预期大小：35,707,496 bytes。预期SHA256：

```text
a505d4de4df08ef3813211f756582c6f832b3886fe04581167696163aabf6167
```

上传后先按上级`SOURCE-MANIFEST.json`核验；检查包成员不含绝对路径、目录穿越或符号链接，再隔离解包。原ZIP包含根`ROOMNOTE_WholeHome/`及51文件，应补齐上级`package/`；遇到已存在文件先比对，不同则停止，不覆盖已有修改。所有36PNG、3PDF、HTML与11文本都存在且逐项匹配后，才能将`IMPORT-STATUS.json`改为完整。

本说明不是自动执行脚本，不授予产品部署、文档公开发布或任务验收权限。
