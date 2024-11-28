const imageupload = (file, folder = "users") => {
    try {
        const image_name_chart = file.name;
        const image_namne_arr = image_name_chart.split(".");
        const image_ext = image_namne_arr[1];

        if (!image_ext) {
            throw new Error("Invalid file type");
        }

        // Generate random filename
        let result = "";
        const letters = "GFSHGCEFJUJVOFLJF87HJHDCEFWB";
        while (result.length < 2) {
            const randomIndex = Math.floor(Math.random() * letters.length);
            const randomChar = letters[randomIndex];
            if (result.slice(-1) !== randomChar) {
                result += randomChar;
            }
        }

        const resultext = `${result}.${image_ext}`;
        const filePath = `public/images/${folder}/${resultext}`;

        // Attempt to move the file
        file.mv(filePath, (err) => {
            if (err) {
                console.error("File move error:", err);
                throw new Error("File upload failed");
            }
        });

        return resultext;
    } catch (error) {
        console.error("Error in imageupload function:", error);
        return null;
    }
};



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