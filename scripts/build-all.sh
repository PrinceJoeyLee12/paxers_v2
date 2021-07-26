#!/usr/bin/env bash
echo 'Building.....'
lerna run build --scope=pxrs-graphql-queries --scope=pxrs-schemas --scope=pxrs-service-common
echo 'Everything was build'