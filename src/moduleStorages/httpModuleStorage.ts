import { timeoutPromise } from '../helpers.js'
import { Storage as ModuleStorage } from './storage.js'
import fetch from 'node-fetch'

export class HttpModuleStorage implements ModuleStorage {
    public timeout = 60000

    public async getResource(
        uri: string,
        fetchController: AbortController = new AbortController()
    ): Promise<ArrayBuffer> {
        const response = await timeoutPromise(
            this.timeout,
            fetch(uri, { signal: fetchController.signal }),
            () => fetchController.abort()
        )

        if (!response.ok) {
            throw new Error(`HttpStorage can't load resource by URI ${uri}`)
        }

        const buffer = await response.arrayBuffer()

        return buffer
    }

    public async save(blob: Blob, registryUrl: string) {
        const form = new FormData()
        form.append('file', blob)

        const response = await fetch(`${registryUrl}/storage`, {
            method: 'POST',
            body: form,
        })

        const json = (await response.json()) as { success: boolean; message: string; data: string }
        if (!json.success) throw new Error(json.message || 'Error in saveToStorage')
        const url = `${registryUrl}/storage/${json.data}`
        return url
    }
}
