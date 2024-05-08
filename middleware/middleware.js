const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    try {
        const { token } = req.headers;
        console.log('tokken->',token)
        if (!token) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized - Token not provided' });
        }

        // const token = authorization.replace('Bearer ', ''); // Remove the 'Bearer ' prefix
        const decodedToken = jwt.verify(token, process.env.secret_key);
        console.log(decodedToken)
        if (!decodedToken) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized - Invalid token' });
        }

          // Set user information in the request object
        res.userId=decodedToken.userId

        // console.log('decode',res.userId)
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ status: 'error', message: 'Unauthorized - Invalid token' });
    }
};

module.exports = isLoggedIn;
