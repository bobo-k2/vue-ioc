import { Account } from '@/models'

describe('Account.ts', () => {
  it('throws error if address is not provided', () => {
    const call = () => new Account('')

    expect(call).toThrow(Error)
  })

  it('constructs proper Account', () => {
    const account = new Account('1', '2', '3', '4')

    expect(account.address).toStrictEqual('1')
    expect(account.genesisHash).toStrictEqual('2')
    expect(account.name).toStrictEqual('3')
    expect(account.source).toStrictEqual('4')
  })
})
