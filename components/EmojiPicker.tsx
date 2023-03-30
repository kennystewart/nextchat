import React from 'react';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

type EmojiData = {
  colons: string;
};

type EmojiPickerProps = {
  onEmojiSelect: (emoji: string) => void;
};

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
  const handleEmojiSelect = (emoji: EmojiData) => {
    if (typeof emoji.colons === 'string') {
      onEmojiSelect(emoji.colons);
    }
  };

  // Use the any type to bypass the type checking for the Picker component
  const PickerComponent = Picker as any;

  return <PickerComponent onSelect={handleEmojiSelect} />;
};

export default EmojiPicker;
