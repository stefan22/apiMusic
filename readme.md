# musicApp
> (in progress)

> about: modular js application ..  &nbsp; &nbsp;  :bug:

> `branchZero` is the original branch

- extracting music data from a public api
- so far i got a few modules 
    + [getallartists.js] main script api call
    + [apikey.js] another one to extract key -  i got mine at last.fm with a free account.
    + [artists.js] creates artist constructor, prototype functions and displays data on page -
    + [popupinfo.js] click event data popup -
    + [artistinfo.js] second api call request to gather bio summary for click click event popup -
    + [artistinfo.js] removed artist album information from here and created artistalbum.js to handle just album info
    + [artistinfo.js] artistinfo.js used to upload information to the page, once album information was collected.
    + [artistinfo.js] now it passes the artist info to artistalbum.js
    + [artistalbum.js] handles third request about album information, and brings it into the page along with artist info.
    + [artistalbum.js] popup inside popup
    + [artistalbum.js] 'click for more' => 'highest playcount album'; which is sometimes different than top album.      
    + [artistalbum.js] added 3 similar artists by genre.
    
    + [branchZero]     created new branch cause i'm changing folder structure, and adding node express 
    + [devDependencies] added node express server, and reload/plugin
    
    



<br/>
<kbd>added click more button and similar artists</kbd>
<br />

![](public/images/plusClickmore.png)

<br/>



<br/>
<kbd>added Similar artists</kbd>
<br />

![](public/images/plusSimilar.png)

<br/>








<br/>
<kbd>latest screenshot</kbd>
<br />

![](public/images/verylatest.png)

<br/>


<br/>
<kbd>sample image</kbd>
<br />

![](public/images/latest1.png)

<br/>



> `b_*.js` pages are old versions of same pages without `b_`




