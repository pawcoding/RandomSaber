import type { Meta, StoryObj } from '@storybook/angular'
import { PackComponent } from './pack.component'
import { TEST_PACK } from 'src/app/interfaces/pack.interface'

const meta: Meta<PackComponent> = {
  title: 'Components/Pack',
  component: PackComponent,
}

export default meta
type Story = StoryObj<PackComponent>

export const Primary: Story = {
  args: {
    pack: TEST_PACK,
  },
}
