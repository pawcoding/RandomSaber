import type { Meta, StoryObj } from '@storybook/angular'
import { MusicPacksComponent } from './music-packs.component'
import { TEST_PACK } from 'src/app/interfaces/pack.interface'

const meta: Meta<MusicPacksComponent> = {
  title: 'Components/Music packs',
  component: MusicPacksComponent,
}

export default meta
type Story = StoryObj<MusicPacksComponent>

export const Primary: Story = {
  args: {
    packsInput: [TEST_PACK],
  },
}
