import React from 'react';
import { alpha, styled } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const RootStyle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

const IconStyle = styled('div')(({ theme }) => ({
  marginLeft: -4,
  borderRadius: '50%',
  width: theme.spacing(2),
  height: theme.spacing(2),
  border: `solid 2px ${theme.palette?.background.paper}`,
  boxShadow: `inset -1px 1px 2px ${alpha(theme.palette?.common.black, 0.24)}`,
}));

interface ColorPreviewProps {
  colors: any[];
  limit?: number;
}

const ColorPreview: React.FC<ColorPreviewProps> = ({
  colors,
  limit = 3,
  ...other
}) => {
  const showColor = colors.slice(0, limit);
  const moreColor = colors.length - limit;

  return (
    <RootStyle component="span" {...other}>
      {showColor.map((color, index) => (
        <IconStyle key={color + index} sx={{ bgcolor: color }} />
      ))}

      {colors.length > limit && (
        <Typography variant="subtitle2">{`+${moreColor}`}</Typography>
      )}
    </RootStyle>
  );
};

export default ColorPreview;
