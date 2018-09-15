import { Component } from 'react'
import { createPortal } from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import cssModuleNameTag from 'shared/components/utils/cssModuleNameTag'
import styles from './styles.scss'

const loadClass = cssModuleNameTag(styles)

const getParentSelector = () => document.body

const Header = ({ children, onClose }) => (
  <div className={loadClass`header`}>
    {children}
    <FontAwesomeIcon icon="times" size="lg" onClick={onClose} />
  </div>
)

const Presentational = ({ fixedWidth = '50%', title, children, onClose }) => (
  <>
    <div className={loadClass`overlay`} onClick={onClose} />
    <div className={loadClass`root`} style={{ width: fixedWidth }}>
      <Header onClose={onClose}>{title}</Header>
      <div className={loadClass`content`}>{children}</div>
    </div>
  </>
)

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpened: this.props.isOpened }
  }

  static getDerivedStateFromProps(nextProps) {
    return { isOpened: nextProps.isOpened }
  }

  componentDidMount() {
    this.node = document.createElement('div')
    getParentSelector().appendChild(this.node)
  }

  componentWillUnmount() {
    getParentSelector().removeChild(this.node)
  }

  renderModalPortal = () =>createPortal(<Presentational {...this.props} />, this.node)

  render() {
    return !this.state.isOpened ? null : this.renderModalPortal()
  }
}

export default Modal