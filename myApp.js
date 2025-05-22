require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Connection error:', err));

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] }
});

const Person = mongoose.model('Person', personSchema);

// This function should create and save a new person
// and pass the new PERSON DOCUMENT to the callback
const createAndSavePerson = (done) => {
  //create a new person model instance
  const person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["Pizza", "Burger"]
  });

  // Save the new person(document.save) to the database.
  person.save((err, data) => {
    if (err) return done(err); // If there's an error, pass it to done.
    done(null, data);          // On success, pass null for error and the data.
  });
};


const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err); // If there's an error, pass it to done.
    done(null, people);          // On success, pass null for error and the data.
  });
};

const findPeopleByName = (personName, done) => {
  // Use the Model to find people by name
  Person.find({ name: personName }, (err, people) => {
    if (err) return done(err); // If there's an error, pass it to done.
    done(null, people);          // On success, pass null for error and the data.
  });
};

const findOneByFood = (food, done) => {
  // Use the Model to find one person by food
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return done(err); // If there's an error, pass it to done.
    done(null, person);          // On success, pass null for error and the data.
  });
};

const findPersonById = (personId, done) => {
  // Use the Model to find a person by ID
  Person.findById(personId, (err, person) => {
    if (err) return done(err); // If there's an error, pass it to done.
    done(null, person);          // On success, pass null for error and the data.
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => { 
    if (err) return done(err); // If there's an error, pass it to done.
    person.favoriteFoods.push(foodToAdd); // Add food to the person's favorite foods
    person.save((err, updatedPerson) => {
      if (err) return done(err); // If there's an error, pass it to done.
      done(null, updatedPerson); // On success, pass null for error and the updated person.
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName }, // Find the person by name
    { age: ageToSet },    // Update the age
    { new: true },        // Return the updated document
    (err, updatedPerson) => {
      if (err) return done(err); // If there's an error, pass it to done.
      done(null, updatedPerson);  // On success, pass null for error and the updated person.
    }
  );
};

const removeById = (personId, done) => {
  findByIdAndRemove(personId, (err, data) => {
    if (err) return done(err); // If there's an error, pass it to done.
    done(null, data);          // On success, pass null for error and the data.
  } );
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
