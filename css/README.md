# SASS/SCSS
This project uses **.scss** files for better structure and style handling.

## HOW TO USE
Start by making sure that you have the [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass) plugin installed in Visual Studio.

### Update your settings for Live Sass Compiler
Insert the [code shown below](#settings-code) in your `settings.json` file.

The easiest way to get there is by doing
- **⌘/ctrl+p** (macOS/windows)

and type *settings* then select the resulting `settings.json` file from the search.

Once you are in the settings file you can paste the code after the last line of any existing code (if any).

**NOTE:** JSON files are very specific in their structure. Make sure that:
- the preceding line of code (if any) has a comma (,) at the end
- you place the settings code below within the outer moste curly brackets

**i.e.**

```.
{
    EXISTING_CONTENT,
    NEW_CONTENT
}
```

#### Settings code

```"liveSassCompile.settings.generateMap": false,
"liveServer.settings.donotShowInfoMsg": true,
"liveSassCompile.settings.autoprefix": [
    "> 1%",
    "last 2 versions"
],
"liveSassCompile.settings.formats": [
    {
        "format": "compressed",
        "extensionName": ".min.css",
        "savePath": "/css"
    },
],
"liveSassCompile.settings.includeItems": [
    "/css/style.scss",
],
"liveSassCompile.settings.excludeList": [
    "**/css/scss/**"
],
"liveSassCompile.settings.showOutputWindow": false,
```

These settings will make sure that when you save the file **/css/style.scss** all the files properly imported, using `@import './file-location-and-name'` in **style.scss**, will be in the re-complied **/css/style.min.css** file (*which is the general styling file we use in the head of our HTML head link href*).