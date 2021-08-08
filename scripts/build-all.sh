#!/usr/bin/env bash
echo 'Building.....'
lerna run build --scope=pxrs-graphql-queries
cd packages/pxrs-schemas && npm run build
lerna run build --scope=pxrs-service-common
echo 'Everything was build'