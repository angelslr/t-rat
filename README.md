# T-Rat
T-Rat consist of an automatic system for measuring movement in laboratory rats that automatizes an experimental test called Open Field Test (OFT). It is composed of  3 modules: a API Backend wich controls a database, a box with infrared sensors controlled with Arduino, and a Frontend processing and visualizing module. Given that the entire application was made with hexagonal architecture, each of the modules are independent of each other.

Specifically, in this case, the data handled was:
- Drug used
- Researchers (name) who control the test
- Duration
- Movement of the rat
- Date
- Treatment: a control treatment or with drugs
- Observations

Data is fetched or sent to the database in JSON format. There are 6 different objects that have their own JSON structures: Login, Sign up, Researchers, Drugs, Tests and Arduino.


## Login
```
{
    "username": "angel",
    "password": "1234"
}
```
## Sign up
```
{
    "username": "angel",
    "firstname": "Angel",
    "lastname": "Salazar",
    "password": "1234"
}
```
## Researchers
```
{
    "name": "Angel",
    "Category": "Cat. 1"
}
```
## Drugs
```
{
    "name": "Novalgina",
    "dosage": "200ml"
}
```
## Tests
```
{
    "drug_id": 4,
    "researcher_id": 4,
    "duration": 200,
    "date": "2020-12-15T02:27:03Z",
    "treatment": "Drug",
    "movement": 200,
    "observations": "None"
}
```

## Arduino
When a test starts, Arduino checks the IR sensors. In case there are no problems, a 200 status is sent.
```
{
    "status": 200
}
```
When a test is stopped, Arduino sends the time of the test in milliseconds (ms), and the amount of movement (score).
```
{
    "status": "active",
    "ms": 25660,
    "score": 37
}
```