import React from 'react';
import { TouchableOpacity, Text } from './style';

export const Button = ({theme, text, ...rest}) => {
  return (
    <TouchableOpacity theme={theme || ""} {...rest}>
        <Text theme={theme || ""}>
            {text}
        </Text>
    </TouchableOpacity>
  );
}