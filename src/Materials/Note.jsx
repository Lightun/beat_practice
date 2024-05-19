import React from 'react';
import styled from 'styled-components';

const StyledNote = styled.div`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background: ${props => props.color};
  left: ${props => props.position * props.width}px;
  top: ${props => props.y}px;
  transition: top 0.1s linear;
`;

const Note = ({ position, y, color, width, height }) => {
  return (
    <StyledNote
      position={position}
      y={y}
      color={color}
      width={width}
      height={height}
    />
  );
};

export default Note;
