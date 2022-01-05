import { useEffect } from 'react';
import { useState } from 'react';
import styles from './topic-button.module.css';
export interface TopicButtonProps {
  topicName: string;
  onClick?: (topicName: string) => void;
}

export function TopicButton(props: TopicButtonProps) {
  const [icon, setIcon] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const cleanedSvgName = props.topicName
        .replace(/[^a-zA-Z0-9]/g, '')
        .toLocaleLowerCase();
      const topicSvgIcon = await import(`./icons/${cleanedSvgName}.svg`);
      setIcon(topicSvgIcon.default);
    };
    fetchData();
  }, [props.topicName]);

  const onClickHandler = () => {
    if (props.onClick) {
      props.onClick(props.topicName);
    } else {
      console.warn(
        `no click handler defined on topic button with topic ${props.topicName}`
      );
    }
  };

  return (
    <button className={styles.topicButton} onClick={onClickHandler}>
      <img src={icon} alt="" className="w-12" />
      <div className={styles.content}>{props.topicName}</div>
    </button>
  );
}

export default TopicButton;
