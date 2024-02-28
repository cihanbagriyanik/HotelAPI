# HOTEL API

### ERD:

![ERD](./erdHotelAPI.png)

### Folder/File Structure:

```
    logs/
    src/
        configs/
            dbConnection.js
            swagger.json
        controllers/
            auth.js
            reservation.js
            room.js
            token.js
            user.js
        helpers/
            passwordEncrypt.js
            sendMail.js
            sync.js
        middlewares/
            authentication.js
            errorHandler.js
            findSearchSortPage.js
            logger.js
            permissions.js
        models/
            reservation.js
            room.js
            token.js
            user.js
        routes/
            auth.js
            document.js
            reservation.js
            room.js
            token.js
            user.js
    .env
    .gitignore
    index.js
    package.json
    readme.md
    swaggerAutogen.js

```
