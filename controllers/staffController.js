const staff = require("../models/staffModel");
const task = require("../models/taskModel");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const storage = require("node-persist");
storage.init(/* options ... */);

// add staff (admin)

exports.insertstaff = async (req, res) => {
  const test = await storage.getItem('admin')
  if (test != undefined) {
    var b_pass = await bcrypt.hash(req.body.password, 10);
    req.body.password = b_pass;
    const data = await staff.create(req.body);
    res.status(200).json({
      status: 200,
      message: "Staff Registered Successfully..!",
      data,
    });
  }
  else {
    res.status(201).json({
      status: 201,
      message: "please Admin Login !"
    })
  }
};

// login staff

exports.login = async (req, res) => {
  const check = await storage.getItem("login");
  if (check == undefined) {
    const data = await staff.find({ email: req.body.email });
    if (data.length == 1) {
      bcrypt.compare(
        req.body.password,
        data[0].password,
        async (error, result) => {
          if (result == true) {
            await storage.setItem("login", data[0]);
            console.log("data", data[0]);
            var token = jwt.sign({ id: data[0].id }, "token_key");
            res.status(200).json({
              status: 200,
              message: "Login Successfully..!",
              token,
            });
          } else {
            res.status(201).json({
              status: 201,
              message: "check Email & Password",
            });
          }
        }
      );
    } else {
      res.status(201).json({
        status: 201,
        message: "check Email & Password",
      });
    }
  } else {
    res.status(201).json({
      status: 201,
      message: "Staff Already Login",
    });
  }
};

// Logout

exports.logout = async (req, res) => {
  await storage.clear();
  res.status(200).json({
    status: 200,
    message: "Logout Successfully..!",
  });
};

// get staff

exports.getstaff = async (req, res) => {
  const test = await storage.getItem('admin')
  if (test != undefined) {
    const data = await staff.find();
    res.status(200).json({
      status: 200,
      messagee: "Staff All List",
      data,
    });
  }
  else {
    res.status(201).json({
      status: 201,
      message: "please Admin Login !"
    })
  }
};

// get single staff

exports.getonestaff = async (req, res) => {
  const test = await storage.getItem('admin')
  if (test != undefined) {
    var id = req.params.id;
    const data = await staff.findById(id);
    res.status(200).json({
      status: 200,
      messagee: "single Staff Show",
      data,
    });
  }
  else {
    res.status(201).json({
      status: 201,
      message: "please Admin Login !"
    })
  }
};

// Update Staff

exports.updatestaff = async (req, res) => {
  const test = await storage.getItem('admin')
  if (test != undefined) {
    var id = req.params.id;
    const data = await staff.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      status: 200,
      messagee: "Update Staff",
    });
  }
  else {
    res.status(201).json({
      status: 201,
      message: "please Admin Login !"
    })
  }
};

// delete staff

exports.deletestaff = async (req, res) => {
  const test = await storage.getItem('admin')
  if (test != undefined) {
    var id = req.params.id;
    const data = await staff.findByIdAndDelete(id);
    res.status(200).json({
      status: 200,
      messagee: "Delete Staff",
    });
  }
  else {
    res.status(201).json({
      status: 201,
      message: "please Admin Login !"
    })
  }
};

// view task login staff wise

exports.viewtaskstaff = async (req, res) => {
  const check = await storage.getItem("login");
  if (check != undefined) {
    const data = await task.find({ staff_id: check._id }).populate("staff_id");
    if (data != undefined) {
      res.status(200).json({
        status: 200,
        message: "Task view Successfully..!",
        data,
      });
    } else {
      res.status(201).json({
        status: 201,
        message: "Task Not Found",
      });
    }
  } else {
    res.status(201).json({
      status: 201,
      message: "Please Login !",
    });
  }
};

// Accept task by staff

exports.accpettask = async (req, res) => {
  const check = await storage.getItem("login");
  if (check != undefined) {
    var id = req.params.id;
    req.body.status = "Accept";
    const data = await task.findByIdAndUpdate(id, req.body);
    if (data != undefined) {
      res.status(200).json({
        status: 200,
        message: "Task Accepted Successfully..!",
      });
    } else {
      res.status(201).json({
        status: 201,
        message: "Task Not Found",
      });
    }
  }
};

// Decline task by staff

exports.declinetask = async (req, res) => {
  const check = await storage.getItem("login");
  if (check != undefined) {
    var id = req.params.id;
    req.body.status = "Decline";
    const data = await task.findByIdAndUpdate(id, req.body);
    if (data != undefined) {
      res.status(200).json({
        status: 200,
        message: "Task Decline Successfully..!",
      });
    } else {
      res.status(201).json({
        status: 201,
        message: "Task Not Found",
      });
    }
  }
};

// Complete the task

exports.completedtask = async (req, res) => {
  const check = await storage.getItem("login");
  if (check != undefined) {
    var id = req.params.id;
    req.body.status = "Completed";
    const data = await task.findByIdAndUpdate(id, req.body);
    if (data != undefined) {
      res.status(200).json({
        status: 200,
        message: "Task Completed Successfully..!",
      });
    } else {
      res.status(201).json({
        status: 201,
        message: "Task Not Found",
      });
    }
  }
};

// staff Assign all pending task

// exports.staffpending = async (req, res) => {
//   const check = await storage.getItem("login");
//   if (check != undefined) {
//     const data = await task.find({ status: "pending" }).populate("staff_id");
//     if (data != undefined) {
//       res.status(200).json({
//         status: 200,
//         message: "Pending Task view Successfully..!",
//         data,
//       });
//     } else {
//       res.status(201).json({
//         status: 201,
//         message: "Task Not Found",
//       });
//     }
//   } else {
//     res.status(201).json({
//       status: 201,
//       message: "Please Login !",
//     });
//   }
// };
