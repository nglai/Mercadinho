const Services = require("./Services")

class ProfilesServices extends Services {
    constructor() {
        super('profiles');
    };
};

module.exports = ProfilesServices;