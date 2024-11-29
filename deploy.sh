# Axmos Technologies 
# Axmos Front End Example is an Open Source Project
# This file is just an example and is distributed without any warranty
# Made with love

#!/usr/bin/env bash

set -o xtrace

export $(grep -v '^#' dev.env_deploy | xargs)

gcloud storage buckets create $DESTINATION_BUCKET --location $REGION
gsutil -m rm -rf $DESTINATION_BUCKET/*
#Navigate to your build or dist folder
cd dist
gsutil -m cp -r . $DESTINATION_BUCKET 

gcloud storage buckets add-iam-policy-binding  $DESTINATION_BUCKET --member=allUsers --role=roles/storage.objectViewer
gcloud storage buckets update $DESTINATION_BUCKET --web-main-page-suffix=index.html --web-error-page=404.html