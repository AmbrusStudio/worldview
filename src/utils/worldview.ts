/**
 * open Worldview Organization by id
 * @param id
 * @returns
 */
export const openWorldviewOrganization = (id: number | string): void => {
  window.open(`${process.env.REACT_APP_AMBRUS_STUDIO}/worldview/organization/${id}`, '_parent')
}

/**
 * open Worldview Ranger by id
 * @param id
 * @returns
 */
export const openWorldviewRanger = (id: number | string): void => {
  window.open(`${process.env.REACT_APP_AMBRUS_STUDIO}/worldview/ranger/${id}`, '_parent')
}
