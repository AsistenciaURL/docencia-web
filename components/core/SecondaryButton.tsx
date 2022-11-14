type Props = {
  type?: 'submit' | 'button'
  label: string
  onClick?: any
  margin?: boolean
  full?: boolean
}

const SecondaryButton = ({
  type = 'button',
  label,
  onClick,
  margin = true,
  full = true
}: Props) => {
  return (
    <button
      className={
        'text-[#0b357e] hover:text-[#3872d5] p-1.5 h-full px-6 font-semibold rounded transition-colors ' +
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

export default SecondaryButton
