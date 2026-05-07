import { useEffect, useState } from 'react'
import * as React from 'react'
import { createPortal } from 'react-dom'

type Props = {
  selector: string
}

export const Portal: React.FC<React.PropsWithChildren<Props>> = ({ children, selector }) => {
  const [element, setElement] = useState<Element | null>(null)

  useEffect(() => {
    setElement(document.querySelector<Element>(selector))
  }, [selector])

  return element ? createPortal(children, element) : null
}
