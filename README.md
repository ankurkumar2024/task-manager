# TASK-MANAGER

```
This project has been created in node js as a part of airtribe assigment which allows user to perform task manipulations.
The API developed as a part of the project will allow users to perform CRUD operations (Create, Read, Update, and Delete) on tasks. 
```

# Getting started
- Clone the repository
```
git clone  <git lab template url> <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Run the project
```
npm start
```
  Navigate to `http://localhost:3000`

```
npm run test
```
API ENDPOINTS
```
1. GET /tasks 
   success response
   statuscode 200
   [
    {
        "id": 1,
        "title": "Set up environment",
        "description": "Install Node.js, npm, and git",
        "completed": true
    },
    {
        "id": 2,
        "title": "New Task",
        "description": "New Task Description",
        "completed": false
    },
    {
        "id": 3,
        "title": "New Task",
        "description": "New Task Description",
        "completed": false
    }
]

2. GET task by the particular id
   GET /tasks/1

   success response
   statuscode 200
   {
    "id": 1,
    "title": "Set up environment",
    "description": "Install Node.js, npm, and git",
    "completed": true
   }

   If the task is not found
   statuscode 404
   response 
   {
    "message": "provided task doesnot exists"
   }

3. Create a new task
  POST /tasks
  body : 
  {
    "title":"This is new Project which is made by me",
    "description":"This is new description",
    "completed":true
  }

  success response
  statuscode 201
  {
    "message": "Post created successfully"
  }

4. Update existing task
   PUT /tasks/1
   body :
   {
    "title": "Updated Task",
    "description": "Updated Task Description",
    "completed": true
   }

   success response
   statuscode 200
   {
    "message": "Task has been updated successfully"
   }

5. Delete existing task
   DELETE /tasks/1

   success response
   statuscode 200
   {
    "message": "Task has been deleted successfully"
   }  
```