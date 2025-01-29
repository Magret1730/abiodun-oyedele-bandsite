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


const showDetails = document.querySelector(".shows__details");

const showHeaders = document.createElement("section");
showHeaders.classList.add("shows__headers")
const dateHead = document.createElement("div");
dateHead.classList.add("shows__headers-div");
dateHead.textContent = "DATE";
const venueHead = document.createElement("div");
venueHead.classList.add("shows__headers-div");
venueHead.textContent = "VENUE";
const locationHead = document.createElement("div");
locationHead.classList.add("shows__headers-div");
locationHead.textContent = "LOCATION";
// const emptyHead = document.createElement("div");
// emptyHead.classList.add("shows__headers-div");
// emptyHead.textContent = "EMPTY";
showHeaders.appendChild(dateHead);
showHeaders.appendChild(venueHead);
showHeaders.appendChild(locationHead);
// showHeaders.appendChild(emptyHead);

showDetails.appendChild(showHeaders);


for (let i = 0; i < shows.length; i++) {
    const showContainer = document.createElement("div");
    showContainer.classList.add("shows__show");

    // Date
    const dateSection = document.createElement("section");
    dateSection.classList.add("shows__dates");
    const dateHeader = document.createElement("div");
    dateHeader.classList.add("shows__dates-header");
    dateHeader.innerHTML = "DATE";
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("shows__dates-date");
    dateDiv.innerHTML = shows[i].date;

    dateSection.appendChild(dateHeader);
    dateSection.appendChild(dateDiv);

    // Venue
    const venueSection = document.createElement("section");
    venueSection.classList.add("shows__venue");
    const venueHeader = document.createElement("div");
    venueHeader.classList.add("shows__venue-header");
    venueHeader.innerHTML = "VENUE";
    const venueDiv = document.createElement("div");
    venueDiv.classList.add("shows__venue-venue");

    venueDiv.innerHTML = shows[i].venue;

    venueSection.appendChild(venueHeader);
    venueSection.appendChild(venueDiv);

    // Location
    const locationSection = document.createElement("section");
    locationSection.classList.add("shows__location");
    const locationHeader = document.createElement("div");
    locationHeader.classList.add("shows__location-header");
    locationHeader.innerHTML = "LOCATION";
    const locationDiv = document.createElement("div");
    locationDiv.classList.add("shows__location-location");

    locationDiv.innerHTML = shows[i].location;

    locationSection.appendChild(locationHeader);
    locationSection.appendChild(locationDiv);

    // Buttons
    const dateButton = document.createElement("div");
    dateButton.classList.add("shows__button");
    dateButton.innerHTML = "BUY TICKETS";

    // Putting all(date, venue, location, buttons)
    // inside different divs(shows__show)
    showContainer.appendChild(dateSection);
    showContainer.appendChild(venueSection);
    showContainer.appendChild(locationSection);
    showContainer.appendChild(dateButton);

    // Attaching them all to the shows__details
    // showDetails.appendChild(showHeaders);
    showDetails.appendChild(showContainer);
}

