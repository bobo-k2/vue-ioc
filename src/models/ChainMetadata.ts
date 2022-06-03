export default class ChainMetadata {
  public decimals: number
  public token: string

  constructor (decimals: number, token: string) {
    this.decimals = decimals
    this.token = token
  }
}
