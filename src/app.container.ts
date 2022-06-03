import 'reflect-metadata'
import { container } from 'inversify-props'
import { interfaces } from 'inversify'
import IApiFactory from './integration/IApiFactory'
import ApiFactory from './integration/implementation/ApiFactory'
import NetworkService from './integration/implementation/NetworkService'
import INetworkService from './integration/INetworkService'
import IAccountRepository from './repositories/IAccountRepository'
import AccountRepository from './repositories/implementation/AccountRepository'
import IAccountService from './services/IAccountService'
import AccountService from './services/implementation/AccountService'
import IBalanceFormatterService from './services/IBalanceFormatterService'
import BalanceFormatterService from './services/implementation/BalanceFormatterService'
import IMetadataRepository from './repositories/IMetadataRepository'
import MetadataRepository from './repositories/implementation/MetadataRepository'
import IXcmRepository from './repositories/IXcmRepository'
import XcmRepository from './repositories/implementation/XcmRepository'
import IXcmService from './services/IXcmService'
import XcmService from './services/implementation/XcmService'
import IWalletService, { WalletType } from './services/IWalletService'
import PolkadotWalletService from './services/implementation/PolkadotWalletService'
import MetamaskWalletService from './services/implementation/MetamaskWalletService'
import { Symbols } from './symbols'
import ITransactionService from './services/ITransactionService'
import TransactionService from './services/implementation/TransactionService'
import IEventAggregator from './messaging/IEventAggregator'
import EventAggregator from './messaging/EventAggregator'

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
