const homedir = require("os").homedir(); // nodejs get home directory
const home = process.env.HOME || homedir; // process.env.HOME 读取用户设置的环境变量作为 HOME 目录：nodejs get home variable，如果没有设置，则和系统默认目录保持一致
const fs = require("fs");
const p = require("path");
const dbPath = p.join(home, ".todo_db");

const db = {
	read(path = dbPath) {
		return new Promise((resolve, reject) => {
      // 参数 flag: a+ 表示：打开文件以进行读取和追加，如果文件不存在，则创建该文件。
			fs.readFile(path, { flag: "a+" }, (error, data) => {
				if (error) return reject(error);
				let list;
				try {
					list = JSON.parse(data.toString());
				} catch (error2) {
					list = [];
				}
				resolve(list);
			});
		});
	},
	write(list, path = dbPath) {
		return new Promise((resolve, reject) => {
			const string = JSON.stringify(list);
			fs.writeFile(path, string + "\n", (error) => {
				if (error) return reject(error);
				resolve();
			});
		});
	}
};

module.exports = db;