const fs = require("fs");
const path = require("path");

let items = [];
let categories = [];

function initialize() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, "data", "items.json"), "utf8", (err, data) => {
            if (err) return reject("Unable to read file");
            items = JSON.parse(data);
            fs.readFile(path.join(__dirname, "data", "categories.json"), "utf8", (err, data) => {
                if (err) return reject("Unable to read file");
                categories = JSON.parse(data);
                resolve();
            });
        });
    });
}

function getAllItems() {
    return new Promise((resolve, reject) => {
        items.length > 0 ? resolve(items) : reject("No results returned");
    });
}

function getPublishedItems() {
    return new Promise((resolve, reject) => {
        const publishedItems = items.filter(item => item.published === true);
        publishedItems.length > 0 ? resolve(publishedItems) : reject("No results returned");
    });
}

function getCategories() {
    return new Promise((resolve, reject) => {
        categories.length > 0 ? resolve(categories) : reject("No results returned");
    });
}

module.exports = { initialize, getAllItems, getPublishedItems, getCategories };
