<h1><i>4ed</i></h1>
<p>v0.0.6</p>

<h5>If you are not currently on our GitHub page and are reading a printed version of this documentation, please visit the link below or scan the QR code to access our GitHub page.</h5>

https://github.com/saniagh/info-educatie-judet-44RT

![QR Missing?](/resource/index/images/qr-code-github.png)

<h1><i>The ideea behind the project</i></h1>

<p>4ed is a website dedicated to posting lessons online for everybody to learn. The type of lessons you choose to post is absolutely up to you. What we do want to focus on though is teaching by seeing, this is why we give you the opportunity to teach by posting pictures. :)</p>

<h1><i>System requirements - For usage</i></h1>

<ul>
<li>Internet connection</li>
<li>Any browser that supports JavaScript and localStorage</li>
</ul>

<h1><i>System requirements - For development</i></h1>

<ul>
<li>Stable internet connection</li>
<li>Terminal (Ubuntu's Command Line or Windows equivalent)</li>
<li>NodeJS v7.8.0 (minimum)</li>
<li>npm (minimum 4.2.0)</li>
<li>Browser that uses JavaScript</li>
<li>Browser that supports LocalStorage (Chrome, Firefox etc)</li>
<li>MongoDB installed (for development we used port 27017)</li>
</ul>

<p>To check for a current installed version of NodeJS or npm, run the following commands:</p>

```shell
node -v
npm -v
```

<p>The website was developed on Chrome and tested on Chrome and Firefox.</p>
<p>Support for the Create and Update functions on Android, iOS or Windows Phone is not guaranteed due to DraftJS's current issues.</p>
<p>Project is not distributed with a database. Project IS distributed with schemas for MongoDB, on the other hand.</p>

<h1><i>File structure</i></h1>
<pre>
/info-educatie-judet-44RT-master/
| -- config
|    | -- index.json       
| -- resource 
|    | -- authentication
|    |    | -- login.js
|    |    | -- signup.js
|    | -- index 
|    |    | -- images 
|    |    |    | -- home-login-cover.jpg
|    |    |    | -- logo.png
|    |    |    | -- qr-code-github.png
|    |    | -- favicon.ico
|    |    | -- index.html
|    |    | -- main.scss
|    |    | -- main.css
|    |    | -- main.css.map
|    | -- middleware
|    |    | -- authentication-check.js
|    | -- mongo-models
|    |    | -- authentication
|    |    |    | -- user.js
|    |    | -- collections
|    |    |    | -- collection.js
|    |    |    | -- commentCollection.js
|    |    | -- contact
|    |    |    | -- contact.js
|    |    | -- logs-models
|    |    |    | -- authentication-logs
|    |    |    |    | -- loginLogs.js
|    |    |    |    | -- signupLogs.js
|    |    |    | -- collections-logs  
|    |    |    |    | -- createCollectionLogs.js
|    |    |    |    | -- deleteCollectionLogs.js
|    |    |    |    | -- updateCollectionLogs.js
|    |    |    | -- news-logs
|    |    |    |    | -- createNewsLogs.js
|    |    |    |    | -- deleteNewsLogs.js
|    |    |    |    | -- updateNewsLogs.js
|    |    |    | -- profile-logs
|    |    |    |    | -- updateProfileLogs.js
|    |    | -- news
|    |    |    | -- commentNews.js
|    |    |    | -- news.js
|    |    | -- index.js
|    | -- routes
|    |    | -- admin.js
|    |    | -- authentication.js
|    |    | -- browse.js
|    |    | -- comment.js
|    |    | -- crud.js
|    |    | -- home.js
|    |    | -- profile.js
|    |    | -- socket.js
| -- src
|    | -- build
|    |    | -- index.js <-- entry file
|    | -- public
|    |    | -- actions
|    |    |    | -- Admin
|    |    |    |    | -- Collections
|    |    |    |    |    | -- manageCollectionsCreateActionsAdmin.js
|    |    |    |    |    | -- manageCollectionsDeleteActionsAdmin.js
|    |    |    |    |    | -- manageCollectionsReadAllActionsAdmin.js
|    |    |    |    |    | -- manageCollectionsUpdateActionsAdmin.js
|    |    |    |    | -- Logs
|    |    |    |    |    | -- Collections
|    |    |    |    |    |    | -- logsCreateCollectionsActions.js
|    |    |    |    |    |    | -- logsDeleteCollectionsActions.js
|    |    |    |    |    |    | -- logsUpdateCollectionsActions.js
|    |    |    |    |    | -- Login
|    |    |    |    |    |    | -- logsLoginActions.js
|    |    |    |    |    | -- News
|    |    |    |    |    |    | -- logsCreateNewsActions.js
|    |    |    |    |    |    | -- logsDeleteNewsActions.js
|    |    |    |    |    |    | -- logsUpdateNewsActions.js
|    |    |    |    |    | -- Profile
|    |    |    |    |    |    | -- logsProfileActions.js
|    |    |    |    |    | -- Signup
|    |    |    |    |    |    | -- logsSignUpActions.js
|    |    |    |    | -- News
|    |    |    |    |    | -- manageNewsCreateActionsAdmin.js
|    |    |    |    |    | -- manageNewsDeleteActionsAdmin.js
|    |    |    |    |    | -- manageNewsUpdateActionsAdmin.js
|    |    |    |    | -- Users
|    |    |    |    |    | -- manageUsersActionsAdmin.js
|    |    |    | -- AppBar
|    |    |    |    | -- collectionNamesActions.js
|    |    |    |    | -- searchActions.js
|    |    |    | -- Authentication
|    |    |    |    | -- loginActions.js
|    |    |    |    | -- signUpActions.js
|    |    |    | -- BrowseCollections
|    |    |    |    | -- browseCollectionsReadAllActions.js
|    |    |    |    | -- browseCollectionsReadOneActions.js
|    |    |    | -- BrowseNews
|    |    |    |    | -- browseNewsReadAllActions.js
|    |    |    |    | -- browseNewsReadOneActions.js
|    |    |    | -- Collections
|    |    |    |    | -- manageCollectionsCreateActions.js
|    |    |    |    | -- manageCollectionsDeleteActions.js
|    |    |    |    | -- manageCollectionsReadAllActions.js
|    |    |    |    | -- manageCollectionsReadOneActions.js
|    |    |    |    | -- manageCollectionsUpdateActions.js
|    |    |    | -- Contact
|    |    |    |    | -- contactActions.js
|    |    |    | -- Profile
|    |    |    |    | -- profileActions.js
|    |    |    | -- actionTypes.js
|    |    |    | -- collectionsHomeViewActions.js
|    |    |    | -- newsHomeViewActions.js
|    |    |    | -- shouldUpdateActions.js
|    |    |    | -- userCredentialsActions.js
|    |    | -- components
|    |    |    | -- Admin
|    |    |    |    | -- Collections
|    |    |    |    |    | -- Main Components
|    |    |    |    |    |    | -- Create.jsx
|    |    |    |    |    |    | -- Delete.jsx
|    |    |    |    |    |    | -- Update.jsx
|    |    |    |    |    | -- Partials Components
|    |    |    |    |    |    | -- PictureRow.jsx
|    |    |    |    | -- Logs
|    |    |    |    |    | -- Collections
|    |    |    |    |    |    | -- LogsCollections.jsx
|    |    |    |    |    |    | -- LogsCollectionsCreate.jsx
|    |    |    |    |    |    | -- LogsCollections.Delete.jsx
|    |    |    |    |    |    | -- LogsCollectionsUpdate.jsx
|    |    |    |    |    | -- Login
|    |    |    |    |    |    | -- LogsLogin.jsx
|    |    |    |    |    | -- Main Component
|    |    |    |    |    |    | -- Logs.jsx
|    |    |    |    |    | -- News
|    |    |    |    |    |    | -- LogsNews.jsx
|    |    |    |    |    |    | -- LogsNewsCreate.jsx
|    |    |    |    |    |    | -- LogsNewsDelete.jsx
|    |    |    |    |    |    | -- LogsNewsUpdate.jsx
|    |    |    |    |    | -- Profile
|    |    |    |    |    |    | -- LogsProfile.jsx
|    |    |    |    |    | -- Signup
|    |    |    |    |    |    | -- LogsSignup.jsx
|    |    |    |    | -- Main Component
|    |    |    |    |    | -- Admin.jsx
|    |    |    |    | -- News
|    |    |    |    |    | -- Main Components
|    |    |    |    |    |    | -- Create.jsx
|    |    |    |    |    |    | -- Delete.jsx
|    |    |    |    |    |    | -- Update.jsx
|    |    |    |    | -- Users
|    |    |    |    |    | -- Main Components
|    |    |    |    |    |    | -- Users.jsx
|    |    |    |    |    | -- Partials Components
|    |    |    |    |    |    | -- UsersRowsMobile.jsx
|    |    |    | -- Authentication
|    |    |    |    | -- Login.jsx
|    |    |    |    | -- SignUp.jsx
|    |    |    | -- BrowseCollections
|    |    |    |    | -- Main Components
|    |    |    |    |    | -- ReadAll.jsx
|    |    |    |    |    | -- ReadOne.jsx
|    |    |    |    | -- Partials Components
|    |    |    |    |    | -- Comment.jsx
|    |    |    |    |    | -- CommentForm.jsx
|    |    |    |    |    | -- CommentList.jsx
|    |    |    |    |    | -- NoCollectionsFound.jsx
|    |    |    |    |    | -- NoCommentsFound.jsx
|    |    |    |    |    | -- PictureRow.jsx
|    |    |    |    |    | -- TopActions.jsx
|    |    |    |    |    | -- ViewRow.jsx
|    |    |    |    |    | -- ViewTable.jsx
|    |    |    | -- BrowseNews
|    |    |    |    | -- Main Components
|    |    |    |    |    | -- ReadAll.jsx
|    |    |    |    |    | -- ReadOne.jsx
|    |    |    |    | -- Partials Components
|    |    |    |    |    | -- Comment.jsx
|    |    |    |    |    | -- CommentForm.jsx
|    |    |    |    |    | -- CommentList.jsx
|    |    |    |    |    | -- NoCommentsFound.jsx
|    |    |    |    |    | -- NoNewsFound.jsx
|    |    |    |    |    | -- PictureRow.jsx
|    |    |    |    |    | -- TopActions.jsx
|    |    |    |    |    | -- ViewRow.jsx
|    |    |    |    |    | -- ViewTable.jsx
|    |    |    | -- Collections
|    |    |    |    | -- Main Components
|    |    |    |    |    | -- Create.jsx
|    |    |    |    |    | -- Delete.jsx
|    |    |    |    |    | -- ReadAll.jsx
|    |    |    |    |    | -- ReadOne.jsx
|    |    |    |    |    | -- Update.jsx
|    |    |    |    | -- Partials Components
|    |    |    |    |    | -- Comment.jsx
|    |    |    |    |    | -- CommentForm.jsx
|    |    |    |    |    | -- CommentList.jsx
|    |    |    |    |    | -- NoCollectionsFound.jsx
|    |    |    |    |    | -- NoCommentsFound.jsx
|    |    |    |    |    | -- PictureRow.jsx
|    |    |    |    |    | -- TopActions.jsx
|    |    |    |    |    | -- ViewRow.jsx
|    |    |    |    |    | -- ViewTable.jsx
|    |    |    | -- Contact
|    |    |    |    | -- Contact.jsx
|    |    |    | -- Home
|    |    |    |    | -- Home.jsx
|    |    |    | -- Loading Indicator
|    |    |    |    | -- LoadingIndicator.jsx
|    |    |    | -- MainApp Partials
|    |    |    |    | -- AppBar.jsx
|    |    |    | -- Profile
|    |    |    |    | -- Profile.jsx
|    |    |    | -- SearchResults
|    |    |    |    | -- Main Components
|    |    |    |    |    | -- ReadAll.jsx
|    |    |    |    | -- Partials Components
|    |    |    |    |    | -- NoCollectionsFound.jsx
|    |    |    |    |    | -- ViewRow.jsx
|    |    |    |    |    | -- ViewTable.jsx
|    |    | -- containers
|    |    |    | -- Admin
|    |    |    |    | -- Collections
|    |    |    |    |    | -- CreateView.jsx
|    |    |    |    |    | -- DeleteView.jsx
|    |    |    |    |    | -- UpdateView.jsx
|    |    |    |    | -- Logs
|    |    |    |    |    | -- Collections
|    |    |    |    |    |    | -- LogsCollectionsCreateView.jsx
|    |    |    |    |    |    | -- LogsCollectionsDeleteView.jsx
|    |    |    |    |    |    | -- LogsCollectionsUpdateView.jsx
|    |    |    |    |    |    | -- LogsCollectionsView.jsx
|    |    |    |    |    | -- Login
|    |    |    |    |    |    | -- LogsLoginView.jsx
|    |    |    |    |    | -- Main Component
|    |    |    |    |    |    | -- LogsView.jsx
|    |    |    |    |    | -- News
|    |    |    |    |    |    | -- LogsNewsCreateView.jsx
|    |    |    |    |    |    | -- LogsNewsDeleteView.jsx
|    |    |    |    |    |    | -- LogsNewsUpdateView.jsx
|    |    |    |    |    |    | -- LogsNewsView.jsx
|    |    |    |    |    | -- Profile
|    |    |    |    |    |    | -- LogsProfileView.jsx
|    |    |    |    |    | -- Signup
|    |    |    |    |    |    | -- LogsSignupView.jsx
|    |    |    |    | -- Main Component
|    |    |    |    |    |  -- AdminView.jsx
|    |    |    |    | -- News
|    |    |    |    |    | -- CreateView.jsx
|    |    |    |    |    | -- DeleteView.jsx
|    |    |    |    |    | -- UpdateView.jsx
|    |    |    |    | -- Users
|    |    |    |    |    | -- UsersView.jsx
|    |    |    | -- Authentication
|    |    |    |    | -- LoginView.jsx
|    |    |    |    | -- SignUpView.jsx
|    |    |    | -- BrowseCollections
|    |    |    |    | -- ReadAllView.jsx
|    |    |    |    | -- ReadOneView.jsx
|    |    |    | -- BrowseNews
|    |    |    |    | -- ReadAllView.jsx
|    |    |    |    | -- ReadOneView.jsx
|    |    |    | -- Collections
|    |    |    |    | -- CreateView.jsx
|    |    |    |    | -- DeleteView.jsx
|    |    |    |    | -- ReadAllView.jsx
|    |    |    |    | -- ReadOneView.jsx
|    |    |    |    | -- UpdateView.jsx
|    |    |    | -- Contact
|    |    |    |    | -- ContactView.jsx
|    |    |    | -- Error
|    |    |    |    | -- NotAuthorizedView.jsx
|    |    |    |    | -- NotFoundView.jsx
|    |    |    | -- Home
|    |    |    |    | -- HomeView.jsx
|    |    |    | -- MainApp
|    |    |    |    | -- functions.js
|    |    |    |    | -- MainApp.jsx
|    |    |    |    | -- ScrollToTop.jsx
|    |    |    |    | -- ScrollToTopButton.jsx
|    |    |    | -- Profile
|    |    |    |    | -- ProfileView.jsx
|    |    |    | -- SearchResults
|    |    |    |    | -- ReadAllView.jsx
|    |    | -- modules
|    |    |    | -- Auth.js
|    |    | -- reducers
|    |    |    | -- Admin
|    |    |    |    | -- Collections
|    |    |    |    |    | -- manageCollectionsCreateReducerAdmin.js
|    |    |    |    |    | -- manageCollectionsDeleteReducerAdmin.js
|    |    |    |    |    | -- manageCollectionsReadAllReducerAdmin.js
|    |    |    |    |    | -- manageCollectionsUpdateReducerAdmin.js
|    |    |    |    | -- Logs
|    |    |    |    |    | -- Collections
|    |    |    |    |    |    | -- logsCreateCollectionsReducer.js
|    |    |    |    |    |    | -- logsDeleteCollectionsReducer.js
|    |    |    |    |    |    | -- logsUpdateCollectionsReducer.js
|    |    |    |    |    | -- Login
|    |    |    |    |    |    | -- logsLoginReducer.js
|    |    |    |    |    | -- News
|    |    |    |    |    |    | -- logsCreateNewsReducer.js
|    |    |    |    |    |    | -- logsDeleteNewsReducer.js
|    |    |    |    |    |    | -- logsUpdateNewsReducer.js
|    |    |    |    |    | -- Profile
|    |    |    |    |    |    | -- logsProfileReducer.js
|    |    |    |    |    | -- Signup
|    |    |    |    |    |    | -- logsSignUpReducer.js
|    |    |    |    | -- News
|    |    |    |    |    | -- manageNewsCreateReducerAdmin.js
|    |    |    |    |    | -- manageNewsDeleteReducerAdmin.js
|    |    |    |    |    | -- manageNewsUpdateReducerAdmin.js
|    |    |    |    | -- Users
|    |    |    |    |    | -- manageUsersReducerAdmin.js
|    |    |    | -- AppBar
|    |    |    |    | -- collectionNamesReducer.js
|    |    |    |    | -- searchReducer.js
|    |    |    | -- Authentication
|    |    |    |    | -- loginReducer.js
|    |    |    |    | -- signUpReducer.js
|    |    |    | -- BrowseCollections
|    |    |    |    | -- browseCollectionsReadAllReducer.js
|    |    |    |    | -- browseCollectionsReadOneReducer.js
|    |    |    | -- BrowseNews
|    |    |    |    | -- browseNewsReadAllReducer.js
|    |    |    |    | -- browseNewsReadOneReducer.js
|    |    |    | -- Collections
|    |    |    |    | -- manageCollectionsCreateReducer.js
|    |    |    |    | -- manageCollectionsDeleteReducer.js
|    |    |    |    | -- manageCollectionsReadAllReducer.js
|    |    |    |    | -- manageCollectionsReadOneReducer.js
|    |    |    |    | -- manageCollectionsUpdateReducer.js
|    |    |    | -- Contact
|    |    |    |    | -- contactReducer.js
|    |    |    | -- Profile
|    |    |    |    | -- profileReducer.js
|    |    |    | -- collectionsHomeViewReducer.js
|    |    |    | -- index.js
|    |    |    | -- newsHomeViewReducer.js
|    |    |    | -- shouldUpdateCollectionsReducer.js
|    |    |    | -- userReducer.js
|    |    | -- store
|    |    |    | -- configureStore.js
|    |    | -- style
|    |    |    | -- constants
|    |    |    |    | -- _fonts.scss
|    |    |    |    | -- _functions.scss
|    |    |    | -- partials
|    |    |    |    | -- _appBar.scss
|    |    |    | -- _adminCP.scss
|    |    |    | -- _collections.scss
|    |    |    | -- _contact.scss
|    |    |    | -- _home.scss
|    |    |    | -- _login.scss
|    |    |    | -- _logs.scss
|    |    |    | -- _manage-users.scss
|    |    |    | -- _news.scss
|    |    |    | -- _profile.scss
|    |    |    | -- _signup.scss
|    |    |    | -- _universal.scss
|    |    | -- app.jsx
|    |    | -- routes.js
| -- .babelrc
| -- .eslintrc.json
| -- .gitignore
| -- index.js
| -- package.json
| -- README.md
| -- webpack.config.js
</pre>

<h1><i>Installation</i></h1>

<p>Once you meet the above requirements, go to the folder called /info-educatie-judet-44RT-master/ and follow these steps:</p>

<ol>
<li>Open a terminal</li>
<li>Run the following command:</li>

```shell
npm install
```

<li>Configure MongoDB in /config/index.json (we distribute the project with no password for the database)</li>
<li>Go back to the root folder and run the command: </li>

```shell
npm start
```

OPTIONAL: If that fails, just run this command instead: 

```shell
node index.js
```

<li>Navigate to localhost:8080 or your reverse proxy equivalent in your browser.</li>
<li>The site should be up and running at this point.</li>

<li>OPTIONAL: if it isn't, it might be because bcrypt is acting strange. Just run:</li>

```shell
npm install bcrypt
```

<p>If that doesn,t fix it, open an issue.</p>

<p>Again, the webiste is not distributed with a database. In the next section we will explain why.</p>
</ol>

<h1><i>Usage</i></h1>

<h3><i>1.Database</i></h3>

<p>MongoDB is a NoSQL database that allows us to have extensive, quickly fixable and easy to setup schemas.</p>
<p>To use the website you don't need to bother to import our data, you can easily create yours. Here is how: simply navigate to localhost:8080 and use the website</p>

<p>MongoDB can use, or not, defined schemas just like SQL databases. Our application has some defined schemas that you don't need to worry about.</p>

<p>As soon as you finished the steps in the above section, you can register, login, create collections(our use of the term collections, not MondoDB's) , delete them etc</p>

<p><b>To become an admin, you need to create an account and manually modify the field in the collection called users (MongoDB's term of collections) called admin and set it to true. </b></p>

<p>For the above operation, we strongly recommend MondoDB Compass.</p>

<h3><i>2.Using the website as a guest</i></h3>

<p>You can:</p>

<ol>
<li>Register&Login</li>
<li>See the main page without the ability to comment</li>
<li>Browse all news articles</li>
<li>Browse all collections</li>
</ol>

<h3><i>3.Using the website as a regular user</i></h3>

<p>You can:</p>

<ol>
<li>See the main page</li>
<li>Browse all news articles</li>
<li>Browse all collections</li>
<li>Comment on any article or lesson</li>
<li>You have your own profile and identity on the website</li>
<li>Post new collections of yourself and manage them as you want (edit, delete)</li>
<li>Favourite somebody's lesson</li>
<li>View the profile of other users</li>
</ol>

<h3><i>4.Using the website as a moderator</i></h3>

<p>You can:</p>

<ol>
<li>See the main page</li>
<li>Browse all news articles</li>
<li>Browse all collections</li>
<li>Comment on any article or lesson</li>
<li>You have your own profile and identity on the website</li>
<li>Post new collections of yourself and manage them as you want (edit, delete)</li>
<li>Favourite somebody's lesson</li>
<li>View the profile of other users</li>
<li>Delete mean or hurtful comments on collections and news</li>
</ol>

<h3><i>5.Using the website as an admin</i></h3>

<p>You can:</p>

<ol>
<li>See the main page</li>
<li>Browse all news articles</li>
<li>Browse all collections</li>
<li>Comment on any article or lesson</li>
<li>You have your own profile and identity on the website</li>
<li>Post new collections of yourself and manage them as you want (edit, delete)</li>
<li>Post news articles and manage them as you want (edit, delete)</li>
<li>Edit all collections on the website, including who owns them</li>
<li>Delete all collections on the website</li>
<li>Create collections for other users in case they deleted it by mistake</li>
<li>Have access to all the logs of the website (these include all CUD (create, update, delete) actions performed by anybody on both news and collections. The logs also include all login logs, signup logs and profile edit logs.</li>
<li>Give users moderator rights or ban them from the website.</li>
</ol>

<h1><i>Technical details</i></h1>

<h3><i>Front-end:</i></h3>

<h5>Languages used:</h5>

<ul>
<li>JavaScript</li>
<li>HTML5</li>
<li>CSS&CSS3</li>
</ul>

<h5>Frameworks used:</h5>

<ul>
<li>ReactJS</li>
<li>DraftJS</li>
<li>Redux</li>
</ul>

<h5>Pre-processors used:</h5>

<ul>
<li>Sass</li>
</ul>

<h5>Bundling:</h5>

<ul>
<li>Webpack</li>
<li>Babel</li>
</ul>

<h5>Notes:</h5>

<ul>
<li>The website is a SPA (single-page-app) created with ReactJS, React-Router and ExpressJS. For the data management part we use Redux.</li>
<li>Part of the style is created by using Material-UI</li>
<li>Sass encapsulates our own approach to Material-UI and our own choice for element's style</li>
<li>We use the principle of Container Components and Presentational Components</li>
<li>All of our AJAX requests are done with Axios and can be found in /src/actions , in the specific file for the specific page.</li>
<li>Container Components make sure that Redux communicates with the Presentational Components by mapping props and connecting to the store.</li>
<li>Presentational Components are found in /src/public/components and they contain the code regarding how every page is displayed</li>
<li>React Dev Tools can be disabled with the following lines ( paste them to /resource/index/index.html</li>

```html
<script>
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {}
</script>
```

<li>Redux Dev Tools can be disabled by replacing the /src/public/store/configureStore.js with the following:</li>

```javascript
    import {createStore, applyMiddleware} from 'redux'
    import thunk from 'redux-thunk'
    import rootReducer from '../reducers/index.js'
    
    export default function configureStore() {
        return createStore(
            rootReducer,
            applyMiddleware(thunk)
        );
    }
```

<li>In case you want to disable Redux Dev Tools, you also need to rebuild the app with the following command, in the root folder: </li>

```shell
webpack --optimize-minimize --define process.env.NODE_ENV="'production'"
```

</ul>

<h3><i>Back-end:</i></h3>

<h5>Languages used:</h5>

<ul>
<li>JavaScript</li>
</ul>

<h5>Frameworks used:</h5>

<ul>
<li>ExpressJS</li>
</ul>

<h5>Other important libraries and middleware used:</h5>

<ul>
<li>Socket.io</li>
<li>Mongoose</li>
<li>Body-parser</li>
<li>Passport</li>
<li>Nodemon</li>
<li>Redis ( Caching )</li>
</ul>

<h5>General notes:</h5>

<ul>
<li>The application uses <a hre="https://jwt.io/">JSON Web Token Authentication</a></li>
<li>Authentication was created with the help of <a href="https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt">this</a> guide by Vladimir Ponomarev.</li>
<li>User input is verified by the following criteria: length, type and existence (req.body.data)</li>
<li>Sanitize is done by using the <a href="https://www.npmjs.com/package/express-mongo-sanitize">express-mongo-sanitize</a> middleware</li>
<li>Models for the data that is to be inserted into the database can be found in /resource/mongo-models</li>
<li>The code that handles POST and GET requests is found in /resource/routes, including the response to Socket.io emit events</li>
</ul>

<h5>In-depth notes:</h5>

<ul>
<li>The identitity of the user is only checked when he logs in.</li>
<li>The credentials and permission of the user are checked every time they navigate to any page of the website. Thanks to Redux, we don't refetch the data everytime the user changes the view.</li>
<li>Regular users, if they manage to open React Dev Tools, can access Admin Panel, see the buttons but all requests to retrieve data will return a res.status(401).end() .</li>
<li>This way, no sensitive data is shown to non-admins even if they manage to access the admin panel</li>
<li>Trying to navigate to somebody's page for deleting a lesson like <a>http://localhost/manage/readOne/591dc1ab2d590a01979b52a3/delete</a> will return a res.status(404) based on the fact that the lesson's requested userId(creator's id) doesn't match the one from the decoded JWT. Same applies for all pages that are not part of Admin Panel</li>
<li>Socket.io is used for the comments system. This way, we provide real-time comments for every single lesson on the website, separately, of course. Same for the favourite system.</li>
<li>The reason behind why we use our own logging system if to be able to restore collections in case somebody deleted it or somebody messed with their account.</li>
</ul>

<h3><i>Issues:</i></h3>

<h5>Any issue found on the website should be well documented and posted in the Issues section on GitHub</h5>
<h1>Creators:</h1>
<h5>Valentin Marian Constanda</h5>
<h5>Cristiana Lazar</h5>