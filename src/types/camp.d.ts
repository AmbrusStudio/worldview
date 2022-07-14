export type CampRole = {
  avatar: string
  name: string
}

export type CampVol = {
  id: number
  cover: string
  title: string
}

export type Camp = {
  x: number
  y: number
  logo: string
  name: string
  roles: Role[]
  vol: CampVol[]
}
