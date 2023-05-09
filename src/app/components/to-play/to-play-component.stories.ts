import type { Meta, StoryObj } from '@storybook/angular'
import { ToPlayComponent } from './to-play.component'
import { TEST_SONG_TO_PLAY } from 'src/app/interfaces/song-to-play.interface'

const meta: Meta<ToPlayComponent> = {
  title: 'Components/To play',
  component: ToPlayComponent,
}

export default meta
type Story = StoryObj<ToPlayComponent>

export const Primary: Story = {
  args: {
    songs: [TEST_SONG_TO_PLAY],
  },
}
