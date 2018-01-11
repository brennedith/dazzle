#!/bin/bash

THEMES=("Cerulean" "Cosmo" "Cyborg" "Darkly" "Flatly" "Journal" "Lumen" "Paper" "Readable" "Sandstone" "Simplex" "Slate" "Spacelab" "Superhero" "United" "Yeti")

FONTS=("woff2" "woff" "ttf" "svg" "eot")


cd public/styles
wget -c https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css

cd fonts
for font in ${FONTS};
  do wget -c "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.$font" -O glyphicons-halflings-regular.$font
done

cd ../themes
for theme in ${THEMES[@]};
  do wget -c "https://bootswatch.com/3/${theme,,}/bootstrap.min.css" -O $theme.css;
done