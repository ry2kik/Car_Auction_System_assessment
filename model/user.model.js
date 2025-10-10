import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    }
});

userSchema.methods.getJWT = async function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    }) 
    return token;
}

export default mongoose.model('User', userSchema);