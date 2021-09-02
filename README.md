# My - Mini - Gallery

### Table of Contents 

* [Repository](#Repository) 
* [Technology Used](#Technology-Used) 
* [User Story](#User-Story)
* [Main Application](#Main-Application)
* [Contributing](#Contributing)
* [Team Members](#Team-Members)
* [Conclusion](#Conclusion)

# Repository

- This repository is for a web application that allows users to discover, view, and share artwork with each other online.

- The goal is for artists to use this website to build up a portfolio and then be able to communicate with other creative minds, get feedback, and build a fan-base. 

*LINK TO DEPLOYED APPLICATION*

https://my-mini-gallery.herokuapp.com/

# Technology-Used

*To build the project we started by tackling the frontend and backend:*

- On the client side we made various pages and components in ReactJS, applying what we have learned so far to create the structure. We also ended up using a list of various react packages. 

- To style our application we used both standard bootstrap and even began to use some elements of react-bootstrap polish everything for our project.

- To control the navigation on the NavBar and routing with the project we utilized React-Router-Dom and Router, as well as having Global State to pass down all the necessary properties and values.

- We also used packages like dotenv to hide our keys for AWS bucket which was how we created the functionality to upload images and uuid to then store them in the database.

- When it came to authentication we used express-sessions to keep track of the user on the page, connect-mongodb-session to then store session, and bcrypt to hash and secure their password.

- For both the upload image and sign-up forms we also added some of our own validation to ensure that the user properly inputs the desired information on both pages. 

- To make HTTP requests with our endpoints on the server side we used axios to connect the client side and perform various CRUD operations with the data passed in by the users.

- For the backend we decided to use MongoDB to store all the data and mongoose to build out our models and ultimately connect everything in the end.

# User-Story

- To begin the application the user will first visit the website where they are introduced to a welcome page that presents a Navbar for navigation, search bar for tags or keywords, and dynamic gallery of artwork.

- From this home page they can choose to sign-up as a user, login if they're returning, or decide to just view the available gallery or filter through artwork via genre on the browse-art page.

- Once the user signs up or logs into the web application the NavBar updates what it displays so they can then visit the submit-art page and start uploading their own artwork.

- Any user may also then view their own artwork on the profile page or elsewhere by clicking on the images. Also later we hope they can eventually be able to update their own information and portfolio.

- All the artwork submitted is then added to the main gallery on the homepage and organized among the different genres depending on which were selected during the uploading process.

### Main-Application

*IMAGES BELOW*

*Main-Page*

![MMG-1](https://user-images.githubusercontent.com/73864182/120915319-db61b480-c657-11eb-84f4-9c6056e1de40.png)

*Gallery*

![MMG-2](https://user-images.githubusercontent.com/73864182/120915322-dbfa4b00-c657-11eb-82f2-fdff08122b8c.png)

*Footer*

![MMG-3](https://user-images.githubusercontent.com/73864182/120915292-d43aa680-c657-11eb-8705-cbe91733816f.png)

*View Gallery Images*

![MMG-4](https://user-images.githubusercontent.com/73864182/120915298-d6046a00-c657-11eb-9e9f-e4becc0f05f5.png)

*Navigation*

![MMG-5](https://user-images.githubusercontent.com/73864182/120915300-d69d0080-c657-11eb-9230-ef4fa508bb51.png)

*Signup-Page*

![MMG-6](https://user-images.githubusercontent.com/73864182/120915301-d7359700-c657-11eb-8ce4-b34b01137c5e.png)

*NavBar Update*

![MMG-7](https://user-images.githubusercontent.com/73864182/120915303-d7ce2d80-c657-11eb-8b9a-f01fb73958f0.png)

*Upload Image*

![MMG-8](https://user-images.githubusercontent.com/73864182/120915306-d866c400-c657-11eb-846f-91255f9ef341.png)

*Success-Page*

![MMG-9](https://user-images.githubusercontent.com/73864182/120915308-d8ff5a80-c657-11eb-8e1d-53dafa9ee057.png)

*Profile-Page*

![MMG-10](https://user-images.githubusercontent.com/73864182/120915309-d8ff5a80-c657-11eb-945b-165be6a5d534.png)

*Genre-Page*

![MMG-11](https://user-images.githubusercontent.com/73864182/120915311-d997f100-c657-11eb-80b3-610afa7f55a4.png)

*Display Genre*

![MMG-12](https://user-images.githubusercontent.com/73864182/120915313-da308780-c657-11eb-91c9-2068d26fc355.png)

*FURTHER DEVELOPMENT*

![MMG-13](https://user-images.githubusercontent.com/73864182/120915315-dac91e00-c657-11eb-9e19-d4705cd1dfdb.png)

*FURTHER DEVELOPMENT*

![MMG-14](https://user-images.githubusercontent.com/73864182/120915317-db61b480-c657-11eb-888e-00cc426c75d8.png)

*END OF APPLICATION*

# Contributing
  To contribute to this repo:

  Fork the repo
  Make changes to forked repo
  Submit a pull request to this repo

# Team-Members

- Amal Janabayev

- Hanh Le

- Jasur Amirov

- Jenni Detmering

- Greg Harris

# Conclusion

- Overall this assignment was a huge challenge to tackle and finally complete. There was so much we wanted to get done in the time given and while we accomplished most of our goals there's always more to do.

- But using good communication and teamwork we were able to help each other as we decided on a concept, designed the wire-frames, created the layout, and worked on every part of this web application. 

- Along the way we encountered various difficulties, such as implementing authentication with React, understanding and utilizing state, and connecting everything so that it properly renders/displays.

- While it was a difficult few weeks, throughout the development process all of us learned so much about the technologies we used and how they worked to produce the final result. 

- Our team really came together, devoted a lot of hours and some late nights, and were able to create a working MVP (minimum viable product) that we can continue to build upon at a later time!
