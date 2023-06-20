# CS153a Sum2023  Mobile Application Development
this file contains notes from the Mobile App Development class
and is a supplement to our Latte pages which contain links to the
zoom sessions, screen recordings, homework assignments, announcements,
etc. This file simply records some of the content we discuss in class.

We will be learning to use [React Native](https://reactnative.dev)  
and [Expo](https://docs.expo.dev/) to develop mobile apps
that can run on iOS and on Android devices. These tools have been used
by many companies to create their apps. Here is a [Gallery](https://reactnative.dev/showcase).

Expo is a nice tool as it provides an easy way to write and run apps on your phone
using [all of the phones features](https://docs.expo.dev/versions/latest/).

## Week 1

### Lesson 1 Mon 6/5/23
We begin by looking at the [getting_started](https://reactnative.dev/docs/getting-started) tutorial at the
[reactnative.dev](https://reactnative.dev) website.

I'll assume you either are already familiar with Javascript, 
or that you will read through the [Javascript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
to familiarize yourself with the main features of the language. 
You should already be strong Java programmers and possibly also have Python experience. 
It will not be hard to learn how to code effectively in Javascript, 
especially if you are using Visual Studio Code with Github Copilot chat.

We will work through the Getting Started tutorial at a superficial level,
learning how to modify the code in the Snack IDE.

### Lesson 2 Tue 6/6/23
We cycle back and  analyze the code line-by-line to obtain a deeper
understanding both of Javascript and of React Native.

Then we look at the Design document and learn [how to layout components nicely](../notes/component_layout.md) in React Native.

By the end of the week everyone should be able to create simple interactive Mobile Apps
and to explain how they work, line by line.

### Lesson 3 Wed 6/7/23
We showed how to setup the local environment to develop React Native apps using Visual Studio Code.
Then we looked over some of the Javascript documentation

### Lesson 4 Thu 6/8/23
We show how to use [React Navigation](https://reactnavigation.org/) to make a multi-page app.

We discuss the relationaship between three front end frameworks
* [React](https://react.dev)
* [React Native](https://reactnative.dev),
* [Expo](https://docs.expo.dev/)

We show how to 
* download/install [github desktop](https://desktop.github.com/)
* create a [github account](https://github.com)
* [setup github account](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/installing-and-authenticating-to-github-desktop/about-connections-to-github-in-github-desktop)
* create a github repository with a .gitignore and a README.MD
* download your github repository
* add your code to your repository on your laptop
* commit the changes and push the changes back to github

It is a little tricky because you need to get a authorization token for your computer...


We discuss several approaches to pass data between components using a Change Calculator demo

Next we get practice using FlatLists by writing a simple todo list app which we write together.
and we talk about the React Triggers which cause a page to be redrawn (shallow changes of state variables)

Time permitting we intoduce the useEffect hook and show how to use it to access an API

## Week 2

### Lesson 5 Mon 6/10/23
We continue the Change Counter demo and explore ways to access state of parent and/or child components
We also look closely at the Javascript needed to implement this app

### Lesson 6 Tue 6/11/23
We have every synchronous student give a short description of their idea for their final app, and a quick demo of what they have now. 

Everyone will comment on each project, give suggestions for how it could be improved, and think about which aspects could be incorporated into your own project

### Lesson 7 Wed 6/12/23
We continue our discussion of useEffect but with a more real API giving the weather 
[https://api.weather.gov/points/42.3,-71.1](https://api.weather.gov/points/42.3,-71.1)

The file [lib/weatherAPI.js](../code/AwesomeProject/lib/weatherAPI.js) has functions for accessing these APIs
and we'll use these to create a simplet weather phone app. This example uses the 
[axios package](https://www.npmjs.com/package/axios) instead of the built-in fetch command. Both are
quite commonly used in web and mobile app development.

Next we look into [AsyncStorage](https://reactnative.dev/docs/asyncstorage) which provides a way
of persisting data when the app is closed and the reopened.

We show how it is used in the [Pomorodoros Component](../code/AwesomeProject/components/Pomorodos.js)

### Lesson 8 Thu 6/13/23
We started going through [the expo.dev tutorial](https://docs.expo.dev/tutorial/introduction/) 
on creating a simple phone app using the camera and handling gestures

## Week 3

### Lesson 9 Tue 6/20/23
We continue working through [the expo.dev tutorial](https://docs.expo.dev/tutorial/introduction/)
and we work on making our own modifications and tweaks of the code as well as making sure we fully 
understand the javascript and the react native code.



