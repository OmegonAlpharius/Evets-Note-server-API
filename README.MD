# Evets Note  server API

## Установка приложения

1. Клонируйте репозиторий  
   
    `git@github.com:OmegonAlpharius/Evets-Note-server-API.git  `

1. Перейдите в папку    
   
    ` cd  homework_94_nikolay_tarassenko `

1. Установите зависимости 
  
    `npm install` 

1. Установите БД
 
    `https://www.mongodb.com/try/download/community`


1. Очищение и Заполнение БД тестовыми данными
   
    `npm run fixtures`


## Запуск приложения

1. Для продакшена приложение запускается командой

     `npm start`

1. Для разработки 

     `npm run dev`


## API ENDPOINTS


- ### POST /events - создать событие  
  
   `http://localhost:8000/events`

   Принимает JSON
   
   Необходим токен аутентификации через заголовки запроса:

     Authentication:String

  ``` 
  {  
      title: {
    type: String,
    required: true,
  },
 
  dateTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: String,
  },
  }  

  ```

    Структура ответа:

  ```   
  {
     title: {
    type: String,
   
  },
  creator: {
    type: String
  },
  dateTime: {
    type: Date,
    
  },
  duration: {
    type: String,
  },
  }
  ```   

- ### GET /events - получить все события

     `http://localhost:8000/events`

        Необходим токен аутентификации через заголовки запроса:

     Authentication:String

  Структура ответа:

  ``` 
  [
   {
     title: {
    type: String,
   
  },
  creator: {
    type: String
  },
  dateTime: {
    type: Date,
    
  },
  duration: {
    type: String,
  },
  }  
  ...
  ]
  ```
- ### DELETE /events?id={id-события} - удалить  событие
  
-    Необходим токен аутентификации через заголовки запроса:

     Authentication:String

     `http://localhost:8000/events`

  Структура ответа:

  ``` 
  [
   {
     title: {
    type: String,
   
  },
  creator: {
    type: String
  },
  dateTime: {
    type: Date,
    
  },
  duration: {
    type: String,
  },
  }  
  ...
  ]
  ```
- ### POST /users - регистрация (создание) нового пользователя

  
   `https://localhost:8000/users`

   Принимает JSON


  ``` 
  {  
      "username": String, required
      "password": String, required
      "email": String, required
  }  

  ```

    Структура ответа:

  ```  
  {
      "_id": String,
      "username": String,
      "token": String,
      "sibscribes":[String],
      "sibscribers":[String],
      "__v": 0
  }  
  ```   

- ### POST /users/sessions - логин пользователя

  
   `https://localhost:8000/users/sessions`

     Принимает JSON
  ``` 
  {  
      "username": String, required
      "password": String, required
  }  

  ```

    Структура ответа:

  ```  
  {
      "_id": String,
      "username": String,
      "token": String,
      "sibscribes":[String],
      "sibscribers":[String],
      "__v": 0
  }  
  ```   


 - ### DELETE /users/sessions - завершение сессии пользователя


    Принимает токен аутентификации через заголовки запроса:

     Authentication:String
  
    `https://localhost:8000/users/sessions`

      Принимает 

    ``` 
   {  
       Authorization:String
      
   }  

    ```

      Структура ответа:

    ```  
   {
     "message": 'success'
   } 
    ```   




 - ### GET /users/suscribers - получить список подписчиков


    Принимает токен аутентификации через заголовки запроса:

     Authentication:String
  
    `http://localhost:8000/users/suscribers`


      Структура ответа:

    ```  
     {
      "_id": String,
      "username": String,
      "token": String,
      "sibscribes":[String],
      "sibscribers":[String],
      "__v": 0
     }  
    ```   



 - ### DELETE /users/suscribers?id={id подписчика} - удалить подписчика по id


    Принимает токен аутентификации через заголовки запроса:

     Authentication:String
  
    `http://localhost:8000/users/suscribers`


      Структура ответа:

    ```  
     {
      "_id": String,
      "username": String,
      "token": String,
      "sibscribes":[String],
      "sibscribers":[String],
      "__v": 0
     }  
    ```   


 - ### POST /users/suscribers?id={id подписчика} - добавить подписчика по id


    Принимает токен аутентификации через заголовки запроса:

     Authentication:String
  
    `http://localhost:8000/users/suscribers`


      Структура ответа:

    ```  
     {
      "_id": String,
      "username": String,
      "token": String,
      "sibscribes":[String],
      "sibscribers":[String],
      "__v": 0
     }  
    ```   
