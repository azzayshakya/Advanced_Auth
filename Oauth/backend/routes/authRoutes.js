// routes/authRoutes.js
import express from "express";
import passport from "passport";

const router = express.Router();

// Google authentication route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google authentication callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    console.log("hskjdfh");
    // Extract the token from the authenticated user
    const token = req.user.token;

    // Redirect to frontend with token as URL parameter
    res.redirect(
      `${process.env.FRONTEND_URL || "http://localhost:3100"}?token=${token}`
    );
  }
);

// Route to check if user is authenticated
router.get("/verify", (req, res) => {
  try {
    // Get token from authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-jwt-secret"
    );

    // Return user information
    res.status(200).json({
      success: true,
      user: {
        id: decoded.id,
        email: decoded.email,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error logging out" });
    }
    res.status(200).json({ success: true, message: "Successfully logged out" });
  });
});

export default router;
