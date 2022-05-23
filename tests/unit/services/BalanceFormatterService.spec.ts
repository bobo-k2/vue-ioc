import '@polkadot/api-augment'
import { BN } from '@polkadot/util'
import { resetContainer, cid, container, mockTransient } from 'inversify-props'
import buildDependencyContainer from '@/app.container'
import { MetadataRepositoryMock } from '../../mocks/repositories/MetadataRepositoryMock'
import IMetadataRepository from '@/repositories/IMetadataRepository'
import IBalanceFormatterService from '@/services/IBalanceFormatterService'

describe('BalanceFormatterService.ts', () => {
  beforeEach(() => {
    resetContainer()
    buildDependencyContainer()
    mockTransient<IMetadataRepository>(cid.IMetadataRepository, MetadataRepositoryMock)
  })

  it('formats balance', async () => {
    const service = container.get<IBalanceFormatterService>(cid.IBalanceFormatterService)
    const result = await service.formatBalance(new BN('1234500000000000000'))

    expect(result).toStrictEqual('1.234')
  })
})
