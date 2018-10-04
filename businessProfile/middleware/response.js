export const businessProfileResponse = (req, res) =>
  res.status(200).send(req.newBusinessProfile);

export const fetchBusinessProfileResponse = (req, res) =>
  res.status(200).send(req.fetchedProfile);

export const businssProfilesResponse = (req, res) =>
  res.status(200).send(req.fetchedBusinessProfiles);
