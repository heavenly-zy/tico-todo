# tico-todo

> 一个基于文件的命令行 todo 应用

![demo](https://github.com/heavenly-zy/tico-todo/blob/main/demo.gif)

说明：该应用会在当前用户的`home`目录下创建一个名为`.todo_db`的文件来存储数据。

## 使用

1. 全局安装

   ``` bash
   # npm
   npm install tico-todo -g

   # yarn
   yarn global tico-todo
   ```

2. 用法

   - 查看所有可用命令
      ```bash
      t -h
      ```
   - 查看当前任务列表
      ```bash
      t
      ```
   - 添加一个任务
      ```bash
      t add <taskName>
      ```
   - 清空任务
      ```bash
      t clear
      ```

## 开发

1. 克隆本仓库

   ``` bash
   git clone git@github.com:heavenly-zy/tico-todo.git
   ```

2. 安装依赖

   ```bash
   cd tico-todo
   yarn install
   ```