# CS153a Sum2025  Mobile Application Development
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

Our plan this summer is to teach you how understand at a fundamental level how React Native apps are designed and to leverage the power of modern AI LLMs to rapidly build and deploy sophisticated apps...

You will be using LLMs to help build apps. The main LLM will be https://gemini.google.com which is accessible to Brandeis students,
but please feel free to try others. One of our major goals this summer is to learn how to effectively use LLMs to enhance your 
understanding of programming apps and to speed your development process.

---

# Week 1

## Week 1 Programming Projects
* Programming Projects for Week 1 due Monday 6/8 before class, submit on the Mastery Learning App
  - Exam 1
  - Project 1



### Lesson 1 Wed 6/4/25 Intro to React
We begin by going over the syllabus and introducing ourselves on the Mastery Learning App.

Then we look at a simple ReactNative app that was (mostly) generated by Claude.ai using this prompt:
```
I am making a React Native app to implement the Pomodoro technique.
Create for me a React Native app in one file
which allows the user give a title to the Pomodoro
and press a button which starts a timer,
and then plays a sound in 25 minutes.
The user can then add a comment to the Pomodoro and save it.
All of the Pomodoros would be saved in Asynchronous Storage.
Try to make the app look nice on a mobile device.
```

Here is the app [Pomodoros](https://snack.expo.dev/@tjhickey/privileged-violet-tortillas)

Then we brainstorm about possible mobile app ideas

Next we look at the [getting_started](https://reactnative.dev/docs/getting-started) tutorial at the
[reactnative.dev](https://reactnative.dev) website.

I'll assume you either are already familiar with Javascript, 
or that you will read through the [Javascript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
to familiarize yourself with the main features of the language. 
You should already be strong Java programmers and possibly also have Python experience. 
It will not be hard to learn how to code effectively in Javascript, 
especially if you are using Visual Studio Code with Github Copilot chat.
We will explain Javascript concepts as they arise in the coding, but it doesn't hurt to look over the
documentation to get a general idea about how the language works.

We will work through the Getting Started tutorial at a superficial level,
learning how to modify the code in the Snack IDE.



### Lesson 2 Thu 6/5/25 Stylesheets and Flexboxes, VScode, and Running Locally

__NOTE__ I don't have office today. 

We cycle back and  analyze the code line-by-line to obtain a deeper
understanding both of Javascript and of React Native. We also experiment with asking LLMs 
to help us understand the code.

Then we look at the Design document and learn [how to layout components nicely](../notes/component_layout.md) in React Native, and we get practice designing and implementing
layouts..

Time permitting, we show how to set up the software needed to 
[Run React Native Locally](../notes/runningRNlocally.md)

By the end of the week everyone should be able to create simple interactive Mobile Apps from scratch, and by proper prompting of LLMs,
and to explain how they work, line by line.

Next week we will learn how to [Running React Native Locally](../notes/runningRNlocally.md) and
that will require some software installation which you ought to do over the weekend.

First half of lesson -- 
  complete Getting Started tutorial, learn about StyleSheets and Flexbox layout

Second half of lesson - 
  Get practice designing screens from scratch and using Gemini with good prompts
  Try getting Gemini to build a simple app and then explain how it works...
  Work on installing ReactNative locally

---

---

## Week 2: State and APIs

---

## Week 2 Programming Projects
* Programming Projects for Week 2 due Monday 6/15 before class, submit on the Mastery Learning App
  - Exam 2
  - Project 2
---

### Lesson 3 Mon 6/9/25 Expo-router and sharing state across components

First we review (some) student Projects and have everyone give some feedback on the ideas.




We briefly discuss the relationaship between three front end frameworks
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

Next, we show how to use the [file-based Expo Router](https://docs.expo.dev/develop/file-based-routing/)
to make a multi-page app.
We work through the examples for Stack, Tab, (and other) navigation. We will use the file-based
navigation approach

We discuss several approaches to pass data between components using a Change Calculator demo

Next we get practice using FlatLists by writing a simple todo list app which we write together.
and we talk about the React Triggers which cause a page to be redrawn (shallow changes of state variables)

Time permitting we intoduce the useEffect hook and show how to use it to access an API

---



### Lesson 4 Tue 6/10/25  VSCode, AI Prompting, Multi-screen apps, and global variables
We design and build a ToDoList demo in VScode together using AI prompts
and explore ways to access state of parent and/or child components
We also look closely at the Javascript needed to implement this app.
We'll have the todo list be one of several screens.

We have every student give a short description of their idea for their final app, 
and what they plan on completing by Monday.  Synchronous students present projects
in person.

Everyone will comment on each project, give suggestions for how it could be improved, and think about which aspects could be incorporated into your own project.

In the second half of the class we'll show how the useContext hook works to provide global variables
for a multiscreen app.

### Lesson 5 Wed 6/11/25  APIs and JSON

We start off with an introduction to using Git/Github for personal projects and we have everyone
create a cs153aSum25 github repository. You can make it public for the summer.

We continue our discussion of useEffect but with a more real API giving the weather and accessing 
complex json objects: 
[https://api.weather.gov/points/42.3,-71.1](https://api.weather.gov/points/42.3,-71.1)

The file [lib/weatherAPI.js](../code/AwesomeProject/lib/weatherAPI.js) has functions for accessing these APIs
and we'll use these to create a simple weather phone app. 




---




### Lesson 7 Thu 6/12/25 Accessing Phone Features

We start by having everyone upload their final project to github.
We'll use AI to see how do this, e.g. with this prompt:
```
How do I upload a folder to a new github site if I dont have a github account yet?
```

Tben we start going through [the expo.dev tutorial](https://docs.expo.dev/tutorial/introduction/) 
on creating a simple phone app using the camera and handling gestures
We continue working through [the expo.dev tutorial](https://docs.expo.dev/tutorial/introduction/)
and we work on making our own modifications and tweaks of the code as well as making sure we fully 
understand the javascript and the react native code. Homework (due Monday) is to complete the tutorial
and submit a demo where you have modified the app in some interesting way...


---

---


## Week 3 Accessing Phone features and Packages

---

## Week 3 Programming Projects
* Programming Projects for Week 3 due Monday 6/22 before class, submit on the Mastery Learning App
  - Exam 3
  - Proj 3
---


### Lesson 8 Mon 6/16/25
We have all students demo the current versions of their Final Project Apps
and give feedback to each other. We also look over the asynchronous students apps from last week
and we start looking at the [Gesture Handlers](https://docs.swmansion.com/react-native-gesture-handler/).  

### Tue 6/17/25
I have to reschedule today's class. I will hold class on Thursday 6/19 (Juneteenth)
at the usual time and anyone who want to attend can join me. If you want the day off you
can watch the screen recording later.

### Lesson 9 Wed 6/17/23
We work on interacting with LLMs using an API
Also we practice writing javascript for word games like wordle...
and creating




### Lesson 10 Thu 6/18/25
Sharing data using Firebase/Firestore and authenticating..

---

---

## Week 4 Web/Mobile apps

---

## Week 4 Programming Projects
* Programming Projects for Week 4 due Monday 6/29 before class, submit on the Mastery Learning App

---

### Lesson 11 Mon 6/23/23
We have our demo day when all students give demos of their apps and review other students' apps.
We also review the asynchronous students apps....

### Lesson 12 Tue 6/24/23
Explore using NextJS to create React Apps which interact with React Native Apps

### Lesson 13 Wed 6/25/23
Explore using NodeJS/Express/Mongodb as a backend

### Lesson 14 Thu 6/26/25
Deployment and User Testing

---

---

## Week 5 

---

## Week 5 Programming Projects
* Programming Projects for Week 1 due Monday 6/8 before class, submit on the Mastery Learning App

---

### Lesson 15 Mon 6/30/25
Deployment

### Lesson 17 Tue 7/1/25
Deployment

### Lesson 18 Tue 7/2/25
We have our final project showcase the last two days of class.
All students give demos of their apps and answer questions.
We also review all of the asynchronous students apps.


### Lesson 19 Tue 7/3/25
We have our final project showcase the last two days of class.


