require('../src/db/mongoose')

const User = require('../src/models/user')
const Task = require('../src/models/task')

// User.findByIdAndUpdate('609d4ad959b442e679453f9b', { age: 27 })
//     .then((user) => {
//         console.log(user)
//         return User.countDocuments({ age: 40 })
//     })
//     .then((result) => {
//         console.log(result)
//     })
//     .catch((e) => {
//         console.log(e)
//     })

// Task.findByIdAndDelete('609d35d2384e4e65bf8bb9b7')
//     .then((task) => {
//         console.log(task)
//         return Task.countDocuments({ completed: false })
//     }).then((result) => {
//         console.log(result)
//     }).catch((e) => {
//         console.log(e)
//     })

const updateAgeAndCount = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count
}

// updateAgeAndCount("609d0e07ac116c163c7749f3", 40).then((count) => {
//     console.log(count)
// }).catch((error) => {
//     console.log(error)
// })

const deleteTaskAndCount = async(id) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

// deleteTaskAndCount("609d2250c2e92c6e75283d62")
//     .then((count) => {
//         console.log("Number of uncompleted tasks: " + count);
//     })
//     .catch((error) => {
//         console.log(error)
//     })