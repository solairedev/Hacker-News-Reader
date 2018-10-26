const API_SINGLE_STORY    = 'https://hacker-news.firebaseio.com/v0/item/'
const API_USER_INFO       = 'https://hacker-news.firebaseio.com/v0/user/'
const API_BEST_STORY_LIST = 'https://hacker-news.firebaseio.com/v0/beststories.json';
const API_TOP_STORY_LIST  = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const API_NEW_STORY_LIST  = 'https://hacker-news.firebaseio.com/v0/newstories.json';
const DEFAULT_FORMAT      = '.json'

export function fetchSingleItem( id ){
  return new Promise(resolve => {
    fetch(API_SINGLE_STORY + id + DEFAULT_FORMAT)
      .then(response => response.json())
      .then(data => {
        let item  = data
        resolve(item)
      })
  })
}

export function fetchUserInfo( name ){
  return new Promise(resolve => {
    fetch( API_USER_INFO + name + DEFAULT_FORMAT )
      .then(response => response.json())
      .then(data => {
        let user = data;
        resolve(user);
      })
  })
}

export function fetchStoryListID( type ){
    let API = type || 'new'
    switch (API){
      case 'now' :
        API = API_NEW_STORY_LIST
        break
      case 'top' :
        API = API_TOP_STORY_LIST
        break
      case 'best' :
        API = API_BEST_STORY_LIST
        break
      default:
        API = API_NEW_STORY_LIST
    }
    return new Promise(resolve =>{
      fetch(API)
        .then(response => response.json())
        .then(data => {
          resolve(data)
        })
    })
  }
