import express from "express";
import { validateBusinessProfileData } from "./middleware/validate-business-profile";
import { checkIdentityName } from "./middleware/identity-name-validation";
import BusinessProfileController from "./controllers/businessprofile-controller";
import { verifyToken } from "../shared/middleware/authentication";
import {
  businessProfileResponse,
  fetchBusinessProfileResponse,
  businssProfilesResponse
} from "./middleware/response";
import {
  validateExperienceData,
  checkExperienceId
} from "./middleware/experience-validation";
import {
  validateEducationData,
  checkEducationId
} from "./middleware/education-validation";
import {
  checkProjectData,
  checkProjectId
} from "./middleware/project-validation";

export const businessProfileRouter = new express.Router();

businessProfileRouter.post(
  "/",
  verifyToken,
  validateBusinessProfileData,
  checkIdentityName,
  BusinessProfileController.createProfile,
  businessProfileResponse
);

businessProfileRouter.get(
  "/",
  verifyToken,
  BusinessProfileController.get,
  fetchBusinessProfileResponse
);

businessProfileRouter.post(
  "/experience",
  verifyToken,
  validateExperienceData,
  BusinessProfileController.addExperience,
  businessProfileResponse
);

businessProfileRouter.delete(
  "/experience/:experience_id",
  verifyToken,
  checkExperienceId,
  BusinessProfileController.deleteExperience,
  businessProfileResponse
);

businessProfileRouter.post(
  "/education",
  verifyToken,
  validateEducationData,
  BusinessProfileController.addEducation,
  businessProfileResponse
);

businessProfileRouter.delete(
  "/education/:education_id",
  verifyToken,
  checkEducationId,
  BusinessProfileController.deleteEducation,
  businessProfileResponse
);

businessProfileRouter.post(
  "/project",
  verifyToken,
  checkProjectData,
  BusinessProfileController.addProject,
  businessProfileResponse
);

businessProfileRouter.delete(
  "/project/:project_id",
  verifyToken,
  checkProjectId,
  BusinessProfileController.deleteProject,
  businessProfileResponse
);

businessProfileRouter.get(
  "/all",
  BusinessProfileController.getProfiles,
  businssProfilesResponse
);

businessProfileRouter.get(
  "/:identityName",
  BusinessProfileController.getByIdentityName,
  fetchBusinessProfileResponse
);
