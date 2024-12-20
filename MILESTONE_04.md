Milestone 04 - Final Project Documentation
===

### NetID
---
kb4242

### Name
---
Kwaaku Boamah-Powers

### Repository Link
---
[GitHub Repository](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Boamah-Powers)

### URL for deployed site
---
[SoundSync](http://linserv1.cims.nyu.edu:12165/)

### URL for Form 1
---
[Registration form](http://linserv1.cims.nyu.edu:12165/register)

### URL for Form 1 Result
---
After registering and logging in, the username appears at the top right corner along with the avatar <br>
- [Home Page](http://linserv1.cims.nyu.edu:12165/)

### URL for Form 2
---
[Add Snippet Form](http://linserv1.cims.nyu.edu:12165/add-snippet)

### Special Instructions for Form 2
---
User must be logged in to be able to add a snippet

### URL for Form 2 Result
---
After adding a snippet, the snippet will be listed under snippets created by the user and on the home page which displays all snippets <br>
- [Home Page](http://linserv1.cims.nyu.edu:12165/)
- [User snippets](http://linserv1.cims.nyu.edu:12165/profile)

### URL for Form 3
---
[Update Profile Form](http://linserv1.cims.nyu.edu:12165/update-profile)

### Special Instructions for Form 3
---
User must be logged in to be able to update profile

### URL for Form 3 Result
---
After updating user profile, the changes can be seen from the user's profile page<br>
- [Profile](http://linserv1.cims.nyu.edu:12165/profile)

### First link to github line number(s) for constructor, HOF, etc.
---
- [map](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Boamah-Powers/blob/master/frontend/src/routes/homePage.jsx)

### Second link to github line number(s) for constructor, HOF, etc.
---
- [filter](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Boamah-Powers/blob/master/backend/src/controllers/snippet.controller.js)

### Short description for links above
---
- The **map** method is used to iterate over the **transformedResponse** array and generate a new array of MusicCard components, one for each item in the array
- **filter** is used to remove any empty strings that might result from the **split** operation.

### Link to github line number(s) for schemas (db.js or models folder)
---
- [schemas](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Boamah-Powers/tree/master/backend/src/models)

### Description of research topics above with points
---
- **5 points** - User Authentication and Authorization: Implementing **Passport.js** for secure login and registration, hashed passwords, sessions, and authorization for user-only routes.  
- **3 points** - API Testing with Postman: Testing API endpoints (e.g., user authentication, snippet uploads) using **Postman**, with screenshots and API documentation.  
- **6 points** - React Frontend Framework: Building the frontend with **React**, managing state, and creating dynamic, responsive user interfaces for snippets and collaboration.  
- **2 points** - Use a CSS Framework (Tailwind CSS): Applying **Tailwind CSS** for rapid styling and customization to match SoundSync's design.  
- **3 points** - Cloudinary for Audio Snippets: Utilizing **Cloudinary** for audio snippet storage, playback, and secure handling of media data.  
- **5 points** - Build Tools and Task Runners (Vite/ESLint Integration): Using **Vite** for bundling and file watching, integrated with **ESLint** for automated code linting with a dedicated configuration file.

### Links to github line number(s) for research topics described above (one link per line)
---
- [Passport](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Boamah-Powers/blob/master/backend/app.js)
- [React & Tailwindcss](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Boamah-Powers/tree/master/frontend)
- [Cloudinary](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Boamah-Powers/blob/master/frontend/src/components/uploadWidget.jsx)
- [Cloudinary](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Boamah-Powers/blob/master/backend/src/config/cloudinary.js)
- [Postman](https://www.postman.com/docking-module-engineer-83197672/soundsync/overview)
- [Vite & Eslint](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Boamah-Powers/blob/master/frontend/vite.config.js)
  <!-- - ![eslint](documentation/vite.gif =100x) -->
  - [configuration file](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Boamah-Powers/blob/master/frontend/vite.config.js)
  - [eslint file](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Boamah-Powers/blob/master/frontend/eslint.config.js)
  - <img src="documentation/vite.gif" width="600"/>