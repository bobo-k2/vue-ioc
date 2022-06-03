export class Guard {
  // eslint-disable-next-line
  public static ThrowIfUndefined (paramName: string, paramValue: any): void {
    if (!paramName) {
      throw new Error('Invalid argument paramName')
    }

    if (!paramValue) {
      throw new Error(`Invalid argument ${paramName}`)
    }
  }
}
