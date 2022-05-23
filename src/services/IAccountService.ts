import AccountInfo from '../models/AccountInfo';

export default interface IAccountService {
  getAccount(address: string): Promise<AccountInfo>
}