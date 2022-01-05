import { TopicButton } from '@jasalguero/shared/ui';
import './topics.module.css';

/* eslint-disable-next-line */
export interface TopicsProps {}

export function Topics(props: TopicsProps) {
  return (
    <div className="p-20 bg-gray-100 md:container md:mx-auto">
      <TopicButton topicName="Next.js" />
    </div>
  );
}

export default Topics;
