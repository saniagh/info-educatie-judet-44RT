<h1>Best game</h1>

<h2>Ideea</h2>

<i>A game about chasing your favourite buddies as a cat ( imagine yourself as a cat while playing) on the home page of the website. We offer secure accounts for storing your favourite profile picture to use while doing what we just mentioned !</i>

<h2>Requirements ( for development )</h2>

<ul>
<li>NodeJS and npm installed</li>
<li>MongoDB and mongoose installed</li>
</ul>

<h2>Requirements ( for usage )</h2>

<ul>
<li>Chrome/Mozilla ( not tested on other browsers )</li>
<li>Stable internet connection</li>
</ul>

<h2>Installation</h2>

<h4>Run the following commands</h4>

```shell
npm install
npm install --save bcrypt
```

<h2>How to run</h2>

<h4>Run the commands:</h4>
```shell
sudo service mongod start
npm start
```

<h4><i>If you wish to rebuild the project, use the command: </i></h4>

```shell
webpack --optimize-minimize --define process.env.NODE_ENV="'production'"
```

<h2>Details</h2>

<ul>
<li>The website is a " chase the mouse " game where you have to catch your friends.</li>
<li>Use the arrow keys to move your (or my) picture.</li>
<li>Rules are simple: You are the mouse, you run; You are the cat, you chase the mice</li>
<li>Game restarts once everybody has been a cat at least once unless the disconnected</li>
<li>As the one who chases the others, you have 30 seconds to do it.</li>
</ul>

<h2>Technical details</h2>

<h4>Front-end</h4>

<ul>
<li>ReactJS</li>
<li>Material UI</li>
<li>Other dependencies not used a lot mentioned in the package.json</li>
</ul>

<h4>Back-end</h4>

<ul>
<li>NodeJS</li>
<li>Socket.io</li>
<li>Mongoose</li>
<li>Other dependencies not used a lot mentioned in the package.json</li>
</ul>

<h2>Creator:</h2>
Valentin Marian Constanda