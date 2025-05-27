import {ApiError} from "@/api/ApiError";
import {Profile} from "@/model/Profile";
import service from "@/service";
import {BunRequest} from "bun";

export class ProfileApi {

  async findById(req: BunRequest): Promise<Response> {
    try {
      const {id}: Record<string, string> = req.params;
      console.debug("ProfileApi.findById", id);
      const profile = await service.profile.findById(id);
      if (!profile) throw new ApiError(404, "Profile not found");
      return Response.json(profile);
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(req: BunRequest): Promise<Response> {
    try {
      const search = new URL(req.url).searchParams.get("search") || "";
      console.debug("ProfileApi.findAll", search);
      const profiles = await service.profile.findAll(search);
      return Response.json(profiles);
    } catch (error) {
      this.handleError(error);
    }
  }

  async findLast(req: BunRequest): Promise<Response> {
    try {
      console.debug("ProfileApi.findLast");
      const profile = await service.profile.findLast();
      return Response.json(profile);
    } catch (error) {
      this.handleError(error);
    }
  }

  async create(req: BunRequest): Promise<Response> {
    try {
      const data = await req.formData();
      console.debug("ProfileApi.create", data);
      const profile: Partial<Profile> = {
        name: data.get("name") as string,
        location: data.get("location") as string,
        headline: data.get("headline") as string,
        content: data.get("content") as string
      };
      const file = data.get("file") as File;
      const result = await service.profile.create(profile, file);
      return Response.json(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(req: BunRequest): Promise<Response> {
    try {
      const {id}: Record<string, string> = req.params;
      const data = await req.formData();
      console.debug("ProfileApi.update", id, data);
      const profile: Partial<Profile> = {
        id,
        name: data.get("name") as string,
        location: data.get("location") as string,
        headline: data.get("headline") as string,
        content: data.get("content") as string
      };
      const file = data.get("file") as File;
      const result = await service.profile.update(profile, file);
      return Response.json(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(req: BunRequest): Promise<Response> {
    try {
      const {id}: Record<string, string> = req.params;
      console.debug("ProfileApi.delete", id);
      const result = await service.profile.delete(id);
      return Response.json(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: unknown): never {
    console.error("ProfileApi.handleError", error);
    if (error instanceof ApiError) throw error;
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    throw new ApiError(500, message);
  }

}