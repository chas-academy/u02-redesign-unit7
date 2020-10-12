# u02-redesign-unit7
The aim of this project is to complete assignment **u02-Redesign** in the course HTML & CSS @ CHAS Academy.

**Due date November 1st 2020.**

## File structure
Name | Type | Usage
-|-|-
[root] | _root_folder_ | Contains **index.html** and root folder structure
assets | folder | Standard assets folder for images and other graphics
- images | folder | Raster images
- svg | folder | Vector graphics
components | folder | HTML structure files for header and footer
css | folder | Contains style files
- scss | folder | All SASS files. Make sure these are run through pre-processor before finalizing.
- style.scss | file | @import all files from scss folder
- style.min.css | file | Final, minified, CSS file used in page head link.
js | folder | Javascript files
- componentLoader.js | JS file | File with function used in pages to get content of components (e.g. header and footer)
pages | folder | HTML files for all pages