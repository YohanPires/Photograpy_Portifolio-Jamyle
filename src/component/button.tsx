type ButtonProps = {
  label: string
  href?: string
  color?: string
  textSize?: string
  paddingX?: string
  paddingY?: string
  className?: string
  onClick?: () => void
}

const Button = ({
  label,
  href,
  color = '#ffffff',
  textSize = '0.75rem',
  paddingX = '2rem',
  paddingY = '0.75rem',
  className = '',
  onClick,
}: ButtonProps) => {
  const style = {
    color,
    fontSize: textSize,
    borderColor: color,
    paddingLeft: paddingX,
    paddingRight: paddingX,
    paddingTop: paddingY,
    paddingBottom: paddingY,
  }

  const base = `
    group flex w-fit items-center gap-3
    border tracking-widest rounded-full
    transition-all duration-300 hover:scale-105
    ${className}
  `

  if (href) {
    return (
      <a href={href} style={style} className={base}>
        {label}
        <span className="transition-transform duration-300">→</span>
      </a>
    )
  }

  return (
    <button onClick={onClick} style={style} className={base}>
      {label}
      <span className="transition-transform duration-300">→</span>
    </button>
  )
}

export default Button