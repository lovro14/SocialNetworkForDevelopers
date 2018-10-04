export const userResponse = (req, res) =>
  res.status(200).send({
    success: "true",
    accessToken: `Bearer ${req.createdToken}`,
    refreshToken: req.refreshToken
  });

export const logoutResponse = (req, res) =>
  res.status(200).send({ message: "Logout successfully" });

export const deleteUserResponse = (req, res) =>
  res.status(200).send({ message: "User Deleted" });

export const updateUserResponse = (req, res) =>
  res
    .status(200)
    .send({
      profilePicture: req.user.profilePicture,
      accessToken: `Bearer ${req.createdToken}`
    });
