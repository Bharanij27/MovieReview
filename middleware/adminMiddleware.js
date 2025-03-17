const isAdmin = (req, res, next) => {
  // req.user is set by the auth middleware
  if (!req.user) {
    return res.status(401).json({ 
      message: "Authentication required.",
      currentRole: 'none'
    });
  }

  // If user is authenticated but not an admin
  if (req.user.role !== "admin") {
    return res.status(403).json({ 
      message: "Access denied. Admin only.",
      currentRole: req.user ? req.user.role : 'none'
    });
  }
  next();
};

const isAdminOrOwner = (ownerId) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Access denied. Authentication required." });
  }

  if (req.user.role === "admin" || req.user.id === ownerId) {
    next();
  } else {
    return res.status(403).json({ 
      message: "Access denied. Admin or resource owner only.",
      currentRole: req.user.role,
      currentUserId: req.user.id
    });
  }
};

module.exports = {
  isAdmin,
  isAdminOrOwner
};
