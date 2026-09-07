import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./DigitalDownloads.css";

function DigitalDownloads() {
  const [downloads, setDownloads] = useState([
    {
      id: 1,
      title: "Photo Editor Pro",
      type: "Software",
      platform: "Windows",
      purchaseDate: "August 25, 2026",
      status: "Ready to download",
      code: null,
    },
    {
      id: 2,
      title: "Puzzle Adventure",
      type: "Game",
      platform: "Windows",
      purchaseDate: "August 20, 2026",
      status: "Ready to download",
      code: null,
    },
    {
      id: 3,
      title: "Music Streaming Gift Code",
      type: "Digital Code",
      platform: "Web",
      purchaseDate: "August 15, 2026",
      status: "Code available",
      code: "XXXX-XXXX-XXXX",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const [selectedItem, setSelectedItem] = useState(null);

  const filteredDownloads = useMemo(() => {
    return downloads.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesFilter =
        filter === "All" || item.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [downloads, searchTerm, filter]);

  const downloadItem = (item) => {
    alert(
      `"${item.title}" is ready to download.\n\nIn the real application, this button would request the downloadable file from the backend.`
    );
  };

  const viewCode = (item) => {
    if (!item.code) {
      alert("This item does not have a digital redemption code.");
      return;
    }

    alert(`Your digital code is:\n\n${item.code}`);
  };

  const viewOrder = (item) => {
    alert(
      `Order details\n\nItem: ${item.title}\nPurchase date: ${item.purchaseDate}\nType: ${item.type}`
    );
  };

  const removeItem = (id) => {
    const item = downloads.find(
      (download) => download.id === id
    );

    if (!item) return;

    const confirmed = window.confirm(
      `Remove "${item.title}" from your downloads list?`
    );

    if (confirmed) {
      setDownloads((current) =>
        current.filter(
          (download) => download.id !== id
        )
      );

      setSelectedItem(null);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilter("All");
  };

  return (
    <div className="digital-downloads-page">
      <div className="digital-downloads-container">

        {/* BREADCRUMB */}
        <div className="amazon-breadcrumb">
          <Link to="/account">Your Account</Link>
          <span>›</span>
          <span>Digital Downloads</span>
        </div>

        {/* HEADER */}
        <div className="downloads-header">
          <h1>Digital Downloads</h1>

          <p>
            View and manage software, games, digital
            downloads, and digital codes purchased through
            your account.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="download-links-card">

          <button
            onClick={() => {
              setFilter("All");
              setSearchTerm("");
            }}
          >
            All Downloads
          </button>

          <button
            onClick={() => {
              setFilter("Software");
              setSearchTerm("");
            }}
          >
            Software
          </button>

          <button
            onClick={() => {
              setFilter("Game");
              setSearchTerm("");
            }}
          >
            Games
          </button>

          <button
            onClick={() => {
              setFilter("Digital Code");
              setSearchTerm("");
            }}
          >
            Digital Codes
          </button>

        </div>

        {/* SEARCH AND FILTER */}
        <div className="downloads-controls">

          <div className="downloads-search">
            <input
              type="text"
              placeholder="Search your downloads"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

            {searchTerm && (
              <button
                className="clear-download-search"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>

          <select
            value={filter}
            onChange={(event) =>
              setFilter(event.target.value)
            }
          >
            <option value="All">All types</option>
            <option value="Software">Software</option>
            <option value="Game">Games</option>
            <option value="Digital Code">
              Digital Codes
            </option>
          </select>

        </div>

        {/* DOWNLOAD LIST */}
        <section className="downloads-section">

          <div className="downloads-section-header">
            <div>
              <h2>Your Digital Items</h2>

              <p>
                {filteredDownloads.length} item
                {filteredDownloads.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>
            </div>
          </div>

          {filteredDownloads.length > 0 ? (
            <div className="downloads-list">

              {filteredDownloads.map((item) => (
                <div
                  className="download-item"
                  key={item.id}
                >

                  <div className="download-icon">
                    {item.type === "Software"
                      ? "💻"
                      : item.type === "Game"
                      ? "🎮"
                      : "🔑"}
                  </div>

                  <div className="download-info">

                    <h3>{item.title}</h3>

                    <p>
                      <strong>Type:</strong>{" "}
                      {item.type}
                    </p>

                    <p>
                      <strong>Platform:</strong>{" "}
                      {item.platform}
                    </p>

                    <p>
                      <strong>Purchased:</strong>{" "}
                      {item.purchaseDate}
                    </p>

                    <p className="download-status">
                      {item.status}
                    </p>

                  </div>

                  <div className="download-actions">

                    {item.type === "Digital Code" ? (
                      <button
                        className="amazon-yellow-button"
                        onClick={() =>
                          viewCode(item)
                        }
                      >
                        View Code
                      </button>
                    ) : (
                      <button
                        className="amazon-yellow-button"
                        onClick={() =>
                          downloadItem(item)
                        }
                      >
                        Download
                      </button>
                    )}

                    <button
                      className="amazon-secondary-button"
                      onClick={() =>
                        setSelectedItem(item)
                      }
                    >
                      View Item
                    </button>

                  </div>

                </div>
              ))}

            </div>
          ) : (
            <div className="downloads-empty">

              <div className="empty-icon">
                🔎
              </div>

              <h3>No digital items found</h3>

              <p>
                Try another search term or change your
                filter.
              </p>

              <button
                className="amazon-secondary-button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>
          )}

        </section>

        {/* INFORMATION CARD */}
        <section className="downloads-help">

          <h2>About Digital Downloads</h2>

          <p>
            Digital software and games may be downloaded
            after purchase. Some digital products may
            instead provide a redemption code.
          </p>

          <div className="help-actions">

            <button
              onClick={() =>
                alert(
                  "Your Orders will be connected to the team's real order page during final integration."
                )
              }
            >
              View Your Orders
            </button>

            <Link to="/manage-content">
              Manage Content & Devices
            </Link>

          </div>

        </section>

      </div>

      {/* ITEM MODAL */}
      {selectedItem && (
        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedItem(null)
          }
        >
          <div
            className="download-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setSelectedItem(null)
              }
            >
              ✕
            </button>

            <div className="modal-download-icon">
              {selectedItem.type === "Software"
                ? "💻"
                : selectedItem.type === "Game"
                ? "🎮"
                : "🔑"}
            </div>

            <h2>{selectedItem.title}</h2>

            <div className="item-details">

              <p>
                <strong>Type:</strong>{" "}
                {selectedItem.type}
              </p>

              <p>
                <strong>Platform:</strong>{" "}
                {selectedItem.platform}
              </p>

              <p>
                <strong>Purchase date:</strong>{" "}
                {selectedItem.purchaseDate}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedItem.status}
              </p>

            </div>

            <div className="modal-actions">

              {selectedItem.type ===
              "Digital Code" ? (
                <button
                  className="amazon-yellow-button"
                  onClick={() =>
                    viewCode(selectedItem)
                  }
                >
                  View Code
                </button>
              ) : (
                <button
                  className="amazon-yellow-button"
                  onClick={() =>
                    downloadItem(selectedItem)
                  }
                >
                  Download
                </button>
              )}

              <button
                className="amazon-secondary-button"
                onClick={() =>
                  viewOrder(selectedItem)
                }
              >
                View Order Details
              </button>

              <button
                className="danger-button"
                onClick={() =>
                  removeItem(selectedItem.id)
                }
              >
                Remove From List
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default DigitalDownloads;