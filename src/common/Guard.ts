export default class Guard {
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static ThrowIfUndefined (paramName: string, paramValue: object): void {
    if (!paramName) {
      throw new Error('Invalid argument paramName')
    }

    if (!paramValue) {
      throw new Error(`Invalid argument ${paramName}`)
    }
  }
}
