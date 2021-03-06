import { createCommandHintBubble } from '@/lib/bottender-toolkit/templates/createCommandHintBubble'
import { LineContext } from 'bottender'

export const showTwitchTopGamesCommandBubble = (context: LineContext) =>
  createCommandHintBubble({
    commandLabel: '直播',
    commandDescription: '目前流行遊戲',
    commandText: '直播',
    context,
  })
