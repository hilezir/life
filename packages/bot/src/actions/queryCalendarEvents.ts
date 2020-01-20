import { LineAction } from '@/lib/bottender-toolkit/types'
import { calendarAPI } from '@/lib/googleapis/calendarAPI'
import { createCoverBubble } from '@/lib/bottender-toolkit/templates/createCoverBubble'
import dayjs from 'dayjs'

export const queryCalendarEvents: LineAction = async (context, props) => {
  try {
    const items = await calendarAPI.getAfterTodayEvents()

    if (items?.length) {
      context.sendFlex('查詢甜豬的日曆', {
        type: 'carousel',
        contents: [
          ...(items.map(item => {
            if (!item.start?.date && !item.start?.dateTime) {
              return
            }
            const eventDatetime = dayjs(
              item.start?.date || item.start?.dateTime || '',
            )

            return createCoverBubble({
              info: {
                left: '活動資訊',
                right: '日曆',
              },
              footer: item.organizer?.displayName || '',
              subTitle: item.summary || '',
              title: eventDatetime.format('YYYY-MM-DD'),
            })
          }) as any),
        ],
      })
    } else {
      context.sendText('日曆沒有任何活動')
    }
  } catch (error) {
    context.sendText(error.message)
  }

  return props.next
}
