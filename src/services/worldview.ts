import instance from './instance'

/**
 * v1 getWorldViewInfoApi
 * @returns
 */
export async function getWorldViewInfoApi(): Promise<API.Response<API.Camp[]>> {
  return await instance.get('/v1/getWorldViewInfoApi')
}
