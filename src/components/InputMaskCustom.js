import * as React from 'react'
import InputMask from 'react-input-mask'

const InputMaskCustom = (props, ref) => {
  return (
    <InputMask {...props} ref={ref} alwaysShowMask mask="+41 99 999 99 99" />
  )
}

export default React.forwardRef(InputMaskCustom)
