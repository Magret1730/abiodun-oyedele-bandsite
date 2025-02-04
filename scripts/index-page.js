// const commentsArray = [
//     {
//         name: "John Doe",
//         timestamp: "2025-01-29 10:15:00",
//         commentText: "This is a great post! The way you broke down the topic made it really easy to understand. I appreciate the effort you put into providing detailed insights and examples. Keep up the fantastic work!"
//     },
//     {
//         name: "Jane Smith",
//         timestamp: "2025-01-29 11:45:30",
//         commentText: "I really enjoyed reading this article. It's clear that you did thorough research before writing it. The examples you provided were very relatable, and I found myself learning new things as I read through. Thank you for such informative content!"
//     },
//     {
//         name: "Alex Johnson",
//         timestamp: "2025-01-29 13:20:10",
//         commentText: "Interesting perspective! I hadn't thought of it that way before. The way you approached this topic from multiple angles really made me rethink some of my previous assumptions. I'll definitely be sharing this with my friends!"
//     }
// ];

const BASE_URL = "https://unit-2-project-api-25c1595833b2.herokuapp.com";
const API_KEY = "d170fe3b-635a-4ae9-8dd7-8ca996c6c013";

// Form section
const commentForm = document.getElementById("comment-form");

// Comment - List section
const commentsLists = document.getElementById("comments-lists");

// Loops through the comments in the array
// for (let i = 0; i < commentsArray.length; i++) {
//     display(commentsArray[i]);

//     //  Checks if this is the last comment
//     if (i === commentsArray.length - 1) {
//         const commentsContainers = document.getElementsByClassName("comments__lists-containers");
//         // Gets the last container in the collection
//         const lastContainer = commentsContainers[commentsContainers.length - 1];
//         lastContainer.classList.add("comments__lists-containers--border-bottom");
//     }
// }

// Helper function
function createDiv(className, text) {
    const divEl = document.createElement("div");
    divEl.classList.add(className);
    divEl.textContent = text;

    return divEl;
}

// Function to display name,comments and time from the array
function display(comment) {
    const commentsContainers = document.createElement("div");
    commentsContainers.classList.add("comments__lists-containers");

    const commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments__lists-container");

    const commentsImage = document.createElement("img");
    commentsImage.classList.add("comments__lists-image");
    commentsImage.classList.add("comments__image");

    const commentsName = createDiv("comments__lists-name", comment.name);
    const commentsDate = createDiv("comments__lists-date", formatTimestamp(comment.timestamp));
    const commentsComment = createDiv("comments__lists-comment", comment.comment);

    commentsContainer.appendChild(commentsImage);
    commentsContainer.appendChild(commentsName);
    commentsContainer.appendChild(commentsDate);

    // This puts the commentsArray in ascending order of timestamp
    commentsContainers.prepend(commentsComment);
    commentsContainers.prepend(commentsContainer);

    commentsLists.prepend(commentsContainers);
}

// Function formats timestamp
function formatTimestamp(timestamp) {
    const now = new Date(); // Current time
    const commentDate = new Date(timestamp); // Convert the comment's timestamp to a Date
    const timeDifference = now - (commentDate - 1000); // Difference in milliseconds.

    // Convert time difference to seconds, minutes, hours, days, etc.
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
        return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
    } else if (minutes < 60) {
        return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else if (days < 7) {
        return `${days} day${days === 1 ? "" : "s"} ago`;
    } else if (weeks < 4) {
        return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
    } else if (months < 12) {
        return `${months} month${months === 1 ? "" : "s"} ago`;
    } else {
        return `${years} year${years === 1 ? "" : "s"} ago`;
    }
}

// Async function to Get comments
async function getComments() {
    try {
        const response = await axios.get(`${BASE_URL}/comments?api_key=${API_KEY}`);
        // console.log(response.data);

        const comments = await response.data;

        commentsLists.replaceChildren();

        comments.forEach((comment) => {
            // console.log(comment);

            display(comment);
        });

    } catch (error) {
        console.log("Error gotten from getComments function: ", error);
    }
}
getComments();

// Async function to Post comments
async function postComments(newComment) {
        try {
        const response = await axios.post(`${BASE_URL}/comments?api_key=${API_KEY}`, newComment);
        const newData = response.data;
        // console.log("Comments posted successfully", newComment);
        return newData;
    } catch (error) {
            console.log("Error gotten from postComments function: ", error);
        }
}

commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameForm = document.getElementById("name-input");
    const commentForm = document.getElementById("comment-input");

    // Clears previous error states
    nameForm.classList.remove("comments__error");
    commentForm.classList.remove("comments__error");
    

    // These values are gotten from the form
    const nameInput = e.target.elements.name.value;
    const commentInput = e.target.elements.comment.value;

    // Validations for name and comment in the form
    if (nameInput === "") {
        nameForm.classList.add("comments__error");
        return;
    } else if (commentInput === "") {
        commentForm.classList.add("comments__error");
        return;
    }

    // Date Construction in ISO Format
    const dateInput = new Date().toISOString();

    const newComment = {
        name: nameInput,
        // timestamp: dateInput,
        // likes: 0,
        // id: crypto.randomUUID(),
        comment: commentInput
    };

    console.log("newComment", newComment);

    // commentsArray.push(newComment);
    // commentsLists.replaceChildren();
    // for (let i = 0; i < commentsArray.length; i++) {
    //     display(commentsArray[i]);
    // }

    try {
            const postedComment = await postComments(newComment);

            await getComments();
    } catch (error) {
        console.log("Error Posting New Comments", error);
    }


    // Manually clears the form fields
    e.target.elements["name"].value = "";
    e.target.elements["comment"].value = "";

});

// Post the new comment to the API
    // try {
    //     const postedComment = await postComments(newComment);
    //     console.log("Posted comment:", postedComment);

    //     // Add the new comment to the local array (optional, depending on your use case)
    //     commentsArray.push(postedComment);

    //     // Clear the comments list and re-render
    //     commentsLists.replaceChildren();
    //     for (let i = 0; i < commentsArray.length; i++) {
    //         display(commentsArray[i]);
    //     }

    //     // Manually clears the form fields
    //     e.target.elements["name"].value = "";
    //     e.target.elements["comment"].value = "";
