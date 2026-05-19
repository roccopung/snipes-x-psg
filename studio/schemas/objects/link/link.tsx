import {LinkIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export const link = defineField({
  title: 'Link',
  name: 'link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'Internal Link', value: 'linkInternal'},
          {title: 'External Link', value: 'linkExternal'},
          {title: 'Email Link', value: 'linkEmail'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkInternal',
      type: 'linkInternal',
      title: 'Internal Link',
      hidden: ({parent}) => parent?.linkType !== 'linkInternal',
    }),
    defineField({
      name: 'linkExternal',
      type: 'linkExternal',
      title: 'External Link',
      hidden: ({parent}) => parent?.linkType !== 'linkExternal',
    }),
    defineField({
      name: 'linkEmail',
      type: 'linkEmail',
      title: 'Email Link',
      hidden: ({parent}) => parent?.linkType !== 'linkEmail',
    }),
  ],
})
