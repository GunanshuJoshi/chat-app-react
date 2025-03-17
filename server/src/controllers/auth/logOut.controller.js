export const logOut = async (req, res) => {
  try {
    res.cookie("chatAppJwt", "", {
      maxAge: 0,
    });
    return res.status(200).json({ message: "Logout successfully." });
  } catch (error) {
    console.log("Error while logging out", error);
    res.status(500).json({ message: "Error while logging out." });
  }
};
