import { useEffect, useState } from "react";
import API from "./api";
import "./dashboard.css";

function Dashboard({ setIsLoggedIn }) {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [newCategory, setNewCategory] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [updateTask, setUpdateTask] = useState(null);

  // NEW STATE → for filtering tasks by category
  const [selectedCategory, setSelectedCategory] = useState(null);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  // FETCH DATA
  useEffect(() => {
    loadCategories();
    loadTasks();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await API.get("/category");
      setCategories(res.data);
    } catch (err) {
      console.error("Category load error", err);
    }
  };

  const loadTasks = async () => {
    try {
      const res = await API.get("/task");
      setTasks(res.data);
    } catch (err) {
      console.error("Task load error", err);
    }
  };

  // ADD CATEGORY
  const handleAddCategory = async () => {
    try {
      await API.post("/category", { title: newCategory });
      setNewCategory("");
      loadCategories();
    } catch (err) {
      console.error(err);
    }
  };

  // ADD TASK
  const handleAddTask = async () => {
    try {
      await API.post("/task", newTask);
      setNewTask({ title: "", description: "", category: "" });
      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // UPDATE TASK
  const handleUpdateTask = async () => {
    try {
      await API.put(`/task/${updateTask._id}`, updateTask);
      setUpdateTask(null);
      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE TASK
  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/task/${id}`);
      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // FILTER TASKS BASED ON CATEGORY CLICK
  const filteredTasks = selectedCategory
    ? tasks.filter((t) =>
        typeof t.category === "string"
          ? t.category === selectedCategory
          : t.category?.
              _id === selectedCategory
      )
    : tasks;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      {/* CATEGORY SECTION */}
      <h3>Add Category</h3>
      <input
        type="text"
        value={newCategory}
        placeholder="Category title"
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={handleAddCategory}>Add</button>

      <h3>Categories</h3>
      <ul>
        {categories.map((c) => (
          <li
            key={c._id}
            onClick={() => setSelectedCategory(c._id)}
            style={{
              cursor: "pointer",
              fontWeight: selectedCategory === c._id ? "bold" : "normal",
              color: selectedCategory === c._id ? "green" : "black",
            }}
          >
            {c.title}
          </li>
        ))}
      </ul>

      {/* TASK SECTION */}
      <h3>Add Task</h3>
      <input
        type="text"
        placeholder="Task title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
      />
      <select
        value={newTask.category}
        onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
      >
        <option value="">Select category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.title}
          </option>
        ))}
      </select>

      <button onClick={handleAddTask}>Add Task</button>

      <h3>Tasks</h3>
      <ul>
        {filteredTasks.map((t) => (
          <li key={t._id}>
            <strong>{t.title}</strong> — {t.description}
            <button onClick={() => setUpdateTask(t)}>Update</button>
            <button onClick={() => handleDeleteTask(t._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* UPDATE TASK UI */}
      {updateTask && (
        <div>
          <h3>Update Task</h3>
          <input
            type="text"
            value={updateTask.title}
            onChange={(e) =>
              setUpdateTask({ ...updateTask, title: e.target.value })
            }
          />
          <input
            type="text"
            value={updateTask.description}
            onChange={(e) =>
              setUpdateTask({ ...updateTask, description: e.target.value })
            }
          />
          <button onClick={handleUpdateTask}>Save</button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
