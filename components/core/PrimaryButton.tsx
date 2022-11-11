type Props = {
  type?: 'submit' | 'button'
  label: string
  onClick?: any
  margin?: boolean
  full?: boolean
}

const PrimaryButton = ({
  type = 'button',
  label,
  onClick,
  full = true,
  margin = true
}: Props) => {
  return (
    <button
      className={
        'text-white bg-[#0b357e]  hover:bg-[#0e47a8] p-1.5 h-full px-6 font-semibold rounded transition-colors ' +
        (margin ? 'mb-3 ' : '') +
        (full ? 'w-full ' : '')
      }
      type="submit"
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default PrimaryButton
