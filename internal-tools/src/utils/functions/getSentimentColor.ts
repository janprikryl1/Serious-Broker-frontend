export const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "negative":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};