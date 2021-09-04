import React from 'react';
// material
import { MenuItem, TextField } from '@material-ui/core';

// ----------------------------------------------------------------------

interface Props {
  onSort?: () => void;
  options: any[];
}

const BlogPostsSort: React.FC<Props> = ({ options, onSort }) => {
  return (
    <TextField select size="small" value="latest" onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default BlogPostsSort;
