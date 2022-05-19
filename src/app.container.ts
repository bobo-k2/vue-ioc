import 'reflect-metadata'
import { container } from 'inversify-props'
import IApiFactory from './integration/IApiFactory'
import ApiFactory from './integration/implementation/ApiFactory'
import NetworkService from './integration/implementation/NetworkService'
import INetworkService from './integration/INetworkService'
import IAccountRepository from './repositories/IAccountRepository'
import AccountRepository from './repositories/implementation/AccountRepository'

export default function buildDependencyContainer (): void {
  container.addSingleton<INetworkService>(NetworkService)
  container.addSingleton<IApiFactory>(ApiFactory)

  container.addSingleton<IAccountRepository>(AccountRepository)
}
