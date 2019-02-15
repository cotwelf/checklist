#!/usr/bin/python
# -*- coding: UTF-8 -*-
from flask import Flask, jsonify, request
import MySQLdb
import time
import json

app = Flask(__name__)


def workDay():
    return time.strftime("%w", time.localtime())+"00000======="


def openDb():
    # 打开数据库连接
    return MySQLdb.connect("localhost", "root", "812811926",
                           "checklist", charset='utf8')

    db = openDb()
    # 使用cursor()方法获取操作游标
    cursor = db.cursor()


@app.route('/get_todo_list', methods=['GET'])
def get_todo_list():
    try:
        user_id = request.args.get('user_id')
        p_id = request.args.get('p_id')
    except ZeroDivisionError, e:
        print e.message
    val = (user_id, '0')
    if(p_id):
        p_id_str = "and p_id =%s"
        val = (user_id, '0', p_id_str)
    else:
        p_id_str = ""

    db = openDb()
    cursor = db.cursor()

    # SQL 插入语句
    sql = "SELECT id,ver,name,p_id,status,total,done,per,level,type FROM plans WHERE user_id = %s and status=%s" + \
        p_id_str+" ORDER BY `level`"
    # 执行SQL语句
    print sql
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
    # print res
    return jsonify(res)
    db.close()


@app.route('/create_plan')
def create_plan():
    db = openDb()
    cursor = db.cursor()
    sql = "INSERT INTO plans(ver, name, p_id, total, done, per, level, status) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)"
    val = (1, 'Mohan', 20, 100, 55, 2, 1, 1)
    cursor.execute(sql, val)
    db.commit()
    return 1
    db.close()


@app.route('/update_plan', methods=['POST'])
def update_plan():
    db = openDb()
    cursor = db.cursor()
    data = json.loads(request.get_data())

    id = int(data['id'])

    finish = int(data['finish'])

    print type(id)
    print type(finish)
    # print type()
    sql = "update plans set done = (done + %s) where id =%s"
    val = (finish, id)
    cursor.execute(sql, val)
    db.commit()
    return 'ok'
    db.close()


@app.route('/get_project_list')
def get_project_lsit():
    db = openDb()
    cursor = db.cursor()
    sql = 'select id,name,end_at,created_at from projects where status = %s'
    val = (0,)
    cursor.execute(sql, val)
    results = cursor.fetchall()
    res = []
    for row in results:
        obj = {}
        obj['id'] = row[0]
        obj['name'] = row[1]
        obj['end_at'] = row[2]
        obj['created_at'] = str(row[3])
        res.append(obj)
    return jsonify(res)
    db.close()


if __name__ == '__main__':
    app.run()


print 'done'

# 关闭数据库连接
# db.close()
