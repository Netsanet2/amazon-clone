import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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
  /* =====================================================
     LIST STATE
  ===================================================== */

  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem("amazonCloneLists");

    return savedLists
      ? JSON.parse(savedLists)
      : defaultLists;
  });

  const [selectedListId, setSelectedListId] = useState(() => {
    const savedSelectedList = localStorage.getItem(
      "amazonCloneSelectedList"
    );

    return savedSelectedList
      ? Number(savedSelectedList)
      : 1;
  });

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
     SAVE LISTS TO LOCAL STORAGE
  ===================================================== */

  useEffect(() => {
    localStorage.setItem(
      "amazonCloneLists",
      JSON.stringify(lists)
    );
  }, [lists]);

  useEffect(() => {
    localStorage.setItem(
      "amazonCloneSelectedList",
      selectedListId
    );
  }, [selectedListId]);

  /* =====================================================
     FIND SELECTED LIST
  ===================================================== */

  const selectedList =
    lists.find((list) => list.id === selectedListId) ||
    lists[0];

  /* =====================================================
     CREATE A NEW LIST
  ===================================================== */

  const createList = () => {
    const trimmedName = listName.trim();

    if (!trimmedName) {
      alert("Please enter a list name.");
      return;
    }

    /* Prevent duplicate list names */
    const alreadyExists = lists.some(
      (list) =>
        list.name.toLowerCase() ===
        trimmedName.toLowerCase()
    );

    if (alreadyExists) {
      alert("A list with this name already exists.");
      return;
    }

    const newList = {
      id: Date.now(),
      name: trimmedName,
      items: [],
    };

    setLists((currentLists) => [
      ...currentLists,
      newList,
    ]);

    /* Automatically open the new list */
    setSelectedListId(newList.id);

    setShowCreateList(false);

    setListName("");

    alert(`List "${trimmedName}" created successfully.`);
  };

  /* =====================================================
     DELETE LIST
  ===================================================== */

  const deleteList = (listId) => {
    const listToDelete = lists.find(
      (list) => list.id === listId
    );

    if (!listToDelete) {
      return;
    }

    /* Don't allow the only list to be deleted */
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

    setLists(remainingLists);

    /* If deleting the currently selected list,
       open another list */
    if (selectedListId === listId) {
      setSelectedListId(remainingLists[0].id);
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

  const saveListName = () => {
    const trimmedName = editingListName.trim();

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
      alert("A list with this name already exists.");
      return;
    }

    setLists((currentLists) =>
      currentLists.map((list) =>
        list.id === editingListId
          ? {
              ...list,
              name: trimmedName,
            }
          : list
      )
    );

    setEditingListId(null);
    setEditingListName("");
  };

  /* =====================================================
     REMOVE PRODUCT FROM SELECTED LIST
  ===================================================== */

  const removeItem = (itemId) => {
    if (!selectedList) {
      return;
    }

    setLists((currentLists) =>
      currentLists.map((list) =>
        list.id === selectedList.id
          ? {
              ...list,
              items: list.items.filter(
                (item) => item.id !== itemId
              ),
            }
          : list
      )
    );
  };

  /* =====================================================
     ADD TO CART
     
     IMPORTANT:
     Actual cart functionality belongs to the Cart teammate.
     This button is intentionally left as an integration point.
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
     RETURN PAGE
  ===================================================== */

  return (
    <div className="lists-container">
      <div className="lists-wrapper">
<div className="amazon-breadcrumb">
  <Link to="/account">Your Account</Link>
  <span>›</span>
  <span>Your Lists</span>
</div>
        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="lists-title-section">
          <h1 className="lists-header">
            Your Lists
          </h1>

          <p>
            Manage the products you have saved for later.
          </p>
        </div>

        {/* =================================================
            LIST HEADER
        ================================================= */}

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

        {/* =================================================
            CREATE LIST FORM
        ================================================= */}

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
                  setListName(event.target.value)
                }
                onKeyDown={handleCreateKeyDown}
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

        {/* =================================================
            CREATED LISTS
        ================================================= */}

        <section className="created-lists-section">

          <div className="section-heading">

            <div>
              <h2>
                Your Lists
              </h2>

              <p>
                Select a list to view its saved products.
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
                selectedListId === list.id;

              const isEditing =
                editingListId === list.id;

              return (
                <div
                  key={list.id}
                  className={`created-list-card ${
                    isSelected
                      ? "selected-list-card"
                      : ""
                  }`}
                >

                  {/* List icon */}
                  <div className="created-list-icon">
                    ♡
                  </div>

                  {/* List information */}
                  <div className="created-list-content">

                    {isEditing ? (

                      <input
                        className="edit-list-input"
                        value={editingListName}
                        onChange={(event) =>
                          setEditingListName(
                            event.target.value
                          )
                        }
                        onKeyDown={(event) => {
                          if (
                            event.key === "Enter"
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
                      {list.items.length === 1
                        ? "item"
                        : "items"}
                    </p>

                    <p className="list-description">
                      {list.items.length === 0
                        ? "Your list is ready for products."
                        : "Products saved in this list."}
                    </p>

                  </div>

                  {/* List actions */}
                  <div className="created-list-actions">

                    {isEditing ? (

                      <>
                        <button
                          className="list-small-primary"
                          onClick={saveListName}
                        >
                          Save
                        </button>

                        <button
                          className="list-small-secondary"
                          onClick={() => {
                            setEditingListId(null);
                            setEditingListName("");
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
                            setSelectedListId(list.id)
                          }
                        >
                          {isSelected
                            ? "Selected"
                            : "View List"}
                        </button>

                        <button
                          className="edit-list-button"
                          onClick={() =>
                            startEditingList(list)
                          }
                        >
                          Rename
                        </button>

                        <button
                          className="delete-list-button"
                          onClick={() =>
                            deleteList(list.id)
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

        {/* =================================================
            SELECTED LIST
        ================================================= */}

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
                {selectedList.items.length === 1
                  ? "item"
                  : "items"}
              </span>

            </div>

            {/* =================================================
                EMPTY LIST
            ================================================= */}

            {selectedList.items.length === 0 ? (

              <div className="empty-list">

                <div className="empty-list-icon">
                  ♡
                </div>

                <h2>
                  Your list is empty
                </h2>

                <p>
                  When you save products to this list,
                  they'll appear here.
                </p>

                <Link
                  to="/"
                  className="empty-list-button"
                >
                  Continue shopping
                </Link>

              </div>

            ) : (

              /* =================================================
                 PRODUCTS
              ================================================= */

              <div className="lists-grid">

                {selectedList.items.map((item) => (

                  <div
                    key={item.id}
                    className="lists-card"
                  >

                    {/* Temporary product image */}
                    <div className="list-product-image">
                      <span>
                        Product
                      </span>
                    </div>

                    {/* Product information */}
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

                      {/* Product actions */}
                      <div className="list-actions">

                        <button
                          className="list-primary-button"
                          onClick={() =>
                            handleAddToCart(item)
                          }
                        >
                          Add to Cart
                        </button>

                        <button
                          className="list-secondary-button"
                          onClick={() =>
                            removeItem(item.id)
                          }
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>
        )}

      </div>
    </div>
  );
}