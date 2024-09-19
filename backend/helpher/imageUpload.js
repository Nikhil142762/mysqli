const imageupload = (file, folder = "users") => {
    var image_name_chart = file.name;
    var image_namne_arr = image_name_chart.split(".")
    var image_ext = image_namne_arr[1]
    var result = "";
    var letters = "GFSHGCEFJUJVOFLJF87HJHDCEFWB"
    while (result.length < 4) {
        var radm_int = Math.floor(Math.random() * 19 + 1);
        var rndm_chart = letters[radm_int]
        if (result.substr(-1, 1) !== rndm_chart)
            result += rndm_chart;
    }
    var resultext = `${result}.${image_ext}`
    file.mv(`public/images/users/${result}.${image_ext}`)
    return resultext
}


// const checkvalidation = async (v) => {
//     try {
//         const matched = await v.check();
//         if (!matched) {
//             let error_respons = Object.values(v.errors || {})
//                 .map(error => error.message)

//             return error_respons.join(",")
//         }
//     } catch (error) {
//         console.log(error, "validation error");
//         return "validator error"
//     }

// }
module.exports = { imageupload }