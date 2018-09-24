#!/bin/bash
# Script to update the colors of Blueprintjs

CSS_FILE="../node_modules/@blueprintjs/core/lib/css/blueprint.css"

cd "$(dirname "$0")"

# Change primary colour
sed -i -e 's/#137cbd/#6435C9/g' $CSS_FILE

# Change hover primary colour
sed -i -e 's/#106ba3/#5829bb/g' $CSS_FILE

# Change focus primary colour
# sed -i -e 's//#4f20b5/g' $CSS_FILE

# Change active primary colour
# sed -i -e 's/rgba\(19\, 124\, 189\, 0\.3\)/#5626bf/g' $CSS_FILE

