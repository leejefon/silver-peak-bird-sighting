# Silver Peak Bird Sighting

## Folder Structure

- `client`: all the frontend react code
- `config`: config file for the feathers server, potentially can add different configs for production and development
- `public`: root folder for website, compiled code from client will be put here
- `src`: server side code

### Setup:

To run the server:
- `echo 'DATABASE_URL=mysql://{user}:{pass}@localhost:3306/{database}' > .env`
- `npm install`
- `npm start`

To compile client:
- `cd client`
- `npm run build`

To develop client (watch and compile):
- `cd client`
- `npm start`
