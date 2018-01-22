# Modern JavaScript Progress
> Trying out to build simple projects using ways and techniques in order as they have progressed through time. These are extremely-mega-pupsi basic projects, just trying out.

## old-school
**Pros**
* is very simple
**Cons**
* each update/install and lin every lib manually
* should check the order in which the libs are linked

## use-npm 
> is a less old-school version of the old-school site. We add/update every new lib using NPM. 
**Pros**
* still quite simple
* doesn't require to search and install libs manually
* save and monitor versions in a `package.json`

**Cons** 
* requires usage of NPM
* still have to link the lib manually going through `node_modules` and searching for the appropriate JavaScript file.

## use-webpack
Helps in building the project and binding the modules without any need to include each of them using script tags.
**Pros**
* automated build of the project: the whole JavaScript files are bundled together through the bundling tool
**Cons**
* requires more setup
