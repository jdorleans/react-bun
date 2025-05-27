import datasource from "@/database/datasource";
import {Profile} from "@/model/Profile";
import {Repository} from "typeorm";

export class ProfileRepository {

  private readonly repository: Repository<Profile> = datasource.getRepository(Profile);

  async findById(id?: string): Promise<Profile | null> {
    console.debug(`ProfileRepository.findById: ${id}`);
    return id ? this.repository.findOneBy({id}) : null;
  }

  async findAll(search?: string): Promise<Profile[]> {
    console.debug(`ProfileRepository.findAll: ${search}`);
    const query = this.repository.createQueryBuilder("p");
    if (search) query.where("p.name ILIKE :search OR p.location ILIKE :search", {search: `%${search}%`});
    return await query.orderBy("p.createdAt", "ASC").getMany();
  }

  async findLast(): Promise<Profile | null> {
    console.debug("ProfileRepository.findLast");
    return this.repository.findOne({where: {}, order: {createdAt: "DESC"}});
  }

  async create(profile: Partial<Profile>): Promise<Profile> {
    console.debug(`ProfileRepository.create: ${JSON.stringify(profile)}`);
    return this.repository.save(profile);
  }

  async update(profile: Partial<Profile>): Promise<Profile> {
    console.debug(`ProfileRepository.update: ${JSON.stringify(profile)}`);
    const id = profile.id;
    let dbProfile = await this.findById(id);
    if (!dbProfile) throw new Error(`Profile with id ${id} not found`);
    dbProfile = this.repository.merge(dbProfile, profile);
    return this.repository.save(dbProfile);
  }

  async delete(id: string): Promise<Profile> {
    console.debug(`ProfileRepository.delete: ${id}`);
    let dbProfile = await this.findById(id);
    if (!dbProfile) throw new Error(`Profile with id ${id} not found`);
    return await this.repository.remove(dbProfile);
  }

}