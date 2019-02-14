#!/usr/bin/python
# -*- coding: UTF-8 -*-
from flask import Flask, jsonify
import MySQLdb
import time

app = Flask(__name__)


def workDay():
    return time.strftime("%w", time.localtime())+"00000======="


# 打开数据库连接
db = MySQLdb.connect("localhost", "root", "812811926",
                     "checklist", charset='utf8')
# 使用cursor()方法获取操作游标
cursor = db.cursor()


@app.route('/get_todo_list')
def get_todo_list():

    # SQL 插入语句
    sql = "SELECT * FROM plans WHERE status=%s"
    val = ('0',)
    # 执行SQL语句
    cursor.execute(sql, val)
    # 获取所有记录列表
    results = cursor.fetchall()
    res = []
    for row in results:
        obj = {}
        obj['id'] = row[0]
        obj['ver'] = row[1]
        obj['name'] = row[2]
        obj['p_id'] = row[3]
        obj['status'] = row[4]
        obj['total'] = row[5]
        obj['done'] = row[6]
        obj['per'] = row[7]
        obj['level'] = row[8]
        print row[9] == 5
        if(row[9] == 1):
            if(workDay() == 6):
                res.append(obj)
        elif(row[9] == 6):
            if(workDay() != 7):
                res.append(obj)
        elif(row[9] == 5):
            if(workDay() != 6 or workDay() != 7):
                res.append(obj)
    print res
    return jsonify(res)


@app.route('/create_plan')
def create_plan():
    sql = "INSERT INTO plans(ver, name, p_id, total, done, per, level, status) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)"
    val = (1, 'Mohan', 20, 100, 55, 2, 1, 1)
    cursor.execute(sql, val)
    db.commit()
    return 1


@app.route('/update_plan')
def update_plan(id, per):
    sql = "update plans set done = (done + %s) where id =%s"
    val = (id, per)
    cursor.execute(sql, val)
    db.commit()
    return 1


if __name__ == '__main__':
    app.run()


print 'done'

# 关闭数据库连接
db.close()
