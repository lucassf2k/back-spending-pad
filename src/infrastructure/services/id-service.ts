import { v7 as uuidV7 } from 'uuid';

export class IdService {
  private constructor() {}

  static UUID(): string {
    return uuidV7();
  }
}
