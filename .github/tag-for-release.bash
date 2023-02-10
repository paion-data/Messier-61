# Copyright 2023 Paion Data. All rights reserved.
#!/bin/bash

# Pick up the tags from the adjusted remote
git fetch --tags

echo $(git branch -v)

# Get the last tag on this branch
LAST_TAG=$(git describe --tags)
echo "INFO Last tag: $LAST_TAG"

# Build the new tag to push
NEW_TAG=$(LAST_TAG=${LAST_TAG} python .github/upversion.py)
echo "INFO Creating tag: $NEW_TAG"
git tag $NEW_TAG -a -m "Autogenerated version bump tag"

# Push the new tag
echo "INFO Pushing tag: $NEW_TAG"
git push origin $NEW_TAG
