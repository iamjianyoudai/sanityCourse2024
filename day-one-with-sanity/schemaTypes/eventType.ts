import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {DoorsOpenInput} from './components/DoorsOpeninput'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    {name: 'details', title: 'Details'},
    {name: 'editorial', title: 'Editorial'},
  ],

  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      hidden: ({document}) => !document?.title,
      options: {
        source: 'title',
        maxLength: 66,
      },
      validation: (rule) => rule.required().error('Required to generate a page on the website '),
    }),
    defineField({
      name: 'date',
      type: 'datetime',
    }),
    defineField({
      name: 'eventType',
      type: 'string',
      options: {
        list: ['in-person', 'virtual'],
        layout: 'radio',
      },
      validation: (rule) => rule.required().error('Event type is required'),
    }),
    // defineField({
    //   name: 'doorsOpen1',
    //   description: 'Number of minutes before the start time for admission',
    //   type: 'number',
    //   initialValue: 60,
    // }),
    defineField({
      name: 'doorsOpen',
      description: 'Number of minutes before the start time for admission',
      type: 'number',
      initialValue: 60,
      group: 'details',
      components: {
        input: DoorsOpenInput,
      },
    }),

    defineField({
      name: 'venue',
      type: 'reference',
      to: [{type: 'venue'}],
      readOnly: ({document, value}) => !value && document?.eventType === 'virtual',
      // hidden: ({document}) => document?.eventType === 'virtual',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (!value && context?.document?.eventType === 'in-person') {
            return 'Venu is required for in-person events'
          }
          if (value && context?.document?.eventType === 'virtual') {
            return 'Only in-person events can have a venue'
          }

          return true
        }),
    }),
    defineField({
      name: 'headline',
      type: 'reference',
      to: [{type: 'artist'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: ['editorial'],
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{type: 'block'}],
      group: ['editorial'],
    }),
    defineField({
      name: 'tickets',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      name: 'title',
      venue: 'venue.name',
      artist: 'headline.name',
      date: 'date',
      image: 'image',
    },
    prepare({name, venue, artist, date, image}) {
      const nameFormatted = name || 'Untitled event'
      const dateFormatted = date
        ? new Date(date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })
        : 'No date'

      return {
        title: artist ? `${nameFormatted} (${artist})` : nameFormatted,
        subtitle: venue ? `${dateFormatted} at ${venue}` : dateFormatted,
        media: CalendarIcon || image,
      }
    },
  },
  // preview: {
  //   select: {
  //     title: 'title',
  //     subtitle: 'headline',
  //     media: 'image',
  //   },
  //   prepare({title, subtitle}) {
  //     return {
  //       title: title || 'Untitled Event',
  //       subtitle: subtitle || 'No headline artist selected',
  //       media: CalendarIcon,
  //     }
  //   },
  // },
})
