'use strict';

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "kghgasdyRARWas!.";

function generarTokenUsuario(usuario) {
    var payload = {
        sub: usuario._id,
        username: usuario.username,
        role: usuario.role,
        iat: moment().unix(),
        exp: moment().add(180, 'minutes').unix() // Expira en 15 minutos
    };
    return jwt.encode(payload, secret);
}

function validarToken(req, resp, nextStep) {
    try {
        // Obtener el token de la cabecera Authorization
        var tokenEnviadoPorUsuario = req.headers.authorization;

        // Verificar si el token fue proporcionado
        if (!tokenEnviadoPorUsuario) {
            return resp.status(403).send({ message: "Token no proporcionado" });
        }

        // Limpiar el token (quitar el prefijo 'Bearer ')
        var tokenLimpio = tokenEnviadoPorUsuario.replace('Bearer ', '');

        // Decodificar el token usando la clave secreta
        var payload = jwt.decode(tokenLimpio, secret);

        // Verificar si el token ha expirado
        if (payload.exp <= moment().unix()) {
            return resp.status(401).send({ message: "El token ha expirado" });
        }

        // Asignar el ID, username y role al objeto req.user
        req.user = {
            id: payload.sub,
            username: payload.username,
            role: payload.role
        };

        // Depuración (solo para comprobar que el ID se asigna correctamente)
        console.log("User ID:", req.user.id);

        // Continuar con el siguiente middleware o la función de ruta
        nextStep();
    } catch (ex) {
        // Capturar errores si el token no es válido
        resp.status(403).send({ message: "Token no válido" });
    }
}


module.exports = {
    generarTokenUsuario,
    validarToken
};
