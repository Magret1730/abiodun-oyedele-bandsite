import { BandSiteApi } from "../scripts/band-site-api.js";

const API_KEY = "d170fe3b-635a-4ae9-8dd7-8ca996c6c013";
const bandSiteApi = new BandSiteApi(API_KEY);

// Form section
const commentForm = document.getElementById("comment-form");

// Comment - List section
const commentsLists = document.getElementById("comments-lists");

// Helper function that creates div element
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
        const comments = await bandSiteApi.getComment();

        commentsLists.replaceChildren();

        comments.forEach((comment) => {
            display(comment);
        });
    } catch (error) {
        console.log("Error from getComments in index-page.js: ", error);
    }
}
getComments();

// Async function to Post comments
async function postComments(newComment) {
    try {
        const response = await bandSiteApi.postComment(newComment);
        return response.data;
    } catch (error) {
        console.log("Error from postComments in index-page.js", error);
    }
}

// Event Listener when the form is submitted
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
        comment: commentInput
    };

    try {
        await postComments(newComment);

        await getComments();
    } catch (error) {
        console.log("Error Posting New Comments", error);
    }

    // Manually clears the form fields
    e.target.elements["name"].value = "";
    e.target.elements["comment"].value = "";
});
