export interface IQuestion {
  id: string
  content: string
  author: {
    name: string
    avatar: string
  }
  isHighlighted: boolean
  isAnswered: boolean
  likeCount: number
  likeId: string | undefined
}
