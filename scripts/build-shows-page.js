const shows = [
    {
        date: "Mon Sept 09 2024",
        venue: "Ronald Lane",
        location: "San Francisco, CA",
    },
    {
        date: "Tues Sept 17 2024",
        venue: "Pier 3 East",
        location: "San Francisco, CA",
    },
    {
        date: "Sat Oct 12 2024",
        venue: "View Lounge",
        location: "San Francisco, CA",
    },
    {
        date: "Sat Nov 16 2024",
        venue: "Hyatt Agency",
        location: "San Francisco, CA",
    },
    {
        date: "Fri Nov 29 2024",
        venue: "Moscow Center",
        location: "San Francisco, CA",
    },
    {
        date: "Wed Dec 18 2024",
        venue: "Press Club",
        location: "San Francisco, CA",
    },
];

// Helper function
function createDiv(className, text) {
    const divEl = document.createElement("div");
    divEl.classList.add(className);
    divEl.textContent = text;

    return divEl;
}


const showDetails = document.querySelector(".shows__details");

const showHeaders = document.createElement("section");
showHeaders.classList.add("shows__headers")

const dateHead = createDiv("shows__headers-div", "DATE");
const venueHead = createDiv("shows__headers-div", "VENUE");
const locationHead = createDiv("shows__headers-div", "LOCATION");

showHeaders.appendChild(dateHead);
showHeaders.appendChild(venueHead);
showHeaders.appendChild(locationHead);

showDetails.appendChild(showHeaders);

// This envelopes all the shows__show
const showHousing = document.createElement("div");
showHousing.classList.add("shows__housing");


for (let i = 0; i < shows.length; i++) {
    const showContainer = document.createElement("div");
    showContainer.classList.add("shows__show");

    // Date
    const dateSection = document.createElement("section");
    dateSection.classList.add("shows__dates");

    const dateHeader = createDiv("shows__dates-header", "DATE");
    const dateDiv = createDiv("shows__dates-date", shows[i].date);

    dateSection.appendChild(dateHeader);
    dateSection.appendChild(dateDiv);

    // Venue
    const venueSection = document.createElement("section");
    venueSection.classList.add("shows__venue");

    const venueHeader = createDiv("shows__venue-header", "VENUE");
    const venueDiv = createDiv("shows__venue-venue", shows[i].venue);

    venueSection.appendChild(venueHeader);
    venueSection.appendChild(venueDiv);

    // Location
    const locationSection = document.createElement("section");
    locationSection.classList.add("shows__location");

    const locationHeader = createDiv("shows__location-header", "LOCATION");
    const locationDiv = createDiv("shows__location-location", shows[i].location);

    locationSection.appendChild(locationHeader);
    locationSection.appendChild(locationDiv);

    // Buttons
    const buttonEl = document.createElement("button");
    buttonEl.classList.add("shows__button");
    buttonEl.textContent = "BUY TICKETS"

    // Putting all(date, venue, location, buttons)
    // inside different divs(.shows__show)
    showContainer.appendChild(dateSection);
    showContainer.appendChild(venueSection);
    showContainer.appendChild(locationSection);
    showContainer.appendChild(buttonEl);

    showHousing.appendChild(showContainer);

    // Attaching them all to the shows__details
    showDetails.appendChild(showHousing);
}

// Selected function on shows
const showsEl = document.querySelectorAll(".shows__show");

showsEl.forEach((show) => {
    show.addEventListener("click", (e) => {
        const clickedShow = e.currentTarget;

        if (clickedShow.classList.contains("shows__show--selected")) {
            return;
        }

        showsEl.forEach((item) => {
            item.classList.remove("shows__show--selected");
        });

        clickedShow.classList.add("shows__show--selected");
    });
});
