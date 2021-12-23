import { Story, Meta } from '@storybook/react';
import { TopicButton, TopicButtonProps } from './topic-button';

export default {
  component: TopicButton,
  title: 'TopicButton',
} as Meta;

const Template: Story<TopicButtonProps> = (args) => {
  return (
    <div className='p-20 bg-gray-100'>
      <TopicButton {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
