import 'reflect-metadata'
import { container } from 'inversify-props'
import IApiFactory from './integration/IApiFactory'
import ApiFactory from './integration/implementation/ApiFactory'
import NetworkService from './integration/implementation/NetworkService'
import INetworkService from './integration/INetworkService'
import IAccountRepository from './repositories/IAccountRepository'
import AccountRepository from './repositories/implementation/AccountRepository'
import IAccountService from './services/IAccountService'
import AccountService from './services/implementation/AccountService'

export default function buildDependencyContainer (): void {
  container.addSingleton<INetworkService>(NetworkService)
  container.addSingleton<IApiFactory>(ApiFactory)

  container.addTransient<IAccountRepository>(AccountRepository)
  container.addTransient<IAccountService>(AccountService)
}
