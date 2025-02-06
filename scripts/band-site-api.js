export class BandSiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.BASE_URL = "https://unit-2-project-api-25c1595833b2.herokuapp.com";
    }

    // Method to post comments
    async postComment(comment) {
        try {
            const response = await axios.post(`${this.BASE_URL}/comments?api_key=${this.apiKey}`, comment);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    // Method to get comments
    async getComment() {
        try {
            const response = await axios.get(`${this.BASE_URL}/comments?api_key=${this.apiKey}`);
            const data = response.data;

            data.sort((a,b) => { b.timestamp - a.timestamp });
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    // Method to get shows
    async getShows() {
        try {
            const response = await axios.get(`${this.BASE_URL}/showdates?api_key=${this.apiKey}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}
