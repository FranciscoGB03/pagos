import React from 'react';
import {Tooltip} from 'react-tippy';

const TooltipHover = ({texto = '', posicion = 'right', children}) =>
    <Tooltip title={texto} position={posicion} trigger='mouseenter'>{children}</Tooltip>;

export default TooltipHover;
