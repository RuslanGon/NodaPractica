import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
    avgMark: { type: Number, required: true, min: 1, max: 17 },
    onDuty: { type: Boolean, default: false },
    parent: { type: Schema.ObjectId, required: true},
}, { versionKey: false });

export const Student = model('students', studentSchema);
