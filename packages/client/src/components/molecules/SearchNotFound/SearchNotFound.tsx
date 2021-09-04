import React from 'react';
import { Paper, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

interface Props {
  searchQuery: string;
}

const SearchNotFound: React.FC<Props> = ({ searchQuery = '', ...other }) => {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos or
        using complete words.
      </Typography>
    </Paper>
  );
};

export default SearchNotFound;
