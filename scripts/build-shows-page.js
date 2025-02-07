import { BandSiteApi } from "../scripts/band-site-api.js";

const API_KEY = "d170fe3b-635a-4ae9-8dd7-8ca996c6c013";
const bandSiteApi = new BandSiteApi(API_KEY);

// Helper function that creates div element and adds text into it
function createDiv(className, text) {
    const divEl = document.createElement("div");
    divEl.classList.add(className);
    divEl.textContent = text;

    return divEl;
}

// Helper date function that formats time
async function dateFormat(rawDate) {
    const formatDate = new Date(rawDate);

    // Converts to day
    const weekday = ["Sun","Mon","Tues","Wed","Thu","Fri","Sat"];
    let day = weekday[formatDate.getUTCDay()];

    // Converts to months
    const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
    let month = months[formatDate.getUTCMonth()];

    // Converts to days
    let dayNum = formatDate.getUTCDate();

    // Converts to year
    let year = formatDate.getUTCFullYear();

    // console.log(day, month, dayNum, year);
    return `${day} ${month} ${dayNum} ${year}`;
}

// Helper function handles Selected shows state
async function selectedShows(selected) {
    const showsEl = document.querySelectorAll(selected);
    showsEl.forEach((show) => {
        show.addEventListener("click", async (e) => {
            const clickedShow = e.currentTarget;

            if (await clickedShow.classList.contains("shows__show--selected")) { return }

            showsEl.forEach((item) => item.classList.remove("shows__show--selected") );

            await clickedShow.classList.add("shows__show--selected");
        });
    });
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

// Get shows function
async function getShows() {
    try {
        const shows = await bandSiteApi.getShows();

        shows.forEach(async (show) => {
            const showContainer = document.createElement("div");
            showContainer.classList.add("shows__show");

            // Date
            const dateSection = document.createElement("section");
            dateSection.classList.add("shows__dates");

            const formattedDate = await dateFormat(show.date);

            const dateHeader = createDiv("shows__dates-header", "DATE");
            const dateDiv = createDiv("shows__dates-date", formattedDate);

            dateSection.appendChild(dateHeader);
            dateSection.appendChild(dateDiv);

            // Venue
            const venueSection = document.createElement("section");
            venueSection.classList.add("shows__venue");

            const venueHeader = createDiv("shows__venue-header", "VENUE");
            const venueDiv = createDiv("shows__venue-venue", show.place);

            venueSection.appendChild(venueHeader);
            venueSection.appendChild(venueDiv);

            // Location
            const locationSection = document.createElement("section");
            locationSection.classList.add("shows__location");

            const locationHeader = createDiv("shows__location-header", "LOCATION");
            const locationDiv = createDiv("shows__location-location", show.location);

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

            // Handles selected state
            selectedShows(".shows__show");
        });
    } catch (error) {
        console.log("Error from getShows function: ", error);
    }
}
getShows();
