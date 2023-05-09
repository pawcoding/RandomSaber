import type { Meta, StoryObj } from '@storybook/angular'
import { SongSelectorComponent } from './song-selector.component'
import { TEST_PACK } from 'src/app/interfaces/pack.interface'

const meta: Meta<SongSelectorComponent> = {
  title: 'Components/Song selector',
  component: SongSelectorComponent,
}

export default meta
type Story = StoryObj<SongSelectorComponent>

export const Primary: Story = {
  args: {
    pack: TEST_PACK,
  },
}
