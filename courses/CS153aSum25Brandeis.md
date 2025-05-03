# CS153a Sum2024  Mobile Application Development
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

### Lesson 1 Tue 6/3/25
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

### Lesson 2 Wed 6/4/25
We cycle back and  analyze the code line-by-line to obtain a deeper
understanding both of Javascript and of React Native.

Then we look at the Design document and learn [how to layout components nicely](../notes/component_layout.md) in React Native.

By the end of the week everyone should be able to create simple interactive Mobile Apps
and to explain how they work, line by line.

### Lesson 3 Thu 6/5/25
[Running React Native Locally](../notes/runningRNlocally.md)

---

---

## Week 2: State and APIs

---

### Lesson 4 Mon 6/9/25
We show how to use [React Navigation](https://reactnavigation.org/) to make a multi-page app.
We work through the examples for Stack, Tab, and Drawer navigation.

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

---



### Lesson 5 Tue 6/10/25
We continue the ToDoList demo and explore ways to access state of parent and/or child components
We also look closely at the Javascript needed to implement this app.
We have every synchronous student give a short description of their idea for their final app, and a quick demo of what they have now. 

All students give demos of the current version of their final projects and discuss what the
final version should be.

Everyone will comment on each project, give suggestions for how it could be improved, and think about which aspects could be incorporated into your own project

### Lesson 6 Wed 6/11/25

We begin by working on the ToDoList app.

We continue our discussion of useEffect but with a more real API giving the weather 
[https://api.weather.gov/points/42.3,-71.1](https://api.weather.gov/points/42.3,-71.1)

The file [lib/weatherAPI.js](../code/AwesomeProject/lib/weatherAPI.js) has functions for accessing these APIs
and we'll use these to create a simplet weather phone app. This example uses the 
[axios package](https://www.npmjs.com/package/axios) instead of the built-in fetch command. Both are
quite commonly used in web and mobile app development.


---




### Lesson 7 Thu 6/12/23
Next we look into using the [ReactNative Storage package](https://github.com/sunnylqm/react-native-storage) which provides a way
of persisting data when the app is closed and the reopened.

We show how it is used in the [Pomorodoros Component](../code/demoSum24/components/Pomodoros.js)

We start going through [the expo.dev tutorial](https://docs.expo.dev/tutorial/introduction/) 
on creating a simple phone app using the camera and handling gestures
We continue working through [the expo.dev tutorial](https://docs.expo.dev/tutorial/introduction/)
and we work on making our own modifications and tweaks of the code as well as making sure we fully 
understand the javascript and the react native code.

---

---


## Week 3 Accessing Phone features

---

### Lesson 8 Mon 6/16/23
We have all students demo the current versions of their Final Project Apps
and give feedback to each other. We also look over the asynchronous students apps from last week
and we start looking at the [Gesture Handlers](https://docs.swmansion.com/react-native-gesture-handler/).  

### Lesson 9 Tue 6/17/23
We work on interacting with chatGPT.

Also we practice writing javascript for word games like wordle...



### Lesson 10 Mon 6/18/23
We work together at completing the Wordle app and getting it to work nicely on the phone
with a clear and easy to use UI.

---

---

## Week 4 Improving the User Interface

---

### Lesson 11 Mon 6/23/23
We have our demo day when all students give demos of their apps and review other students' apps.
We also review the asynchronous students apps....

### Lesson 12 Tue 6/24/23

### Lesson 13 Wed 6/25/23

### Lesson 14 Thu 6/26/25

---

---

## Week 5 


### Lesson 15 Mon 6/30/25

### Lesson 17 Tue 7/1/25

### Lesson 18 Tue 7/2/25

### Lesson 19 Tue 7/3/25
We have our final project showcase today.
All students give demos of their apps and answer questions.
We also review all of the asynchronous students apps.


