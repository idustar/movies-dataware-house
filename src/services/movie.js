import { stringify } from 'qs';

import request from '../utils/request';

const url = 'http://123.207.222.112:8080';

export function fetchMovieById({ id }) {
  return request(`${url}/movie/${id}`, {
    method: 'get',
  });
}

export function fetchMoviesByDateRange({ start, end, page }) {
  return request(`${url}/movie/dateRange/?startDate=${start}&endDate=${end}&page=${page-1}`, {
    method: 'get',
  });
}

export function fetchMoviesByActor({ actor, page }) {
  return request(`${url}/movie/actor/${actor}?page=${page-1}`, {
    method: 'get',
  });
}

export function fetchMoviesByDirector({ director, page }) {
  return request(`${url}/movie/director/${director}?page=${page-1}`, {
    method: 'get',
  });
}

export function fetchMoviesCom({ director, actor, page }) {
  return request(`${url}/director_actor?director=${director}&actor=${actor}&page=${page-1}`, {
    method: 'get',
  });
}

export function fetchMoviesByTitle({ title, page }) {
  return request(`${url}/movie/title/${title}?page=${page-1}`, {
    method: 'get',
  });
}
export function fetchMoviesByTitleLike({ title, page }) {
  return request(`${url}/title/starting/${title}?page=${page-1}`, {
    method: 'get',
  });
}
export function fetchMoviesByTitleContain({ title, page }) {
  return request(`${url}/title/containing/${title}?page=${page-1}`, {
    method: 'get',
  });
}

export function fetchMoviesByGenre({ genre, page }) {
  return request(`${url}/movie/genre/${genre}?page=${page-1}`, {
    method: 'get',
  });
}

export function fetchMovies({ query, page }) {
  console.log(page, JSON.stringify(query))
  return request(`${url}/movie/query?page=${page-1}`, {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      "Content-Type": "application/json"
    },
  });
}

export function fetchMoviesById({ ids }) {
  return request(`${url}/movies/query`, {
    method: 'POST',
    body: JSON.stringify(ids),
    headers: {
      "Content-Type": "application/json"
    },
  });
}


export function fetchMovieComment({ id, page }) {
  return request(`${url}/comment/productId/${id}?page=${page-1}&pageSize=10`, {
    method: 'get',
  });
}

export function fetchUserComment({ id, page }) {
  return request(`${url}/comment/userId/${id}?page=${page-1}&pageSize=10`, {
    method: 'get',
  });
}

export function fetchActors({ actor, page }) {
  return request(`${url}/director_actor/actor/${actor}?page=${page-1}&pageSize=20`, {
    method: 'get',
  });
}

export function fetchDirectors({ director, page }) {
  return request(`${url}/director_actor/director/${director}?page=${page-1}&pageSize=20`, {
    method: 'get',
  });
}

