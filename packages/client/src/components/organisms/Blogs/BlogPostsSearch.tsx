import React from 'react';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled } from '@material-ui/core/styles';
import {
  Box,
  TextField,
  Autocomplete,
  InputAdornment,
} from '@material-ui/core';

// ----------------------------------------------------------------------

const RootStyle: any = styled('div')(({ theme }: any) => ({
  '& .MuiAutocomplete-root': {
    width: 200,
    transition: theme.transitions?.create('width', {
      easing: theme.transitions?.easing.easeInOut,
      duration: theme.transitions?.duration.shorter,
    }),
    '&.Mui-focused': {
      width: 300,
      '& .MuiAutocomplete-inputRoot': {
        boxShadow: theme.customShadows?.z12,
      },
    },
  },
  '& .MuiAutocomplete-inputRoot': {
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette?.grey[500_32]} !important`,
    },
  },
  '& .MuiAutocomplete-option': {
    '&:not(:last-child)': {
      borderBottom: `solid 1px ${theme.palette?.divider}`,
    },
  },
}));

// ----------------------------------------------------------------------

interface Props {
  posts: any[];
}

const BlogPostsSearch: React.FC<Props> = ({ posts }) => {
  return (
    <RootStyle>
      <Autocomplete
        size="small"
        disablePortal
        popupIcon={null}
        options={posts}
        getOptionLabel={(post) => post.title}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search post..."
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <Box
                      component={Icon}
                      icon={searchFill}
                      sx={{
                        ml: 1,
                        width: 20,
                        height: 20,
                        color: 'text.disabled',
                      }}
                    />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </RootStyle>
  );
};
export default BlogPostsSearch;
