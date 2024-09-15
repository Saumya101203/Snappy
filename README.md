# Chat App - React & Node.js

## Description

A real-time messaging application built using React for the frontend and Node.js for the backend. This app allows users to engage in one-to-one real-time chat, interact with an AI-powered chatbot, and enjoy a personalized experience with user profile avatars and emoji support.

## Features

1. **Real-Time Chat:** Engage in real-time, one-to-one conversations with other users.
2. **AI Chatbot Integration:** Chat with an AI-powered bot using the Cohere API for automated responses.
3. **User Profiles:** Customizable avatars for user profiles to enhance personalization.
4. **Emoji Support:** Send and receive emojis to make conversations more expressive.

## Installation Guide

### Requirements

1. **Node.js:** Ensure Node.js is installed on your system.
```bash
https://nodejs.org/en
```
2. **MongoDB:** Ensure MongoDB is installed and running. You can use MongoDB Compass or another MongoDB client to manage your database.
```bash
https://www.mongodb.com/try/download/community
```
### MongoDB Setup

1. Open **MongoDB Compass** or another MongoDB client.
2. Create a new local database named `chat`. This will be used for storing chat data for the application.

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Saumya101203/ChatAppWithChatbot.git
cd Files
```
2. *Rename the environment files:*

```bash
cd public
mv .env.example .env
cd ..
cd server
mv .env.example .env
```
3. *Install the dependencies:*

```bash
cd server
yarn
cd ..
cd public
yarn
npm install @chatscope/chat-ui-kit-react
cd ..
```
4. *Start the development servers:*

```bash
cd public
yarn start
```
Open another terminal window, navigate to the server directory, and start the backend server. Ensure MongoDB is running in the background:

```bash
cd server
yarn start
```

_Done!_

Your chat application is now running, and you can chat with other users, interact with the chatbot, and more.

