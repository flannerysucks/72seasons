import * as fs from 'fs';

export default async function getPostText(): Promise<string> {
  const today = new Date();
  const monthDayString = today.toISOString().substring(5, 10); // Format: MM-DD

  const filePath = '72seasonscalendar.txt';

  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    const lines = fileContent.split('\n');
    
    for (const line of lines) {
      const lineDate = line.substring(0, 5); // Extract MM-DD from the line
      if (lineDate === monthDayString) {
        const textAfterDate = line.substring(6).trim(); // Extract the text after the date and remove leading/trailing whitespace
        return textAfterDate;
      }
    }
    
    return "No post found for today's date.";
  } catch (error) {
    throw new Error(`Error reading file: ${error}`);
  }
}

// Example usage
getPostText()
  .then(text => console.log(text))
  .catch(error => console.error(error));
