export interface ITransactionService {
  send(from: string, to: string, amount: string): Promise<void>
}
