import React, { useState, useEffect } from "react";

function UserProfile({ user, setUser, toggleDarkMode, darkMode }) {
  const [editableUser, setEditableUser] = useState({ ...user });
  const [originalUser, setOriginalUser] = useState({ ...user });
  const [balance, setBalance] = useState(user.balance || 0);
  const [amountToAdd, setAmountToAdd] = useState("");
  const [displayName, setDisplayName] = useState(user.displayName || "");

  const tradeHistory = editableUser.tradeHistory || [];
  const totalTrades = tradeHistory.length;
  const wins = tradeHistory.filter((trade) => trade.profit > 0).length;
  const winRate = totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(1) : 0;
  const totalProfit = tradeHistory.reduce((acc, t) => acc + (t.profit || 0), 0);
  const portfolioValue = tradeHistory.reduce((sum, t) => sum + t.price * t.shares, 0);

  const skillLevel =
    totalTrades > 50 ? "Expert" : totalTrades > 20 ? "Intermediate" : "Beginner";

  const badges = [];
  if (totalTrades >= 10) badges.push("Active Trader");
  if (winRate >= 70) badges.push("High Accuracy");
  if (totalProfit >= 1000) badges.push("Profit Master");

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditableUser((prev) => ({ ...prev, profilePic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddMoney = () => {
    if (amountToAdd && !isNaN(amountToAdd) && amountToAdd > 0) {
      setBalance((prev) => prev + parseFloat(amountToAdd));
      setAmountToAdd("");
      alert(`$${amountToAdd} added to your balance!`);
    } else {
      alert("Please enter a valid amount.");
    }
  };

  const saveProfile = () => {
    const updatedUser = {
      ...editableUser,
      balance,
      displayName,
      settings: { darkMode },
    };
    setUser(updatedUser);
    setOriginalUser({ ...editableUser });
    alert("Profile saved!");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      localStorage.removeItem(user.username);
      setUser(null);
    }
  };

  const downloadTradeHistory = () => {
    const dataStr = JSON.stringify(tradeHistory, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "trade_history.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Mock portfolio auto-refresh
  useEffect(() => {
    const interval = setInterval(() => {
      setEditableUser((prev) => ({
        ...prev,
        portfolioValue: portfolioValue + Math.random() * 10,
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, [portfolioValue]);

  useEffect(() => {
    setEditableUser({ ...user });
    setOriginalUser({ ...user });
    setDisplayName(user.displayName || "");
  }, [user]);

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: darkMode ? "#222" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <h2>User Profile</h2>

      {/* Profile Picture */}
      <div>
        <img
          src={editableUser.profilePic || "https://via.placeholder.com/100"}
          alt="Profile"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "10px",
          }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePicUpload}
          style={{ marginTop: "10px" }}
        />
      </div>

      {/* Display Name */}
      <div style={{ marginBottom: "10px" }}>
        <label>Display Name:</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </div>

      {/* Balance */}
      <div style={{ marginBottom: "10px" }}>
        <label>Balance:</label>
        <input
          type="number"
          value={balance}
          readOnly
          style={{ marginLeft: "10px", width: "120px" }}
        />
        <input
          type="number"
          value={amountToAdd}
          onChange={(e) => setAmountToAdd(e.target.value)}
          placeholder="Add money"
          style={{ marginLeft: "10px", width: "120px" }}
        />
        <button
          onClick={handleAddMoney}
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      {/* Stats */}
      <div style={{ marginBottom: "10px" }}>
        <p>Total Trades: {totalTrades}</p>
        <p>Win Rate: {winRate}%</p>
        <p>Total Profit: ${totalProfit.toFixed(2)}</p>
        <p>Skill Level: {skillLevel}</p>
        <p>Portfolio Value: ${portfolioValue.toFixed(2)}</p>
        <p>
          Badges:{" "}
          {badges.length > 0 ? (
            badges.map((badge) => (
              <span key={badge} style={{ marginRight: "8px" }}>
                🏅 {badge}
              </span>
            ))
          ) : (
            <span>None</span>
          )}
        </p>
      </div>

      {/* Recent Trades */}
      <div style={{ marginBottom: "10px" }}>
        <h4>Recent Trades</h4>
        <ul>
          {tradeHistory.slice(-3).reverse().map((t, i) => (
            <li key={i}>
              {t.symbol} – {t.shares} shares @ ${t.price} ({t.profit >= 0 ? "+" : "-"}

              ${Math.abs(t.profit)})
            </li>
          ))}
          {tradeHistory.length === 0 && <li>No trades yet</li>}
        </ul>
      </div>

      {/* Dark Mode Toggle */}
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={toggleDarkMode}
          style={{
            padding: "10px",
            backgroundColor: darkMode ? "#f8f9fa" : "#343a40",
            color: darkMode ? "#343a40" : "#f8f9fa",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>

      {/* Save Profile */}
      <div>
        <button
          onClick={saveProfile}
          style={{
            padding: "10px 15px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Save Changes
        </button>
      </div>

      {/* Export Trade History */}
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={downloadTradeHistory}
          style={{
            padding: "10px 15px",
            backgroundColor: "#17a2b8",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Export Trade History
        </button>
      </div>

      {/* Delete Account */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleDeleteAccount}
          style={{
            padding: "10px 15px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
