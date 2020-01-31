import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
// import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, ...kwargs }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState({
    color: "",
    code: {
      hex: ""
    },
    id: 0
  });
  const history = useHistory();
  const location = useLocation();
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        if (res.status === 200) {
          history.push(location.pathname);
        }
      })
      .catch(errors => alert(errors));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(() => history.push(location.pathname))
      .catch(errors => alert(errors));
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/colors", colorToAdd)
      .then(() => history.push(location.pathname))
      .catch(errors => alert(errors));
    // clear the form
    setColorToAdd({
      color: "",
      code: {
        hex: ""
      },
      id: 0
    });
  };

  const handleOnChange = e => {
    switch (e.currentTarget.name) {
      case "hex":
        setColorToAdd({
          ...colorToAdd,
          code: { hex: e.currentTarget.value }
        });
        break;
      case "name":
        setColorToAdd({
          ...colorToAdd,
          color: e.currentTarget.value
        });
        break;
      default:
        break;
    }
  };
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
        <input
          type="text"
          name="name"
          placeholder="color name"
          value={colorToAdd.color}
          onChange={handleOnChange}
        />
        <input
          type="text"
          name="hex"
          placeholder="#hexcode"
          value={colorToAdd.code.hex}
          onChange={handleOnChange}
        />
        <button>add color</button>
      </form>
    </div>
  );
};

export default ColorList;
