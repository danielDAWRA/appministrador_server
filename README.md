# Backend AppMinistrador_Server

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
      <li><a href="#objectives">Objectives</a></li>
      <li><a href="#about-the-project">About The Project</a></li>
      <li><a href="#api-controllers-functionality">API Controllers Functionality</a></li>
      <li><a href="#installation">Installation</a></li>
      <li><a href="#licence-&-developed-by:">Licence & developed by:</a></li>
  </ol>
</details>

<!-- ABOUT THE OBJECTIVES -->

## Objectives
 Tuappministrador_server is a Communities Management Web Application API designed for the 'Colegio de Administradores de Fincas de Valencia y Castellón' for helping community administrators manage their work load through a powerfull APP.

### The API fulfills the following requirements:

 <ul>
    <li>User registration </li>
    <li>User login + token + middleware.</a></li>
    <li>Admin role verification and permissions middleware.</a></li>
    <li>CRUD endpoints.</a></li>
    <li>Creating new incidences as a community user</a></li>
    <li>Updating, modifying incidences as a community administator</a></li>
    <li>Change e-mail notifications settings for receiving mail on users's community incidences</a></li>
    <li>Ability to subscribe to specific incidents</li>
  </ul>


 <!-- ABOUT THE PROJECT -->

## About The Project

  Tuappministrador_server is a Communities Management Web Application API! This API is designed to empower community administrators and users to efficiently manage and visualize the state of incidents within a building. This projects aims at improoving administrators ans community users communication and resolve incidences. It leverages JavaScript, Node.js, Express, and Mongoose to provide a robust and user-friendly platform for incident tracking and resolution.

## API Controllers Functionality
### 1. Users Controller (users)

User Management: Allows the creation, updating, and deletion of users within the system.
Profile Data Changes: Users can modify their profile information such as name, email address, etc.
Authentication and Authorization: Implements authentication and authorization logic to protect routes and actions.

### 2. Incidences Controller (incidences)

Incident Management: Facilitates the creation, modification, and updating of incidents reported within the community.
Status Tracking: Tracks the status of each incident, allowing administrators and users to monitor progress.
Notification System: Sends email notifications to users when incident status changes or when significant updates occur.

### 3. Communities Controller (communities)

Community Visualization: Provides endpoints for viewing community details such as contact information for the president, address, etc.
Information Accessibility: Ensures that community-related data is easily accessible to authorized users.

### 4.Providers Controller (providers)

Service Providers Listing: Allows users to view a list of potential service providers for repair services.
Categorization: Organizes service providers by categories to simplify search and selection for incident resolution.

 ### Built With:

* [![Node][Node.JS]][Node.JS-url]
* [![Express][Express.js]][Express.js-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* [![Mongoose][Mongoose]][Mongoose-url]
* [![JWT][JWT]][JWT-url]


<p align="right">(<a href="#backend-appministrador_server">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.


### Installation

Below is an example of how you can instruct your audience on installing and setting up your app.

1. Clone the repo
   ```sh
   git clone https://github.com/danielDAWRA/appministrador_server.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Ready to start!
    ```sh
    npm start
    ```
The API will be accessible at http://localhost:3000 by default.

<p align="right">(<a href="#backend-appministrador_server">back to top</a>)</p>


<!-- CONTACT -->
---

## Licence & developed by:

  <p align="center">

Jānis Melderis
<br>
<a href = "mailto:jaanmeld@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/jm-24095226/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
<a href="https://github.com/jaanmeld" target="_blank"><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a>
<br>
<br>
Marc Dilley
<br>
<a href = "mailto:dilley.marc@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/marc-dilley-288407a1/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
<a href="https://github.com/nuinn" target="_blank"><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a>
<br>
<br>
Daniel Dawra Wehbe
<br>
<a href = "mailto:dawra.daniel@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="http://linkedin.com/in/daniel-dawra-944465167" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
<a href="https://github.com/danielDAWRA" target="_blank"><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a>
</p>

<p align="right">(<a href="#backend-project-colaboratech">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[HTML5]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://developer.mozilla.org/en-US/docs/Glossary/HTML5
[CSS3]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[JS]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JS-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[Bootstrap]: https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com/
[MySQL]: https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com/
[Sequelize]: https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white
[Sequelize-url]: https://sequelize.org/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[JWT]: https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens
[JWT-url]: https://jwt.io/
[Vercel]: https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/es
[Swagger]: https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[GitHub]: https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white
[Mongoose]: https://img.shields.io/badge/Mongoose-880000.svg?style=for-the-badge&logo=Mongoose&logoColor=white
[Swagger-url]: https://swagger.io/
[Mongoose-url]: https://mongoosejs.com/
[Express.js-url]: https://expressjs.com/
[Node.JS]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node.JS-url]: https://nodejs.org/en/
[SASS]: https://img.shields.io/badge/SASS-pink?style=for-the-badge&logo=SASS&logoColor=white
[SASS-url]: https://sass-lang.com/
[React]: https://img.shields.io/badge/React-219ebc?style=for-the-badge&logo=React&typoColor=fedcba&logoColor=white
[React-url]: https://es.reactjs.org/
[Postman]: https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white
[Postman-url]: https://www.postman.com/
