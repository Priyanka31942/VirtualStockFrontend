import { useState } from "react";

function Chatbot({ onSendMessage }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm your trading assistant. Ask me about stocks, portfolio, or tutorials!" }
  ]);
  const [input, setInput] = useState("");

  const generateBotResponse = (userInput) => {
    const lower = userInput.toLowerCase();

    if (lower.includes("what is stock trading") || lower.includes("explain stock trading")) {
      return "Stock trading means buying and selling shares of companies through a stock exchange, aiming to make a profit.";
    } else if (lower.includes("what is trading")) {
      return "Trading is the act of buying and selling financial assets like stocks, bonds, or cryptocurrencies to make profits.";
    } else if (
      lower.includes("how can we buy") ||
      lower.includes("how to buy") ||
      lower.includes("how do i buy") ||
      lower.includes("buy or sell stocks")
    ) {
      return "You can buy or sell stocks in this app by going to the 'Stocks' page, selecting a stock, and choosing the quantity.";
    } else if (
      lower.includes("explain stock") ||
      lower.includes("what is a stock") ||
      lower.includes("what are stocks") ||
      lower.includes("what is stocks")  // Added explicit check for "what is stocks"
    ) {
      return "A stock represents ownership in a company. When you own a stock, you're a partial owner of that company.";
    } else if (lower.includes("portfolio")) {
      return "Your portfolio shows all the stocks you currently own. Go to the 'Portfolio' page to view or manage them.";
    } else if (lower.includes("tutorial")) {
      return "Check out the 'Tutorial' page in the app. It guides you through how to trade, invest, and use this platform.";
    } else {
      return "I'm not sure how to help with that. Try asking about trading, stocks, portfolios, or tutorials!";
    }
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Call parent handler (optional logging)
    onSendMessage(input);

    const botText = generateBotResponse(input);
    const botResponse = { sender: "bot", text: botText };
    setMessages((prev) => [...prev, botResponse]);

    setInput("");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "80px",
        right: "20px",
        width: "300px",
        height: "400px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "white",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        zIndex: 1001,
      }}
    >
      <div style={{ flex: 1, overflowY: "auto", marginBottom: "10px" }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "15px",
                backgroundColor: msg.sender === "user" ? "#007bff" : "#f1f1f1",
                color: msg.sender === "user" ? "white" : "black",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
          placeholder="Ask something..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button onClick={handleSend} style={{ padding: "8px 12px" }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
