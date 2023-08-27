const mongoose = require('mongoose')
const chatSchema = new mongoose.Schema({
    room_id: {
        type: String,
        required: true
    },
    history: [
        {
            userName: {
                type: String
            },
            user_id: {
                type: String,
                ref: 'users',
                required: true
            },
            chat: {
                type: String
            },
            time: {
                type: Date
            }
        }
    ]
},
    {
        timestamps: true,
    }
);
