import React, { Link, useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [bookmarkList, setBookmarkList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [url, setUrl] = useState('');
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/read').then((res) => {
      setBookmarkList(res.data);
      setHashtags(res.data);
    });
  }, []);

  const handleAddBookmark = () => {
    axios
      .post('http://localhost:3000/add', { url: url, hashtags: hashtags })
      .then((res) => console.log(res));
  };

  const handleFilterByHashtag = (hashtag) => {
    axios
      .get(`http://localhost:3000/read/${hashtag}`)
      .then((res) => console.log(res))
      .then(
        axios.get(`http://localhost:3000/read/${hashtag}`).then((res) => {
          setFilteredList(res);
        })
      );
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

  const uniqueHashtags = (docs) => {
    let arr = [];
    for (let ele in docs) {
      arr.push(docs[ele].hashtags);
    }
    return arr
      .flat()
      .filter((val, idx, curr) => curr.indexOf(val) === idx)
      .sort();
  };

  const addHashtag = (val) => {
    if (val.search(/^#/) == -1) {
      val = '#' + val;
    }
    return val;
  };

  const sortedHashtags = uniqueHashtags(bookmarkList);

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
            placeholder={`Enter a URL...`}
            onChange={(event) => {
              console.log(event.target.value);
              setUrl(event.target.value);
            }}
          />
          <br />
          <input
            name='hashtags'
            type='text'
            placeholder={`Add tags...`}
            onChange={(event) => {
              console.log(event.target.value);
              setUrl(event.target.value);
            }}
          />
          <button>Add</button>
          <button className='buttonDeleteAll' onClick={handleDeleteEverything}>
            Delete All
          </button>
        </form>
        <br />
        <hr />
      </div>
      <br />
      <div id='navbar'>
        <h2>Totals</h2>
        <p className='navbar'>
          {bookmarkList.length} bookmarks
          <br />
          {sortedHashtags.length} tags
        </p>
        <h2>Tags</h2>
        {sortedHashtags.map((ele, key) => {
          let url = `/read/${ele}`;
          return (
            <div key={key} className='hashtagList'>
              <p key={key}>
                <a
                  href={url}
                  key={key}
                  hashtag={ele}
                  className='navbar'
                  onClick={() => handleFilterByHashtag(ele)}
                >
                  {addHashtag(ele)}
                </a>
              </p>
            </div>
          );
        })}
      </div>
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
                if (ele.url.length > 50) {
                  return (
                    <ul>
                      &#128279;
                      <a href={setHttp(ele.url)} hashtags={ele.hashtags}>
                        {ele.url.substring(0, 58)}...
                      </a>
                      <br />
                      {ele.hashtags.map((el, index) => {
                        const addHashtag = (val) => {
                          if (val.search(/^#/) == -1) {
                            val = '#' + val;
                          }
                          return val;
                        };
                        return <span key={index}>{addHashtag(el)} &nbsp;</span>;
                      })}
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
                      &#128279;
                      <a href={setHttp(ele.url)} hashtags={ele.hashtags}>
                        {ele.url.substring(0, 50)}
                      </a>
                      <br />
                      {ele.hashtags.map((el, index) => {
                        const addHashtag = (val) => {
                          if (val.search(/^#/) == -1) {
                            val = '#' + val;
                          }
                          return val;
                        };
                        return <span key={index}>{addHashtag(el)} &nbsp;</span>;
                      })}
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
      <br />
      <br />
      <br />
    </div>
  );
};

export default App;
