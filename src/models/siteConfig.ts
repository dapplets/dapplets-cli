import Base from '../common/base.js'
import { DappletRuntimeResult } from '../types.js'

// ToDo: It should be UserConfig
export default class SiteConfig extends Base {
    getId = () => this.hostname

    hostname: string = null

    activeFeatures: {
        [name: string]: {
            version: string
            isActive: boolean
            order: number
            runtime: DappletRuntimeResult
            registryUrl: string
        }
    } = {}

    paused: boolean = null
}
