import '@polkadot/api-augment'
import { BN } from '@polkadot/util'
import { IAccountRepository } from '@/repositories'
import { resetContainer, mockTransient, cid, container } from 'inversify-props'
import { AccountRepositoryMock } from '../../mocks/repositories/AccountRepositoryMock'
import { BalanceFormatterServiceMock } from '../../mocks/services/BalanceFormatterServiceMock'
import buildDependencyContainer from '@/app.container'
import { IAccountService, IBalanceFormatterService } from '@/services'

describe('AccountService.ts', () => {
  beforeEach(() => {
    resetContainer()
    buildDependencyContainer()
    mockTransient<IAccountRepository>(cid.IAccountRepository, AccountRepositoryMock)
    mockTransient<IBalanceFormatterService>(cid.IBalanceFormatterService, BalanceFormatterServiceMock)
  })

  it('returns proper account info', async (done) => {
    const service = container.get<IAccountService>(cid.IAccountService)
    const result = await service.getAccount('any')
    done()

    expect(result.balance).toStrictEqual(new BN('1000000000000000000'))
    expect(result.balanceFormatted).toBeDefined()
  })
})
