module.exports = ({ env }) => ({
    config: {
        secret: env("SESSION_SECRET", "mySecretKey123"), // ✅ ใช้ environment variable
        cookie: {
            secure: env("NODE_ENV") === "production", // ✅ ใช้ Secure Cookie ใน Production
            httpOnly: true, // ✅ ป้องกัน XSS
            sameSite: "lax", // ✅ ป้องกัน CSRF
        },
    },
});
