import React from 'react'

import { Width } from '../Width'
import { RichText, type RichTextContent } from '@/components/RichText'

export const Message: React.FC = ({ message }: { message: RichTextContent }) => {
  return (
    <Width className="my-12" width={100}>
      {message && <RichText data={message} />}
    </Width>
  )
}
