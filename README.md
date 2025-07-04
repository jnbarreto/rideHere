# rideHere
learning design patterns, clean architecture with this app

## Start Project
### run docker container to upload postgres database
``` 
npm run docker:start
 ```
### run server
```
npm run dev
```

## Tests
### Jest runs all created tests
--silent suppresses console messages

--coverage generates test report
#### run 
```
npm run test
```
### How to open the test coverage report in the browser (Default Ubuntu)
```
xdg-open coverage/lcov-report/index.html
```
