#!/usr/bin/env bash
#if output=$(git status --porcelain) && [ -z "$output" ]; then
  # Working directory clean
  git checkout feature
  dir="../build"
  [ -d  $dir ] && rm  -rf $dir

  file="build.zip "
  [ -f $file ] && rm  -rf $file

  npm run build &&

  cd ../build/
scp -r * fsd@64.227.153.239:/var/www/sargaPortalFeature/html &&
echo "Deployment completed"

echo "Clearing Deployment junks"
[ -d  $dir2 ] && rm  -rf $dir2
[ -d $dir ] && rm  -rf $dir
git checkout feature
exit