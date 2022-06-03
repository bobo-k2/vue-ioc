export default class Guard {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static ThrowIfUndefined (paramName: string, paramValue: any): void {
    if (!paramName) {
      throw new Error('Invalid argument paramName')
    }

    if (!paramValue) {
      throw new Error(`Invalid argument ${paramName}`)
    }
  }
}
