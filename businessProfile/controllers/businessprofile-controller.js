import repository from "../data/businessprofile-repository";
import { isEmpty } from "../../shared/utils";
import PostRepository from "../../post/data/post-repository";

class BusinessProfileController {
  constructor(repository) {
    this.repository = repository;
    this.createProfile = this.createProfile.bind(this);
    this.get = this.get.bind(this);
    this.delete = this.delete.bind(this);
    this.addExperience = this.addExperience.bind(this);
    this.deleteExperience = this.deleteExperience.bind(this);
    this.addEducation = this.addEducation.bind(this);
    this.deleteEducation = this.deleteEducation.bind(this);
    this.addProject = this.addProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.getProfiles = this.getProfiles.bind(this);
    this.getByIdentityName = this.getByIdentityName.bind(this);
  }

  async createProfile(req, res, next) {
    const businessProfileData = {};
    businessProfileData.userId = req.authData._id;
    if (req.body.identityName)
      businessProfileData.identityName = req.body.identityName;
    if (req.body.company) businessProfileData.company = req.body.company;
    if (req.body.website) businessProfileData.website = req.body.website;
    if (req.body.github) businessProfileData.github = req.body.github;
    if (req.body.location) businessProfileData.location = req.body.location;
    if (req.body.bio) businessProfileData.bio = req.body.bio;
    if (req.body.status) businessProfileData.status = req.body.status;
    let skills;
    if (req.body.skills.indexOf(",") >= 0) {
      skills = req.body.skills.split(",");
    } else {
      skills = [req.body.skills];
    }
    const skillsTrim = skills.map(s => s.trim());
    businessProfileData.skills = skillsTrim;

    //Social
    businessProfileData.social = {};
    if (req.body.youtube) businessProfileData.social.youtube = req.body.youtube;
    if (req.body.twitter) businessProfileData.social.twitter = req.body.twitter;
    if (req.body.facebook)
      businessProfileData.social.facebook = req.body.facebook;
    if (req.body.linkedin)
      businessProfileData.social.linkedin = req.body.linkedin;
    if (req.body.instagram)
      businessProfileData.social.instagram = req.body.instagram;

    try {
      if (!isEmpty(req.businessProfileToUpdate)) {
        req.newBusinessProfile = await this.repository.update(
          { _id: req.businessProfileToUpdate._id },
          { $set: businessProfileData },
          { new: true }
        );
        if (req.updatePosts) {
          const res = await PostRepository.update(
            { userId: req.authData._id },
            { identityName: req.body.identityName },
            { multi: true }
          );
          console.log(res)
        }
      } else {
        req.newBusinessProfile = await this.repository.createProfile(
          businessProfileData
        );
      }
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async get(req, res, next) {
    try {
      req.fetchedProfile = await this.repository.findOne({
        userId: req.authData._id
      });
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await this.repository.remove({ userId: req.authData._id });
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async addExperience(req, res, next) {
    try {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      req.newBusinessProfile = await this.repository.update(
        { userId: req.authData._id },
        { $push: { experience: newExp } },
        { new: true }
      );
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async deleteExperience(req, res, next) {
    try {
      req.newBusinessProfile = await this.repository.update(
        { userId: req.authData._id },
        {
          $pull: {
            experience: { _id: req.params.experience_id }
          }
        },
        { new: true }
      );
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async addEducation(req, res, next) {
    try {
      const newEdu = {
        collegeName: req.body.collegeName,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      req.newBusinessProfile = await this.repository.update(
        { userId: req.authData._id },
        { $push: { education: newEdu } },
        { new: true }
      );
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async deleteEducation(req, res, next) {
    try {
      req.newBusinessProfile = await this.repository.update(
        { userId: req.authData._id },
        {
          $pull: {
            education: { _id: req.params.education_id }
          }
        },
        { new: true }
      );
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async addProject(req, res, next) {
    try {
      let technologies;
      if (req.body.technologies.indexOf(",") >= 0) {
        technologies = req.body.technologies.split(",");
      } else {
        technologies = [req.body.technologies];
      }
      const technologiesTrim = technologies.map(s => s.trim());
      const newProject = {
        title: req.body.title,
        projectSummary: req.body.projectSummary,
        from: req.body.from,
        to: req.body.to,
        role: req.body.role,
        contribution: req.body.contribution,
        technologies: technologiesTrim
      };

      req.newBusinessProfile = await this.repository.update(
        { userId: req.authData._id },
        { $push: { projects: newProject } },
        { new: true }
      );
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async deleteProject(req, res, next) {
    try {
      req.newBusinessProfile = await this.repository.update(
        { userId: req.authData._id },
        {
          $pull: {
            projects: { _id: req.params.project_id }
          }
        },
        { new: true }
      );
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async getProfiles(req, res, next) {
    try {
      req.fetchedBusinessProfiles = await this.repository.findProfiles({});
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async getByIdentityName(req, res, next) {
    try {
      const fetchedProfile = await this.repository.findProfiles({
        identityName: req.params.identityName
      });
      if (isEmpty(fetchedProfile)) {
        return res.status(404).send({ message: "Not Found" });
      }
      req.fetchedProfile = fetchedProfile;
      return next();
    } catch (err) {
      return next(err);
    }
  }
}

export default new BusinessProfileController(repository);
