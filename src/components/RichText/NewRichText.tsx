import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import Link from 'next/link'
import { addHTTPS } from '@/utilities/addHTTPS'
import { randomUUID } from 'crypto'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<MediaBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: node.children,
    })

    return <p className="max-w-prose pb-3 text-lg font-normal text-pretty">{children}</p>
  },
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: node.children,
    })

    const Tag = node?.tag
    const textSizeMap = {
      h1: 'text-6xl md:text-7xl font-bold tracking-tight text-balance max-w-prose pb-16', // 3.375rem
      h2: 'text-5xl font-bold tracking-tight text-balance max-w-prose pb-8', // 3rem
      h3: 'text-4xl font-semibold tracking-tight text-balance max-w-prose pb-6', // 2.25rem
      h4: 'text-3xl font-semibold tracking-tight text-balance max-w-prose pb-4', // 1.875rem
      h5: 'text-2xl font-medium tracking-tight text-balance max-w-prose pb-4', // 1.5rem
      h6: 'text-xl font-medium tracking-tight text-balance max-w-prose pb-4', // 1.25rem
    }
    const textSizeClass = textSizeMap[Tag] || 'text-base'

    return <Tag className={cn('prose text-pretty', textSizeClass)}>{children}</Tag>
  },
  autolink: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: node.children,
    })

    const rel: string | undefined = node.fields.newTab ? 'noopener noreferrer' : undefined
    const target: string | undefined = node.fields.newTab ? '_blank' : undefined

    return (
      <a href={node.fields.url} className="text-red-600 underline" {...{ rel, target }}>
        {children}
      </a>
    )
  },
  link: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: node.children,
    })

    const rel: string | undefined = node.fields.newTab ? 'noopener noreferrer' : undefined
    const target: string | undefined = node.fields.newTab ? '_blank' : undefined

    let href: string = node.fields.url ?? ''
    if (node.fields.linkType === 'internal') {
      if (internalDocToHref) {
        href = internalDocToHref({ linkNode: node })
      } else {
        console.error(
          'Lexical => JSX converter: Link converter: found internal link, but internalDocToHref is not provided',
        )
        href = '#' // fallback
      }
    }
    if (node.fields.linkType === 'custom') {
      console.log('Link:', node)
      return (
        <a
          href={addHTTPS(href)}
          className="font-semibold underline decoration-blue-700 decoration-2 underline-offset-1"
          {...{ rel, target }}
        >
          {children}
        </a>
      )
    }
    if (node.fields.linkType === 'internal') {
      return (
        <Link
          href={href}
          className="font-semibold underline decoration-blue-700 decoration-2 underline-offset-1"
          {...{ rel, target }}
        >
          {children}
        </Link>
      )
    }
  },
  list: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: node.children,
    })

    const NodeTag = node.tag
    console.log('List:', node.listType)

    return (
      <NodeTag
        className={cn('ml-10 max-w-prose list-none pb-3 text-lg font-normal text-pretty', {
          'list-disc': node.listType === 'bullet',
          'list-decimal': node.listType === 'number',
          'list-check': node.listType === 'check',
        })}
      >
        {children}
      </NodeTag>
    )
  },
  listitem: ({ node, nodesToJSX, parent }) => {
    const hasSubLists = node.children.some((child) => child.type === 'list')

    const children = nodesToJSX({
      nodes: node.children,
    })

    if ('listType' in parent && parent?.listType === 'check') {
      const uuid = randomUUID()

      return (
        <li
          aria-checked={node.checked ? 'true' : 'false'}
          className={`list-item-checkbox${node.checked ? 'list-item-checkbox-checked' : 'list-item-checkbox-unchecked'}${hasSubLists ? 'nestedListItem' : ''}`}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
          role="checkbox"
          style={{ listStyleType: 'none' }}
          tabIndex={-1}
          value={node?.value}
        >
          {hasSubLists ? (
            children
          ) : (
            <>
              <input checked={node.checked} id={uuid} readOnly={true} type="checkbox" />
              <label htmlFor={uuid}>{children}</label>
              <br />
            </>
          )}
        </li>
      )
    } else {
      return (
        <li
          className={`${hasSubLists ? 'nestedListItem' : ''}`}
          style={hasSubLists ? { listStyleType: 'none' } : undefined}
          value={node?.value}
        >
          {children}
        </li>
      )
    }
  },
  blocks: {
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-span-3 col-start-1"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export function NewRichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'prose md:prose-md dark:prose-invert mx-auto': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
