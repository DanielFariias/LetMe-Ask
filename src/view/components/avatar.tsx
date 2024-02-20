interface IAvatarProps {
  imageUrl: string
  name: string
}

export function Avatar({ imageUrl, name }: IAvatarProps) {
  return (
    <div className="w-full flex items-center gap-2">
      <img src={imageUrl} alt={name} className="w-8 h-8 rounded-full" />
      <span className="text-gray-600 text-sm">{name}</span>
    </div>
  )
}
