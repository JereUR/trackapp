interface Props {
  color?: string
  className?: string
}

const Loader: React.FC<Props> = ({ color, className }) => {
  return (
    <div
      className={`border-gray-300 h-5 w-5 animate-spin rounded-full border-[3px] ${
        color ? `${color}` : 'border-t-blue-600'
      }`}
    />
  )
}

export default Loader
