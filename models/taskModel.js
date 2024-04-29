const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task_name:{
        type:String,
    },
    start_date:{
        type:String
    },
    end_date:{
        type:String,
    },
    total_day:{
        type:String,
    },
    staff_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "staff"
    },
    status:{
        type:String,
    }
})

module.exports = mongoose.model('task',taskSchema)