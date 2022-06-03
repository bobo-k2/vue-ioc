import { Network } from '@/models'
import { injectable } from 'inversify-props'
import { INetworkService } from '@/integration'

/**
 * Service that manages network connections.
 */
@injectable()
export class NetworkService implements INetworkService {
  /**
   * Gets current network
   *
   * @returns Currently connected network
   */
  getCurrentNetwork (): Network {
    return new Network('Shiden', 'wss://rpc.shiden.astar.network')
  }
}
