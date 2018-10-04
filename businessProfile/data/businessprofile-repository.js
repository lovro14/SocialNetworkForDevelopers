import BusinessProfile from "./businessProfile";

class BusinessProfileRepository {
  constructor(BusinessProfile) {
    this.BusinessProfile = BusinessProfile;
  }

  findOne(query) {
    return this.BusinessProfile.findOne(query).lean(true);
  }

  createProfile(businessProfile) {
    return this.BusinessProfile.create(businessProfile);
  }

  update(query, update, options) {
    return this.BusinessProfile.findOneAndUpdate(query, update, options);
  }

  remove(query) {
    return this.BusinessProfile.remove(query);
  }

  findProfiles(query) {
    return this.BusinessProfile.find(query).populate({
      path: "userId",
      options: { lean: true },
      select: { profilePicture: 1, name: 1 }
    });
  }
}

export default new BusinessProfileRepository(BusinessProfile);
