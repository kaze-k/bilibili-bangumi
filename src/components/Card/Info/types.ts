interface InfoProps {
  likes?: string
  coins?: string
  favorite?: string
  share?: string
  reply?: string
}

interface IconType {
  name: string
  icon: "like" | "coins" | "favorite" | "share" | "reply"
  prop: string
}

export { InfoProps, IconType }
