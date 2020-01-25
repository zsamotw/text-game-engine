# Game Engine

Text game engine.

## Technology Stack

* Typescript
* React
* Redux
* Rxjs
* Sanctuary
* Ts Lenses
* Natural

## Initial Setup
Install Node Js and Typescript.
Clone the repository:
```
> git clone
```
Install npm packages:
```
> npm install
```

## Run the app
```
> `npm start`
```

It runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


# Features
The application allow to provide commands in text terminal. For each command the engine changes the state of the game and returns message. All messages are dispalyed in the main view of application.

Possible commands:
- 'look'
- 'look at'
- 'take'
- 'put'
- 'pocket'
- 'talk to' or 'talk with'
- 'go'
- 'help'


The game has stages. Each stage could have maximum four doors in four directions (north, south, west and east) to other stages. There are some things to take and persons to talk with. From time to time persons could move from one statge to another.

# Technical Documentation