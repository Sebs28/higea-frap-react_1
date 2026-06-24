import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    domicilio: { type: String, required: true },
    ciudad: { type: String, required: true },
    rfc: { type: String, required: true },
    telefono: { type: String, required: true },
    empresa: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);