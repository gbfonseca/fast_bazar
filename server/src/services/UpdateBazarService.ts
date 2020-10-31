import { Bazar } from './../models/Bazar';
import { getRepository } from 'typeorm';

interface Request {
  name: string;
  address_street: string;
  address_number: string;
  address_state: string;
  address_city: string;
  address_complement: string;
  address_zip_code: string;
  phone: string;
  user_id: string
}

export default class UpdateBazarService {
  public async execute(id: string, data: Request): Promise<Bazar> {
    const bazarRepository = getRepository(Bazar);

    const bazar = await bazarRepository.findOne(id);

    if (!bazar) {
      throw new Error('User not found.');
    }

    bazarRepository.merge(bazar, data);

    await bazarRepository.save(bazar);

    return bazar;

  }
}
