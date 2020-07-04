import React, { useState, useEffect } from "react";
import "./styles.css";

// Store them in a state variable
//Listen the changes on the inputs and the select field
// Listen to the submit of the form
// Prevent the default reload behavior
// Check if one of the fields are empty, if they are, pop an alert, if not build the link
// filename/code/expiration --> display it

export default () => {
  const [formData, setData] = useState({
    filename: "",
    expiration: "",
    code: "",
  });
  const [link, setLink] = useState("");

  useEffect(() => {
    const elementValue = document.getElementById("api_paste_expire_date").value;
    setData({
      ...formData,
      expiration: document.getElementById("api_paste_expire_date").value,
    });
  }, []);

  // ...AnObject --> take all of the properties of an object, and put them in --> SPREAD OPERATOR
  /*let foo = { ...formData, filename: "sammy", expiration: "toto" };
  console.log(foo);*/
  return (
    <div className="App">
      <h1>
        <a href="/instructions.html"> instructions </a>
      </h1>
      <br />
      <img
        className="logo"
        src="https://pastebin.com/i/pastebin_logo_side_outline.png"
        alt="pastebin"
      />
      <form
        className="col-10 offset-1"
        onSubmit={(event) => handleSubmit(event, formData, setLink)}
      >
        <div className="form-group">
          <label htmlFor="api_paste_name">Filename</label>
          <input
            onChange={(e) =>
              setData({
                ...formData,
                filename: e.target.value,
              })
            }
            type="text"
            className="form-control"
            id="api_paste_name"
            name="api_paste_name"
            value={formData.filename}
            placeholder="Write text here"
          />
        </div>
        <div className="form-group">
          <label htmlFor="api_paste_expire_date">Expiration</label>
          <select
            className="custom-select"
            id="api_paste_expire_date"
            name="api_paste_expire_date"
            value={formData.expiration}
            onChange={(e) =>
              setData({ ...formData, expiration: e.target.value })
            }
          >
            <option value="10M" defaultValue>
              10 Minutes
            </option>
            <option value="1H">1 Hour</option>
            <option value="1D">1 Day</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="api_paste_code">Code</label>
          <textarea
            className="form-control"
            id="api_paste_code"
            name="api_paste_code"
            rows="3"
            value={formData.code}
            onChange={(e) => setData({ ...formData, code: e.target.value })}
          />
        </div>
        <input type="hidden" name="api_paste_private" value="0" />
        <input type="hidden" name="api_option" value="paste" />
        <input type="hidden" name="api_user_key" value="" />
        <input
          type="hidden"
          name="api_dev_key"
          value="dc2d94ed4b463f7ee5e73cb4fac5a18f"
        />
        <div className="form-group">
          <button type="submit" className="btn btn-info">
            Submit
          </button>
        </div>
        <p>Your link is: {link}</p>
      </form>
    </div>
  );
};

const handleSubmit = (event, formData, setLink) => {
  event.preventDefault();
  for (let key in formData) {
    if (!formData[key].length) {
      alert("Please fill in all of the inputs");
      return;
    }
  }
  setLink(`/${formData.filename}/${formData.code}/${formData.expiration}`);
};
