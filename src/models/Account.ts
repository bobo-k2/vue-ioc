import Guard from '@/common/Guard'

export default class Account {
  public readonly address: string;
  public readonly genesisHash: string | null | undefined
  public readonly name?: string
  public readonly source?: string

  constructor (address: string, genesisHash?: string | null | undefined, name?: string, source?: string) {
    Guard.ThrowIfUndefined('address', address)

    this.address = address
    this.genesisHash = genesisHash
    this.name = name
    this.source = source
  }
}
