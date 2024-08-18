import * as bcrypt from 'bcrypt';

export class Hash {
  static make(plainText: string | Buffer): string {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(plainText, salt);

    return hash;
  }

  static compare(plainText: string, hash: string): boolean {
    return bcrypt.compareSync(plainText, hash);
  }
}
