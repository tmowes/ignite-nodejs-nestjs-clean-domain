import { Encryptor } from '@domains/forum/application/cryptography/encryptor'
import { HashComparer } from '@domains/forum/application/cryptography/hash-comparer'
import { HashGenerator } from '@domains/forum/application/cryptography/hash-generator'
import { Module } from '@nestjs/common'

import { JwtEncryptor } from './jwt-encryptor'
import { BcryptHasher } from './bcrypt-hasher'

@Module({
  providers: [
    { provide: Encryptor, useClass: JwtEncryptor },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encryptor, HashComparer, HashGenerator],
})
export class CryptographyModule {}
