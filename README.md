# The Council
Crowd sourced coin flip app built with React and Flux and Styled with Radium

Install:
```
npm install
```
Start:
```
gulp
```

Layout:
```
app/
├── actions
│   ├── council-actions.js
│   ├── question-actions.js
│   └── socket-actions.js
├── app.js
├── components
│   ├── about.jsx
│   ├── answering
│   │   ├── council.jsx
│   │   ├── council-question.jsx
│   │   └── council-question-options.jsx
│   ├── app.jsx
│   ├── asking
│   │   ├── ask-form.jsx
│   │   ├── ask.jsx
│   │   ├── option-input.jsx
│   │   └── question-input.jsx
│   ├── button.jsx
│   ├── header.jsx
│   ├── home.jsx
│   ├── input.jsx
│   ├── link.jsx
│   ├── notfound.jsx
│   ├── results
│   │   ├── recent.jsx
│   │   ├── result.jsx
│   │   ├── result-option.jsx
│   │   └── results.jsx
│   └── text.jsx
├── Flux.js
├── index.html
├── pop.mp3
├── router.jsx
├── socket.js
└── stores
    ├── council-store.js
    ├── question-store.js
    └── socket-store.js
server/
├── routes
│   └── socket.js
└── server.js
```
