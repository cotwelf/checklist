#!/usr/bin/python
# -*- coding: UTF-8 -*-
from flask import Flask, jsonify, request
import MySQLdb
import time
import json
import datetime

app = Flask(__name__)
startTime = datetime.datetime.now().strftime('%Y-%m-%d 00:00:00')
endTime = datetime.datetime.now().strftime('%Y-%m-%d 23:59:59')


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
        status = request.args.get('status')

    except ZeroDivisionError, e:
        print e.message
    val = (startTime, endTime)
    # user_id
    if(user_id):
        user_id_str = "and p.user_id = %s"
        val = val + (user_id,)
    else:
        user_id_str = ""
    # P_id
    if(p_id):
        p_id_str = "and p_id =%s"
        val = val + (p_id,)
    else:
        p_id_str = ""

    # status
    if(status):
        status_str = "and p.status = %s"
        val = val + (status,)
    else:
        status_str = ""
    db = openDb()
    cursor = db.cursor()

    # SQL 插入语句
    sql = "select p.id,p.ver,p.name,p.p_id,p.status,p.total,p.done,p.per,p.level,p.type,p.unit,IFNULL(tb.dones,0) \
        from plans p LEFT JOIN (SELECT plan_id, sum(done) dones from finish_record \
            where finished_at BETWEEN %s and %s GROUP BY plan_id) tb on \
                p.id=tb.plan_id  where p.name is not null "+user_id_str+p_id_str+status_str+" ORDER BY p.status,p.level"
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
        obj['unit'] = row[10]
        obj['dose'] = str(row[11])
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
    nowTime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    sql = "update plans set done = (done + %s) where id =%s"
    val = (finish, id)
    cursor.execute(sql, val)
    db.commit()
    sql = "INSERT INTO finish_record(plan_id,finished_at,done) VALUES(%s,% s,%s)"
    val = (id, nowTime, finish)
    cursor.execute(sql, val)
    db.commit()

    # 判断是否完成,完成置状态为10
    sql = "SELECT total,done FROM plans WHERE id = %s"
    val = (id,)
    cursor.execute(sql, val)
    results = cursor.fetchall()
    for row in results:
        total = float(row[0])
        done = float(row[1])
        if(total <= (done)):
            sql = 'update plans set status = 10 where id =%s'
            val = (id,)
            cursor.execute(sql, val)
            db.commit()
            return 'ok'
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
