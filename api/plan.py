#!/usr/bin/python
# -*- coding: UTF-8 -*-
from flask import Flask, jsonify, request
import MySQLdb
import time
import json
import datetime
import mysql.connector

mydb = mysql.connector.connect(
    host="127.0.0.1",       # 数据库主机地址
    # port='3306',
    user="root",    # 数据库用户名
    passwd="",   # 数据库密码
    # database="checklist"
)
mycursor = mydb.cursor()

mycursor.execute("CREATE DATABASE runoob_db")
