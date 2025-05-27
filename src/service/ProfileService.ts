import {Profile} from "@/model/Profile";
import repository from "@/repository";
import {s3} from "@/s3";

export class ProfileService {

  async findById(id?: string): Promise<Profile | null> {
    console.debug("ProfileService.findById", id);
    this.validateId(id);
    return repository.profile.findById(id);
  }

  async findAll(search?: string): Promise<Profile[]> {
    console.debug("ProfileService.findAll", search);
    return repository.profile.findAll(search);
  }

  async findLast(): Promise<Profile | null> {
    console.debug("ProfileService.findLast");
    return repository.profile.findLast();
  }

  async create(data: Partial<Profile>, file?: File): Promise<Profile> {
    console.debug("ProfileService.create", data);
    const profile = await repository.profile.create(data);
    if (file) {
      const imageUrl = await this.uploadFile(profile.id!, file);
      return (await this.update({id: profile.id, imageUrl}))!;
    }
    return profile;
  }


  async update(profile: Partial<Profile>, file?: File | null): Promise<Profile> {
    console.debug("ProfileService.update", profile);
    this.validateId(profile.id);
    if (file) {
      profile.imageUrl = await this.uploadFile(profile.id!, file);
    } else if (file === null) {
      profile.imageUrl = null;
    }
    return repository.profile.update(profile);
  }

  async delete(id: string): Promise<Profile> {
    console.debug("ProfileService.delete", id);
    this.validateId(id);
    return repository.profile.delete(id);
  }

  private validateId(id?: string) {
    if (!id) throw new Error("Profile id is required");
  }

  private async uploadFile(path: string, file: File) {
    console.debug(`Uploading file: ${file.name} to path:${path}`);
    await s3.write(path, file);
    const url = `${process.env.S3_ENDPOINT_PUBLIC}/${path}`;
    console.info(`File uploaded to: ${url}`);
    return url;
  }

}