import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fieldsets: [
    // The schema of a document can use a fieldsets key to visually arrange fields together, without effecting how they are nested in the data.
    {name: 'dates', title: 'Dates', options: {columns: 2}},
  ],
  fields: [
    defineField({name: 'Subtitle', type: 'string'}),
    defineField({name: 'publishedAt', type: 'datetime', fieldset: 'dates'}),
    defineField({name: 'updatedAt', type: 'datetime', fieldset: 'dates'}),

    defineField({
      name: 'coordinate',
      type: 'object',
      options: {
        collapsed: true,
        columns: 2,
      },
      fields: [defineField({name: 'x', type: 'number'}), defineField({name: 'y', type: 'number'})],
    }),
    // Lock this field unless you're an administrator
    defineField({
      name: 'discount',
      description: 'Contact an Administrator to change this value',
      type: 'string',
      // validation: (rule) =>
      //   rule
      //     .min(1)
      //     .max(3)
      //     .warning('For consistency, this summary should be between 1-3 characters'),
      readOnly: ({currentUser}) => {
        const isAdmin = currentUser?.roles.some((role) => role.name === 'administrator')

        return !isAdmin
      },
    }),

    // Hide this field unless you're an administrator

    defineField({
      name: 'userId',
      type: 'number',
      hidden: ({currentUser}) => {
        const isAdmin = currentUser?.roles.find((role) => role.name === 'administrator')

        return !isAdmin
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare: ({title, content}) => {
      const taskCount = content ? content.filter((b) => b.listItem === 'task').length : 0
      const subtitle = content ? (taskCount === 1 ? '1 task' : `${taskCount} tasks`) : `No tasks`

      return {
        title,
        subtitle,
        media: '',
      }
    },
  },
})
