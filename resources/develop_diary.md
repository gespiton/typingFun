### 2018/1/27
* start writing diary today. I thought maybe this can help me with keeping up coding everyday.
* found that article's schema design is really bad, doesn't fit my requirement at all. need to rewrite it... oh my gash... if only I research more carefully before head.

### 2018/2/9
* [mongoose create empty array](https://stackoverflow.com/questions/20713650/mongoose-creating-empty-arrays)
* finally get the bunch of code to work
    > first get all article then get the sub document use promise
    
    yes, when I finally get this to work I found that I can't decide which article is top. stupid me, lesson learned: **first make sure algorithm work, then do the coding**

* finish index algorithm: get all the doc then do the structuring part, cause I have to get the doc anyway.


### 2018/2/11
* today I find a npm lib that use github webhook to sync my project on server. after some tweak I finally got it to work, perfect!

    the big problem in the process is that a plugin I use called hardSourceWebpackPlugin has a bug(it crash on second npm build wtf!), and it took me a while to locate the problem
    
    
* I found that since certain commit, div#typing.main's focus became lugging and unbearable. spend many time debugging this. And finally found that it's because  "box-sizing:inherit" inside  materialize.css. WTF? anyway, I can't understand it at all. during this process. I found that vscode's diff tool is very useful, and workspace in vscode too. -- To my dear precise time. 

    > lesson learned: always use performance tool first, and recalculating style problem came from css
    

### 2018/2/12
* prop type verification give me error

    > transform-decorators-legacy must come before transform-class-properties to be able to use the connect decorator and static propTypes together.


### 2018/2/27
* got a little problem with using require('mongoose'),I expect it will return same mongoose instance between different place, turned out it didn't and at last I found that it was because I didn't update my node_modules and it contained a mongoose package which it shouldn't have. dame!

* trying to figure out a way to manage local package. using **file:./...** is problematic, it might reimport the same package multiple times causing problem.(e.x. mongoose schema)

    my current solution is write a simple distributor in app root, every local package is declared here and other script can reference them here.
