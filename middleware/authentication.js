import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token)
            return res.status(403).json({ message: 'No token provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export default authMiddleware;