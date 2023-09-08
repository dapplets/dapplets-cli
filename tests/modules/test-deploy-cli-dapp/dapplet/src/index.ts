import {} from '@dapplets/dapplet-extension'
import IMG_EXAMPLE from './icons/example.png'

@Injectable
export default class Dapplet {
  @Inject('test-deploy-config')
  public adapter
  private _globalContext = {}

  async activate(): Promise<void> {
    const { button } = this.adapter.exports
    this.adapter.attachConfig({
      GLOBAL: (global) => {
        Object.assign(this._globalContext, global)
      },
      BODY: (ctx) =>
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            img: IMG_EXAMPLE,
            label: 'v.0.1.11',
            exec: async (_, me) => {
              console.log('ctx', ctx)
              console.log('me', me)
            },
          },
        }),
    })
  }
}
