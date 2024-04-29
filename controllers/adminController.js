const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const admin = require('../models/adminModel')
const task = require('../models/taskModel')
const storage = require("node-persist");
storage.init(/* options ... */);

// register admin (admin)

exports.insertadmin = async (req, res) => {
    var b_pass = await bcrypt.hash(req.body.password, 10);
    req.body.password = b_pass;

    const data = await admin.create(req.body);
    res.status(200).json({
        status: 200,
        message: "Admin Registered Successfully..!",
        data
    })
}

// login admin

exports.login = async (req, res) => {
    const data = await admin.find({ email: req.body.email })
    if (data.length == 1) {
        bcrypt.compare(req.body.password, data[0].password, async (error, result) => {
            if (result == true) {
                await storage.setItem('admin', true);
                var token = jwt.sign({ id: data[0].id }, "token_key")
                res.status(200).json({
                    status: 200,
                    message: "Login Successfully..!",
                    token
                })
            }
            else {
                res.status(201).json({
                    status: 201,
                    message: "check Email & Password"
                })
            }
        })
    }
    else {
        res.status(201).json({
            status: 201,
            message: "check Email & Password"
        })
    }
}

// View All Pending task

exports.viewpending = async (req, res) => {
    const test = await storage.getItem('admin')
    if (test != undefined) {
        const data = await task.find({ status: "pending" }).populate("staff_id");
        if (data != undefined) {
            res.status(200).json({
                status: 200,
                message: "pending Task view Successfully..!",
                data
            })
        } else {
            res.status(201).json({
                status: 201,
                message: "No Task Found"
            })
        }
    }
    else {
        res.status(201).json({
            status: 201,
            message: "please Admin Login !"
        })
    }
}

// View All Accept task

exports.viewaccept = async (req, res) => {
    const test = await storage.getItem('admin')
    if (test != undefined) {
        const data = await task.find({ status: "Accept" }).populate("staff_id");
        if (data != undefined) {
            res.status(200).json({
                status: 200,
                message: "Accepted Task view Successfully..!",
                data
            })
        } else {
            res.status(201).json({
                status: 201,
                message: "No Task Found"
            })
        }
    }
    else {
        res.status(201).json({
            status: 201,
            message: "please Admin Login !"
        })
    }
}

// View All Decline task

exports.viewdecline = async (req, res) => {
    const test = await storage.getItem('admin')
    if (test != undefined) {
        const data = await task.find({ status: "Decline" }).populate("staff_id");
        if (data != undefined) {
            res.status(200).json({
                status: 200,
                message: "Decline Task view Successfully..!",
                data
            })
        } else {
            res.status(201).json({
                status: 201,
                message: "No Task Found"
            })
        }
    }
    else {
        res.status(201).json({
            status: 201,
            message: "please Admin Login !"
        })
    }
}

// View All Decline task

exports.viewcompleted = async (req, res) => {
    const test = await storage.getItem('admin')
    if (test != undefined) {
        const data = await task.find({ status: "Completed" }).populate("staff_id");
        if (data != undefined) {
            res.status(200).json({
                status: 200,
                message: "Compeletd Task view Successfully..!",
                data
            })
        } else {
            res.status(201).json({
                status: 201,
                message: "No Task Found"
            })
        }
    }
    else {
        res.status(201).json({
            status: 201,
            message: "please Admin Login !"
        })
    }
}