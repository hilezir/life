import { queryTwitchStreamsAction } from '@/actions/queryTwitchStreams/queryTwitchStreamsAction'
import { LineContext, chain } from 'bottender'
import { router, text, platform } from 'bottender/dist/router'
import { queryTwitchStreamsText } from '@/actions/queryTwitchStreams/queryTwitchStreamsText'
import { i18nAPI } from '@/lib/i18n/i18nAPI'
import { recordUserSayingAction } from '@/actions/recordUserSaying/recordUserSayingAction'
import { sayHiAction } from '@/actions/sayHi/sayHiAction'
import { createDirectlyText } from '@/utils/createDirectlyText'
import { createCommandText } from '@/utils/createCommandText'
import { queryCalendarEventsAction } from '@/actions/queryCalendarEvents/queryCalendarEventsAction'
import { showTwitchTopGamesAction } from '@/actions/showTwitchTopGames/showTwitchTopGamesAction'
import { isMultiPeopleMessage } from '@/selectors/isMultiPeopleMessage'
import { sayBullshitAction } from '@/actions/sayBullshit/sayBullshitAction'
import { sayBullshitText } from '@/actions/sayBullshit/sayBullshitText'
import { newsAPI } from '@/lib/news/newsAPI'
import { queryNewsAction } from '@/actions/queryNews/queryNewsAction'
import { createUniversalText } from '@/utils/createUniversalText'
import { showTwitchTopGamesText } from '@/actions/showTwitchTopGames/showTwitchTopGamesText'
import { queryWar3NewsText } from '@/actions/queryNews/queryNewsText'

export default async function App(context: LineContext): Promise<unknown> {
  await i18nAPI.init()

  return chain([
    recordUserSayingAction,
    router([
      platform(
        'telegram',
        router([
          text(
            createUniversalText(context, sayBullshitText),
            sayBullshitAction as any,
          ),
          text(
            createUniversalText(context, `(?<text>[\\s\\S]+)`),
            sayHiAction as any,
          ),
        ]),
      ),
      platform(
        'line',
        router([
          text(
            createUniversalText(context, queryWar3NewsText),
            queryNewsAction as any,
          ),
          text(
            createUniversalText(context, sayBullshitText),
            sayBullshitAction as any,
          ),
          text(
            createUniversalText(context, showTwitchTopGamesText),
            showTwitchTopGamesAction as any,
          ),
          text(
            createDirectlyText('(LA|ＬＡ)日曆'),
            queryCalendarEventsAction as any,
          ),
          text(
            createUniversalText(context, queryTwitchStreamsText),
            queryTwitchStreamsAction as any,
          ),
          text(
            createUniversalText(context, `(?<text>[\\s\\S]+)`),
            sayHiAction as any,
          ),
        ]),
      ),
    ] as any),
  ] as any)
}
