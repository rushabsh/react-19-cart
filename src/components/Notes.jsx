import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, deleteNotes, setSearch } from "../features/ShopCart/noteSlice";

const Notes = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const { items, search } = useSelector((state) => state.notes);

  const dispatch = useDispatch();
  console.log("items", items);

  const handelButtonClick = () => {
    if (!title.trim()) return;

    dispatch(
      addNote({ title, content, tags: tags.split(",").map((t) => t.trim()) })
    );
    setTitle("");
    setContent("");
    setTags("");
  };

  const handelDelete = (id) => {
    dispatch(deleteNotes(id));
  };

  
  const filteredNotes = items.filter((note) =>
  note.title.toLowerCase().includes(search.toLowerCase()) ||
  note.content.toLowerCase().includes(search.toLowerCase()) ||
  note.tags?.some(tag =>
    tag.toLowerCase().includes(search.toLowerCase())
  )
);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #f3e8ff, #e0e7ff)",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#1f2937",
          }}
        >
          📝 Notes
        </h2>

        <input
          placeholder="Search notes..."
          style={{
            width: 260,
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            outline: "none",
            fontSize: 14,
          }}
          value={search}
          onChange={(e)=> dispatch(setSearch(e.target.value))}
        />
      </div>

      {/* ADD NOTE CARD */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto 40px",
          padding: 24,
          borderRadius: 20,
          background: "#ffffff",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: 16,
          }}
        >
          <input
            placeholder="Title"
            style={{
              padding: "14px 16px",
              borderRadius: 14,
              border: "1px solid #e5e7eb",
              fontSize: 15,
              outline: "none",
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your note..."
            rows={4}
            style={{
              padding: "14px 16px",
              borderRadius: 14,
              border: "1px solid #e5e7eb",
              fontSize: 14,
              outline: "none",
              resize: "none",
            }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div
            style={{
              display: "flex",
              gap: 12,
            }}
          >
            <input
              placeholder="Tags (comma separated)"
              style={{
                flex: 1,
                padding: "12px 14px",
                borderRadius: 14,
                border: "1px solid #e5e7eb",
                fontSize: 14,
                outline: "none",
              }}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />

            <button
              style={{
                padding: "12px 20px",
                borderRadius: 14,
                border: "none",
                background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                color: "#ffffff",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(99,102,241,0.4)",
              }}
              onClick={() => handelButtonClick()}
            >
              Add Note
            </button>
          </div>
        </div>
      </div>

      {/* NOTES GRID */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 24,
        }}
      >
        {/* NOTE CARD */}
        {filteredNotes.map((item) => (
          <div
            key={item.id}
            style={{
              padding: 20,
              borderRadius: 18,
              background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
              boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
              position: "relative",
            }}
          >
            <h4
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#1f2937",
                marginBottom: 8,
              }}
            >
              {item.title}
            </h4>
            <p>{item.content}</p>
            <small>Tags: {item.tags}</small>

            <p
              style={{
                fontSize: 14,
                color: "#374151",
                marginBottom: 12,
                lineHeight: 1.6,
              }}
            >
              {item.content}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: "#e0e7ff",
                  fontSize: 12,
                  color: "#4338ca",
                  fontWeight: 500,
                }}
              >
                work
              </span>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: "#e0e7ff",
                  fontSize: 12,
                  color: "#4338ca",
                  fontWeight: 500,
                }}
              >
                ideas
              </span>
            </div>

            {/* ACTIONS */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: 13,
                  color: "#7c3aed",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                📌 {item.pinned ? "pinned" : "Unpin"}
              </button>

              <button
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: 13,
                  color: "#ef4444",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
                onClick={() => handelDelete(item.id)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
