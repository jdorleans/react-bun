import api from "@/api";

export default {
  "/api/profiles": {
    GET: api.profile.findAll.bind(api.profile),
    POST: api.profile.create.bind(api.profile)
  },
  "/api/profiles/:id": {
    GET: api.profile.findById.bind(api.profile),
    PUT: api.profile.update.bind(api.profile),
    DELETE: api.profile.delete.bind(api.profile)
  },
  "/api/profiles/last": {
    GET: api.profile.findLast.bind(api.profile)
  }
};
