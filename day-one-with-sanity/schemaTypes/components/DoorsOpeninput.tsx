// import {NumberInputProps} from 'sanity'

// export function DoorsOpenInput(props: NumberInputProps) {
//   return <div style={{border: '1px solid red'}}>DoorsOpenInput</div>
// }

import {Stack, Text} from '@sanity/ui'
import {NumberInputProps, useFormValue} from 'sanity'

function subtractMinutesFromDate(date: string, minutes: number) {
  return new Date(new Date(date).getTime() - minutes * 60000)
}

export function DoorsOpenInput(props: NumberInputProps) {
  const date = useFormValue(['date']) as string | undefined

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      {typeof props.value === 'number' && date ? (
        <Text size={1}>
          Doors open{' '}
          {subtractMinutesFromDate(date, props.value).toLocaleDateString(undefined, {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </Text>
      ) : null}
    </Stack>
  )
}
