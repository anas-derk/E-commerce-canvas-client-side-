import axios from "axios";

function getDateFormated(date) {
    let generateDateInDateFormat = new Date(date);
    const year = generateDateInDateFormat.getFullYear();
    const month = generateDateInDateFormat.getMonth() + 1;
    const day = generateDateInDateFormat.getDate();
    return `${year} / ${month} / ${day}`;
}

async function getAllCategoriesForService(serviceName) {
    try{
        return (await axios.get(`${process.env.BASE_API_URL}/categories/all-categories-data?service=${serviceName}`)).data;
    }
    catch(err) {
        throw Error(err);
    }
}

async function getAdminInfo() {
    try{
        return (await axios.get(`${process.env.BASE_API_URL}/admins/user-info`, {
            headers: {
                "Authorization": localStorage.getItem(process.env.adminTokenNameInLocalStorage),
            },
        })).data;
    }
    catch(err) {
        throw err;
    }
}

async function addNewCategoryToService(categoryData) {
    try{
        return (await axios.post(`${process.env.BASE_API_URL}/categories/add-new-category`, categoryData, {
            headers: {
                Authorization: localStorage.getItem(process.env.adminTokenNameInLocalStorage)
            }
        })).data;
    }
    catch(err) {
        throw err;
    }
}

async function addNewStyleToCategoryInSpecificService(styleData) {
    try{
        return (await axios.post(`${process.env.BASE_API_URL}/styles/add-new-style`, styleData, {
            headers: {
                Authorization: localStorage.getItem(process.env.adminTokenNameInLocalStorage)
            }
        })).data;
    }
    catch(err) {
        throw err;
    }
}

export {
    getDateFormated,
    getAllCategoriesForService,
    getAdminInfo,
    addNewCategoryToService,
    addNewStyleToCategoryInSpecificService
}