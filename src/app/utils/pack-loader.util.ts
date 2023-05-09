import { inject } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Pack } from '../interfaces/pack.interface'
import { firstValueFrom } from 'rxjs'
import { environment } from '../../environments/environment'

/**
 * Singleton class to load packs from server or local storage
 */
export class PackLoaderUtil {
  // singleton
  private static _instance?: PackLoaderUtil
  // initialize utils
  private readonly _http = inject(HttpClient)
  private _hasInternetConnection = true

  /**
   * Private constructor to prevent creating new instances of the singleton
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  /**
   * Get the singleton instance of the PackLoader
   */
  public static getPackLoader(): PackLoaderUtil {
    if (!this._instance) this._instance = new PackLoaderUtil()
    return this._instance
  }

  /**
   * Load all packs from server or local storage
   */
  public async loadPacks(): Promise<{ [id: string]: Pack }> {
    let startHrTime = process.hrtime()

    const register = await this._loadRegister()

    let elapsedHrTime = process.hrtime(startHrTime)
    let elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1000000
    console.info(
      `[PackLoader]\tLoaded register with ${
        register.length
      } packs in ${elapsedTimeInMs.toFixed(2)}ms.`
    )

    startHrTime = process.hrtime()
    const fetchedPacks = await Promise.all(
      register.map((packId) => this._loadPack(packId))
    )

    const packsAsArray = fetchedPacks.filter((pack) => !!pack) as Pack[]

    elapsedHrTime = process.hrtime(startHrTime)
    elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1000000
    console.info(
      `[PackLoader]\tLoaded ${
        packsAsArray.length
      } packs in ${elapsedTimeInMs.toFixed(2)}ms.`
    )

    return packsAsArray.reduce((packs, pack) => {
      packs[pack.id] = pack
      return packs
    }, {} as { [id: string]: Pack })
  }

  /**
   * Save pack to local storage.
   * @param pack Pack to save
   * @param logEvent Whether to log the event
   */
  public safePackToLocalStorage(pack: Pack, logEvent = true): void {
    if (logEvent)
      console.info(`[PackLoader]\tSaving pack "${pack.id}" to local storage.`)
    localStorage.setItem(pack.id, JSON.stringify(pack))
  }

  /**
   * Load register from server or local storage.
   */
  private async _loadRegister(): Promise<string[]> {
    // load register content from local storage
    let registerContent = localStorage.getItem('register') ?? ''

    try {
      // prefer server to local storage if register changes
      registerContent = await firstValueFrom(
        this._http.get(`${environment.dataUrl}/.register`, {
          responseType: 'text',
        })
      )
      // save new register content to local storage
      localStorage.setItem('register', registerContent)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: HttpErrorResponse | any) {
      if (error instanceof HttpErrorResponse && error.status === 0) {
        this._hasInternetConnection = false
        console.info(
          '[PackLoader]\tNo internet connection. Using local storage for register instead.'
        )
      } else {
        console.error(
          '[PackLoader]\tUnexpected error while loading register.',
          error
        )
      }
    }

    return registerContent
      .replace(/\r/g, '')
      .split('\n')
      .filter((line) => line.length > 0)
  }

  /**
   * Load pack from server or local storage.
   * @param packId Unique pack id
   */
  private async _loadPack(packId: string): Promise<Pack | undefined> {
    // load pack from local storage
    const localPack = this._loadPackFromLocalStorage(packId)
    const remotePack = this._hasInternetConnection
      ? await this._loadPackFromRemote(packId)
      : undefined

    if (remotePack) {
      remotePack.songs.forEach((song, index) => {
        song.number = index

        if (localPack)
          song.active = !!localPack.songs.find(
            (s) => s.title.toLowerCase() === song.title.toLowerCase()
          )?.active
        else song.active = remotePack.type === 'OST'
      })

      this.safePackToLocalStorage(remotePack, false)
      return remotePack
    } else {
      if (localPack) return localPack

      console.error(`[PackLoader]\tCould not load pack "${packId}".`)
      return undefined
    }
  }

  /**
   * Load pack from local storage.
   * @param packId Unique pack id
   */
  private _loadPackFromLocalStorage(packId: string): Pack | undefined {
    const packContent = localStorage.getItem(packId)
    if (!packContent) return undefined

    // TODO: Check pack scheme
    return JSON.parse(packContent) as Pack
  }

  /**
   * Load pack from server.
   * @param packId Unique pack id
   */
  private async _loadPackFromRemote(packId: string): Promise<Pack | undefined> {
    try {
      // TODO: Check pack scheme
      return await firstValueFrom(
        this._http.get<Pack>(`${environment.dataUrl}/${packId}.json`)
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: HttpErrorResponse | any) {
      if (error instanceof HttpErrorResponse && error.status === 0) {
        this._hasInternetConnection = false
        console.info(
          `[PackLoader]\tNo internet connection. Trying to use local storage for pack "${packId}" instead.`
        )
      } else {
        console.error(
          `[PackLoader]\tUnexpected error while loading pack "${packId}".`,
          error
        )
      }
      return undefined
    }
  }
}
