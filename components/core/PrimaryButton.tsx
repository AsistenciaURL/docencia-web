import Loader from './Loader'

type Props = {
  type?: 'submit' | 'button'
  label: string
  onClick?: any
  margin?: boolean
  full?: boolean
  loading?: boolean
  disabled?: boolean
}

const PrimaryButton = ({
  type = 'button',
  label,
  onClick,
  full = true,
  disabled = false,
  margin = true,
  loading = false
}: Props) => {
  return (
    <button
      className={
        'text-white bg-[#0b357e] justify-center items-center flex hover:bg-[#0e47a8] p-1.5 h-full px-6 font-semibold rounded transition-all disabled:bg-gray-200 disabled:text-gray-500 ' +
        (margin ? 'mb-3 ' : '') +
        (full ? 'w-full ' : '')
      }
      disabled={disabled}
      type="submit"
      onClick={onClick}
    >
      {loading ? <Loader /> : label}
    </button>
  )
}

export default PrimaryButton
