import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addTask, deleteTask } from "../features/ShopCart/todoSlice";

const Todo = () => {
  const [input, setInput] = useState("");
  //   const [todos, setTodos] = useState([]);

  const { todos } = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  const handelAddTask = () => {
    if (!input.trim()) return; // empty input check

    const existing = todos.find(
      (todo) => todo.task.toLowerCase() == input.toLowerCase()
    );
    if (existing) {
      alert("Task already exists!");
      setInput("");
      return;
    }
    // setTodos([...todos, { id: Date.now(), task: input, completed: false }]);
    dispatch(addTask(input));
    setInput("");
  };

  const handelDelete = (id) => {
    dispatch(deleteTask(id));
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top left, #8b5cf6, #4f46e5)",
        padding: "20px",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "28px",
          borderRadius: "22px",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 30px 70px rgba(0,0,0,0.35)",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "22px",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#111827",
            }}
          >
            📝 Todo
          </h1>

          <span
            style={{
              fontSize: "12px",
              padding: "6px 12px",
              borderRadius: "999px",
              background: "#e0e7ff",
              color: "#4338ca",
              fontWeight: "600",
            }}
          >
            Today
          </span>
        </div>

        {/* INPUT */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <input
            type="text"
            placeholder="Add new task"
            style={{
              flex: 1,
              padding: "14px 16px",
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
              fontSize: "14px",
              outline: "none",
              background: "#fff",
            }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            style={{
              padding: "14px 18px",
              borderRadius: "14px",
              border: "none",
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(79,70,229,0.45)",
            }}
            onClick={() => handelAddTask()}
          >
            +
          </button>
        </div>

        {/* TODO LIST */}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 18px",
                borderRadius: "16px",
                background: "#f9fafb",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                marginBottom: "14px",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#1f2937",
                }}
              >
                {todo.task}
              </span>

              <button
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#ef4444",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                onClick={() => handelDelete(todo.id)}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>

        {/* FOOTER */}
        <Link
          to="/"
          style={{
            display: "block",
            marginTop: "26px",
            textAlign: "center",
            textDecoration: "none",
            padding: "12px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #111827, #1f2937)",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Todo;
