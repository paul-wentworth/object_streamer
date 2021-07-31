middleware
ws vs socket.io
SQL vs NoSQL

# CREATE

`curl -d '{"title": "TestObject", "x": 10, "y": 10, "velocityX": -2, "velocityY": "2", "properties": {"property": "xxx"}}' -H "Content-Type: application/json" -XPOST http://localhost:3000/objects`

# READ

`curl http://localhost:3000/objects`

# UPDATE

`curl -d '{"title": "RenamedObject", "x": 10, "y": 10, "velocityX": -2, "velocityY": "2", "properties": {"property": "changed"}}' -H "Content-Type: application/json" -X PUT http://localhost:3000/objects/17`

# DELETE

`curl -X DELETE http://localhost:3000/objects/18`
