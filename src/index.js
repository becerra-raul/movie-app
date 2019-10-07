import getNowPlayingMovies from './components/nowPlayingMovies/getNowPlayingMovies.js';
import ObserveElement from './utils/ObserveElement';
import createMovieList from './components/movieCard/movieList';
import './theme/index.scss';
import _ from 'lodash';
import {
    setState
} from './utils/setState';
import cacheGenres from './utils/cacheGenres';
export const state = {
    showingNowPlaying: true,
    elementObserved: false,
    searchInput: '',
    onlinePage: 1,
    searchPage: 1,
    searchMoviesCache: [],
    onlineMoviesCache: [],
};

window.addEventListener('load', async () => {
    if (state.showingNowPlaying) {
        cacheGenres();
        nowPlayingMoviesLogic();
    }
});

const nowPlayingMoviesLogic = async () => {
    const results = await getNowPlayingMovies(
        state.onlinePage,
        state.showingNowPlaying
    );
    setState('onlineMoviesCache', results);
    const movieList = createMovieList(
        state.onlineMoviesCache,
        state.showingNowPlaying
    );
    const elementToObserve = document.getElementById(
        movieList[movieList.length - 2] &&
        movieList[movieList.length - 2].values[0] &&
        movieList[movieList.length - 2].values[0].toString()
    );
    console.log(elementToObserve);
    ObserveElement(elementToObserve);
    window.addEventListener(
        'scroll',
        _.throttle(() => {
            applyColorToHeader("colorfull");
            if (state.elementObserved) {
                state.onlinePage++;
                state.elementObserved = false;
                nowPlayingMoviesLogic();
            }
        }),
        5000
    );
};


const applyColorToHeader = (className) => {
    const rootElement = document.querySelector('#header');
    const sectionElement = document.querySelector('#main-content');
    if (sectionElement.scrollTop === 0) {
        if (rootElement.classList.contains(className))
            rootElement.classList.remove(className);

    } else if (sectionElement.scrollTop > 50) {
        rootElement.classList.add(className);
    }
}