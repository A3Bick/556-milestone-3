const fs = require('fs');

fs.readFile("Assets/Data.Courses.txt", (err, data)=>{
    if (err){
        console.error("Well that sucks: ", err);
        return;
    }
});