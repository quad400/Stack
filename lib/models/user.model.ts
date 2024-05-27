import { Schema, model, models } from "mongoose";


const UserSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    ordId: {
        type: String,
        required: true,
        unique: true
    },
    orgName: {
        type: String,
        required: true
    },
}, {timestamps: true});


const User = models?.User || model("User", UserSchema);

export default User