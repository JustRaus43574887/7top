const Form = ({ form, setForm }) => {
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="row">
      <div className="col s2">
        <input
          onChange={handleChange}
          value={form.one}
          name="one"
          className="acc-input"
          type="text"
          maxLength={2}
        />
      </div>
      <div className="col s2">
        <input
          onChange={handleChange}
          value={form.two}
          name="two"
          className="acc-input"
          type="text"
          maxLength={2}
        />
      </div>
      <div className="col s2">
        <input
          onChange={handleChange}
          value={form.three}
          name="three"
          className="acc-input"
          type="text"
          maxLength={2}
        />
      </div>
      <div className="col s2">
        <input
          onChange={handleChange}
          value={form.four}
          name="four"
          className="acc-input"
          type="text"
          maxLength={2}
        />
      </div>
      <div className="col s2">
        <input
          onChange={handleChange}
          value={form.five}
          name="five"
          className="acc-input"
          type="text"
          maxLength={2}
        />
      </div>
      <div className="col s2">
        <input
          onChange={handleChange}
          value={form.six}
          name="six"
          className="acc-input"
          type="text"
          maxLength={2}
        />
      </div>
    </div>
  );
};

export default Form;
