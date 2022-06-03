import Guard from '@/common/Guard'

describe('Guard.ts', () => {
  it('throws error if paramName is not provided', () => {
    const call = () => Guard.ThrowIfUndefined('', 5)

    expect(call).toThrow(Error)
    expect(call).toThrow('Invalid argument paramName')
  })

  it('throws error if paramvalue is not provided', () => {
    const call = () => Guard.ThrowIfUndefined('param', undefined)
    const call2 = () => Guard.ThrowIfUndefined('param', null)
    const call3 = () => Guard.ThrowIfUndefined('param', '')

    expect(call).toThrow(Error)
    expect(call).toThrow('Invalid argument param')

    expect(call2).toThrow(Error)
    expect(call3).toThrow(Error)
  })
})
