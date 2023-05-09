import { Meta, StoryObj, moduleMetadata } from '@storybook/angular'
import { MusicPacksComponent } from './music-packs.component'
import { PackComponent } from '../pack/pack.component'
import { Pack, TEST_PACK } from 'src/app/interfaces/pack.interface'
import * as ost1 from 'packs/ost1.json'
import * as ost2 from 'packs/ost2.json'
import * as imagine from 'packs/imagine.json'

const meta: Meta<MusicPacksComponent> = {
  title: 'Components/Music packs',
  component: MusicPacksComponent,
  decorators: [
    moduleMetadata({
      declarations: [PackComponent],
    }),
  ],
}

export default meta
type Story = StoryObj<MusicPacksComponent>

const ost1Pack = ost1 as unknown as Pack
const ost2Pack = ost2 as unknown as Pack
const imaginePack = imagine as unknown as Pack

export const Primary: Story = {
  args: {
    packs: [TEST_PACK, ost1Pack, ost2Pack, imaginePack],
  },
}
