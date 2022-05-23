import '@polkadot/api-augment'
import { BN } from '@polkadot/util'
import IAccountRepository from '@/repositories/IAccountRepository'
import { resetContainer, mockTransient, cid, container } from 'inversify-props'
import { AccountRepositoryMock } from '../../mocks/repositories/AccountRepositoryMock'
import buildDependencyContainer from '@/app.container'
import IAccountService from '@/services/IAccountService'

describe('AccountService.ts', () => {
  beforeEach(() => {
    resetContainer()
    buildDependencyContainer()
    mockTransient<IAccountRepository>(cid.IAccountRepository, AccountRepositoryMock)
  })

  it('returns proper account info', async () => {
    const service = container.get<IAccountService>(cid.IAccountService)
    const result = await service.getAccount('any')

    expect(result.balance).toStrictEqual(new BN('1000000000000000000'))
  })
})
