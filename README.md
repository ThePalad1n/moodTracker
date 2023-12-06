# Table of Contents

1. [Introduction](#mood-tracker)
   - [Welcome to Mood Tracker](#mood-tracker)
2. [Getting Started](#getting-started)
   - [Instructions for Setup](#getting-started)
   - [Prerequisites](#prerequisites)
     - [Installation Guide](#prerequisites)
3. [Cloning the Project](#cloning-the-project)
   - [Cloning Command](#cloning-the-project)
4. [Installing Packages](#installing-packages)
   - [Installation Steps](#installing-packages)
   - [Note on Running Server and Frontend](#installing-packages)
5. [Running the Server](#running-the-server)
   - [Command to Start Server](#running-the-server)
6. [Running the Frontend](#running-the-frontend)
   - [Command to Start Frontend](#running-the-frontend)
7. [Using the Application](#how-to-use-the-app)
   - [Steps to Use the App](#how-to-use-the-app)
     - [Register](#how-to-use-the-app)
     - [Login](#how-to-use-the-app)
     - [Start Tracking](#how-to-use-the-app)
8. [Frameworks and Technologies](#frameworks)
   - [React](#frameworks)
   - [MySQL](#frameworks)
9. [Report](#report)
   - [Goal of the Project](#goal-of-the-project)
   - [Significance of the Project](#significance-of-the-project)
   - [Installation and Instruction to Use](#installation-and-instruction-to-use)
   - [Structure of the Code](#structure-of-the-code)
   - [Functionalities and Test Results](#functionalities-and-test-results)
   - [Discussion and Conclusions](#discussion-and-conclusions)

# Mood Tracker

Welcome to the Mood Tracker project! This application offers a user-friendly interface for mood tracking and analysis using your favorite data structures and algorithms! What are the benefits of mood tracking?

   1. **Self-Awareness**: Regular mood tracking enhances self-awareness. By recognizing patterns in your emotional states, you become more attuned to what causes positive and negative feelings. This awareness is the first step towards making changes that foster well-being.

   2. **Identifying Triggers**: Keeping track of your mood can help you identify specific situations, activities, or people that consistently impact your mood. Understanding these triggers allows you to either avoid negative influences or develop strategies to cope with them more effectively.

   3. **Emotional Regulation**: Mood tracking can aid in emotional regulation. By acknowledging and labeling your emotions, you can manage them more effectively. This process is a key component of psychological therapies like Cognitive Behavioral Therapy (CBT).

   4. **Positive Reinforcement**: Tracking positive moods and what caused them can reinforce behaviors and activities that contribute to your happiness. This positive reinforcement encourages you to engage more in these happiness-boosting activities.

   5. **Goal Setting and Progress Tracking**: Setting emotional well-being goals and tracking progress towards them can be very motivating. Seeing improvements over time can be a powerful driver of continued effort and optimism.

   6. **Mindfulness and Reflection**: The act of mood tracking itself encourages a mindful approach to daily life. Reflecting on your mood and the reasons behind it fosters a more contemplative, less reactive approach to life.

   7. **Early Detection of Mental Health Issues**: Regular mood tracking can help in the early detection of mental health issues. Noticing persistent negative mood states can be a prompt to seek professional help before issues become more serious.

   8. **Personalized Strategies for Happiness**: Over time, mood tracking can reveal what specifically works for you in enhancing your happiness. This personalized understanding is far more effective than generic advice.


## Getting Started

These instructions will help you set up the project locally. Follow these simple steps to get your development environment running.

### Prerequisites

Before you begin, ensure you have visited the [Installation Guide](https://github.com/ThePalad1n/moodTracker/blob/main/INSTALLATION_GUIDE.md) so that you can run the project.

# Cloning the Project

To clone the project, run the following command in your terminal:
```bash
git clone https://github.com/ThePalad1n/moodTracker.git
```

# Installing Packages

Navigate to the project directory and install the necessary packages:
```bash
npm install
```

**NOTE**You will need two terminals to run the server and frontend

# Running the Server

To start the server, run the following command:
```bash
npm run server
```

# Running the Frontend

To start the frontend application, use the following command:
```bash
npm run start
```

## How to Use the App

Follow these steps to begin tracking your mood:

1. **Register**: Create a new account to start using the app.
2. **Login**: Sign in with your registered credentials.
3. **Start Tracking**: Begin recording your daily mood and view your mood history.

## Frameworks

This application is built using the following frameworks:

- **React**: A JavaScript library for building user interfaces.
- **MySQL**: A robust database management system to store and manage your mood data.

## Report

   - **Goal of the Project**:
      The goal was to create a place for the user to track their mental state and journal about their thoughts. By being aware of your habits and visualizing them it makes the likelihood of positive change higher.
     
   - **Significance of the Project**:

      There are many reasons to track your mood and journal. Let's dive into a few different reasons one may use this app.

      Tracking Mood: 
      	A good way to help create a healthier mindset is by tracking your moods and habits and analyzing your behavior. 
          Example: Let's say that we go to some sort of celebration or event and decide to have some drinks. Alcohol and other substances create dopaminergic responses which make you feel really good at the moment. But one thing to mention about dopamine is that there           is a mirroring effect. So if you get a load of dopamine spikes in a short duration (drinking alcohol or scrolling on social media) there will be a low point later. That is why tracking moods are important. If you are noticing these negative or low scored               thoughts the days after activities like the ones mentioned, then it's important to make some lifestyle changes in order to have an overall more positive mind state.
      Journaling:
      	Journaling is an important tool that has been brushed under the rug with the rise of technology. It helps reduce stress and anxiety and improves focus on long term goals. I added a journaling feature so that the user can take notes and reference them later.            With time stamps there would be a way to see which entries were added for the given mood track.
     
   - **Installation and Instruction to Use**: Provide clear installation and usage instructions.
         [Installation Guide](https://github.com/ThePalad1n/moodTracker/blob/main/INSTALLATION_GUIDE.md)
     
   - **Structure of the Code**: Include a systematic code structure diagram and clear explanations.
   1. node_modules: This directory contains all the Node.js modules that your project depends on. These are installed via npm (Node Package Manager) and should not be edited directly.
   
   2. public: This directory holds static files that are served directly to the client, such as compiled JavaScript, CSS stylesheets, and images.
   
   3. server: This contains server-side code, including routes and the main server.js file. 
      - routes: This sub-directory contains various JavaScript files that define API endpoints for different operations like login, register, users, etc.
        - login.js: Handles user login functionality.
        - mood.js: Handles operations related to mood tracking.
        - register.js: Manages user registration.
        - users.js: Contain functions for user management.
        - server.js: The main server file that initializes and runs the Express server.
   
   4. src: This directory holds the source code for the client-side of the application, usually written in React.
      - components: Contains React components that make up the user interface.
        - AuthenticatedNavbar.js: A navigation bar component that probably shows up when the user is logged in.
        - HomePage.js: The main landing page component.
        - Login.js: The component for the login interface.
        - MoodTracker.js: The component related to mood tracking functionality.
        - NotFoundPage.js: Displayed when a user navigates to an undefined route.
        - Queue.js: Could be a component for showing a queue of items or requests.
        - RegisterForm.js: The form used for user registration.
        - Stack.js: This could be a custom component that manages a stack of elements or a layout style.
      - contexts: Holds context files used by React to manage global state.
      - services: Contains files related to making API calls.
        - api.js: This might be where the application's API calls are centralized.
   
   5. App.css: The main stylesheet for the application.
   
   6. App.js: The main React component that acts as the entry point for the client-side application.
   
   7. index.css: Global styles for the application.
   
   8. index.j*: The JavaScript entry point that renders the React application to the DOM.
   
   9. logo.svg: A scalable vector graphic file, likely the logo of the application.
   
   10. reportWebVitals.js: A script for logging performance-related metrics.
   
   11. setupTests.js: A file for setting up tests, possibly with Jest or another testing library.
   
   12. .gitignore: A configuration file for Git that specifies intentionally untracked files to ignore.
   
   13. moodtrackerdb.sql: This file contains SQL database schema or scripts related to the mood tracking application.
   
   14. package-lock.json: Automatically generated file for any operations where npm modifies either the node_modules tree or package.json.
   
   15. package.json: Holds metadata relevant to the project and it is used for managing the project's dependencies, scripts, and versions.
   
   16. README.md: A markdown file used to describe the project, how to set it up, and how to use it.

   - **Functionalities and Test Results**: Present functionalities and testing results for verification.

        There is a login and registration page. Once the user is signed in and authenticated they are directed to the MoodTracker where all their entries are saved in the database and connected to their individual profile.

        [Registration](https://drive.google.com/file/d/1YLcBOxJo3Ax9D2ZLN7lCd50fGz7zgsd0/view?usp=drive_link)
        [Registration Check](https://drive.google.com/file/d/1mhI0uluvDz47eygn3OFjTNIytBaZg1H4/view?usp=drive_link)
        [Login](https://drive.google.com/file/d/1rSeOSGKR8CreMmL8hr60YCej-DzvcgBV/view?usp=drive_link)
        [Login Check](https://drive.google.com/file/d/1HV4C6f1DXABS1hSqktyENkQfJKPjcV0b/view?usp=drive_link)
        [MoodTracker](https://drive.google.com/file/d/1ACbaQvPXcTdt0UpCjCOWi6X4Rxi7yEKV/view?usp=drive_link)

        Here is a [demo](https://drive.google.com/file/d/1M9kWewRzQTVNzVhOOYf0OsQY3NWAl16-/view?usp=drive_link)

   - **Discussion and Conclusions**: Discuss project issues, limitations, and the application of course learning.

      Since there was a required UI component the focus seemed to shift on delivering more of a presentable product which took away from some of the wishful features.
      
      Limitations were strictly time and I will be working on this after the course because I believe it can become a good resource for my community.
      
      Currently, the moodtracker uses stack and queues in the first chart with the initial entries. In the second chart there is a section that uses a heap to determine the frequency of tracked mood values. Both of which update in real time.
      
      Future implementations would include activities being tied to the moods for better analytics and finishing the journal section. And a specialized nav for the user after authentication.
