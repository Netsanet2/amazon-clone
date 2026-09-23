import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getUserLists,
  updateUserLists,
} from "../../services/userService";
import "./Lists.css";

const defaultLists = [
  {
    id: 1,
    name: "Shopping List",
    items: [
      {
        id: 1,
        title: "Wireless Noise Canceling Headphones",
        price: "$199.99",
        rating: "★★★★☆",
      },
      {
        id: 2,
        title: "Mechanical Gaming Keyboard",
        price: "$89.99",
        rating: "★★★★★",
      },
    ],
  },
];

export default function Lists() {
  const { user } = useAuth();

  /* =====================================================
     LIST STATE
  ===================================================== */

  const [lists, setLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);

  const [loading, setLoading] = useState(true);

  /* =====================================================
     CREATE LIST STATE
  ===================================================== */

  const [showCreateList, setShowCreateList] = useState(false);
  const [listName, setListName] = useState("");

  /* =====================================================
     EDIT LIST STATE
  ===================================================== */

  const [editingListId, setEditingListId] = useState(null);
  const [editingListName, setEditingListName] = useState("");

  /* =====================================================
     LOAD LISTS FROM FIREBASE
  ===================================================== */

  useEffect(() => {
    const loadLists = async () => {
      if (!user?.uid) {
        setLists([]);
        setLoading(false);
        return;
      }

      try {
        const savedLists = await getUserLists(user.uid);

        if (savedLists.length > 0) {
          setLists(savedLists);
          setSelectedListId(savedLists[0].id);
        } else {
          setLists(defaultLists);
          setSelectedListId(defaultLists[0].id);

          await updateUserLists(
            user.uid,
            defaultLists
          );
        }
      } catch (error) {
        console.error("Error loading lists:", error);
        alert("Unable to load your lists.");
      } finally {
        setLoading(false);
      }
    };

    loadLists();
  }, [user?.uid]);

  /* =====================================================
     FIND SELECTED LIST
  ===================================================== */

  const selectedList =
    lists.find(
      (list) => list.id === selectedListId
    ) || lists[0];

  /* =====================================================
     CREATE A NEW LIST
  ===================================================== */

  const createList = async () => {
    const trimmedName = listName.trim();

    if (!trimmedName) {
      alert("Please enter a list name.");
      return;
    }

    const alreadyExists = lists.some(
      (list) =>
        list.name.toLowerCase() ===
        trimmedName.toLowerCase()
    );

    if (alreadyExists) {
      alert(
        "A list with this name already exists."
      );
      return;
    }

    const newList = {
      id: Date.now(),
      name: trimmedName,
      items: [],
    };

    const updatedLists = [
      ...lists,
      newList,
    ];

    try {
      await updateUserLists(
        user.uid,
        updatedLists
      );

      setLists(updatedLists);
      setSelectedListId(newList.id);

      setShowCreateList(false);
      setListName("");

      alert(
        `List "${trimmedName}" created successfully.`
      );
    } catch (error) {
      console.error(
        "Error creating list:",
        error
      );

      alert(
        "Unable to create the list. Please try again."
      );
    }
  };

  /* =====================================================
     DELETE LIST
  ===================================================== */

  const deleteList = async (listId) => {
    const listToDelete = lists.find(
      (list) => list.id === listId
    );

    if (!listToDelete) {
      return;
    }

    if (lists.length === 1) {
      alert(
        "You need to keep at least one list."
      );
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${listToDelete.name}"?`
    );

    if (!confirmed) {
      return;
    }

    const remainingLists = lists.filter(
      (list) => list.id !== listId
    );

    try {
      await updateUserLists(
        user.uid,
        remainingLists
      );

      setLists(remainingLists);

      if (selectedListId === listId) {
        setSelectedListId(
          remainingLists[0].id
        );
      }
    } catch (error) {
      console.error(
        "Error deleting list:",
        error
      );

      alert(
        "Unable to delete the list. Please try again."
      );
    }
  };

  /* =====================================================
     START RENAMING A LIST
  ===================================================== */

  const startEditingList = (list) => {
    setEditingListId(list.id);
    setEditingListName(list.name);
  };

  /* =====================================================
     SAVE RENAMED LIST
  ===================================================== */

  const saveListName = async () => {
    const trimmedName =
      editingListName.trim();

    if (!trimmedName) {
      alert("Please enter a list name.");
      return;
    }

    const duplicateName = lists.some(
      (list) =>
        list.id !== editingListId &&
        list.name.toLowerCase() ===
          trimmedName.toLowerCase()
    );

    if (duplicateName) {
      alert(
        "A list with this name already exists."
      );
      return;
    }

    const updatedLists = lists.map(
      (list) =>
        list.id === editingListId
          ? {
              ...list,
              name: trimmedName,
            }
          : list
    );

    try {
      await updateUserLists(
        user.uid,
        updatedLists
      );

      setLists(updatedLists);
      setEditingListId(null);
      setEditingListName("");
    } catch (error) {
      console.error(
        "Error renaming list:",
        error
      );

      alert(
        "Unable to rename the list. Please try again."
      );
    }
  };

  /* =====================================================
     REMOVE PRODUCT FROM SELECTED LIST
  ===================================================== */

  const removeItem = async (itemId) => {
    if (!selectedList) {
      return;
    }

    const updatedLists = lists.map(
      (list) =>
        list.id === selectedList.id
          ? {
              ...list,
              items: list.items.filter(
                (item) => item.id !== itemId
              ),
            }
          : list
    );

    try {
      await updateUserLists(
        user.uid,
        updatedLists
      );

      setLists(updatedLists);
    } catch (error) {
      console.error(
        "Error removing item:",
        error
      );

      alert(
        "Unable to remove the item. Please try again."
      );
    }
  };

  /* =====================================================
     ADD TO CART
  ===================================================== */

  const handleAddToCart = (item) => {
    alert(
      `"${item.title}" is ready to be connected to the shared cart.`
    );
  };

  /* =====================================================
     CREATE LIST WHEN ENTER IS PRESSED
  ===================================================== */

  const handleCreateKeyDown = (event) => {
    if (event.key === "Enter") {
      createList();
    }
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="lists-container">
        <div className="lists-wrapper">
          <p>Loading your lists...</p>
        </div>
      </div>
    );
  }

  /* =====================================================
     RETURN PAGE
  ===================================================== */

  return (
    <div className="lists-container">
      <div className="lists-wrapper">

        <div className="amazon-breadcrumb">
          <Link to="/account">
            Your Account
          </Link>

          <span>›</span>

          <span>Your Lists</span>
        </div>

        {/* PAGE HEADER */}

        <div className="lists-title-section">
          <h1 className="lists-header">
            Your Lists
          </h1>

          <p>
            Manage the products you have saved
            for later.
          </p>
        </div>

        {/* LIST HEADER */}

        <div className="list-info-card">

          <div className="list-info-content">

            <div className="list-main-icon">
              ♡
            </div>

            <div>
              <h2>
                Your Lists
              </h2>

              <p>
                {lists.length}{" "}
                {lists.length === 1
                  ? "list"
                  : "lists"}
              </p>
            </div>

          </div>

          <button
            className="create-list-button"
            onClick={() =>
              setShowCreateList(true)
            }
          >
            + Create a List
          </button>

        </div>

        {/* CREATE LIST FORM */}

        {showCreateList && (
          <div className="create-list-card">

            <div className="create-list-header">

              <div>
                <h2>
                  Create a new list
                </h2>

                <p>
                  Give your list a name.
                </p>
              </div>

              <button
                className="close-list-button"
                onClick={() => {
                  setShowCreateList(false);
                  setListName("");
                }}
                aria-label="Close"
              >
                ×
              </button>

            </div>

            <div className="create-list-form">

              <label htmlFor="list-name">
                List name
              </label>

              <input
                id="list-name"
                type="text"
                value={listName}
                onChange={(event) =>
                  setListName(
                    event.target.value
                  )
                }
                onKeyDown={
                  handleCreateKeyDown
                }
                placeholder="For example, Birthday Wishlist"
                autoFocus
              />

              <div className="create-list-actions">

                <button
                  className="cancel-list-button"
                  onClick={() => {
                    setShowCreateList(false);
                    setListName("");
                  }}
                >
                  Cancel
                </button>

                <button
                  className="save-list-button"
                  onClick={createList}
                >
                  Create List
                </button>

              </div>

            </div>

          </div>
        )}

        {/* CREATED LISTS */}

        <section className="created-lists-section">

          <div className="section-heading">

            <div>
              <h2>
                Your Lists
              </h2>

              <p>
                Select a list to view its
                saved products.
              </p>
            </div>

            <span>
              {lists.length}{" "}
              {lists.length === 1
                ? "list"
                : "lists"}
            </span>

          </div>

          <div className="created-lists">

            {lists.map((list) => {

              const isSelected =
                selectedListId ===
                list.id;

              const isEditing =
                editingListId ===
                list.id;

              return (
                <div
                  key={list.id}
                  className={`created-list-card ${
                    isSelected
                      ? "selected-list-card"
                      : ""
                  }`}
                >

                  <div className="created-list-icon">
                    ♡
                  </div>

                  <div className="created-list-content">

                    {isEditing ? (

                      <input
                        className="edit-list-input"
                        value={
                          editingListName
                        }
                        onChange={(event) =>
                          setEditingListName(
                            event.target.value
                          )
                        }
                        onKeyDown={(event) => {
                          if (
                            event.key ===
                            "Enter"
                          ) {
                            saveListName();
                          }
                        }}
                        autoFocus
                      />

                    ) : (

                      <h3>
                        {list.name}
                      </h3>

                    )}

                    <p className="list-item-count">
                      {list.items.length}{" "}
                      {list.items.length ===
                      1
                        ? "item"
                        : "items"}
                    </p>

                    <p className="list-description">
                      {list.items.length ===
                      0
                        ? "Your list is ready for products."
                        : "Products saved in this list."}
                    </p>

                  </div>

                  <div className="created-list-actions">

                    {isEditing ? (

                      <>
                        <button
                          className="list-small-primary"
                          onClick={
                            saveListName
                          }
                        >
                          Save
                        </button>

                        <button
                          className="list-small-secondary"
                          onClick={() => {
                            setEditingListId(
                              null
                            );
                            setEditingListName(
                              ""
                            );
                          }}
                        >
                          Cancel
                        </button>
                      </>

                    ) : (

                      <>
                        <button
                          className="view-list-button"
                          onClick={() =>
                            setSelectedListId(
                              list.id
                            )
                          }
                        >
                          {isSelected
                            ? "Selected"
                            : "View List"}
                        </button>

                        <button
                          className="edit-list-button"
                          onClick={() =>
                            startEditingList(
                              list
                            )
                          }
                        >
                          Rename
                        </button>

                        <button
                          className="delete-list-button"
                          onClick={() =>
                            deleteList(
                              list.id
                            )
                          }
                        >
                          Delete
                        </button>
                      </>

                    )}

                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* SELECTED LIST */}

        {selectedList && (
          <section className="saved-items-section">

            <div className="saved-items-header">

              <div>
                <h2>
                  {selectedList.name}
                </h2>

                <p className="selected-list-subtitle">
                  Products saved in this list
                </p>
              </div>

              <span>
                {selectedList.items.length}{" "}
                {selectedList.items.length ===
                1
                  ? "item"
                  : "items"}
              </span>

            </div>

            {/* EMPTY LIST */}

            {selectedList.items.length ===
            0 ? (

              <div className="empty-list">

                <div className="empty-list-icon">
                  ♡
                </div>

                <h2>
                  Your list is empty
                </h2>

                <p>
                  When you save products to
                  this list, they'll appear
                  here.
                </p>

                <Link
                  to="/"
                  className="empty-list-button"
                >
                  Continue shopping
                </Link>

              </div>

            ) : (

              <div className="lists-grid">

                {selectedList.items.map(
                  (item) => (

                    <div
                      key={item.id}
                      className="lists-card"
                    >

                      <div className="list-product-image">
                        <span>
                          Product
                        </span>
                      </div>

                      <div className="list-product-info">

                        <h3>
                          {item.title}
                        </h3>

                        <p className="list-rating">
                          {item.rating}
                        </p>

                        <p className="lists-price">
                          {item.price}
                        </p>

                        <p className="list-stock">
                          In your list
                        </p>

                        <div className="list-actions">

                          <button
                            className="list-primary-button"
                            onClick={() =>
                              handleAddToCart(
                                item
                              )
                            }
                          >
                            Add to Cart
                          </button>

                          <button
                            className="list-secondary-button"
                            onClick={() =>
                              removeItem(
                                item.id
                              )
                            }
                          >
                            Remove
                          </button>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </section>
        )}

      </div>
    </div>
  );
}