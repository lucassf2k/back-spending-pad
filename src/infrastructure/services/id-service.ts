import { randomUUID } from 'node:crypto';

export class IdService {
  private constructor() {}

  static UUID(): string {
    return randomUUID();
  }
}
