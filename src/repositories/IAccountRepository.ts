import { FrameSystemAccountInfo } from '@polkadot/types/lookup'

export default interface IAccountRepository {
  getAccount(address: string): Promise<FrameSystemAccountInfo>
}
