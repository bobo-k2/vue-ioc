import Network from '@/models/Network'
import { injectable } from 'inversify-props'
import INetworkService from '../INetworkService'

/**
 * Service that manages network connections.
 */
@injectable()
export default class NetworkService implements INetworkService {
  /**
   * Gets current network
   *
   * @returns Currently connected network
   */
  getCurrentNetwork (): Network {
    return new Network('Astar', 'wss://rpc.astar.network')
  }
}
