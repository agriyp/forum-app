import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action';
import useInput from '../hooks/useInput';

function ThreadInput() {
  const [body, handleChangeBody] = useInput('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addThreadHandler = (event) => {
    event.preventDefault();
    dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value.slice(0, 110));
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value.slice(0, 20));
  };

  return (
    <section className="thread-input-container">
      <h2>Tambah Thread</h2>
      <form className="thread-input" onSubmit={addThreadHandler}>
        <input
          type="text"
          placeholder="Isikan judul..."
          value={title}
          onChange={handleChangeTitle}
          required
        />
        <p className="char-count">{`sisa karakter: ${110 - title.length}`}</p>
        <input
          type="text"
          placeholder="Isikan kategori..."
          value={category}
          onChange={handleChangeCategory}
        />
        <p className="char-count">{`sisa karakter: ${20 - category.length}`}</p>
        <textarea
          type="text"
          placeholder="Isikan apa yang kamu pikirkan..."
          value={body}
          onChange={handleChangeBody}
          required
        />
        <button type="submit">Tambah</button>
      </form>
    </section>
  );
}

export default ThreadInput;
