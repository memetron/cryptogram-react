export const getQuote = async () => {
    try {
        const response = await fetch('https://api.quotable.io/random'); // Replace with actual API URL
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Fetched Data:", data); // Log the fetched data
        return data;
    } catch (error) {
        console.error('Error fetching the quote:', error);
        return undefined; // Return undefined if there's an error
    }
};