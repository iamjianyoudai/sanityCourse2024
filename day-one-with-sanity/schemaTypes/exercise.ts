import {LuCheckCircle2} from 'react-icons/lu'
export default {
  name: 'exercise',
  type: 'document',
  title: 'Exercise',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: any) => Rule.required().min(5).max(100),
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{type: 'block'}],
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image', // Correctly select the image field as media
      content: 'content',
    },
    prepare: ({title, media, content}: {title: string; media: any; content: any[]}) => {
      const taskCount = content ? content.filter((b) => b.listItem === 'task').length : 0
      const subtitle = content ? (taskCount === 1 ? '1 task' : `${taskCount} tasks`) : `No tasks`

      return {
        title,
        subtitle,
        media: media || LuCheckCircle2, // Correctly use the media or fallback to the icon
      }
    },
  },
}
