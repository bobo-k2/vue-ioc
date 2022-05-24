import AccountInfoFormatted from '../models/AccountInfoFormatted'

export default interface IAccountService {
  getAccount(address: string): Promise<AccountInfoFormatted>
}
