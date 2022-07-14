/**
 * open Worldview Organization by id
 * @param id
 * @returns
 */
export const openWorldviewOrganization = (id: number | string) => {
  return window.open(`${process.env.REACT_APP_AMBRUS_STUDIO}/worldview/organization/${id}`)
}

/**
 * open Worldview Ranger by id
 * @param id
 * @returns
 */
export const openWorldviewRanger = (id: number | string) => {
  return window.open(`${process.env.REACT_APP_AMBRUS_STUDIO}/worldview/ranger/${id}`)
}
