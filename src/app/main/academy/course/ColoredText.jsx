import React from 'react';

function ColoredText({ text, ranges }) {
  // Split text into parts based on ranges
  const parts = [];
  let lastIndex = 0;
  ranges.forEach((range, index) => {
    const { start_index, end_index, type, color } = range;
    // Add text before the colored part
    parts.push(
      <span key={'part_' + index + '_before'}>
        {text.substring(lastIndex, start_index)}
      </span>
    );
    // Add the colored part with background color
    parts.push(
      <span key={'part_' + index + '_colored'} style={{ backgroundColor: color, color: 'white' }}>
        {text.substring(start_index, end_index + 1)}
      </span>
    );
    lastIndex = end_index + 1;
  });
  // Add remaining text
  parts.push(
    <span key={'part_' + ranges.length + '_remainder'}>
      {text.substring(lastIndex)}
    </span>
  );



  return <div>{parts}</div>;
}

export default ColoredText;