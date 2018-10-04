import BusinessProfileRepository from "../data/businessprofile-repository";
import { isEmpty } from "../../shared/utils";

export const checkIdentityName = async (req, res, next) => {
  try {
    let businessProfile = await BusinessProfileRepository.findOne({
      identityName: req.body.identityName
    });
    if (isEmpty(businessProfile)) {
      //return next();
      businessProfile = await BusinessProfileRepository.findOne({
        userId: req.authData._id
      });
      if (!isEmpty(businessProfile)) {
        req.businessProfileToUpdate = businessProfile;
        return next();
      } else {
        return next();
      }
    }
    if (
      !isEmpty(businessProfile) &&
      businessProfile.userId.toString() === req.authData._id
    ) {
      req.businessProfileToUpdate = businessProfile;
      return next();
    }
    return res.status(400).send({ identityName: "Handle already exists" });
  } catch (err) {
    return next(err);
  }
};
