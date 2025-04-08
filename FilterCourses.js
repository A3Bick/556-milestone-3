const response = await fetch("./Assets/Data/Data.json");

let data = await response.json();

console.log(data.Courses);

