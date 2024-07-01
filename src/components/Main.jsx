// import { getDefaultNormalizer } from "@testing-library/react";
import react, { useState, useEffect } from "react";
import Card from "./Card";
import { RiMovie2Line } from "react-icons/ri";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { MdLocalMovies } from "react-icons/md";

let API_key = "&api_key=db95773a7fb212ba790d71f6adac0e7e";
let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
let arr = ["Popular", "Kids", "Drama", "Comedie"];
const Main = () => {
  const [movieData, setData] = useState([]);
  const [url_set, setUrl] = useState(url);
  const [search, setSearch] = useState();

  const [open, setopen] = useState(false);
  const handleclick = () => setopen(!open);
  const closemenu = () => setopen(false);

  useEffect(() => {
    fetch(url_set)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
      });
  }, [url_set]);

  const getData = (movieType) => {
    if (movieType == "Popular") {
      url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
    }
    // if(movieType=="Theatre")
    // {
    //     url=base_url+"/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22"+API_key;
    // }
    if (movieType == "Kids") {
      url =
        base_url +
        "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" +
        API_key;
    }
    if (movieType == "Drama") {
      url =
        base_url +
        "/discover/movie?with_genres=18&primary_release_year=2014" +
        API_key;
    }
    if (movieType == "Comedie") {
      url =
        base_url +
        "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" +
        API_key;
    }
    setUrl(url);
    closemenu();
  };
  const searchMovie = (evt) => {
    if (evt.key == "Enter") {
      url =
        base_url +
        "/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=" +
        search;
      setUrl(url);
      setSearch(" ");
    }
  };
  return (
    <>
      <div className="header">
        <div className="logo">
          <div className="logo-ico">
            <MdLocalMovies />
          </div>
          <h2>Movie-Buzz</h2>
        </div>
        <nav>
          <ul className={open ? "nav-links active" : "nav-links"}>
            {arr.map((value, pos) => {
              return (
                <li>
                  <a
                    href="#"
                    key={pos}
                    name={value}
                    onClick={(e) => {
                      getData(e.target.name);
                    }}
                  >
                    {value}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <form>
          <div className="icons" onClick={handleclick}>
            {open ? <GrClose /> : <HiOutlineMenuAlt2 />}
          </div>
          <div className="search-btn">
            <input
              type="text"
              placeholder="Enter Movie Name"
              className="inputText"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              onKeyPress={searchMovie}
            ></input>
            <button className="searchicon">
              <RiMovie2Line />
            </button>
          </div>
        </form>
      </div>
      <div className="container">
        {movieData.length == 0 ? (
          <p className="notfound">Not Found</p>
        ) : (
          movieData.map((res, pos) => {
            return <Card info={res} key={pos} />;
          })
        )}
      </div>
    </>
  );
};
export default Main;
