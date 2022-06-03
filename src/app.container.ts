import 'reflect-metadata'
import { container } from 'inversify-props'
import { interfaces } from 'inversify'
import {
  IApiFactory,
  INetworkService
} from '@/integration'
import {
  ApiFactory,
  NetworkService
} from '@/integration/implementation'
import {
  IAccountRepository,
  IMetadataRepository,
  IXcmRepository
} from '@/repositories'
import {
  AccountRepository,
  MetadataRepository,
  XcmRepository
} from '@/repositories/implementation'
import {
  IAccountService,
  IBalanceFormatterService,
  IXcmService,
  IWalletService,
  ITransactionService,
  WalletType
} from './services/'
import {
  AccountService,
  BalanceFormatterService,
  XcmService,
  PolkadotWalletService,
  MetamaskWalletService,
  TransactionService
} from '@/services/implementation'
import { Symbols } from './symbols'
import { IEventAggregator, EventAggregator } from '@/messaging'

let currentWalletType: WalletType

export function setCurrentWalletType (wallet: WalletType): void {
  currentWalletType = wallet
}

function getCurrentWalletType (): WalletType {
  return currentWalletType
}

export default function buildDependencyContainer (): void {
  setCurrentWalletType(WalletType.Polkadot)

  container.addSingleton<IEventAggregator>(EventAggregator)
  container.addSingleton<INetworkService>(NetworkService)
  container.addSingleton<IApiFactory>(ApiFactory)

  // need to specify id because not following name convention IService -> Service
  container.addSingleton<IWalletService>(PolkadotWalletService, WalletType.Polkadot)
  container.addSingleton<IWalletService>(MetamaskWalletService, WalletType.Metamask)

  // Wallet factory
  container.bind<interfaces.Factory<IWalletService>>(Symbols.WalletFactory)
    .toFactory(() => {
      return () => {
        return container.get<IWalletService>(getCurrentWalletType())
      }
    })

  container.addTransient<IAccountRepository>(AccountRepository)
  container.addTransient<IMetadataRepository>(MetadataRepository)
  container.addTransient<IXcmRepository>(XcmRepository)

  container.addTransient<IBalanceFormatterService>(BalanceFormatterService)
  container.addTransient<IAccountService>(AccountService)
  container.addTransient<IXcmService>(XcmService)
  container.addTransient<ITransactionService>(TransactionService)
}
