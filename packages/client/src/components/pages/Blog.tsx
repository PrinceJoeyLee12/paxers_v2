import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@material-ui/core';
// components
import Page from '../molecules/PageHelmet/Page';
import {
  BlogPostCard,
  BlogPostsSort,
  BlogPostsSearch,
} from '../organisms/Blogs';
//
import POSTS from '../../_mocks_/blog';
import React from 'react';

// ----------------------------------------------------------------------

const SORT_OPTIONS: any = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------
const Blog: React.FC = () => {
  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Post
          </Button>
        </Stack>
        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {POSTS.map((post: any, index: number) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
};

export default Blog;
