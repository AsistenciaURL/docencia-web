type Props = {
  type?: 'submit' | 'button'
  label: string
  onClick?: any
  margin?: boolean
}

const PrimaryButton = ({
  type = 'button',
  label,
  onClick,
  margin = true
}: Props) => {
  return (
    <button
      className={
        'text-white bg-[#0b357e] w-full hover:bg-[#0e47a8] p-1.5 h-full px-6 font-semibold rounded transition-colors ' +
        (margin ? 'mb-3' : '')
      }
      type="submit"
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default PrimaryButton
