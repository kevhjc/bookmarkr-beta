import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [bookmarkList, setBookmarkList] = useState([]);
  const [url, setUrl] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/read').then((res) => {
      setBookmarkList(res.data);
    });
  }, []);

  const handleAddBookmark = () => {
    axios
      .post('http://localhost:3000/add', { url: url })
      .then((res) => console.log(res));
  };

  const handleDeleteBookmark = (id) => {
    axios
      .delete(`http://localhost:3000/delete/${id}`)
      .then((res) => console.log(res))
      .then(
        axios.get('http://localhost:3000/read').then((res) => {
          setBookmarkList(res.data);
        })
      );
  };

  const handleDeleteEverything = () => {
    axios
      .delete(`http://localhost:3000/deleteAll/`)
      .then((res) => console.log(res))
      .then(
        axios.get('http://localhost:3000/read').then((res) => {
          setBookmarkList(res.data);
        })
      );
  };

  return (
    <div>
      <header>
        <h1>
          <a href='/' className='title'>
            &#x1f4d5; Bookmarkr
          </a>
        </h1>
      </header>
      <div>
        <form method='POST' action='/add'>
          <input
            name='url'
            type='text'
            placeholder='Enter a URL'
            onChange={(event) => {
              console.log(event.target.value);
              setUrl(event.target.value);
            }}
          />
          <button onClick={() => this.handleAddBookmark()}>Add</button>
          <button className='buttonDeleteAll' onClick={handleDeleteEverything}>
            Delete All
          </button>
        </form>
        <br />
        <hr />
      </div>
      <br />
      {bookmarkList
        .slice(0)
        .reverse()
        .map((ele, key) => {
          const setHttp = (link) => {
            if (link.search(/^http[s]?\:\/\//) == -1) {
              link = 'http://' + link;
            }
            return link;
          };
          return (
            <div key={key}>
              {(() => {
                if (ele.url.length >= 50) {
                  return (
                    <ul>
                      &#128279;&nbsp;
                      <a href={setHttp(ele.url)}>
                        {ele.url.substring(0, 50)}...
                      </a>
                      <button
                        className='buttonDelete'
                        onClick={() => handleDeleteBookmark(ele._id)}
                      >
                        Delete
                      </button>
                    </ul>
                  );
                } else {
                  return (
                    <ul>
                      &#128279;&nbsp;
                      <a href={setHttp(ele.url)}>{ele.url.substring(0, 50)}</a>
                      <button
                        className='buttonDelete'
                        onClick={() => handleDeleteBookmark(ele._id)}
                      >
                        Delete
                      </button>
                    </ul>
                  );
                }
              })()}
            </div>
          );
        })}
    </div>
  );
};

export default App;
