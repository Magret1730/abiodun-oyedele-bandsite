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

    // Like Button
    const commentsLike = document.createElement("button");
    commentsLike.classList.add("comments__lists-like");

    // Img button inside the like button
    const imgElLike = document.createElement("img");
    imgElLike.classList.add("comments__lists-icon");
    imgElLike.setAttribute("src", "../assets/icons/SVG/icon-like.svg");
    imgElLike.setAttribute("alt", "Like Icon");

    // Span element inside the like button
    const spanElLike = document.createElement("span");
    spanElLike.classList.add("comments__lists-count");
    spanElLike.innerText = `${comment.likes || 0}`

    // Appends img and span to like button
    commentsLike.appendChild(imgElLike);
    commentsLike.appendChild(spanElLike);

    // Event listener on the like button
    commentsLike.addEventListener("click", async () => {
        try {
            const updatedComment = await bandSiteApi.likeComment(comment.id);
            
            const likeCountSpan = commentsLike.querySelector(".comments__lists-count");
            likeCountSpan.textContent = updatedComment.likes;
        } catch (error) {
            console.error("Error liking comment:", error);
        }
    });

    // Delete Button
    const commentsDelete = document.createElement("button");
    commentsDelete.classList.add("comments__lists-delete");

    // Img button inside the delete button
    const imgEl = document.createElement("img");
    imgEl.classList.add("comments__lists-delete-icon");
    imgEl.setAttribute("src", "../assets/icons/SVG/icon-delete.svg");
    imgEl.setAttribute("alt", "Delete Icon");

    // Appends the image button to the delete button
    commentsDelete.appendChild(imgEl);

    // Event listener on the delete button
    commentsDelete.addEventListener("click", async () => {
        try {
            await bandSiteApi.deleteComment(comment.id);
            
            const commentContainer = document.querySelector(".comments__lists-containers");
            if (commentContainer) {
                commentContainer.remove();
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    });

    commentsContainer.appendChild(commentsImage);
    commentsContainer.appendChild(commentsName);
    commentsContainer.appendChild(commentsDate);

    // This puts the commentsArray in ascending order of timestamp
    commentsContainers.prepend(commentsComment);
    commentsContainers.prepend(commentsContainer);
    commentsContainers.appendChild(commentsLike);
    commentsContainers.appendChild(commentsDelete);

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
    

    // Values are gotten from the form
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
