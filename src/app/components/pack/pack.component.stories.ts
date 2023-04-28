import type { Meta, StoryObj } from '@storybook/angular'
import { PackComponent } from './pack.component'
import { Pack, TEST_PACK } from 'src/app/interfaces/pack.interface'
import * as ost1 from 'packs/ost1.json'
import * as ost2 from 'packs/ost2.json'
import * as imagine from 'packs/imagine.json'

const meta: Meta<PackComponent> = {
  title: 'Components/Pack',
  component: PackComponent,
}

export default meta
type Story = StoryObj<PackComponent>

export const Test: Story = {
  name: 'Test pack',
  args: {
    pack: TEST_PACK,
  },
}

const ost1Pack = ost1 as unknown as Pack

export const Ost1: Story = {
  name: 'Original Soundtrack Vol. 1',
  args: {
    pack: ost1Pack,
  },
}

const ost2Pack = ost2 as unknown as Pack

export const Ost2: Story = {
  name: 'Original Soundtrack Vol. 2',
  args: {
    pack: ost2Pack,
  },
}

const imaginePack = imagine as unknown as Pack

export const Imagine: Story = {
  name: 'Imagine Dragons',
  args: {
    pack: imaginePack,
  },
}
