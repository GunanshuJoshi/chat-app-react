export const checkAuth = async (req, res) => {
  try {
    return res.status(200).json({ message: "Authorized User", user: req.user });
  } catch (error) {
    console.log("Error in checking the authorized user ", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};
