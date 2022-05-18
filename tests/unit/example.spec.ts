import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import { TokenApi } from '../../src/repositories/token-api'
import { TokenApiKey } from '../../src/repositories/symbols'

const tokenApiMock: jest.Mocked<TokenApi> = {
  getTvl: jest.fn()
}

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    tokenApiMock.getTvl.mockImplementation(() => {
      return 22
    })

    const wrapper = shallowMount(HelloWorld, {
      global: {
        provide: {
          [<symbol>TokenApiKey]: tokenApiMock
        }
      }
    })

    expect(wrapper.text()).toMatch('22')
  })
})
