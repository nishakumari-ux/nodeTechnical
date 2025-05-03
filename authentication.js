const jwt = require("jsonwebtoken");
const config = require('../controllers/config');

module.exports = {
    ensureToken(req, res, next) {
        var token = req.headers["authorization"];
        if (!token) {
            return res.status(401).json({ message: "A token is required for authentication." })
        }
        jwt.verify(token, config.secret, async function (err, decoded) {
            if (err) {
                return res.status(401).json({ message: "Session has expired." })
            } else {
                if (decoded && decoded.id) {

                    let checkTask = await User.findById(decoded.id);
                    if (!checkTask) {
                        return res.status(401).json({ message: "Session has expired." })
                    }
                    req.taskId = decoded.id;
                    return next();
                } else {
                    req.taskId = null;
                    return next();
                }
            }
        })
    }
}