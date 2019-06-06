#!/usr/bin/python
# -*- coding: UTF-8 -*-
from flask import Flask, jsonify, request
import MySQLdb
import time
import json
import datetime


app = Flask(__name__)
app.run(port=5200)
startTime = datetime.datetime.now().strftime('%Y-%m-%d 00:00:00')
endTime = datetime.datetime.now().strftime('%Y-%m-%d 23:59:59')


def workDay():
    return time.strftime("%w", time.localtime())+"00000======="


def openDb():
    # 打开数据库连接
    return MySQLdb.connect("172.19.0.10:3306", "xiu", "xiu",
                           "checklist", charset='utf8')

    db = openDb()
    # 使用cursor()方法获取操作游标
    cursor = db.cursor()


print 'success'
@app.route('/get_todo_list', methods=['GET'])
def get_todo_list():
    try:
        user_id = request.args.get('user_id')
        p_id = request.args.get('p_id')
        status = request.args.get('status')

    except ZeroDivisionError, e:
        print e.message

    db = openDb()
    cursor = db.cursor()
    # 判断是否结束，置状态为9
    sql = "SELECT id,end_at FROM plans WHERE user_id = %s"
    val = (user_id,)
    cursor.execute(sql, val)
    results = cursor.fetchall()
    for row in results:
        id = row[0]
        end_at = str(row[1])
        # end_at = datetime.datetime.strptime(str(row[1]), "%Y-%m-%d")
        print id
        if (end_at < str(endTime)[0:10]):
            sql = 'update plans set status = 9 where id =%s'
            val = (id,)
            cursor.execute(sql, val)
            db.commit()

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
    # SQL 插入语句
    sql = "select p.id,p.ver,p.name,p.p_id,p.status,p.total,p.done,p.per,p.level,p.type,p.unit,IFNULL(tb.dones,0),p.end_at \
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
        obj['end_at'] = str(row[12])
        if(row[9] == 1):
            if(workDay() == 6):
                res.append(obj)
        elif(row[9] == 6):
            if(workDay() != 7):
                res.append(obj)
        elif(row[9] == 5):
            if(workDay() != 6 or workDay() != 7):
                res.append(obj)
        else:
            res.append(obj)
    # print res
    return jsonify(res)
    db.close()


@app.route('/update_plan', methods=['POST'])
def update_plan():
    db = openDb()
    cursor = db.cursor()
    data = json.loads(request.get_data())
    print data
    id = int(data['id'])
    finish = float(data['finish'])
    user_id = data['user_id']
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


@app.route('/get_project_list', methods=['GET'])
def get_project_lsit():
    user_id = request.args.get('user_id')
    db = openDb()
    cursor = db.cursor()
    sql = 'select id,name,end_at,created_at from projects where status = %s and user_id = %s'
    val = (0, user_id)
    cursor.execute(sql, val)
    results = cursor.fetchall()
    res = []
    for row in results:
        obj = {}
        obj['id'] = row[0]
        obj['name'] = row[1]
        obj['end_at'] = row[2]
        obj['created_at'] = str(row[3])
        obj['end_str'] = str(row[2])
        res.append(obj)
    return jsonify(res)
    db.close()
# 创建项目资格
@app.route('/ensure', methods=['GET'])
def ensure():
    userid = request.args.get('user_id')
    db = openDb()
    cursor = db.cursor()
    sql = "select count(id) from projects where user_id=%s"
    val = (userid,)
    cursor.execute(sql, val)
    results = cursor.fetchall()
    return str(results[0][0])
    db.close()
# 创建项目
@app.route('/create_project', methods=['POST'])
def create_project():
    data = json.loads(request.get_data())
    name = data['name']
    start = str(data['start'])[0:10]
    end = str(data['end'])[0:10]
    userid = data['user_id']
    db = openDb()
    cursor = db.cursor()
    sql = "INSERT INTO projects (NAME,created_at, end_at,status,user_id) VALUES (%s,%s,%s,0,%s)"
    val = (name, start, end, userid)
    cursor.execute(sql, val)
    db.commit()
    return 'ok'
    db.close()

# 创建计划
@app.route('/create_plan', methods=['POST'])
def create_plan():
    try:
        data = json.loads(request.get_data())
        print data
        p_ver = data['ver']
        p_name = data['name']
        p_created_at = str(data['created_at'])[0:10]
        p_end_at = str(data['end_at'])[0:10]
        p_total = data['total']
        p_per = data['per']
        p_unit = data['unit']
        p_typ = data['typ']
        p_level = data['level']
        p_userid = data['userid']
        val = (p_ver, p_name, p_created_at, p_end_at, p_total,
               p_per, p_unit, p_level, p_typ, p_userid)
        if(data['pid']):
            p_pid = data['pid']
            val = val+(p_pid,)
            pid_str = "p_id,"
            pid_val = "%s,"
        else:
            pid_str = ""
            pid_val = ""

    except ZeroDivisionError, e:
        print e.message

    db = openDb()
    cursor = db.cursor()
    sql = "INSERT INTO plans (ver,NAME,created_at,end_at,total,per,unit,level,type,user_id," + \
        pid_str + \
        "status,done) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,"+pid_val+"0,0)"

    cursor.execute(sql, val)
    db.commit()
    return 'ok'
    db.close()


if __name__ == '__main__':
    app.run(port=5200)


print 'done'

# 关闭数据库连接
# db.close()
