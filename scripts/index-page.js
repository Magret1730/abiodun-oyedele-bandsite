const commentsArray = [
    {
        name: "John Doe",
        timestamp: "2025-01-29 10:15:00",
        commentText: "This is a great post! The way you broke down the topic made it really easy to understand. I appreciate the effort you put into providing detailed insights and examples. Keep up the fantastic work!"
    },
    {
        name: "Jane Smith",
        timestamp: "2025-01-29 11:45:30",
        commentText: "I really enjoyed reading this article. It's clear that you did thorough research before writing it. The examples you provided were very relatable, and I found myself learning new things as I read through. Thank you for such informative content!"
    },
    {
        name: "Alex Johnson",
        timestamp: "2025-01-29 13:20:10",
        commentText: "Interesting perspective! I hadn't thought of it that way before. The way you approached this topic from multiple angles really made me rethink some of my previous assumptions. I'll definitely be sharing this with my friends!"
    }
];

// Form section
const commentForm = document.getElementById("comment-form");

// Comment - List section
commentsLists = document.getElementById("comments-lists");

// Loops through the comments in the array
for (let i = 0; i < commentsArray.length; i++) {
    display(commentsArray[i]);
}

// Function to display name,comments and time from the array
function display(comment) {
    commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments__lists-container");

    commentsImage = document.createElement("img");
    commentsImage.classList.add("comments__lists-image");
    commentsImage.classList.add("comments__image");

    commentsName = document.createElement("div");
    commentsName.classList.add("comments__lists-name");
    commentsName.textContent = comment.name;

    commentsDate = document.createElement("div");
    commentsDate.classList.add("comments__lists-date");
    commentsDate.textContent = formatTimestamp(comment.timestamp);

    commentsComment = document.createElement("div");
    commentsComment.classList.add("comments__lists-comment");
    commentsComment.textContent = comment.commentText;

    commentsContainer.appendChild(commentsImage);
    commentsContainer.appendChild(commentsName);
    commentsContainer.appendChild(commentsDate);

    // This puts the commentsArray in descending order
    // commentsLists.appendChild(commentsContainer);
    // commentsLists.appendChild(commentsComment);

    // This puts the commentsArray in ascending order
    commentsLists.prepend(commentsComment);
    commentsLists.prepend(commentsContainer);
}


// Function formats timestamp
function formatTimestamp(timestamp) {
    const now = new Date(); // Current time
    const commentDate = new Date(timestamp); // Convert the comment's timestamp to a Date object
    const timeDifference = now - commentDate; // Difference in milliseconds

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

commentForm.addEventListener("submit", (e) => {
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
        timestamp: dateInput,
        commentText: commentInput
    };

    commentsArray.push(newComment);

    commentsLists.replaceChildren();

    for (let i = 0; i < commentsArray.length; i++) {
        display(commentsArray[i]);
    }

    // e.terget.reset();

    // Manually clears the form fields
    e.target.elements["name"].value = "";
    e.target.elements["comment"].value = "";

});