# u02-redesign-unit7
---
The aim of this project is to complete assignment **u02-Redesign** in the course HTML & CSS @ CHAS Academy.  
**Due date November 1st 2020.**  
[The general collaboration file for layout is a Google slide](https://docs.google.com/presentation/d/19k_KDMHZx57PBcOhPdqDo0FMRwZnlfstP9MUUzL7_LQ/edit#slide=id.ga37a843233_0_12)  
 
 ---

## Quick-start

To clone the project and save it locally:
1. Open your terminal and go to your project/develop folder (where you want to save the clone)
2. Type in `git clone git@github.com:chas-academy/u02-redesign-unit7.git` and hit enter. **NOTE:** This will require the use of SSH key. If you don't have one yet, [follow documentation to set it up](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/connecting-to-github-with-ssh)
3. Type `code .`to open the project in VS Code

### Start working on your assigned page  
1. Open your terminal!
2. Create a new branch by typing in `git checkout -b branch-name`(where "branchname" is the the name of your new branch)
3. Make a HTML-file called `page-name.html` and put it in the *'pages'*-folder in the root
4. Make a sass-file called `_page-name.scss` and put it in the *'pages'*-folder in the *'scss'*-folder
5. Link in the header and footer:
    * In `<head>`, copy in the link to the style-file: `<link rel="stylesheet" href="../css/style.min.css" />`
      and the link to the script-file: `<script src="./js/componentLoader.js"></script>`
    * At the top of `<body>`, copy in the link to header-file: `<header component="../components/header.html" id="main-header" class="container"></header>`
    * At the bottom of `<body>`, copy in link to footer-file: `<footer component="../components/footer.html" id="main-footer"></footer>`
    * Last down in `<body>`copy in: `<script>componentLoader();</script>`
6. Start coding!

## Workflow

### Adding an issue to the 'to do'-list:
1. Open the [project board](https://github.com/chas-academy/u02-redesign-unit7/projects/1) and click the +sign in the upper right corner of the card for the to do list (*'add note to this column'*).
2. Add a descriptive but short title
3. Click *'add'*, then click on the three dots in the corner of the note you just made, and select *'convert to issue'*.
4. Click on the title of the card and then click *'go to issue for full details'* (blue button in bottom-right corner).
5. In the sidebar to the right:
    * Assign the issue to someone in the team (could be yourself)
    * Add a fitting label
    * Select the project and which card (usually *'to do'*)
6. (Optional) Add a more detailed desription if needed.

### Commit to git and push to GitHub:
1. To commit a change, open your terminal and type in: `git commit -m "initial commit"` (or another message describing what you are committing, if it isn't the first time)
2. When you feel like you have resolved an issue or you are done with a specific task, it's time to push!
3. If it's the first time pushing your branch:
    * Make sure you are on the correct branch (use `git checkout branch-name`)
    * Push your branch to GitHub by typing: `git push -u origin branch-name`  
4. Or, if the branch already exist in remote:
    * Type in: `git push branch-name`
5. You could also to this directly in VSC:
    * Click *'source control'* in the menu to the right
    * You can now see a list of all changes since your last commit in a list to the left
    * To stage a change, click the +button you see when you hover it
    * When you want to commit, click the checkmark and then add your message

### Make a pull-request:
1. Push your branch as described above
2. Go to the repo-page and either click the big green button *'compare & pull request'* or open your branch and click *'pull request'*
3. Give the pull-request a very descriptive but short title
4. If you want, you can add any additional questions or comments in the *'body'* ocf the pull-request
5. In the sidebar to the right:
    * Assign one or several reviewers (preferably the project leader, but it could be multible reviewers)
    * Add a fitting label
    * Select the project and which card (maybe *'to do'* or *'doing'*)
    * If the pull-request may close an issue, select that issue under *'linked issues'*
6. Wait for (at least one of) the reviewer to approve your changes! If the reviewer request changes, resolve these first, commit again, leave a comment and wait again until the reviewer approves
7. When the changes are approved, you can merge the pull-request to the main branch (and delete your current branch, if you want)

### Pull from remote:
1. If you go to the main-branch by typing `git checkout main`in your terminal, you can see how many changes have been made remotely that you are behind locally
2. To pull all the changes, type in: `git pull`
3. You should now see all the new changes and additions that everybody made in your local repo!

## Useful links

Extensions for VSC:
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass) | [Instructions](/css/README.md)

## File structure

Name | Type | Usage/Purpose
-|-|-
[root] | _root_folder_ | Contains **index.html** and root folder structure
assets | _folder_ | Standard assets folder for images and other graphics
*images | _folder_ | Raster images
*svg | _folder_ | Vector graphics
components | _folder_ | HTML structure files for header and footer
css | _folder_ | Contains style files
*scss | _folder_ | All SASS files. Make sure these are run through pre-processor before finalizing.
*style.scss | **file** | @import all files from scss folder
*style.min.css | **file** | Final, minified, CSS file used in page head link.
js | _folder_ | Javascript files
*componentLoader.js | **file** | File with function used in pages to get content of components (e.g. header and footer)
pages | _folder_ | HTML files for all pages
