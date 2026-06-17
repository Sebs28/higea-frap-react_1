import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    console.log("📥 Registro - Datos recibidos:", req.body);
    try {
        const { 
            nombre, apellidos, correo, password, 
            domicilio, ciudad, rfc, telefono, 
            empresa
        } = req.body;

        // Verificar que todos los campos obligatorios estén presentes
        if (!nombre || !apellidos || !correo || !password || 
            !domicilio || !ciudad || !rfc || !telefono) {
            return res.status(400).json({ mensaje: "Todos los campos marcados con * son obligatorios" });
        }

        const existe = await User.findOne({ correo });
        if (existe) {
            return res.status(400).json({ mensaje: "El correo ya está registrado" });
        }

        const hash = await bcrypt.hash(password, 10);
        const nuevoUsuario = new User({
            nombre,
            apellidos,
            correo,
            password: hash,
            domicilio,
            ciudad,
            rfc,
            telefono,
            empresa: empresa || ''
        });

        await nuevoUsuario.save();
        console.log("✅ Usuario registrado:", nombre, apellidos);
        res.json({ mensaje: "Usuario registrado con datos sensibles" });
    } catch (error) {
        console.error("❌ Error en registro:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

export const login = async (req, res) => {
    console.log("📥 Login - Datos recibidos:", req.body);
    try {
        const { correo, password } = req.body;
        const usuario = await User.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ mensaje: "Usuario no encontrado" });
        }
        const valido = await bcrypt.compare(password, usuario.password);
        if (!valido) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta" });
        }
        console.log("✅ Login exitoso:", usuario.nombre);
        res.json({
            mensaje: "Login correcto",
            usuario: { 
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                correo: usuario.correo,
                domicilio: usuario.domicilio,
                ciudad: usuario.ciudad,
                rfc: usuario.rfc,
                telefono: usuario.telefono,
                empresa: usuario.empresa
            }
        });
    } catch (error) {
        console.error("❌ Error en login:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};