export default class XcmNetwork {
  public name: string
  public endpoint: string

  constructor (name: string, endpoint: string) {
    this.name = name
    this.endpoint = endpoint
  }
}
