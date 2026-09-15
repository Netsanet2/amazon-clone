import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./ManageContent.css";

function ManageContent() {
  const [activeTab, setActiveTab] = useState("content");

  // -------------------------
  // DIGITAL CONTENT
  // -------------------------

  const [content, setContent] = useState([
    {
      id: 1,
      title: "The Great Adventure",
      type: "Books",
      icon: "📚",
      status: "Available",
      date: "August 20, 2026",
    },
    {
      id: 2,
      title: "Amazon Music Collection",
      type: "Music",
      icon: "🎵",
      status: "Available",
      date: "August 18, 2026",
    },
    {
      id: 3,
      title: "Puzzle Master",
      type: "Apps & Games",
      icon: "🎮",
      status: "Installed",
      date: "August 15, 2026",
    },
    {
      id: 4,
      title: "Learning JavaScript",
      type: "Books",
      icon: "📖",
      status: "Available",
      date: "August 10, 2026",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [contentFilter, setContentFilter] = useState("All");

  const [selectedContent, setSelectedContent] = useState(null);

  const filteredContent = useMemo(() => {
    return content.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesFilter =
        contentFilter === "All" || item.type === contentFilter;

      return matchesSearch && matchesFilter;
    });
  }, [content, searchTerm, contentFilter]);

  const openContent = (item) => {
    setSelectedContent(item);
  };

  const removeContent = (id) => {
    const item = content.find((contentItem) => contentItem.id === id);

    if (!item) return;

    const confirmed = window.confirm(
      `Remove "${item.title}" from your digital content?`
    );

    if (confirmed) {
      setContent((current) =>
        current.filter((contentItem) => contentItem.id !== id)
      );

      setSelectedContent(null);
    }
  };

  // -------------------------
  // DEVICES
  // -------------------------

  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "Windows PC",
      type: "Computer",
      icon: "💻",
      lastActive: "Today",
      registered: "August 20, 2026",
    },
    {
      id: 2,
      name: "Mobile Device",
      type: "Phone",
      icon: "📱",
      lastActive: "Yesterday",
      registered: "August 18, 2026",
    },
    {
      id: 3,
      name: "Smart TV",
      type: "Television",
      icon: "📺",
      lastActive: "2 days ago",
      registered: "August 10, 2026",
    },
  ]);

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showRegisterDevice, setShowRegisterDevice] = useState(false);

  const [newDeviceName, setNewDeviceName] = useState("");
  const [newDeviceType, setNewDeviceType] = useState("Computer");

  const registerDevice = (event) => {
    event.preventDefault();

    if (!newDeviceName.trim()) {
      alert("Please enter a device name.");
      return;
    }

    const newDevice = {
      id: Date.now(),
      name: newDeviceName.trim(),
      type: newDeviceType,
      icon:
        newDeviceType === "Phone"
          ? "📱"
          : newDeviceType === "Tablet"
          ? "📲"
          : newDeviceType === "Television"
          ? "📺"
          : "💻",
      lastActive: "Just now",
      registered: "Today",
    };

    setDevices((current) => [...current, newDevice]);

    setNewDeviceName("");
    setNewDeviceType("Computer");
    setShowRegisterDevice(false);

    alert("Device registered successfully.");
  };

  const removeDevice = (id) => {
    const device = devices.find((item) => item.id === id);

    if (!device) return;

    const confirmed = window.confirm(
      `Remove "${device.name}" from your account?`
    );

    if (confirmed) {
      setDevices((current) =>
        current.filter((item) => item.id !== id)
      );

      setSelectedDevice(null);
    }
  };

  // -------------------------
  // SETTINGS
  // -------------------------

  const [selectedSetting, setSelectedSetting] = useState(null);

  const [deliveryPreference, setDeliveryPreference] =
    useState("Automatic");

  const [country, setCountry] = useState("Ethiopia");

  const [language, setLanguage] = useState("English");

  const [purchasePassword, setPurchasePassword] =
    useState(false);

  const [purchasePin, setPurchasePin] = useState(false);

  const openSetting = (setting) => {
    setSelectedSetting(setting);
  };

  const closeSetting = () => {
    setSelectedSetting(null);
  };

  const saveSetting = (message) => {
    alert(message);
    closeSetting();
  };

  return (
    <div className="manage-content-page">
      <div className="manage-content-container">

        {/* BREADCRUMB */}
        <div className="amazon-breadcrumb">
          <Link to="/account">Your Account</Link>
          <span>›</span>
          <span>Manage Content and Devices</span>
        </div>

        {/* HEADER */}
        <div className="manage-content-header">
          <h1>Manage Your Content and Devices</h1>

          <p>
            Manage your digital content, registered devices,
            and digital account preferences.
          </p>
        </div>

        {/* TABS */}
        <div className="manage-tabs">
          <button
            className={activeTab === "content" ? "active" : ""}
            onClick={() => setActiveTab("content")}
          >
            Content
          </button>

          <button
            className={activeTab === "devices" ? "active" : ""}
            onClick={() => setActiveTab("devices")}
          >
            Devices
          </button>

          <button
            className={activeTab === "preferences" ? "active" : ""}
            onClick={() => setActiveTab("preferences")}
          >
            Preferences
          </button>
        </div>

        {/* =====================================
            CONTENT TAB
        ====================================== */}

        {activeTab === "content" && (
          <section className="manage-section">

            <div className="section-heading-row">
              <div>
                <h2>Digital Content</h2>
                <p>
                  View and manage digital content associated
                  with your Amazon account.
                </p>
              </div>
            </div>

            {/* SEARCH + FILTER */}
            <div className="content-controls">

              <div className="content-search">
                <input
                  type="text"
                  placeholder="Search your content"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                />

                {searchTerm && (
                  <button
                    className="clear-search"
                    onClick={() => setSearchTerm("")}
                  >
                    ✕
                  </button>
                )}
              </div>

              <select
                value={contentFilter}
                onChange={(event) =>
                  setContentFilter(event.target.value)
                }
              >
                <option value="All">All content</option>
                <option value="Books">Books</option>
                <option value="Music">Music</option>
                <option value="Apps & Games">
                  Apps & Games
                </option>
              </select>

            </div>

            {/* CONTENT CARDS */}
            {filteredContent.length > 0 ? (
              <div className="digital-content-list">

                {filteredContent.map((item) => (
                  <div
                    className="digital-content-card"
                    key={item.id}
                  >
                    <div className="digital-content-icon">
                      {item.icon}
                    </div>

                    <div className="digital-content-info">
                      <h3>{item.title}</h3>

                      <p className="content-type">
                        {item.type}
                      </p>

                      <p>
                        Status:{" "}
                        <strong>{item.status}</strong>
                      </p>

                      <p>
                        Added: {item.date}
                      </p>
                    </div>

                    <div className="content-actions">
                      <button
                        className="amazon-secondary-button"
                        onClick={() => openContent(item)}
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                ))}

              </div>
            ) : (
              <div className="no-results">
                <span>🔎</span>
                <h3>No content found</h3>

                <p>
                  Try another search term or change the
                  content filter.
                </p>

                <button
                  className="amazon-secondary-button"
                  onClick={() => {
                    setSearchTerm("");
                    setContentFilter("All");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}

          </section>
        )}

        {/* =====================================
            DEVICES TAB
        ====================================== */}

        {activeTab === "devices" && (
          <section className="manage-section">

            <div className="section-heading-row">

              <div>
                <h2>Your Devices</h2>

                <p>
                  Manage devices registered to your Amazon
                  account.
                </p>
              </div>

              <button
                className="amazon-yellow-button"
                onClick={() =>
                  setShowRegisterDevice(true)
                }
              >
                + Register a Device
              </button>

            </div>

            {devices.length > 0 ? (
              <div className="devices-list">

                {devices.map((device) => (
                  <div
                    className="device-card"
                    key={device.id}
                  >

                    <div className="device-icon">
                      {device.icon}
                    </div>

                    <div className="device-info">
                      <h3>{device.name}</h3>

                      <p>{device.type}</p>

                      <p>
                        Last active:{" "}
                        <strong>
                          {device.lastActive}
                        </strong>
                      </p>

                      <p>
                        Registered:{" "}
                        {device.registered}
                      </p>
                    </div>

                    <div className="device-actions">

                      <button
                        className="amazon-secondary-button"
                        onClick={() =>
                          setSelectedDevice(device)
                        }
                      >
                        Manage
                      </button>

                      <button
                        className="danger-button"
                        onClick={() =>
                          removeDevice(device.id)
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>
                ))}

              </div>
            ) : (
              <div className="no-results">
                <span>📱</span>
                <h3>No registered devices</h3>

                <p>
                  Register a device to use it with your
                  digital Amazon content.
                </p>

                <button
                  className="amazon-yellow-button"
                  onClick={() =>
                    setShowRegisterDevice(true)
                  }
                >
                  Register a Device
                </button>
              </div>
            )}

          </section>
        )}

        {/* =====================================
            PREFERENCES TAB
        ====================================== */}

        {activeTab === "preferences" && (
          <section className="manage-section">

            <div className="section-heading-row">
              <div>
                <h2>Digital Preferences</h2>

                <p>
                  Control how your digital content and
                  purchases are handled.
                </p>
              </div>
            </div>

            <div className="preferences-list">

              {/* DELIVERY */}
              <div className="preference-row">

                <div>
                  <h3>Digital Content Delivery</h3>

                  <p>
                    Choose how digital content is delivered
                    to your devices.
                  </p>

                  <strong>
                    Current setting: {deliveryPreference}
                  </strong>
                </div>

                <button
                  className="amazon-secondary-button"
                  onClick={() =>
                    openSetting("delivery")
                  }
                >
                  Manage
                </button>

              </div>

              {/* COUNTRY */}
              <div className="preference-row">

                <div>
                  <h3>Country/Region</h3>

                  <p>
                    Your country or region determines
                    available digital content and services.
                  </p>

                  <strong>
                    Current country: {country}
                  </strong>
                </div>

                <button
                  className="amazon-secondary-button"
                  onClick={() =>
                    openSetting("country")
                  }
                >
                  Change
                </button>

              </div>

              {/* LANGUAGE */}
              <div className="preference-row">

                <div>
                  <h3>Language</h3>

                  <p>
                    Select the language used for your digital
                    experience.
                  </p>

                  <strong>
                    Current language: {language}
                  </strong>
                </div>

                <button
                  className="amazon-secondary-button"
                  onClick={() =>
                    openSetting("language")
                  }
                >
                  Change
                </button>

              </div>

              {/* PURCHASE SETTINGS */}
              <div className="preference-row">

                <div>
                  <h3>Digital Purchase Settings</h3>

                  <p>
                    Add extra protection when making digital
                    purchases.
                  </p>

                  <strong>
                    Purchase password:{" "}
                    {purchasePassword
                      ? "Enabled"
                      : "Disabled"}
                  </strong>
                </div>

                <button
                  className="amazon-secondary-button"
                  onClick={() =>
                    openSetting("purchase")
                  }
                >
                  Manage
                </button>

              </div>

            </div>

          </section>
        )}

      </div>

      {/* =====================================
          CONTENT MODAL
      ====================================== */}

      {selectedContent && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedContent(null)}
        >
          <div
            className="manage-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setSelectedContent(null)
              }
            >
              ✕
            </button>

            <div className="modal-icon">
              {selectedContent.icon}
            </div>

            <h2>{selectedContent.title}</h2>

            <p>
              <strong>Type:</strong>{" "}
              {selectedContent.type}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {selectedContent.status}
            </p>

            <p>
              <strong>Added:</strong>{" "}
              {selectedContent.date}
            </p>

            <div className="modal-actions">

              <button
                className="amazon-secondary-button"
                onClick={() =>
                  alert(
                    `"${selectedContent.title}" is already available in your digital library.`
                  )
                }
              >
                View Details
              </button>

              <button
                className="danger-button"
                onClick={() =>
                  removeContent(selectedContent.id)
                }
              >
                Remove Content
              </button>

            </div>

          </div>
        </div>
      )}

      {/* =====================================
          DEVICE MODAL
      ====================================== */}

      {selectedDevice && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedDevice(null)}
        >
          <div
            className="manage-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setSelectedDevice(null)
              }
            >
              ✕
            </button>

            <div className="modal-icon">
              {selectedDevice.icon}
            </div>

            <h2>{selectedDevice.name}</h2>

            <p>
              <strong>Device type:</strong>{" "}
              {selectedDevice.type}
            </p>

            <p>
              <strong>Last active:</strong>{" "}
              {selectedDevice.lastActive}
            </p>

            <p>
              <strong>Registered:</strong>{" "}
              {selectedDevice.registered}
            </p>

            <div className="modal-actions">

              <button
                className="danger-button"
                onClick={() =>
                  removeDevice(selectedDevice.id)
                }
              >
                Remove Device
              </button>

              <button
                className="amazon-secondary-button"
                onClick={() =>
                  setSelectedDevice(null)
                }
              >
                Done
              </button>

            </div>

          </div>
        </div>
      )}

      {/* =====================================
          REGISTER DEVICE MODAL
      ====================================== */}

      {showRegisterDevice && (
        <div
          className="modal-overlay"
          onClick={() =>
            setShowRegisterDevice(false)
          }
        >
          <div
            className="manage-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setShowRegisterDevice(false)
              }
            >
              ✕
            </button>

            <h2>Register a Device</h2>

            <p className="modal-description">
              Add a device to associate it with your
              Amazon account.
            </p>

            <form onSubmit={registerDevice}>

              <label>
                Device name
              </label>

              <input
                className="modal-input"
                type="text"
                placeholder="Example: My Laptop"
                value={newDeviceName}
                onChange={(event) =>
                  setNewDeviceName(event.target.value)
                }
              />

              <label>
                Device type
              </label>

              <select
                className="modal-input"
                value={newDeviceType}
                onChange={(event) =>
                  setNewDeviceType(event.target.value)
                }
              >
                <option>Computer</option>
                <option>Phone</option>
                <option>Tablet</option>
                <option>Television</option>
              </select>

              <div className="modal-actions">

                <button
                  type="button"
                  className="amazon-secondary-button"
                  onClick={() =>
                    setShowRegisterDevice(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="amazon-yellow-button"
                >
                  Register Device
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

      {/* =====================================
          SETTINGS MODAL
      ====================================== */}

      {selectedSetting && (
        <div
          className="modal-overlay"
          onClick={closeSetting}
        >
          <div
            className="manage-modal setting-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={closeSetting}
            >
              ✕
            </button>

            {/* DELIVERY */}
            {selectedSetting === "delivery" && (
              <>
                <h2>Digital Content Delivery</h2>

                <p className="modal-description">
                  Choose how digital content should be
                  delivered to your registered devices.
                </p>

                <label className="setting-option">
                  <input
                    type="radio"
                    name="delivery"
                    checked={
                      deliveryPreference === "Automatic"
                    }
                    onChange={() =>
                      setDeliveryPreference(
                        "Automatic"
                      )
                    }
                  />

                  Automatic delivery
                </label>

                <label className="setting-option">
                  <input
                    type="radio"
                    name="delivery"
                    checked={
                      deliveryPreference === "Manual"
                    }
                    onChange={() =>
                      setDeliveryPreference("Manual")
                    }
                  />

                  Manual delivery
                </label>

                <button
                  className="amazon-yellow-button"
                  onClick={() =>
                    saveSetting(
                      "Digital delivery preference saved."
                    )
                  }
                >
                  Save Changes
                </button>
              </>
            )}

            {/* COUNTRY */}
            {selectedSetting === "country" && (
              <>
                <h2>Country/Region</h2>

                <p className="modal-description">
                  Select your country or region.
                </p>

                <select
                  className="modal-input"
                  value={country}
                  onChange={(event) =>
                    setCountry(event.target.value)
                  }
                >
                  <option>Ethiopia</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Germany</option>
                  <option>France</option>
                </select>

                <button
                  className="amazon-yellow-button"
                  onClick={() =>
                    saveSetting(
                      "Country/region updated successfully."
                    )
                  }
                >
                  Save Changes
                </button>
              </>
            )}

            {/* LANGUAGE */}
            {selectedSetting === "language" && (
              <>
                <h2>Language</h2>

                <p className="modal-description">
                  Choose your preferred language.
                </p>

                <select
                  className="modal-input"
                  value={language}
                  onChange={(event) =>
                    setLanguage(event.target.value)
                  }
                >
                  <option>English</option>
                  <option>Amharic</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Spanish</option>
                </select>

                <button
                  className="amazon-yellow-button"
                  onClick={() =>
                    saveSetting(
                      "Language preference saved."
                    )
                  }
                >
                  Save Changes
                </button>
              </>
            )}

            {/* PURCHASE */}
            {selectedSetting === "purchase" && (
              <>
                <h2>Digital Purchase Settings</h2>

                <p className="modal-description">
                  Add additional protection to digital
                  purchases.
                </p>

                <label className="setting-option">
                  <input
                    type="checkbox"
                    checked={purchasePassword}
                    onChange={(event) =>
                      setPurchasePassword(
                        event.target.checked
                      )
                    }
                  />

                  Require a purchase password
                </label>

                <label className="setting-option">
                  <input
                    type="checkbox"
                    checked={purchasePin}
                    onChange={(event) =>
                      setPurchasePin(
                        event.target.checked
                      )
                    }
                  />

                  Require a PIN for digital purchases
                </label>

                <button
                  className="amazon-yellow-button"
                  onClick={() =>
                    saveSetting(
                      "Digital purchase settings saved."
                    )
                  }
                >
                  Save Changes
                </button>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default ManageContent;