import cssModuleNameTag from 'shared/components/utils/cssModuleNameTag'
import styles from './styles.scss'

const loadClass = cssModuleNameTag(styles)

export default function(props) {
  const { className, ...rest } = props
  return (
    <input
      className={loadClass`root ${className}`}
      type="text"
      {...rest}
    />
  )
}