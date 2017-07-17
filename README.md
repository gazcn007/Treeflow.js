# Treeflow.js

![](/doc/treeflow.png)

"The purpose of art is washing the dust of daily life off our souls"

## Introduction

Treeflow.js is a generic visualization library that utilizes React.js, Mobx.js, Node.js and Socket.io to generate dynamic and synchronized front end view of any real-time dataflow. The main advantage of using this technology stack is that it utilizes the concept of one-way data flow (so-called one-way binding) and component hierarchy of React framework so that the view is synchronized with any data flow and the user can dynamically change the view structure by reorganizing the components with standard APIs.

![](/doc/RMSN.jpg)

## How it works

The overview of the stack works as follows: 

- Node.js, which in this case a node service, is the main controller that sets up socket.io and hosts view assets after Webpack-ing React component. It provides a main entry point to the Treeflow service.
- socket.io is hosted by Node.js when the Node service starts to run. It is a wrap up of Websocket APIs of the TCP socket. It will act as a messaging hub for data in-flow and view out-flow.
- Mobx.js is the data layer of all non-stateless React components. It tells when and what the react components should render.
- React.js is the main View layer that communicates with the client. It includes two important libraries, View Components and ECharts Adaptor. View Components include all the default  React components written in ES6 that can be reused anytime, including basic Form and Text input to Calendar Selector. The style sheets are included for all the components as well using LESS, so the colour scheme and layout can be changed dynamically based on client preference and demand as well. ECharts Adaptor is a wrap up library of ECharts 2.0, an open source library built by Baidu.inc, to match with View APIs.
